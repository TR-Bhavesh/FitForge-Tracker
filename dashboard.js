// ─── Dashboard ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateUserDisplay();
    loadDashboardData();
    drawVitruvianBody();
    displayBodyStats();
});

/* ════════════════════════════════════════════════
   3D ANATOMICAL BODY — Three.js
   Realistic humanoid built from smooth geometry
   Gender-aware · BMI-responsive · Interactive orbit
   ════════════════════════════════════════════════ */
let bodyScene, bodyCamera, bodyRenderer, bodyControls, bodyModel;

function drawVitruvianBody() {
    const container = document.getElementById('bodyDisplayContainer');
    const canvas = document.getElementById('bodyCanvas3D');
    if (!container || !canvas) return;

    const gender   = currentUser.gender || 'male';
    const weight   = currentUser.weight || 160;
    const heightCm = currentUser.height || 170;
    const heightIn = heightCm / 2.54;
    const bmi      = calculateBMIValue(weight, heightIn);
    const isMale   = gender !== 'female';

    // BMI → body scale factor
    let fatScale;
    if (bmi < 18.5)      fatScale = 0.82;
    else if (bmi < 22)   fatScale = 0.90;
    else if (bmi < 25)   fatScale = 1.0;
    else if (bmi < 28)   fatScale = 1.12;
    else if (bmi < 32)   fatScale = 1.26;
    else                  fatScale = 1.42;

    // Cleanup previous render
    if (bodyRenderer) {
        bodyRenderer.dispose();
        if (bodyControls) bodyControls.dispose();
        bodyControls = null;
    }

    // Scene
    bodyScene = new THREE.Scene();

    // Camera
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 520;
    bodyCamera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    bodyCamera.position.set(0, 1.0, 5.5);

    // Renderer
    bodyRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    bodyRenderer.setSize(w, h);
    bodyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bodyRenderer.setClearColor(0x000000, 0);
    bodyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    bodyRenderer.toneMappingExposure = 1.1;

    // Orbit controls (with fallback if OrbitControls CDN fails)
    try {
        bodyControls = new THREE.OrbitControls(bodyCamera, canvas);
        bodyControls.enableDamping = true;
        bodyControls.dampingFactor = 0.08;
        bodyControls.enablePan = false;
        bodyControls.minDistance = 3;
        bodyControls.maxDistance = 10;
        bodyControls.target.set(0, 0.9, 0);
    } catch (e) {
        bodyControls = null;
    }

    // Lighting
    const amb = new THREE.AmbientLight(0xc8a55a, 0.5);
    bodyScene.add(amb);
    const key = new THREE.DirectionalLight(0xffeedd, 1.8);
    key.position.set(3, 5, 4);
    bodyScene.add(key);
    const fill = new THREE.DirectionalLight(0x8899bb, 0.6);
    fill.position.set(-3, 3, -2);
    bodyScene.add(fill);
    const rim = new THREE.DirectionalLight(0xc8a05a, 0.5);
    rim.position.set(0, 2, -5);
    bodyScene.add(rim);
    const top = new THREE.DirectionalLight(0xffffff, 0.3);
    top.position.set(0, 8, 0);
    bodyScene.add(top);

    // Skin material — subsurface-look
    const skinColor = isMale ? 0xd4a574 : 0xe0b090;
    const skinMat = new THREE.MeshStandardMaterial({
        color: skinColor,
        roughness: 0.55,
        metalness: 0.02,
        emissive: skinColor,
        emissiveIntensity: 0.04,
    });
    const darkMat = new THREE.MeshStandardMaterial({
        color: 0x2a2e3a,
        roughness: 0.7,
        metalness: 0.0,
    });
    const hairColor = isMale ? 0x3a2a1a : 0x2a1a0a;
    const hairMat = new THREE.MeshStandardMaterial({
        color: hairColor,
        roughness: 0.8,
        metalness: 0.0,
    });

    // Build body group
    bodyModel = new THREE.Group();

    // Helper: create capsule-like body part (elongated sphere)
    function limb(rx, ry, rz, px, py, pz, rotX, rotZ) {
        const geo = new THREE.SphereGeometry(1, 24, 16);
        geo.scale(rx, ry, rz);
        const mesh = new THREE.Mesh(geo, skinMat);
        mesh.position.set(px, py, pz);
        if (rotX) mesh.rotation.x = rotX;
        if (rotZ) mesh.rotation.z = rotZ;
        return mesh;
    }

    // Gender body proportion adjustments
    const sW = isMale ? 1.0 : 0.82;   // shoulders
    const hW = isMale ? 1.0 : 1.18;   // hips
    const wW = isMale ? 1.0 : 0.92;   // waist
    const cW = isMale ? 1.12 : 1.0;   // chest prominence
    const aW = isMale ? 1.0 : 0.80;   // arm thickness

    const f = fatScale;

    // ═══ HEAD ═══
    const head = limb(0.25, 0.30, 0.26, 0, 2.25, 0);
    bodyModel.add(head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(1, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55);
    hairGeo.scale(0.265, 0.28, 0.27);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 2.34, -0.01);
    bodyModel.add(hair);
    if (!isMale) {
        // Longer hair sides
        const hairSideGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.6, 8);
        [-1, 1].forEach(side => {
            const hs = new THREE.Mesh(hairSideGeo, hairMat);
            hs.position.set(side * 0.22, 2.05, -0.05);
            hs.rotation.z = side * 0.15;
            bodyModel.add(hs);
        });
    }

    // Eyes (simplified)
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
    [-1, 1].forEach(side => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), eyeMat);
        eye.position.set(side * 0.085, 2.27, 0.22);
        bodyModel.add(eye);
    });

    // ═══ NECK ═══
    const neck = limb(0.1 * f, 0.12, 0.09 * f, 0, 1.97, 0);
    bodyModel.add(neck);

    // ═══ TORSO ═══
    // Upper chest / trapezius zone
    const upperChest = limb(0.42 * sW * f, 0.18, 0.22 * cW * f, 0, 1.82, 0);
    bodyModel.add(upperChest);

    // Mid chest
    const midChest = limb(0.40 * sW * f, 0.16, 0.20 * cW * f, 0, 1.65, 0);
    bodyModel.add(midChest);

    // Ribcage
    const ribs = limb(0.35 * wW * f, 0.14, 0.18 * f, 0, 1.48, 0);
    bodyModel.add(ribs);

    // Waist / abdomen
    const waist = limb(0.28 * wW * f, 0.14, 0.16 * f, 0, 1.32, 0);
    bodyModel.add(waist);

    // Pelvis / hips
    const pelvis = limb(0.34 * hW * f, 0.16, 0.18 * f, 0, 1.14, 0);
    bodyModel.add(pelvis);

    // ═══ PECTORALS (males) / BUST (females) ═══
    if (isMale && bmi < 30) {
        [-1, 1].forEach(side => {
            const pec = limb(0.17 * f, 0.08, 0.10 * f, side * 0.16, 1.72, 0.10);
            bodyModel.add(pec);
        });
    } else if (!isMale) {
        [-1, 1].forEach(side => {
            const bust = limb(0.13 * f, 0.10, 0.11 * f, side * 0.14, 1.68, 0.12);
            bodyModel.add(bust);
        });
    }

    // ═══ SHOULDERS / DELTOIDS ═══
    [-1, 1].forEach(side => {
        const delt = limb(0.16 * aW * f, 0.12, 0.14 * aW * f, side * 0.44 * sW * f, 1.80, 0);
        bodyModel.add(delt);
    });

    // ═══ ARMS ═══
    [-1, 1].forEach(side => {
        const sx = side * 0.52 * sW * f;

        // Upper arm (bicep/tricep)
        const ua = limb(0.10 * aW * f, 0.20, 0.10 * aW * f, sx, 1.58, 0);
        bodyModel.add(ua);

        // Elbow joint
        const elbow = limb(0.085 * aW * f, 0.06, 0.085 * aW * f, sx, 1.40, 0);
        bodyModel.add(elbow);

        // Forearm
        const fa = limb(0.08 * aW * f, 0.18, 0.08 * aW * f, sx, 1.22, 0);
        bodyModel.add(fa);

        // Wrist
        const wrist = limb(0.055, 0.04, 0.04, sx, 1.05, 0);
        bodyModel.add(wrist);

        // Hand (flat box-like)
        const handGeo = new THREE.BoxGeometry(0.09, 0.14, 0.04);
        const handEdges = new THREE.Mesh(handGeo, skinMat);
        handEdges.position.set(sx, 0.92, 0);
        bodyModel.add(handEdges);

        // Fingers
        for (let fi = 0; fi < 4; fi++) {
            const fGeo = new THREE.CylinderGeometry(0.012, 0.010, 0.08, 6);
            const finger = new THREE.Mesh(fGeo, skinMat);
            finger.position.set(sx - 0.03 + fi * 0.02, 0.82, 0);
            bodyModel.add(finger);
        }
        // Thumb
        const thumbGeo = new THREE.CylinderGeometry(0.014, 0.011, 0.06, 6);
        const thumb = new THREE.Mesh(thumbGeo, skinMat);
        thumb.position.set(sx + side * 0.05, 0.88, 0.02);
        thumb.rotation.z = side * 0.5;
        bodyModel.add(thumb);
    });

    // ═══ SHORTS / UNDERWEAR ═══
    const shortsGeo = new THREE.CylinderGeometry(0.34 * hW * f, 0.32 * hW * f, 0.22, 16);
    const shorts = new THREE.Mesh(shortsGeo, darkMat);
    shorts.position.set(0, 1.06, 0);
    bodyModel.add(shorts);

    // ═══ LEGS ═══
    [-1, 1].forEach(side => {
        const lx = side * 0.18 * hW * f;

        // Upper thigh / glute connection
        const ut = limb(0.15 * hW * f, 0.12, 0.14 * f, lx, 0.98, 0);
        bodyModel.add(ut);

        // Thigh
        const thigh = limb(0.14 * hW * f, 0.22, 0.14 * f, lx, 0.76, 0);
        bodyModel.add(thigh);

        // Lower thigh / quad
        const quad = limb(0.12 * f, 0.16, 0.12 * f, lx, 0.56, 0);
        bodyModel.add(quad);

        // Knee joint
        const knee = limb(0.09 * f, 0.06, 0.09 * f, lx, 0.42, 0);
        bodyModel.add(knee);

        // Calf
        const calf = limb(0.10 * f, 0.18, 0.09 * f, lx, 0.26, 0);
        bodyModel.add(calf);

        // Lower calf / shin
        const shin = limb(0.07 * f, 0.12, 0.07 * f, lx, 0.12, 0);
        bodyModel.add(shin);

        // Ankle
        const ankle = limb(0.055, 0.04, 0.05, lx, 0.02, 0);
        bodyModel.add(ankle);

        // Foot
        const footGeo = new THREE.BoxGeometry(0.10, 0.05, 0.22);
        const edges = new THREE.Mesh(footGeo, skinMat);
        edges.position.set(lx, -0.02, 0.06);
        // Rounded edges
        bodyModel.add(edges);
    });

    // ═══ ABDOMINAL DETAIL (fit bodies only) ═══
    if (isMale && bmi < 27) {
        const detailMat = new THREE.MeshStandardMaterial({
            color: skinColor,
            roughness: 0.6,
            metalness: 0.01,
            emissive: 0x000000,
        });
        // Ab bumps (3 rows × 2)
        for (let row = 0; row < 3; row++) {
            [-1, 1].forEach(side => {
                const ab = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), detailMat);
                ab.position.set(side * 0.06, 1.42 - row * 0.09, 0.15);
                ab.scale.set(1, 0.8, 0.5);
                bodyModel.add(ab);
            });
        }
    }

    bodyScene.add(bodyModel);

    // Subtle ground shadow
    const shadowGeo = new THREE.PlaneGeometry(1.5, 1.5);
    const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.2,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.05;
    bodyScene.add(shadow);

    // BMI overlay badge
    const bmiCat = getBMICategory(bmi);
    const overlay = document.getElementById('bodyOverlayInfo');
    if (overlay) {
        overlay.innerHTML = `
            <span class="bmi-badge-3d" style="background:${bmiCat.color}22;color:${bmiCat.color};border:1px solid ${bmiCat.color}44">${bmiCat.text} · BMI ${bmi.toFixed(1)}</span>
            <span class="weight-badge-3d">${weight} lbs · ${(weight * 0.453592).toFixed(1)} kg</span>
        `;
    }

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        if (bodyControls) bodyControls.update();

        // Slow idle rotation
        if (bodyModel) {
            bodyModel.rotation.y += 0.002;
        }

        bodyRenderer.render(bodyScene, bodyCamera);
    }
    animate();

    // Responsive resize
    const resizeObs = new ResizeObserver(() => {
        const nw = container.clientWidth;
        const nh = container.clientHeight || 520;
        bodyCamera.aspect = nw / nh;
        bodyCamera.updateProjectionMatrix();
        bodyRenderer.setSize(nw, nh);
    });
    resizeObs.observe(container);
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
