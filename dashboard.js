// â”€â”€â”€ Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   3D ANATOMICAL BODY â€” Three.js
   Realistic human proportions (8-head system)
   Gender-aware Â· BMI-responsive Â· Proper anatomy
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

    // BMI-based body scaling
    let f;
    if (bmi < 18.5)      f = 0.84;
    else if (bmi < 22)   f = 0.92;
    else if (bmi < 25)   f = 1.0;
    else if (bmi < 28)   f = 1.10;
    else if (bmi < 32)   f = 1.22;
    else if (bmi < 36)   f = 1.35;
    else                  f = 1.48;

    const muscDef = bmi < 22 ? 1.0 : bmi < 26 ? 0.7 : bmi < 30 ? 0.3 : 0;

    if (bodyRenderer) { bodyRenderer.dispose(); if (bodyControls) bodyControls.dispose(); bodyControls = null; }

    bodyScene = new THREE.Scene();
    const w = container.clientWidth  || 400;
    const h = container.clientHeight || 520;
    bodyCamera = new THREE.PerspectiveCamera(28, w / h, 0.1, 100);
    bodyCamera.position.set(0, 1.0, 6.5);

    bodyRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    bodyRenderer.setSize(w, h, false);
    bodyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bodyRenderer.setClearColor(0x000000, 0);
    bodyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    bodyRenderer.toneMappingExposure = 1.2;

    try {
        bodyControls = new THREE.OrbitControls(bodyCamera, canvas);
        bodyControls.enableDamping = true; bodyControls.dampingFactor = 0.08;
        bodyControls.enablePan = false; bodyControls.minDistance = 3.5; bodyControls.maxDistance = 10;
        bodyControls.target.set(0, 1.0, 0);
    } catch(e) { bodyControls = null; }

    // 5-point lighting
    bodyScene.add(new THREE.AmbientLight(0xffeedd, 0.5));
    const keyL = new THREE.DirectionalLight(0xfff4e6, 1.5); keyL.position.set(3, 6, 5); bodyScene.add(keyL);
    const fillL = new THREE.DirectionalLight(0x8899cc, 0.45); fillL.position.set(-4, 3, -2); bodyScene.add(fillL);
    const rimL = new THREE.DirectionalLight(0xeebb88, 0.4); rimL.position.set(0, 2, -6); bodyScene.add(rimL);
    const topL = new THREE.DirectionalLight(0xffffff, 0.3); topL.position.set(0, 8, 0); bodyScene.add(topL);
    const bottomL = new THREE.DirectionalLight(0x445566, 0.15); bottomL.position.set(0, -3, 3); bodyScene.add(bottomL);

    // Materials
    const skinColor = isMale ? 0xd4a574 : 0xe0b090;
    const skin = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.55, metalness: 0.02, emissive: skinColor, emissiveIntensity: 0.02 });
    const darkSkin = new THREE.MeshStandardMaterial({ color: isMale ? 0xc49060 : 0xd0a080, roughness: 0.6 });
    const hairMat = new THREE.MeshStandardMaterial({ color: isMale ? 0x2a1a0a : 0x1a0a00, roughness: 0.8 });
    const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.3 });
    const eyeIris  = new THREE.MeshStandardMaterial({ color: 0x3a2510, roughness: 0.2 });
    const eyePupil = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.1 });
    const lipMat = new THREE.MeshStandardMaterial({ color: isMale ? 0xb87060 : 0xc06868, roughness: 0.4 });
    const shortsMat = new THREE.MeshStandardMaterial({ color: 0x1a1e2e, roughness: 0.7 });
    const shirtMat = !isMale ? new THREE.MeshStandardMaterial({ color: 0x2a1e3e, roughness: 0.6 }) : null;

    bodyModel = new THREE.Group();
    const shoulderW = isMale ? 1.0 : 0.82;
    const hipW      = isMale ? 0.88 : 1.08;
    const waistW    = isMale ? 0.88 : 0.82;
    const chestW    = isMale ? 1.08 : 0.95;
    const armSc     = isMale ? 1.0 : 0.80;
    const legSc     = isMale ? 1.0 : 1.04;

    function lathe(profile, mat, px, py, pz, sx, sy, sz) {
        var pts = profile.map(function(p) { return new THREE.Vector2(p[0], p[1]); });
        var geo = new THREE.LatheGeometry(pts, 36);
        var m = new THREE.Mesh(geo, mat || skin);
        m.position.set(px || 0, py || 0, pz || 0);
        if (sx || sy || sz) m.scale.set(sx || 1, sy || 1, sz || 1);
        return m;
    }

    // â•â•â•â•â•â• HEAD (proper skull + face features) â•â•â•â•â•â•
    var headGeo = new THREE.SphereGeometry(0.22, 36, 28);
    headGeo.scale(0.95, 1.12, 1.0);
    var headMesh = new THREE.Mesh(headGeo, skin);
    headMesh.position.set(0, 2.32, 0);
    bodyModel.add(headMesh);

    // Jaw / chin
    var jawGeo = new THREE.SphereGeometry(0.15, 24, 16);
    jawGeo.scale(isMale ? 1.0 : 0.88, 0.55, 0.85);
    var jawMesh = new THREE.Mesh(jawGeo, skin);
    jawMesh.position.set(0, 2.15, 0.03);
    bodyModel.add(jawMesh);

    // Nose
    var noseGeo = new THREE.ConeGeometry(0.025, 0.065, 8);
    var noseMesh = new THREE.Mesh(noseGeo, darkSkin);
    noseMesh.position.set(0, 2.26, 0.20);
    noseMesh.rotation.x = -0.3;
    bodyModel.add(noseMesh);
    [-1,1].forEach(function(s) {
        var ng = new THREE.SphereGeometry(0.012, 8, 6);
        var n = new THREE.Mesh(ng, darkSkin);
        n.position.set(s * 0.015, 2.24, 0.21);
        bodyModel.add(n);
    });

    // Eyes (white + iris + pupil + brow)
    [-1,1].forEach(function(s) {
        var ewg = new THREE.SphereGeometry(0.032, 14, 10); ewg.scale(1.3, 0.8, 0.6);
        var ew = new THREE.Mesh(ewg, eyeWhite); ew.position.set(s*0.075, 2.30, 0.17); bodyModel.add(ew);
        var eig = new THREE.SphereGeometry(0.018, 12, 8);
        var ei = new THREE.Mesh(eig, eyeIris); ei.position.set(s*0.075, 2.30, 0.20); bodyModel.add(ei);
        var epg = new THREE.SphereGeometry(0.009, 8, 6);
        var ep = new THREE.Mesh(epg, eyePupil); ep.position.set(s*0.075, 2.30, 0.215); bodyModel.add(ep);
        var ebg = new THREE.BoxGeometry(0.06, 0.012, 0.015);
        var eb = new THREE.Mesh(ebg, hairMat); eb.position.set(s*0.075, 2.35, 0.175); eb.rotation.z = s*-0.08; bodyModel.add(eb);
    });

    // Lips
    var ulg = new THREE.SphereGeometry(0.035, 12, 8); ulg.scale(1.0, 0.3, 0.5);
    var ulm = new THREE.Mesh(ulg, lipMat); ulm.position.set(0, 2.195, 0.18); bodyModel.add(ulm);
    var llg = new THREE.SphereGeometry(0.038, 12, 8); llg.scale(1.0, 0.35, 0.5);
    var llm = new THREE.Mesh(llg, lipMat); llm.position.set(0, 2.18, 0.175); bodyModel.add(llm);

    // Ears
    [-1,1].forEach(function(s) {
        var eg = new THREE.SphereGeometry(0.04, 10, 8); eg.scale(0.4, 1.0, 0.7);
        var ear = new THREE.Mesh(eg, darkSkin); ear.position.set(s*0.20, 2.28, 0); bodyModel.add(ear);
    });

    // Hair
    if (isMale) {
        var hg = new THREE.SphereGeometry(0.235, 28, 18, 0, Math.PI*2, 0, Math.PI*0.55);
        hg.scale(1.0, 1.15, 1.05);
        var hm = new THREE.Mesh(hg, hairMat); hm.position.set(0, 2.38, -0.01); bodyModel.add(hm);
    } else {
        var hg2 = new THREE.SphereGeometry(0.26, 28, 18, 0, Math.PI*2, 0, Math.PI*0.58);
        hg2.scale(1.05, 1.15, 1.08);
        var hm2 = new THREE.Mesh(hg2, hairMat); hm2.position.set(0, 2.38, -0.02); bodyModel.add(hm2);
        [-1,1].forEach(function(s) {
            var lg = new THREE.CylinderGeometry(0.04, 0.025, 0.55, 8);
            var lock = new THREE.Mesh(lg, hairMat); lock.position.set(s*0.21, 2.05, -0.03); lock.rotation.z = s*0.1; bodyModel.add(lock);
        });
    }

    // â•â•â•â•â•â• NECK â•â•â•â•â•â•
    var nR = isMale ? 0.085 : 0.072;
    bodyModel.add(lathe([[0,0],[nR*0.9,0.005],[nR,0.03],[nR*1.02,0.06],[nR,0.10],[nR*0.95,0.14],[nR*1.05,0.16],[0,0.16]], skin, 0, 1.93, 0));
    if (isMale) {
        var adamGeo = new THREE.SphereGeometry(0.015, 8, 6);
        var adam = new THREE.Mesh(adamGeo, skin); adam.position.set(0, 2.00, 0.08); bodyModel.add(adam);
    }

    // â•â•â•â•â•â• TORSO â•â•â•â•â•â•
    var tw = 0.30 * shoulderW * f;
    var cW2 = 0.32 * chestW * f;
    var rW = 0.26 * waistW * f;
    var waW = 0.22 * waistW * f;
    var pW = 0.28 * hipW * f;

    bodyModel.add(lathe([
        [0,0],[tw*0.65,0.01],[tw*0.90,0.04],[tw,0.08],[cW2*1.02,0.14],[cW2,0.22],[cW2*0.96,0.28],
        [rW*1.02,0.34],[rW,0.40],[waW*1.04,0.46],[waW,0.52],[waW*1.03,0.56],[pW*0.88,0.62],
        [pW*0.96,0.68],[pW,0.73],[pW*0.92,0.78],[pW*0.70,0.82],[0,0.82]
    ], skin, 0, 1.11, 0));

    // Pecs (male) / Bust (female)
    if (isMale) {
        [-1,1].forEach(function(s) {
            var pg = new THREE.SphereGeometry(0.10*f, 20, 14); pg.scale(1.35, 0.65, 0.65);
            var pm = new THREE.Mesh(pg, skin); pm.position.set(s*0.13, 1.74, 0.15*chestW*f); bodyModel.add(pm);
        });
    } else {
        [-1,1].forEach(function(s) {
            var bg = new THREE.SphereGeometry(0.10*f, 20, 14); bg.scale(1.05, 0.95, 0.85);
            var bm = new THREE.Mesh(bg, shirtMat || skin); bm.position.set(s*0.11, 1.70, 0.15*f); bodyModel.add(bm);
        });
    }

    // Abs (lean)
    if (muscDef > 0.3 && isMale) {
        for (var row = 0; row < 4; row++) {
            [-1,1].forEach(function(s) {
                var ag = new THREE.SphereGeometry(0.032*muscDef, 10, 8); ag.scale(1.1, 0.70, 0.35);
                var ab = new THREE.Mesh(ag, skin); ab.position.set(s*0.045, 1.52 - row*0.065, waW + 0.06); bodyModel.add(ab);
            });
        }
    }

    // Belly button
    var bbGeo = new THREE.SphereGeometry(0.008, 6, 4);
    var bbMesh = new THREE.Mesh(bbGeo, darkSkin); bbMesh.position.set(0, 1.38, waW + 0.02); bodyModel.add(bbMesh);

    // Clavicles
    [-1,1].forEach(function(s) {
        var cg = new THREE.CylinderGeometry(0.012, 0.010, 0.16*shoulderW, 8);
        var cl = new THREE.Mesh(cg, skin); cl.position.set(s*0.10, 1.90, 0.05); cl.rotation.z = s*1.2; cl.rotation.x = -0.2; bodyModel.add(cl);
    });

    // â•â•â•â•â•â• SHORTS â•â•â•â•â•â•
    bodyModel.add(lathe([[0,0],[pW*1.04,0.01],[pW*1.02,0.06],[pW*0.98,0.12],[pW*0.88,0.20],[pW*0.74,0.24],[0,0.24]], shortsMat, 0, 1.00, 0));

    // Female sports top
    if (!isMale) {
        bodyModel.add(lathe([[0,0],[cW2*0.95,0.01],[cW2*1.0,0.04],[cW2*1.02,0.10],[cW2*0.98,0.16],[rW*0.95,0.20],[0,0.20]], shirtMat, 0, 1.60, 0));
    }

    // â•â•â•â•â•â• ARMS â•â•â•â•â•â•
    [-1,1].forEach(function(side) {
        var sx = side * (tw + 0.10) * shoulderW;
        var ar = 0.065 * armSc * f;

        // Deltoid
        var dg = new THREE.SphereGeometry(0.10*armSc*f, 22, 16); dg.scale(1.15, 0.85, 1.05);
        var delt = new THREE.Mesh(dg, skin); delt.position.set(sx, 1.86, 0); bodyModel.add(delt);

        // Upper arm
        bodyModel.add(lathe([[0,0],[ar*1.25,0.01],[ar*1.40,0.06],[ar*1.35,0.12],[ar*1.20,0.18],[ar*1.05,0.24],[ar*0.80,0.28],[0,0.28]], skin, sx, 1.56, 0));

        // Elbow
        var eg2 = new THREE.SphereGeometry(ar*0.72, 10, 8);
        var elb = new THREE.Mesh(eg2, skin); elb.position.set(sx, 1.30, -0.01); bodyModel.add(elb);

        // Forearm
        bodyModel.add(lathe([[0,0],[ar*1.10,0.01],[ar*1.15,0.05],[ar*1.0,0.10],[ar*0.85,0.18],[ar*0.60,0.26],[ar*0.55,0.28],[0,0.28]], skin, sx, 1.02, 0));

        // Wrist
        var wg = new THREE.SphereGeometry(ar*0.52, 8, 6); wg.scale(1.2, 0.6, 1.0);
        var wr = new THREE.Mesh(wg, skin); wr.position.set(sx, 0.76, 0); bodyModel.add(wr);

        // Hand
        var palmGeo = new THREE.BoxGeometry(0.065, 0.09, 0.028, 3, 3, 1);
        var palm = new THREE.Mesh(palmGeo, skin); palm.position.set(sx, 0.68, 0); bodyModel.add(palm);

        // Fingers
        for (var fi = 0; fi < 4; fi++) {
            var fl = fi===1?0.075:fi===2?0.072:fi===0?0.065:0.058;
            var fg = new THREE.CylinderGeometry(0.009, 0.007, fl, 7);
            var finger = new THREE.Mesh(fg, skin);
            finger.position.set(sx - 0.022 + fi*0.015, 0.595 + (fi===1?-0.003:fi===3?0.005:0), 0);
            bodyModel.add(finger);
            var ftg = new THREE.SphereGeometry(0.007, 6, 4);
            var ft = new THREE.Mesh(ftg, skin);
            ft.position.set(sx - 0.022 + fi*0.015, 0.595 + (fi===1?-0.003:fi===3?0.005:0) - fl/2 - 0.003, 0);
            bodyModel.add(ft);
        }
        // Thumb
        var tGeo = new THREE.CylinderGeometry(0.011, 0.009, 0.055, 7);
        var tmesh = new THREE.Mesh(tGeo, skin); tmesh.position.set(sx + side*0.038, 0.66, 0.01); tmesh.rotation.z = side*0.45; bodyModel.add(tmesh);
        var ttGeo = new THREE.SphereGeometry(0.009, 6, 4);
        var ttmesh = new THREE.Mesh(ttGeo, skin); ttmesh.position.set(sx + side*0.055, 0.645, 0.01); bodyModel.add(ttmesh);
    });

    // â•â•â•â•â•â• LEGS â•â•â•â•â•â•
    [-1,1].forEach(function(side) {
        var lx = side * 0.14 * hipW * f;
        var lr = 0.10 * legSc * f;

        // Thigh
        bodyModel.add(lathe([[0,0],[lr*1.40,0.01],[lr*1.45,0.06],[lr*1.38,0.12],[lr*1.30,0.20],[lr*1.15,0.28],[lr*0.95,0.35],[lr*0.78,0.38],[0,0.38]], skin, lx, 0.62, 0));

        // Kneecap
        var kg = new THREE.SphereGeometry(lr*0.55, 12, 8); kg.scale(0.85, 0.7, 0.6);
        var kc = new THREE.Mesh(kg, skin); kc.position.set(lx, 0.65, 0.06*legSc*f); bodyModel.add(kc);

        // Calf
        bodyModel.add(lathe([[0,0],[lr*0.85,0.01],[lr*0.95,0.05],[lr*0.90,0.10],[lr*0.72,0.18],[lr*0.55,0.26],[lr*0.40,0.32],[lr*0.36,0.34],[0,0.34]], skin, lx, 0.28, 0));

        // Ankle bones
        [-1,1].forEach(function(ab) {
            var aGeo = new THREE.SphereGeometry(lr*0.22, 8, 6);
            var aMesh = new THREE.Mesh(aGeo, skin); aMesh.position.set(lx + ab*lr*0.35, -0.04, 0); bodyModel.add(aMesh);
        });

        // Foot (heel + midfoot + ball + toes)
        var footGrp = new THREE.Group();
        var heelGeo = new THREE.SphereGeometry(0.042, 10, 8); heelGeo.scale(0.9, 0.6, 1.1);
        var heelM = new THREE.Mesh(heelGeo, skin); heelM.position.set(0, 0, -0.03); footGrp.add(heelM);
        var midGeo = new THREE.BoxGeometry(0.08, 0.035, 0.12, 2, 1, 2);
        var midM = new THREE.Mesh(midGeo, skin); midM.position.set(0, 0, 0.04); footGrp.add(midM);
        var ballGeo = new THREE.SphereGeometry(0.042, 10, 8); ballGeo.scale(1.05, 0.5, 0.7);
        var ballM = new THREE.Mesh(ballGeo, skin); ballM.position.set(0, -0.002, 0.10); footGrp.add(ballM);
        for (var ti = 0; ti < 5; ti++) {
            var toeGeo = new THREE.SphereGeometry(ti===0?0.012:0.009-ti*0.001, 6, 4); toeGeo.scale(0.8, 0.6, 1.2);
            var toe = new THREE.Mesh(toeGeo, skin); toe.position.set(-0.025+ti*0.013, -0.005, 0.14+(ti===0?0.008:-ti*0.004)); footGrp.add(toe);
        }
        footGrp.position.set(lx, -0.05, 0.04);
        bodyModel.add(footGrp);
    });

    // Shoulder blades (back)
    if (muscDef > 0.2) {
        [-1,1].forEach(function(s) {
            var sg = new THREE.SphereGeometry(0.08*f, 12, 10); sg.scale(1.2, 1.5, 0.3);
            var sb = new THREE.Mesh(sg, skin); sb.position.set(s*0.12*shoulderW, 1.76, -0.12*chestW*f); bodyModel.add(sb);
        });
    }

    bodyScene.add(bodyModel);

    // Ground shadow
    var shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 });
    var shadowMesh = new THREE.Mesh(new THREE.CircleGeometry(0.6, 32), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.06;
    bodyScene.add(shadowMesh);

    // Overlay badges
    var bmiCat = getBMICategory(bmi);
    var ovEl = document.getElementById('bodyOverlayInfo');
    if (ovEl) {
        ovEl.innerHTML = '<span class="bmi-badge-3d" style="background:' + bmiCat.color + '22;color:' + bmiCat.color + ';border:1px solid ' + bmiCat.color + '44">' + bmiCat.text + ' &middot; BMI ' + bmi.toFixed(1) + '</span>' +
            '<span class="weight-badge-3d">' + weight + ' lbs &middot; ' + (weight*0.453592).toFixed(1) + ' kg</span>';
    }

    // Animate with idle breathing
    var breathPhase = 0;
    function animate() {
        requestAnimationFrame(animate);
        if (bodyControls) bodyControls.update();
        if (bodyModel) {
            bodyModel.rotation.y += 0.002;
            breathPhase += 0.02;
            bodyModel.scale.set(1, 1 + Math.sin(breathPhase) * 0.003, 1);
        }
        bodyRenderer.render(bodyScene, bodyCamera);
    }
    animate();

    var ro = new ResizeObserver(function() {
        var nw = container.clientWidth;
        var nh = container.offsetHeight || 520;
        if (nw > 0 && nh > 0) {
            bodyCamera.aspect = nw / nh;
            bodyCamera.updateProjectionMatrix();
            bodyRenderer.setSize(nw, nh, false);
        }
    });
    ro.observe(container);
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Body Stats Panel
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

    // Body fat estimate (Deurenberg formula)
    let bf;
    if (gender === 'male') {
        bf = (1.20 * bmi) + (0.23 * age) - 16.2;
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Profile Modal
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Dashboard Data & Progress
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

    updateProgressBars(totalCal, totalPro, water, burned, wMin, totalCarbs, totalFat);
    updateFitnessScore(totalCal, totalPro, burned, water, streak, wMin);
    loadRecentActivity();
    renderWeeklyChart();
    renderDailyGoals(totalCal, totalPro, water, burned, wMin);

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

function updateProgressBars(cal, pro, water, burned, wMin, carbs, fat) {
    const cGoal = currentUser.calorieGoal || 2000;
    const pGoal = currentUser.proteinGoal || 150;
    const carbGoal = currentUser.carbsGoal || 250;
    const fatGoal = currentUser.fatsGoal || 65;
    const waterGoal = 3000;
    const burnGoal = Math.round((cGoal || 2000) * 0.25); // ~25% of calorie goal

    document.getElementById('caloriesEaten').textContent = Math.round(cal);
    document.getElementById('calorieTarget').textContent = cGoal;
    document.getElementById('waterConsumed').textContent = water;
    document.getElementById('proteinEaten').textContent  = Math.round(pro);
    document.getElementById('proteinTarget').textContent = pGoal;
    document.getElementById('burnedDisplay').textContent = burned;

    // Carbs & Fat displays
    var carbsEl = document.getElementById('carbsEaten');
    var fatEl = document.getElementById('fatEaten');
    if (carbsEl) carbsEl.textContent = Math.round(carbs || 0);
    if (fatEl) fatEl.textContent = Math.round(fat || 0);
    var carbTargetEl = document.getElementById('carbsTargetDisplay');
    var fatTargetEl = document.getElementById('fatTargetDisplay');
    if (carbTargetEl) carbTargetEl.textContent = carbGoal;
    if (fatTargetEl) fatTargetEl.textContent = fatGoal;

    document.getElementById('calorieProgress').style.width = Math.min((cal / cGoal) * 100, 100) + '%';
    document.getElementById('waterProgress').style.width   = Math.min((water / waterGoal) * 100, 100) + '%';
    document.getElementById('proteinProgress').style.width = Math.min((pro / pGoal) * 100, 100) + '%';
    document.getElementById('burnedProgress').style.width  = Math.min((burned / burnGoal) * 100, 100) + '%';
    document.getElementById('workoutProgress').style.width = Math.min((wMin / 60) * 100, 100) + '%';

    var carbsBar = document.getElementById('carbsProgress');
    var fatBar = document.getElementById('fatProgress');
    if (carbsBar) carbsBar.style.width = Math.min(((carbs || 0) / carbGoal) * 100, 100) + '%';
    if (fatBar) fatBar.style.width = Math.min(((fat || 0) / fatGoal) * 100, 100) + '%';
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Fitness Score (0-100)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Recent Activity
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function loadRecentActivity() {
    const allMeals = loadUserData('meals');
    const allWorkouts = loadUserData('workouts');
    const allWater = loadUserData('water');
    // Sort by timestamp first, THEN slice — avoids missing recent entries
    const meals = allMeals.sort((a,b) => new Date(b.timestamp||0) - new Date(a.timestamp||0)).slice(0, 5);
    const workouts = allWorkouts.sort((a,b) => new Date(b.timestamp||0) - new Date(a.timestamp||0)).slice(0, 5);
    const waterLog = allWater.sort((a,b) => new Date(b.timestamp||0) - new Date(a.timestamp||0)).slice(0, 3);
    const combined = [
        ...meals.map(m => ({ type: 'meal', text: 'ðŸ½ï¸ ' + m.foodName + ' (' + Math.round(m.calories * m.quantity) + ' cal)', time: m.timestamp })),
        ...workouts.map(w => ({ type: 'workout', text: 'ðŸ‹ï¸ ' + w.exercise + ' â€” ' + (w.duration || 0) + 'min (' + (w.caloriesBurned || 0) + ' cal burned)', time: w.timestamp })),
        ...waterLog.map(w => ({ type: 'water', text: 'ðŸ’§ ' + w.amount + ' ml water', time: w.timestamp }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BMI & Calorie Calculators
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

    // Use the same formula as the actual workout tracker for consistency
    const actLabel = activity.split('-')[0].trim();
    const burned = calculateCaloriesBurned(
        actLabel, dur,
        currentUser.weight || 160,
        currentUser.height || 170,
        currentUser.age || 25,
        currentUser.gender || 'male',
        'moderate'
    );

    document.getElementById('burnCalories').textContent = burned;
    document.getElementById('burnResult').classList.remove('hidden');
    showNotification(`Estimated burn: ${burned} kcal`);
}

/* ═══════════════════════════════════════════════
   Weekly Overview Chart (last 7 days)
   ═══════════════════════════════════════════════ */
let weeklyChartInstance = null;
function renderWeeklyChart() {
    const canvas = document.getElementById('weeklyChart');
    if (!canvas) return;

    const labels = [];
    const calIn = [];
    const calOut = [];
    const waterArr = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('en', { weekday: 'short' });
        labels.push(dayName);

        const meals = getDataForDate('meals', ds);
        let mCal = 0;
        meals.forEach(m => { mCal += (m.calories || 0) * (m.quantity || 1); });
        calIn.push(mCal);

        const workouts = getDataForDate('workouts', ds);
        let wCal = 0;
        workouts.forEach(w => { wCal += w.caloriesBurned || 0; });
        calOut.push(wCal);

        const wLogs = getDataForDate('water', ds);
        let wAmt = 0;
        wLogs.forEach(w => { wAmt += w.amount || 0; });
        waterArr.push(Math.round(wAmt / 100)); // in 100ml units for scaling
    }

    if (weeklyChartInstance) weeklyChartInstance.destroy();

    weeklyChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Calories In',
                    data: calIn,
                    backgroundColor: 'rgba(129,140,248,0.7)',
                    borderRadius: 6,
                    barPercentage: 0.6
                },
                {
                    label: 'Calories Burned',
                    data: calOut,
                    backgroundColor: 'rgba(244,63,94,0.7)',
                    borderRadius: 6,
                    barPercentage: 0.6
                },
                {
                    label: 'Water (×100ml)',
                    data: waterArr,
                    type: 'line',
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56,189,248,0.15)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#38bdf8',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { size: 11 } } }
            },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,.04)' } },
                y: { beginAtZero: true, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,.04)' } },
                y1: { position: 'right', beginAtZero: true, ticks: { color: '#38bdf8' }, grid: { display: false } }
            }
        }
    });
}

/* ═══════════════════════════════════════════════
   Daily Goals Checklist
   ═══════════════════════════════════════════════ */
function renderDailyGoals(cal, pro, water, burned, wMin) {
    const cGoal = currentUser.calorieGoal || 2000;
    const pGoal = currentUser.proteinGoal || 150;
    const goals = [
        { label: 'Eat close to calorie target', done: cal > 0 && (cal / cGoal) >= 0.8 && (cal / cGoal) <= 1.2, detail: Math.round(cal) + ' / ' + cGoal + ' kcal' },
        { label: 'Hit protein goal', done: pro >= pGoal * 0.8, detail: Math.round(pro) + ' / ' + pGoal + 'g' },
        { label: 'Drink 3L water', done: water >= 3000, detail: water + ' / 3000 ml' },
        { label: 'Exercise 30+ min', done: wMin >= 30, detail: wMin + ' min' },
        { label: 'Burn 300+ calories', done: burned >= 300, detail: burned + ' kcal' }
    ];

    const el = document.getElementById('dailyGoalsChecklist');
    if (!el) return;
    const completed = goals.filter(g => g.done).length;
    el.innerHTML = `<div style="margin-bottom:12px;color:var(--text-secondary);font-size:.9rem">${completed}/${goals.length} completed</div>` +
        goals.map(g => `
        <div class="goal-item${g.done ? ' goal-done' : ''}">
            <span class="goal-check">${g.done ? '✅' : '⬜'}</span>
            <span class="goal-label">${g.label}</span>
            <span class="goal-detail">${g.detail}</span>
        </div>`).join('');
}
