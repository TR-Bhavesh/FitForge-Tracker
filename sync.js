/* ═════════════════════════════════════════════════
   FitForge Cloud Sync — Encrypted GitHub Storage
   Uses GitHub API + Web Crypto AES-256-GCM
   ═════════════════════════════════════════════════ */

const SYNC_CONFIG_KEY = 'fitforge_sync_config';

// ── Crypto helpers (AES-256-GCM via PBKDF2) ──────────
async function deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptData(plaintext, passphrase) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv   = crypto.getRandomValues(new Uint8Array(12));
    const key  = await deriveKey(passphrase, salt);
    const ct   = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
    // Concat: salt(16) + iv(12) + ciphertext
    const buf = new Uint8Array(salt.length + iv.length + ct.byteLength);
    buf.set(salt, 0);
    buf.set(iv, salt.length);
    buf.set(new Uint8Array(ct), salt.length + iv.length);
    return btoa(String.fromCharCode(...buf));
}

async function decryptData(b64, passphrase) {
    const raw  = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const salt = raw.slice(0, 16);
    const iv   = raw.slice(16, 28);
    const ct   = raw.slice(28);
    const key  = await deriveKey(passphrase, salt);
    const dec  = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return new TextDecoder().decode(dec);
}

// ── GitHub API helpers ────────────────────────────────
function getSyncConfig() {
    try { return JSON.parse(localStorage.getItem(SYNC_CONFIG_KEY)) || null; }
    catch { return null; }
}
function saveSyncConfig(cfg) {
    localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(cfg));
}

async function githubGet(path, token) {
    const res = await fetch('https://api.github.com/repos/' + path, {
        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json' }
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('GitHub API error: ' + res.status);
    return res.json();
}

async function githubPut(path, token, content, sha, message) {
    const body = { message: message || 'FitForge sync', content: btoa(unescape(encodeURIComponent(content))) };
    if (sha) body.sha = sha;
    const res = await fetch('https://api.github.com/repos/' + path, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'GitHub PUT failed: ' + res.status);
    }
    return res.json();
}

// ── Collect all FitForge data ─────────────────────────
function collectAllData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('fitforge_') && key !== SYNC_CONFIG_KEY) {
            try { data[key] = JSON.parse(localStorage.getItem(key)); }
            catch { data[key] = localStorage.getItem(key); }
        }
    }
    return data;
}

// Merge arrays by `id` field — keeps entries from both local and remote
function mergeArraysById(local, remote) {
    if (!Array.isArray(local)) return remote;
    if (!Array.isArray(remote)) return local;
    const map = new Map();
    local.forEach(item => { if (item && item.id) map.set(item.id, item); });
    remote.forEach(item => {
        if (item && item.id) {
            // Remote wins for same id if it has a newer timestamp
            const existing = map.get(item.id);
            if (!existing) {
                map.set(item.id, item);
            } else if (item.timestamp && existing.timestamp && item.timestamp > existing.timestamp) {
                map.set(item.id, item);
            }
        }
    });
    return Array.from(map.values()).sort((a, b) => {
        if (a.timestamp && b.timestamp) return a.timestamp.localeCompare(b.timestamp);
        return (a.id || 0) - (b.id || 0);
    });
}

function restoreAllData(data, merge) {
    let count = 0;
    Object.keys(data).forEach(key => {
        if (key.startsWith('fitforge_') && key !== SYNC_CONFIG_KEY) {
            if (merge) {
                // For array data (meals, workouts, water, weight_log, activity), merge by id
                const incoming = data[key];
                if (Array.isArray(incoming)) {
                    let local = [];
                    try { local = JSON.parse(localStorage.getItem(key)) || []; } catch { local = []; }
                    const merged = mergeArraysById(local, incoming);
                    localStorage.setItem(key, JSON.stringify(merged));
                } else {
                    // For non-array (user profiles, config), remote wins
                    localStorage.setItem(key, typeof incoming === 'string' ? incoming : JSON.stringify(incoming));
                }
            } else {
                localStorage.setItem(key, typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]));
            }
            count++;
        }
    });
    return count;
}

// ── Push (encrypt & upload) ───────────────────────────
async function syncPush() {
    const cfg = getSyncConfig();
    if (!cfg) { showNotification('Set up sync first', 'error'); return; }

    const statusEl = document.getElementById('syncStatus');
    if (statusEl) { statusEl.textContent = 'Merging & uploading…'; statusEl.className = 'sync-status syncing'; }

    try {
        const filePath = cfg.owner + '/' + cfg.repo + '/contents/' + cfg.filePath;

        // Pull existing cloud data first and merge into local
        const existing = await githubGet(filePath, cfg.token);
        const sha = existing ? existing.sha : undefined;

        if (existing && existing.content) {
            try {
                const b64raw = existing.content.replace(/\n/g, '');
                const cloudEncrypted = atob(b64raw);
                const cloudJson = await decryptData(cloudEncrypted, cfg.passphrase);
                const cloudData = JSON.parse(cloudJson);
                // Merge cloud into local (so local has everything)
                restoreAllData(cloudData, true);
            } catch (e) { /* If decrypt fails, just push local — could be first time or passphrase changed */ }
        }

        // Now collect the merged local data and push
        const allData  = collectAllData();
        const json     = JSON.stringify(allData);
        const encrypted = await encryptData(json, cfg.passphrase);

        await githubPut(filePath, cfg.token, encrypted, sha, 'FitForge sync ' + new Date().toISOString().slice(0, 19));

        cfg.lastPush = new Date().toISOString();
        saveSyncConfig(cfg);

        if (statusEl) { statusEl.textContent = 'Synced! ' + new Date().toLocaleTimeString(); statusEl.className = 'sync-status success'; }
        showNotification('Data pushed to cloud!', 'success');
    } catch (err) {
        if (statusEl) { statusEl.textContent = 'Push failed: ' + err.message; statusEl.className = 'sync-status error'; }
        showNotification('Sync push failed: ' + err.message, 'error');
    }
}

// ── Pull (download & decrypt) ─────────────────────────
async function syncPull() {
    const cfg = getSyncConfig();
    if (!cfg) { showNotification('Set up sync first', 'error'); return; }

    const statusEl = document.getElementById('syncStatus');
    if (statusEl) { statusEl.textContent = 'Downloading & decrypting…'; statusEl.className = 'sync-status syncing'; }

    try {
        const filePath = cfg.owner + '/' + cfg.repo + '/contents/' + cfg.filePath;
        const existing = await githubGet(filePath, cfg.token);

        if (!existing || !existing.content) {
            if (statusEl) { statusEl.textContent = 'No cloud data found. Push first!'; statusEl.className = 'sync-status error'; }
            showNotification('No cloud data found', 'error');
            return;
        }

        const b64raw = existing.content.replace(/\n/g, '');
        const encrypted = atob(b64raw);  // GitHub returns base64-encoded file content
        const decrypted = await decryptData(encrypted, cfg.passphrase);
        const data = JSON.parse(decrypted);

        const count = restoreAllData(data, true); // merge mode

        // Re-apply current user if available
        if (data['fitforge_current_user']) {
            localStorage.setItem('fitforge_current_user', JSON.stringify(data['fitforge_current_user']));
        }

        cfg.lastPull = new Date().toISOString();
        saveSyncConfig(cfg);

        if (statusEl) { statusEl.textContent = 'Pulled ' + count + ' entries! Refreshing…'; statusEl.className = 'sync-status success'; }
        showNotification('Data pulled! Refreshing…', 'success');
        setTimeout(() => location.reload(), 1200);
    } catch (err) {
        if (statusEl) { statusEl.textContent = 'Pull failed: ' + err.message; statusEl.className = 'sync-status error'; }
        showNotification('Sync pull failed: ' + err.message, 'error');
    }
}

// ── Setup modal ───────────────────────────────────────
function openSyncSetup() {
    const cfg = getSyncConfig();
    if (cfg) {
        document.getElementById('syncToken').value = cfg.token || '';
        document.getElementById('syncOwner').value = cfg.owner || '';
        document.getElementById('syncRepo').value  = cfg.repo  || '';
        document.getElementById('syncFile').value   = cfg.filePath || 'fitforge-data.enc';
        document.getElementById('syncPass').value   = cfg.passphrase || '';
    }
    document.getElementById('syncModal').classList.remove('hidden');
}

function closeSyncSetup() {
    document.getElementById('syncModal').classList.add('hidden');
}

function saveSyncSetup() {
    const token = document.getElementById('syncToken').value.trim();
    const owner = document.getElementById('syncOwner').value.trim();
    const repo  = document.getElementById('syncRepo').value.trim();
    const file  = document.getElementById('syncFile').value.trim() || 'fitforge-data.enc';
    const pass  = document.getElementById('syncPass').value;

    if (!token || !owner || !repo || !pass) {
        showNotification('All fields except filename are required', 'error');
        return;
    }

    saveSyncConfig({ token, owner, repo, filePath: file, passphrase: pass });
    closeSyncSetup();
    showNotification('Sync configured!', 'success');
    updateSyncUI();
}

function updateSyncUI() {
    const cfg = getSyncConfig();
    const badge = document.getElementById('syncConfigured');
    if (badge) {
        if (cfg && cfg.token) {
            badge.innerHTML = '✅ Connected to <strong>' + cfg.owner + '/' + cfg.repo + '</strong>';
            badge.style.display = '';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Init on load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('syncConfigured')) updateSyncUI();
});
