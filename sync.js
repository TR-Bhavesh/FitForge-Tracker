/* ═════════════════════════════════════════════════
   FitForge Cloud Sync — Automatic Encrypted Cloud
   AES-256-GCM encryption · jsonblob.com storage
   No tokens, no accounts — just a Sync Code + Passphrase
   ═════════════════════════════════════════════════ */

const SYNC_KEY = 'fitforge_sync_config';
let _syncDebounce = null;
let _syncInProgress = false;  // guard against infinite loop

// ── Crypto (AES-256-GCM + PBKDF2) ────────────────────
async function deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const km = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, km, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

async function encryptData(plaintext, passphrase) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
    const buf = new Uint8Array(salt.length + iv.length + ct.byteLength);
    buf.set(salt, 0); buf.set(iv, 16); buf.set(new Uint8Array(ct), 28);
    return btoa(String.fromCharCode(...buf));
}

async function decryptData(b64, passphrase) {
    const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const key = await deriveKey(passphrase, raw.slice(0, 16));
    const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(16, 28) }, key, raw.slice(28));
    return new TextDecoder().decode(dec);
}

// ── Hash password (SHA-256) ───────────────────────────
async function hashPassword(password) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', enc.encode(password));
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Sync config helpers ───────────────────────────────
function getSyncConfig() {
    try { return JSON.parse(localStorage.getItem(SYNC_KEY)) || null; } catch { return null; }
}
function saveSyncConfig(cfg) { localStorage.setItem(SYNC_KEY, JSON.stringify(cfg)); }

// ── jsonblob.com API ──────────────────────────────────
const BLOB_API = 'https://jsonblob.com/api/jsonBlob';

async function blobCreate(data) {
    const res = await fetch(BLOB_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Cloud create failed: ' + res.status);
    // Try Location header first (jsonblob returns URL in it)
    const loc = res.headers.get('Location') || res.headers.get('location') || '';
    if (loc) {
        const id = loc.split('/').pop();
        if (id) return id;
    }
    // Fallback: check X-jsonblob header
    const xjb = res.headers.get('X-jsonblob') || '';
    if (xjb) return xjb;
    // Fallback: try to extract from response URL
    if (res.url && res.url.includes('/api/jsonBlob/')) {
        const id = res.url.split('/api/jsonBlob/').pop();
        if (id) return id;
    }
    // Last resort: try response body for an id field
    try {
        const json = await res.json();
        if (json && json.id) return json.id;
    } catch (e) { /* ignore */ }
    return null;
}

async function blobRead(id) {
    const res = await fetch(BLOB_API + '/' + id, {
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Cloud read failed: ' + res.status);
    return res.json();
}

async function blobUpdate(id, data) {
    const res = await fetch(BLOB_API + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Cloud update failed: ' + res.status);
    return true;
}

// ── Data collect / merge ──────────────────────────────
function collectAllData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('fitforge_') && key !== SYNC_KEY) {
            try { data[key] = JSON.parse(localStorage.getItem(key)); } catch { data[key] = localStorage.getItem(key); }
        }
    }
    return data;
}

function mergeArraysById(local, remote) {
    if (!Array.isArray(local)) return remote;
    if (!Array.isArray(remote)) return local;
    const map = new Map();
    local.forEach(item => { if (item && item.id) map.set(item.id, item); });
    remote.forEach(item => {
        if (item && item.id) {
            const ex = map.get(item.id);
            if (!ex) map.set(item.id, item);
            else if (item.timestamp && ex.timestamp && item.timestamp > ex.timestamp) map.set(item.id, item);
        }
    });
    return Array.from(map.values()).sort((a, b) => (a.timestamp || '').localeCompare(b.timestamp || ''));
}

function restoreAllData(data) {
    let count = 0;
    Object.keys(data).forEach(key => {
        if (!key.startsWith('fitforge_') || key === SYNC_KEY) return;
        const incoming = data[key];
        if (Array.isArray(incoming)) {
            let local = []; try { local = JSON.parse(localStorage.getItem(key)) || []; } catch { local = []; }
            localStorage.setItem(key, JSON.stringify(mergeArraysById(local, incoming)));
        } else {
            localStorage.setItem(key, typeof incoming === 'string' ? incoming : JSON.stringify(incoming));
        }
        count++;
    });
    return count;
}

// ── SYNC: Push local data to cloud ────────────────────
async function syncPush(silent) {
    const cfg = getSyncConfig();
    if (!cfg || !cfg.blobId || !cfg.passphrase) return;
    if (_syncInProgress) return;  // prevent re-entrant sync
    _syncInProgress = true;

    const statusEl = document.getElementById('syncStatus');
    if (!silent && statusEl) { statusEl.style.display = 'block'; statusEl.textContent = '⏳ Syncing…'; statusEl.className = 'sync-status syncing'; }

    try {
        // Pull cloud first, merge, then push merged data
        try {
            const cloud = await blobRead(cfg.blobId);
            if (cloud && cloud.encrypted) {
                const json = await decryptData(cloud.encrypted, cfg.passphrase);
                restoreAllData(JSON.parse(json));
            }
        } catch (e) { /* first time or empty — skip */ }

        const allData = collectAllData();
        const encrypted = await encryptData(JSON.stringify(allData), cfg.passphrase);
        await blobUpdate(cfg.blobId, { encrypted: encrypted, updated: new Date().toISOString() });

        cfg.lastSync = new Date().toISOString();
        saveSyncConfig(cfg);

        if (!silent && statusEl) { statusEl.textContent = '✅ Synced! ' + new Date().toLocaleTimeString(); statusEl.className = 'sync-status success'; }
        if (!silent) showNotification('Synced to cloud!', 'success');
        updateSyncUI();
    } catch (err) {
        if (!silent && statusEl) { statusEl.textContent = '❌ ' + err.message; statusEl.className = 'sync-status error'; }
        if (!silent) showNotification('Sync failed: ' + err.message, 'error');
    } finally {
        _syncInProgress = false;
    }
}

// ── SYNC: Pull cloud data to local ────────────────────
async function syncPull(silent) {
    const cfg = getSyncConfig();
    if (!cfg || !cfg.blobId || !cfg.passphrase) return;
    if (_syncInProgress) return;  // prevent re-entrant sync
    _syncInProgress = true;

    const statusEl = document.getElementById('syncStatus');
    if (!silent && statusEl) { statusEl.style.display = 'block'; statusEl.textContent = '⏳ Pulling…'; statusEl.className = 'sync-status syncing'; }

    try {
        const cloud = await blobRead(cfg.blobId);
        if (!cloud || !cloud.encrypted) throw new Error('No cloud data found');

        const json = await decryptData(cloud.encrypted, cfg.passphrase);
        const data = JSON.parse(json);
        const count = restoreAllData(data);

        cfg.lastSync = new Date().toISOString();
        saveSyncConfig(cfg);

        if (!silent && statusEl) { statusEl.textContent = '✅ Pulled ' + count + ' items!'; statusEl.className = 'sync-status success'; }
        if (!silent) {
            showNotification('Data pulled! Refreshing…', 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            // Silent pull: refresh page data without full reload
            refreshPageData();
        }
        updateSyncUI();
    } catch (err) {
        if (!silent && statusEl) { statusEl.textContent = '❌ ' + err.message; statusEl.className = 'sync-status error'; }
        if (!silent) showNotification('Pull failed: ' + err.message, 'error');
    } finally {
        _syncInProgress = false;
    }
}

// Refresh current page data after a silent sync pull
function refreshPageData() {
    try {
        const path = window.location.pathname + window.location.href;
        if (path.includes('dashboard')) {
            if (typeof loadDashboardData === 'function') loadDashboardData();
        } else if (path.includes('diet')) {
            if (typeof loadTodaysMeals === 'function') loadTodaysMeals();
            if (typeof loadWaterIntake === 'function') loadWaterIntake();
        } else if (path.includes('workout')) {
            if (typeof loadTodaysWorkout === 'function') loadTodaysWorkout();
        } else if (path.includes('analytics')) {
            if (typeof loadAnalytics === 'function') loadAnalytics();
        }
    } catch (e) { /* safe to ignore */ }
}

// ── SETUP: Enable cloud sync (creates blob) ──────────
async function enableCloudSync() {
    const pass = document.getElementById('syncSetupPass').value;
    if (!pass || pass.length < 4) { showNotification('Passphrase must be at least 4 characters', 'error'); return; }

    const statusEl = document.getElementById('syncStatus');
    if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = '⏳ Creating cloud storage…'; statusEl.className = 'sync-status syncing'; }

    try {
        const allData = collectAllData();
        const encrypted = await encryptData(JSON.stringify(allData), pass);
        const blobId = await blobCreate({ encrypted: encrypted, updated: new Date().toISOString() });

        if (!blobId) throw new Error('Could not create cloud storage');

        saveSyncConfig({ blobId: blobId, passphrase: pass, lastSync: new Date().toISOString() });

        if (statusEl) { statusEl.textContent = '✅ Cloud sync enabled!'; statusEl.className = 'sync-status success'; }
        showNotification('Cloud sync enabled! Your Sync Code: ' + blobId, 'success');
        updateSyncUI();
        closeSyncSetup();
    } catch (err) {
        if (statusEl) { statusEl.textContent = '❌ ' + err.message; statusEl.className = 'sync-status error'; }
        showNotification('Setup failed: ' + err.message, 'error');
    }
}

// ── JOIN: Connect to existing sync (from another device) ──
async function joinCloudSync() {
    const code = document.getElementById('syncJoinCode').value.trim();
    const pass = document.getElementById('syncJoinPass').value;
    if (!code) { showNotification('Enter the Sync Code from your other device', 'error'); return; }
    if (!pass) { showNotification('Enter the same passphrase', 'error'); return; }

    const statusEl = document.getElementById('syncStatus');
    if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = '⏳ Connecting…'; statusEl.className = 'sync-status syncing'; }

    try {
        const cloud = await blobRead(code);
        if (!cloud || !cloud.encrypted) throw new Error('Invalid Sync Code or no data found');

        const json = await decryptData(cloud.encrypted, pass);
        const data = JSON.parse(json);
        const count = restoreAllData(data);

        saveSyncConfig({ blobId: code, passphrase: pass, lastSync: new Date().toISOString() });

        if (statusEl) { statusEl.textContent = '✅ Connected! Imported ' + count + ' items. Refreshing…'; statusEl.className = 'sync-status success'; }
        showNotification('Connected & synced!', 'success');
        closeSyncSetup();
        setTimeout(() => location.reload(), 1200);
    } catch (err) {
        const msg = err.message.includes('decrypt') ? 'Wrong passphrase' : err.message;
        if (statusEl) { statusEl.textContent = '❌ ' + msg; statusEl.className = 'sync-status error'; }
        showNotification('Join failed: ' + msg, 'error');
    }
}

// ── AUTO-SYNC: debounced push on any data change ──────
function triggerAutoSync() {
    if (_syncInProgress) return;  // don't re-trigger during sync operations
    const cfg = getSyncConfig();
    if (!cfg || !cfg.blobId) return;
    clearTimeout(_syncDebounce);
    _syncDebounce = setTimeout(() => syncPush(true), 3000);
}

// Hook into localStorage changes to trigger auto-sync
const _origSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = function(key, value) {
    _origSetItem(key, value);
    if (key.startsWith('fitforge_') && key !== SYNC_KEY) triggerAutoSync();
};

// ── UI helpers ────────────────────────────────────────
function openSyncSetup() {
    document.getElementById('syncModal').classList.remove('hidden');
}
function closeSyncSetup() {
    document.getElementById('syncModal').classList.add('hidden');
}

function updateSyncUI() {
    const cfg = getSyncConfig();
    const badge = document.getElementById('syncConfigured');
    if (!badge) return;
    if (cfg && cfg.blobId) {
        const last = cfg.lastSync ? ' · Last: ' + new Date(cfg.lastSync).toLocaleTimeString() : '';
        badge.innerHTML = '✅ Cloud sync active' + last + '<br><span style="font-size:.75rem;color:var(--text-muted)">Sync Code: <strong style="user-select:all;color:var(--cyan)">' + cfg.blobId + '</strong></span>';
        badge.style.display = '';
    } else {
        badge.style.display = 'none';
    }
}

function disconnectSync() {
    if (!confirm('Disconnect cloud sync? Your local data stays — only the cloud link is removed.')) return;
    localStorage.removeItem(SYNC_KEY);
    updateSyncUI();
    showNotification('Cloud sync disconnected', 'info');
}

// ── Init: auto-pull on page load ──────────────────────
document.addEventListener('DOMContentLoaded', function() {
    updateSyncUI();
    const cfg = getSyncConfig();
    if (cfg && cfg.blobId) {
        syncPull(true);  // silent pull on every page load
    }
});
