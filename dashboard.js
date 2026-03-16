// ─── Dashboard ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateUserDisplay();
    loadDashboardData();
    drawVitruvianBody();
    displayBodyStats();

    // Mobile tooltip toggle (tap to show/hide)
    document.querySelectorAll('.stat-row.has-tooltip').forEach(function(row) {
        row.addEventListener('click', function() {
            var tip = row.querySelector('.stat-tooltip');
            if (!tip) return;
            var isOpen = tip.style.display === 'block';
            document.querySelectorAll('.stat-tooltip').forEach(function(t) { t.style.display = ''; });
            if (!isOpen) tip.style.display = 'block';
        });
    });
});

/* ════════════════════════════════════════════════
   3D ANATOMICAL BODY — Three.js  (LatheGeometry)
   Smooth revolution surfaces · Gender-aware · BMI-responsive
   ════════════════════════════════════════════════ */
let bodyScene, bodyCamera, bodyRenderer, bodyControls, bodyModel;

function drawVitruvianBody() {
    const container = document.getElementById('bodyDisplayContainer');
    const canvas    = document.getElementById('bodyCanvas3D');
    if (!container || !canvas) return;

    const gender   = currentUser.gender || 'male';
    const weight   = currentUser.weight || 160;
    const heightCm = currentUser.height || 170;
    const heightIn = heightCm / 2.54;
    const bmi      = calculateBMIValue(weight, heightIn);
    const isMale   = gender !== 'female';

    let fatScale;
    if (bmi < 18.5)      fatScale = 0.82;
    else if (bmi < 22)   fatScale = 0.90;
    else if (bmi < 25)   fatScale = 1.0;
    else if (bmi < 28)   fatScale = 1.12;
    else if (bmi < 32)   fatScale = 1.26;
    else                  fatScale = 1.42;

    if (bodyRenderer) { bodyRenderer.dispose(); if (bodyControls) bodyControls.dispose(); bodyControls = null; }

    bodyScene = new THREE.Scene();

    const w = container.clientWidth  || 400;
    const h = container.clientHeight || 520;
    bodyCamera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
    bodyCamera.position.set(0, 0.9, 6);

    bodyRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    bodyRenderer.setSize(w, h);
    bodyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bodyRenderer.setClearColor(0x000000, 0);
    bodyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    bodyRenderer.toneMappingExposure = 1.15;

    try {
        bodyControls = new THREE.OrbitControls(bodyCamera, canvas);
        bodyControls.enableDamping = true; bodyControls.dampingFactor = 0.08;
        bodyControls.enablePan = false; bodyControls.minDistance = 3; bodyControls.maxDistance = 10;
        bodyControls.target.set(0, 0.9, 0);
    } catch(e) { bodyControls = null; }

    // Lighting
    bodyScene.add(new THREE.AmbientLight(0xffeedd, 0.55));
    const keyL = new THREE.DirectionalLight(0xfff0dd, 1.6); keyL.position.set(3, 5, 4); bodyScene.add(keyL);
    const fillL = new THREE.DirectionalLight(0x8899bb, 0.5); fillL.position.set(-3, 3, -2); bodyScene.add(fillL);
    const rimL = new THREE.DirectionalLight(0xddb87a, 0.45); rimL.position.set(0, 2, -5); bodyScene.add(rimL);
    const topL = new THREE.DirectionalLight(0xffffff, 0.25); topL.position.set(0, 8, 0); bodyScene.add(topL);

    // Materials
    const skinColor = isMale ? 0xd4a574 : 0xe0b090;
    const skin = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.5, metalness: 0.02, emissive: skinColor, emissiveIntensity: 0.03 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x2a2e3a, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: isMale ? 0x3a2a1a : 0x2a1a0a, roughness: 0.75 });
    const eyeMat  = new THREE.MeshStandardMaterial({ color: 0x191919, roughness: 0.3 });

    bodyModel = new THREE.Group();
    const f = fatScale;
    const sW = isMale ? 1.0 : 0.84;
    const hW = isMale ? 1.0 : 1.16;
    const wW = isMale ? 1.0 : 0.92;
    const cW = isMale ? 1.10 : 1.0;
    const aW = isMale ? 1.0 : 0.82;

    /* ── Helper: LatheGeometry body part ──
       Takes an array of [radius, y] points, creates a smooth revolution surface */
    function lathePart(profile, mat, px, py, pz, sx, sy, sz) {
        const pts = profile.map(p => new THREE.Vector2(p[0], p[1]));
        const geo = new THREE.LatheGeometry(pts, 32);
        const m   = new THREE.Mesh(geo, mat || skin);
        m.position.set(px || 0, py || 0, pz || 0);
        if (sx || sy || sz) m.scale.set(sx || 1, sy || 1, sz || 1);
        return m;
    }

    // ═══ HEAD ═══
    const headGeo = new THREE.SphereGeometry(0.26, 32, 24);
    headGeo.scale(1, 1.18, 1.02);
    const head = new THREE.Mesh(headGeo, skin);
    head.position.set(0, 2.28, 0);
    bodyModel.add(head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.275, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 2.38, -0.01);
    bodyModel.add(hair);
    if (!isMale) {
        const hsg = new THREE.CylinderGeometry(0.055, 0.035, 0.65, 10);
        [-1, 1].forEach(s => { const h2 = new THREE.Mesh(hsg, hairMat); h2.position.set(s*0.22, 2.05, -0.04); h2.rotation.z = s*0.12; bodyModel.add(h2); });
    }

    // Eyes
    [-1,1].forEach(s => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), eyeMat); e.position.set(s*0.09, 2.30, 0.22); bodyModel.add(e); });

    // ═══ NECK (smooth cylinder) ═══
    const neckProf = [[0, 0], [0.09*f, 0], [0.10*f, 0.04], [0.10*f, 0.10], [0.09*f, 0.14], [0, 0.14]];
    bodyModel.add(lathePart(neckProf, skin, 0, 1.88, 0));

    // ═══ TORSO (single smooth lathe) ═══
    const tw = 0.32 * sW * f;    // top width (shoulders)
    const cWid = 0.34 * cW * f;  // chest
    const rWid = 0.28 * wW * f;  // ribs
    const waW  = 0.24 * wW * f;  // waist
    const pWid = 0.30 * hW * f;  // pelvis
    const torsoProfile = [
        [0, 0],
        [tw*0.7, 0.01],    // collar
        [tw, 0.06],         // shoulder width
        [cWid, 0.16],       // upper chest
        [cWid*0.98, 0.28],  // mid chest
        [rWid, 0.40],       // ribs
        [waW, 0.52],        // waist (narrowest)
        [waW*1.02, 0.58],   // lower abs
        [pWid*0.9, 0.66],   // upper pelvis
        [pWid, 0.72],       // hip widest
        [pWid*0.85, 0.78],  // lower pelvis
        [0, 0.78],
    ];
    bodyModel.add(lathePart(torsoProfile, skin, 0, 1.10, 0));

    // Pec/bust overlay
    if (isMale && bmi < 30) {
        [-1,1].forEach(s => {
            const pg = new THREE.SphereGeometry(0.10 * f, 16, 12);
            pg.scale(1.4, 0.7, 0.8);
            const pm = new THREE.Mesh(pg, skin);
            pm.position.set(s * 0.14, 1.72, 0.14 * cW * f);
            bodyModel.add(pm);
        });
    } else if (!isMale) {
        [-1,1].forEach(s => {
            const bg = new THREE.SphereGeometry(0.11 * f, 16, 12);
            bg.scale(1.1, 1.0, 0.9);
            const bm = new THREE.Mesh(bg, skin);
            bm.position.set(s * 0.12, 1.66, 0.14 * f);
            bodyModel.add(bm);
        });
    }

    // ═══ SHORTS ═══
    const shortsProf = [
        [0, 0], [pWid*1.02, 0.01], [pWid*0.98, 0.08], [pWid*0.86, 0.18], [0, 0.18]
    ];
    bodyModel.add(lathePart(shortsProf, dark, 0, 1.04, 0));

    // ═══ ARMS (each arm is a smooth lathe) ═══
    [-1, 1].forEach(side => {
        const sx = side * (tw + 0.12) * sW;
        const armR = 0.075 * aW * f;

        // Shoulder cap (smooth sphere)
        const dGeo = new THREE.SphereGeometry(0.12 * aW * f, 20, 16);
        dGeo.scale(1.2, 0.9, 1.1);
        const delt = new THREE.Mesh(dGeo, skin);
        delt.position.set(sx, 1.84, 0);
        bodyModel.add(delt);

        // Arm profile (shoulder → hand)
        const armProf = [
            [0, 0],
            [armR*1.2, 0.01],  // deltoid base
            [armR*1.3, 0.08],  // bicep peak
            [armR*1.1, 0.20],  // mid upper arm
            [armR*0.85, 0.30], // elbow
            [armR*1.0, 0.38],  // forearm bulge
            [armR*0.85, 0.52], // mid forearm
            [armR*0.6, 0.62],  // wrist
            [armR*0.55, 0.64], // wrist base
            [0, 0.64],
        ];
        const arm = lathePart(armProf, skin, sx, 1.20, 0);
        bodyModel.add(arm);

        // Hand
        const handGeo = new THREE.BoxGeometry(0.08, 0.12, 0.04, 2, 2, 2);
        const hand = new THREE.Mesh(handGeo, skin);
        hand.position.set(sx, 0.94, 0);
        bodyModel.add(hand);

        // Fingers (4 + thumb)
        for (let fi = 0; fi < 4; fi++) {
            const fg = new THREE.CylinderGeometry(0.011, 0.009, 0.07, 6);
            const finger = new THREE.Mesh(fg, skin);
            finger.position.set(sx - 0.025 + fi * 0.018, 0.85, 0);
            bodyModel.add(finger);
        }
        const tg = new THREE.CylinderGeometry(0.013, 0.010, 0.055, 6);
        const thumb = new THREE.Mesh(tg, skin);
        thumb.position.set(sx + side * 0.045, 0.90, 0.02);
        thumb.rotation.z = side * 0.5;
        bodyModel.add(thumb);
    });

    // ═══ LEGS (smooth lathe per leg) ═══
    [-1, 1].forEach(side => {
        const lx = side * 0.16 * hW * f;
        const legR = 0.12 * hW * f;

        const legProf = [
            [0, 0],
            [legR*1.3, 0.01],  // upper thigh
            [legR*1.25, 0.10], // thigh
            [legR*1.1, 0.22],  // mid thigh
            [legR*0.9, 0.35],  // above knee
            [legR*0.75, 0.40], // knee
            [legR*0.85, 0.48], // calf peak
            [legR*0.7, 0.60],  // mid calf
            [legR*0.5, 0.72],  // shin
            [legR*0.38, 0.80], // ankle
            [legR*0.35, 0.82], // ankle base
            [0, 0.82],
        ];
        bodyModel.add(lathePart(legProf, skin, lx, 0.18, 0));

        // Foot
        const footGeo = new THREE.BoxGeometry(0.10, 0.045, 0.22, 2, 1, 2);
        const foot = new THREE.Mesh(footGeo, skin);
        foot.position.set(lx, 0.00, 0.06);
        bodyModel.add(foot);
    });

    // ═══ ABS detail (fit males) ═══
    if (isMale && bmi < 26) {
        for (let row = 0; row < 3; row++) {
            [-1, 1].forEach(s => {
                const ab = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 10), skin);
                ab.position.set(s * 0.055, 1.44 - row * 0.08, 0.18 * wW * f);
                ab.scale.set(1, 0.75, 0.4);
                bodyModel.add(ab);
            });
        }
    }

    bodyScene.add(bodyModel);

    // Ground shadow
    const shMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 });
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), shMat);
    sh.rotation.x = -Math.PI / 2; sh.position.y = -0.04;
    bodyScene.add(sh);

    // Overlay badges
    const bmiCat = getBMICategory(bmi);
    const overlay = document.getElementById('bodyOverlayInfo');
    if (overlay) {
        overlay.innerHTML = '<span class="bmi-badge-3d" style="background:' + bmiCat.color + '22;color:' + bmiCat.color + ';border:1px solid ' + bmiCat.color + '44">' + bmiCat.text + ' &middot; BMI ' + bmi.toFixed(1) + '</span>' +
            '<span class="weight-badge-3d">' + weight + ' lbs &middot; ' + (weight*0.453592).toFixed(1) + ' kg</span>';
    }

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        if (bodyControls) bodyControls.update();
        if (bodyModel) bodyModel.rotation.y += 0.002;
        bodyRenderer.render(bodyScene, bodyCamera);
    }
    animate();

    // Responsive resize (use fixed container height to prevent feedback loop)
    const ro = new ResizeObserver(() => {
        const nw = container.clientWidth;
        const nh = container.offsetHeight || 520;
        if (nw > 0 && nh > 0) {
            bodyCamera.aspect = nw / nh;
            bodyCamera.updateProjectionMatrix();
            bodyRenderer.setSize(nw, nh, false);
        }
    });
    ro.observe(container);
}

/* ════════════════════════════════════════════════
   Body Stats Panel
   ════════════════════════════════════════════════ */
function displayBodyStats() {
    const w = currentUser.weight || 160;
    const h = currentUser.height || 170;
    const hIn = h / 2.54;
    const bmi = calculateBMIValue(w, hIn);
    const cat = getBMICategory(bmi);
    const age = currentUser.age || 25;
    const gender = currentUser.gender || 'male';
    const wKg = w * 0.453592;

    document.getElementById('displayWeight').textContent = w.toFixed(1) + ' lbs (' + wKg.toFixed(1) + ' kg)';
    document.getElementById('displayHeight').textContent = h + ' cm (' + Math.floor(hIn / 12) + "'" + Math.round(hIn % 12) + '")';
    document.getElementById('displayBMI').textContent = bmi.toFixed(1);
    document.getElementById('displayBodyType').textContent = cat.text;
    document.getElementById('displayBodyType').style.color = cat.color;

    // Body fat estimate (CUN-BAE formula — more accurate than Navy method for estimate-only)
    let bf;
    if (gender === 'male') {
        bf = -44.988 + (0.503 * age) + (10.689 * bmi / 10) + (3.172 * 1);
        bf = (1.20 * bmi) + (0.23 * age) - 16.2; // Deurenberg simplified
    } else {
        bf = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
    bf = Math.max(5, Math.min(bf, 55));
    document.getElementById('displayBodyFat').textContent = bf.toFixed(1) + '%';

    // BMR (Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * wKg + 6.25 * h - 5 * age + 5;
    } else {
        bmr = 10 * wKg + 6.25 * h - 5 * age - 161;
    }
    document.getElementById('displayBMR').textContent = Math.round(bmr) + ' kcal';

    // TDEE
    const activity = currentUser.activityLevel || 1.55;
    const tdee = Math.round(bmr * activity);
    document.getElementById('displayTDEE').textContent = tdee + ' kcal';

    // Ideal weight (Devine formula)
    let ideal;
    if (gender === 'male') {
        ideal = 50 + 2.3 * (hIn - 60);
    } else {
        ideal = 45.5 + 2.3 * (hIn - 60);
    }
    const idealLbs = ideal / 0.453592;
    document.getElementById('displayIdealWeight').textContent = Math.round(ideal) + ' kg (' + Math.round(idealLbs) + ' lbs)';
}

/* ════════════════════════════════════════════════
   Profile Modal
   ════════════════════════════════════════════════ */
function openProfileUpdate() {
    document.getElementById('updateWeight').value = currentUser.weight;
    document.getElementById('updateHeight').value = currentUser.height;
    document.getElementById('updateAge').value = currentUser.age;
    document.getElementById('updateGender').value = currentUser.gender;
    document.getElementById('updateActivity').value = currentUser.activityLevel || 1.55;
    document.getElementById('profileModal').classList.remove('hidden');
}
function closeProfileUpdate() { document.getElementById('profileModal').classList.add('hidden'); }

function saveProfileUpdate() {
    const nw = parseFloat(document.getElementById('updateWeight').value);
    const nh = parseFloat(document.getElementById('updateHeight').value);
    const na = parseInt(document.getElementById('updateAge').value);
    const ng = document.getElementById('updateGender').value;
    const nact = parseFloat(document.getElementById('updateActivity').value);

    if (!nw || !nh || !na) { showNotification('Please fill in all fields', 'error'); return; }

    if (nw !== currentUser.weight) {
        let wh = loadUserData('weight_log') || [];
        wh = wh.filter(w => w.date !== getTodayDate());
        wh.push({ id: Date.now(), date: getTodayDate(), weight: nw, timestamp: new Date().toISOString() });
        wh.sort((a, b) => new Date(a.date) - new Date(b.date));
        saveUserData('weight_log', wh);
    }

    Object.assign(currentUser, { weight: nw, height: nh, age: na, gender: ng, activityLevel: nact });
    localStorage.setItem('fitforge_current_user', JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) { users[idx] = currentUser; localStorage.setItem('fitforge_users', JSON.stringify(users)); }

    drawVitruvianBody();
    displayBodyStats();
    loadDashboardData();
    closeProfileUpdate();
    showNotification('Profile updated successfully!');
}

/* ════════════════════════════════════════════════
   Dashboard Data & Progress
   ════════════════════════════════════════════════ */
function loadDashboardData() {
    const today = getTodayDate();

    // Diet
    const dietData = getDataForDate('meals', today);
    let totalCal = 0, totalPro = 0, totalCarbs = 0, totalFat = 0;
    dietData.forEach(m => {
        totalCal  += m.calories * m.quantity;
        totalPro  += (m.protein || 0) * m.quantity;
        totalCarbs += (m.carbs || 0) * m.quantity;
        totalFat  += (m.fat || 0) * m.quantity;
    });

    // Workouts
    const workoutData = getDataForDate('workouts', today);
    let burned = 0, wMin = 0;
    workoutData.forEach(w => { burned += w.caloriesBurned || 0; wMin += w.duration || 0; });

    // Water
    const waterData = getDataForDate('water', today);
    let water = 0;
    waterData.forEach(e => { water += e.amount; });

    // Streak
    const streak = calculateStreak();

    // Net calories
    const net = totalCal - burned;

    // Stats cards
    document.getElementById('todayCalories').textContent  = net;
    document.getElementById('caloriesBurned').textContent  = burned;
    document.getElementById('waterIntake').textContent      = water;
    document.getElementById('streakDays').textContent       = streak;
    document.getElementById('workoutTime').textContent      = wMin;

    updateProgressBars(totalCal, totalPro, water, burned, wMin);
    updateFitnessScore(totalCal, totalPro, burned, water, streak, wMin);
    loadRecentActivity();

    // Pre-fill BMI inputs
    const hIn = (currentUser.height || 170) / 2.54;
    document.getElementById('bmiWeight').value = Math.round(currentUser.weight || 160);
    document.getElementById('bmiHeight').value = Math.round(hIn);
}

function calculateStreak() {
    const meals = loadUserData('meals');
    const workouts = loadUserData('workouts');
    const waterLog = loadUserData('water');
    const allDates = new Set([...meals.map(m => m.date), ...workouts.map(w => w.date), ...waterLog.map(w => w.date)]);
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        if (allDates.has(d.toISOString().split('T')[0])) streak++;
        else break;
    }
    return streak;
}

function updateProgressBars(cal, pro, water, burned, wMin) {
    const cGoal = currentUser.calorieGoal || 2000;
    const pGoal = currentUser.proteinGoal || 150;

    document.getElementById('caloriesEaten').textContent = cal;
    document.getElementById('calorieTarget').textContent = cGoal;
    document.getElementById('waterConsumed').textContent = water;
    document.getElementById('proteinEaten').textContent  = Math.round(pro);
    document.getElementById('proteinTarget').textContent = pGoal;
    document.getElementById('burnedDisplay').textContent = burned;

    document.getElementById('calorieProgress').style.width = Math.min((cal / cGoal) * 100, 100) + '%';
    document.getElementById('waterProgress').style.width   = Math.min((water / 4000) * 100, 100) + '%';
    document.getElementById('proteinProgress').style.width = Math.min((pro / pGoal) * 100, 100) + '%';
    document.getElementById('burnedProgress').style.width  = Math.min((burned / 500) * 100, 100) + '%';
    document.getElementById('workoutProgress').style.width = Math.min((wMin / 60) * 100, 100) + '%';
}

/* ════════════════════════════════════════════════
   Fitness Score (0-100)
   ════════════════════════════════════════════════ */
function updateFitnessScore(cal, pro, burned, water, streak, wMin) {
    const cGoal = currentUser.calorieGoal || 2000;
    const pGoal = currentUser.proteinGoal || 150;

    // Nutrition: How close to calorie goal (penalty for over/under)
    const calRatio = cal / cGoal;
    let nutScore = calRatio <= 1 ? calRatio * 100 : Math.max(0, 100 - (calRatio - 1) * 200);
    const proRatio = Math.min(pro / pGoal, 1);
    nutScore = (nutScore * 0.6 + proRatio * 100 * 0.4);

    // Exercise
    const exScore = Math.min((wMin / 45) * 100, 100);

    // Hydration
    const hydScore = Math.min((water / 3000) * 100, 100);

    // Consistency (streak bonus)
    const conScore = Math.min(streak * 15, 100);

    const total = Math.round(nutScore * 0.3 + exScore * 0.3 + hydScore * 0.2 + conScore * 0.2);

    // Update ring
    const dashLen = 534;
    document.getElementById('scoreArc').setAttribute('stroke-dashoffset', dashLen - (dashLen * total / 100));
    document.getElementById('scoreText').textContent = total;

    // Factors
    const set = (id, val) => { document.getElementById(id).style.width = Math.round(val) + '%'; };
    set('scoreNutrition', nutScore);
    set('scoreExercise', exScore);
    set('scoreHydration', hydScore);
    set('scoreConsistency', conScore);
    document.getElementById('scoreNutVal').textContent = Math.round(nutScore);
    document.getElementById('scoreExVal').textContent = Math.round(exScore);
    document.getElementById('scoreHydVal').textContent = Math.round(hydScore);
    document.getElementById('scoreConVal').textContent = Math.round(conScore);
}

/* ════════════════════════════════════════════════
   Recent Activity
   ════════════════════════════════════════════════ */
function loadRecentActivity() {
    const meals = loadUserData('meals').slice(-5).reverse();
    const workouts = loadUserData('workouts').slice(-5).reverse();
    const combined = [...meals.map(m => ({ type: 'meal', text: `🍽️ ${m.foodName} (${Math.round(m.calories * m.quantity)} cal)`, time: m.timestamp })),
                      ...workouts.map(w => ({ type: 'workout', text: `🏋️ ${w.exercise} (${w.caloriesBurned} cal burned)`, time: w.timestamp }))]
                     .sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

    const el = document.getElementById('recentActivity');
    if (combined.length === 0) { el.innerHTML = '<p class="empty-message">No recent activity. Start tracking!</p>'; return; }

    el.innerHTML = combined.map(a => {
        const ago = timeAgo(a.time);
        return `<div class="activity-row"><span>${a.text}</span><span class="activity-time">${ago}</span></div>`;
    }).join('');
}

function timeAgo(ts) {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
}

/* ════════════════════════════════════════════════
   BMI & Calorie Calculators
   ════════════════════════════════════════════════ */
function calculateBMI() {
    const w = parseFloat(document.getElementById('bmiWeight').value);
    const h = parseFloat(document.getElementById('bmiHeight').value);
    if (!w || !h) { showNotification('Enter weight and height', 'error'); return; }

    const bmi = calculateBMIValue(w, h);
    const cat = getBMICategory(bmi);

    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = cat.text;
    document.getElementById('bmiCategory').style.color = cat.color;

    let pos;
    if (bmi < 18.5) pos = (bmi / 18.5) * 25;
    else if (bmi < 25) pos = 25 + ((bmi - 18.5) / 6.5) * 25;
    else if (bmi < 30) pos = 50 + ((bmi - 25) / 5) * 25;
    else pos = 75 + Math.min((bmi - 30) / 10, 1) * 25;

    document.getElementById('bmiIndicator').style.left = pos + '%';
    document.getElementById('bmiResult').classList.remove('hidden');
    showNotification('BMI calculated!');
}

function calculateCalories() {
    const al = document.getElementById('activityLevel').value;
    const goal = document.getElementById('calorieGoal').value;
    const { height, weight, age, gender } = currentUser;

    const daily = calculateDailyCalories(weight, height, age, gender, al, goal);
    const macros = calculateMacros(daily, parseInt(goal));

    document.getElementById('dailyCalories').textContent = daily;
    document.getElementById('proteinGoal').textContent = macros.protein;
    document.getElementById('carbsGoal').textContent = macros.carbs;
    document.getElementById('fatsGoal').textContent = macros.fats;

    Object.assign(currentUser, { calorieGoal: daily, proteinGoal: macros.protein, carbsGoal: macros.carbs, fatsGoal: macros.fats, activityLevel: parseFloat(al) });
    localStorage.setItem('fitforge_current_user', JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) { users[idx] = currentUser; localStorage.setItem('fitforge_users', JSON.stringify(users)); }

    document.getElementById('calorieResult').classList.remove('hidden');
    loadDashboardData();
    showNotification('Calorie goals updated!');
}

function estimateCalorieBurn() {
    const activity = document.getElementById('burnActivity').value;
    const dur = parseInt(document.getElementById('burnDuration').value);
    if (!dur || dur <= 0) { showNotification('Enter a valid duration', 'error'); return; }

    const met = parseFloat(activity.split('-')[1]);
    const wKg = (currentUser.weight || 160) * 0.453592;
    const burned = Math.round(met * wKg * (dur / 60));

    document.getElementById('burnCalories').textContent = burned;
    document.getElementById('burnResult').classList.remove('hidden');
    showNotification(`Estimated burn: ${burned} kcal`);
}
