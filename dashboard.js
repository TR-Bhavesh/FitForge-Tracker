// ─── Dashboard ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateUserDisplay();
    loadDashboardData();
    drawVitruvianBody();
    displayBodyStats();
});

/* ════════════════════════════════════════════════
   ANATOMICAL BODY VISUALIZATION
   Realistic humanoid figure · Gender-aware · BMI-responsive
   ════════════════════════════════════════════════ */
function drawVitruvianBody() {
    const svg = document.getElementById('vitruvianSVG');
    if (!svg) return;

    const gender   = currentUser.gender || 'male';
    const weight   = currentUser.weight || 160;
    const heightCm = currentUser.height || 170;
    const heightIn = heightCm / 2.54;
    const bmi      = calculateBMIValue(weight, heightIn);
    const isMale   = gender !== 'female';

    // BMI → horizontal body-width scale
    let bs;
    if (bmi < 18.5)      bs = 0.82;
    else if (bmi < 22)   bs = 0.90;
    else if (bmi < 25)   bs = 1.0;
    else if (bmi < 28)   bs = 1.10;
    else if (bmi < 32)   bs = 1.22;
    else                  bs = 1.35;

    const cx = 250; // centre x of the 500-wide viewBox

    // Gender proportion factors
    const sF = isMale ? 1 : 0.80;   // shoulder
    const hF = isMale ? 1 : 1.16;   // hip
    const wF = isMale ? 1 : 0.88;   // waist
    const aF = isMale ? 1 : 0.78;   // arm
    const lF = isMale ? 1 : 1.06;   // leg

    // Scaled half-width helper
    const S = (v, g) => v * bs * (g || 1);

    /* ── Y landmarks (8-head proportional canon) ── */
    const headTop = 40, headCy = 68, chin = 98;
    const neckBase = 114, shY = 124;
    const pitY = 156, pec = 170, chestBot = 184;
    const ribY = 202, waistY = 220, navelY = 234;
    const iliac = 254, pubic = 274, crotchY = 288;
    const midThigh = 334, kneeTop = 362, kneeY = 375, kneeBot = 388;
    const calfY = 420, ankleY = 478, heelY = 494, toeY = 508;

    /* ── Half-widths from centre ── */
    const nk  = S(11);            // neck
    const tr  = S(32, sF);        // trap
    const sh  = S(74, sF);        // shoulder tip
    const sj  = S(68, sF);        // shoulder joint
    const bw  = S(50, wF);        // body at pit
    const ch  = S(54, wF);        // chest
    const wa  = S(38, wF);        // waist
    const hi  = S(48, hF);        // hip
    const gr  = S(7);             // groin gap half

    // Arm joint x-offsets from shoulder joint (outward)
    const elOff = S(42, aF), wrOff = S(56, aF), fiOff = S(60, aF);
    // Arm widths (half)
    const dR = S(15, aF), ua = S(7, aF), fa = S(5.5, aF), wr = S(3.8, aF), hn = S(5, aF);

    // Arm positions
    const rSj = cx + sj, lSj = cx - sj;
    const rEl = rSj + elOff, lEl = lSj - elOff;
    const rWr = rSj + wrOff, lWr = lSj - wrOff;
    const rFi = rSj + fiOff, lFi = lSj - fiOff;
    const elY = 250, wrY = 358, fiY = 394;

    // Leg centre axis offset from cx
    const legOff = (gr + hi) / 2;
    const rLc = cx + legOff, lLc = cx - legOff;
    // Leg half-widths
    const th = S(21, lF), kn = S(13, lF), cf = S(15, lF), an = S(8), ftL = 24;

    /* ── Colours ── */
    const mc = 'rgba(200,165,90,0.88)';
    const lc = 'rgba(200,165,90,0.38)';
    const fc = 'rgba(200,165,90,0.16)';
    const dc = 'rgba(200,165,90,0.28)';
    const bf = 'rgba(200,165,90,0.035)';
    const hf = 'rgba(200,165,90,0.06)';

    const bmiCat = getBMICategory(bmi);

    /* ═══ BUILD SVG ═══ */
    svg.innerHTML = `
    <defs>
      <radialGradient id="vG" cx="50%" cy="44%" r="52%">
        <stop offset="0%" stop-color="rgba(200,165,90,0.10)"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <filter id="glo"><feGaussianBlur stdDeviation="1.2"/></filter>
    </defs>

    <!-- Background aura -->
    <ellipse cx="${cx}" cy="290" rx="220" ry="270" fill="url(#vG)"/>
    <!-- Vitruvian circle -->
    <circle cx="${cx}" cy="285" r="210" fill="none" stroke="${fc}" stroke-width=".8" stroke-dasharray="4 6"/>
    <!-- Vitruvian square -->
    <rect x="${cx - 200}" y="60" width="400" height="460" fill="none" stroke="${fc}" stroke-width=".8" stroke-dasharray="4 6" rx="3"/>

    <g>
    <!-- ════ LEFT LEG ════ -->
    <path d="
      M ${cx - hi + 6},${crotchY - 4}
      C ${cx - hi + 2},${crotchY + 14}  ${lLc - th - 6},${midThigh - 24}  ${lLc - th - 2},${midThigh}
      C ${lLc - th + 2},${midThigh + 20} ${lLc - kn - 6},${kneeTop - 8}   ${lLc - kn - 2},${kneeY}
      C ${lLc - kn},${kneeBot}           ${lLc - cf - 4},${calfY - 22}     ${lLc - cf},${calfY}
      C ${lLc - cf + 2},${calfY + 22}    ${lLc - an - 3},${ankleY - 16}    ${lLc - an},${ankleY}
      L ${lLc - an},${heelY}
      L ${lLc - an - ftL},${toeY}
      L ${lLc + an + 4},${toeY}
      L ${lLc + an},${heelY}
      L ${lLc + an},${ankleY}
      C ${lLc + an + 3},${ankleY - 16}   ${lLc + cf - 6},${calfY + 22}     ${lLc + cf - 8},${calfY}
      C ${lLc + cf - 10},${calfY - 22}   ${lLc + kn - 4},${kneeBot}        ${lLc + kn - 2},${kneeY}
      C ${lLc + kn},${kneeTop - 8}       ${lLc + th - 8},${midThigh + 20}  ${lLc + th - 10},${midThigh}
      C ${lLc + th - 12},${midThigh - 24} ${cx - gr - 2},${crotchY + 14}   ${cx - gr},${crotchY}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- ════ RIGHT LEG ════ -->
    <path d="
      M ${cx + hi - 6},${crotchY - 4}
      C ${cx + hi - 2},${crotchY + 14}  ${rLc + th + 6},${midThigh - 24}  ${rLc + th + 2},${midThigh}
      C ${rLc + th - 2},${midThigh + 20} ${rLc + kn + 6},${kneeTop - 8}   ${rLc + kn + 2},${kneeY}
      C ${rLc + kn},${kneeBot}           ${rLc + cf + 4},${calfY - 22}     ${rLc + cf},${calfY}
      C ${rLc + cf - 2},${calfY + 22}    ${rLc + an + 3},${ankleY - 16}    ${rLc + an},${ankleY}
      L ${rLc + an},${heelY}
      L ${rLc + an + ftL},${toeY}
      L ${rLc - an - 4},${toeY}
      L ${rLc - an},${heelY}
      L ${rLc - an},${ankleY}
      C ${rLc - an - 3},${ankleY - 16}   ${rLc - cf + 6},${calfY + 22}     ${rLc - cf + 8},${calfY}
      C ${rLc - cf + 10},${calfY - 22}   ${rLc - kn + 4},${kneeBot}        ${rLc - kn + 2},${kneeY}
      C ${rLc - kn},${kneeTop - 8}       ${rLc - th + 8},${midThigh + 20}  ${rLc - th + 10},${midThigh}
      C ${rLc - th + 12},${midThigh - 24} ${cx + gr + 2},${crotchY + 14}   ${cx + gr},${crotchY}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- ════ TORSO ════ -->
    <path d="
      M ${cx - nk},${neckBase}
      C ${cx - nk - 10},${neckBase + 2}  ${cx - tr - 4},${shY - 4}   ${cx - sj + 2},${shY}
      L ${cx - sj - 4},${shY + 2}
      C ${cx - sj + 2},${shY + 16}  ${cx - bw - 4},${pitY - 14}  ${cx - bw},${pitY}
      C ${cx - ch - 3},${pitY + 10}  ${cx - ch},${chestBot}        ${cx - ch + 4},${ribY}
      C ${cx - ch + 8},${ribY + 8}   ${cx - wa - 6},${waistY - 8}  ${cx - wa},${waistY}
      C ${cx - wa + 2},${waistY + 10} ${cx - hi - 4},${iliac - 8}  ${cx - hi},${iliac}
      C ${cx - hi - 2},${iliac + 10}  ${cx - hi + 2},${pubic}       ${cx - hi + 6},${crotchY - 4}
      L ${cx - gr},${crotchY}
      L ${cx + gr},${crotchY}
      L ${cx + hi - 6},${crotchY - 4}
      C ${cx + hi - 2},${pubic}       ${cx + hi + 2},${iliac + 10}  ${cx + hi},${iliac}
      C ${cx + hi + 4},${iliac - 8}   ${cx + wa - 2},${waistY + 10} ${cx + wa},${waistY}
      C ${cx + wa + 6},${waistY - 8}  ${cx + ch - 8},${ribY + 8}   ${cx + ch - 4},${ribY}
      C ${cx + ch},${chestBot}         ${cx + ch + 3},${pitY + 10}  ${cx + bw},${pitY}
      C ${cx + bw + 4},${pitY - 14}  ${cx + sj - 2},${shY + 16}   ${cx + sj + 4},${shY + 2}
      L ${cx + sj - 2},${shY}
      C ${cx + tr + 4},${shY - 4}    ${cx + nk + 10},${neckBase + 2} ${cx + nk},${neckBase}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- ════ LEFT ARM ════ -->
    <path d="
      M ${lSj + 4},${shY - 2}
      C ${lSj - dR - 4},${shY - 6}   ${lSj - dR - 8},${shY + 16}  ${lSj - dR - 2},${shY + 36}
      C ${lSj - dR + 2},${shY + 56}  ${lEl - ua - 6},${elY - 44}   ${lEl - ua - 2},${elY - 4}
      C ${lEl - ua},${elY + 6}        ${lEl - fa - 6},${elY + 18}   ${lEl - fa - 2},${elY + 32}
      C ${lWr - wr - 6},${wrY - 50}   ${lWr - wr - 2},${wrY - 12}  ${lWr - wr},${wrY}
      L ${lWr - wr - 2},${wrY + 14}
      L ${lFi - hn},${fiY - 10}
      L ${lFi - 2},${fiY}
      L ${lFi + hn - 2},${fiY - 8}
      L ${lWr + wr + 2},${wrY + 14}
      L ${lWr + wr},${wrY}
      C ${lWr + wr + 2},${wrY - 12}   ${lEl + fa - 2},${elY + 32}  ${lEl + fa},${elY + 8}
      C ${lEl + fa + 2},${elY - 16}   ${lEl + ua + 4},${elY - 44}  ${lSj + 6},${pitY + 6}
      C ${lSj + 2},${pitY - 6}        ${lSj + 6},${shY + 12}       ${lSj + 4},${shY - 2}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- ════ RIGHT ARM ════ -->
    <path d="
      M ${rSj - 4},${shY - 2}
      C ${rSj + dR + 4},${shY - 6}   ${rSj + dR + 8},${shY + 16}  ${rSj + dR + 2},${shY + 36}
      C ${rSj + dR - 2},${shY + 56}  ${rEl + ua + 6},${elY - 44}   ${rEl + ua + 2},${elY - 4}
      C ${rEl + ua},${elY + 6}        ${rEl + fa + 6},${elY + 18}   ${rEl + fa + 2},${elY + 32}
      C ${rWr + wr + 6},${wrY - 50}   ${rWr + wr + 2},${wrY - 12}  ${rWr + wr},${wrY}
      L ${rWr + wr + 2},${wrY + 14}
      L ${rFi + hn},${fiY - 10}
      L ${rFi + 2},${fiY}
      L ${rFi - hn + 2},${fiY - 8}
      L ${rWr - wr - 2},${wrY + 14}
      L ${rWr - wr},${wrY}
      C ${rWr - wr - 2},${wrY - 12}   ${rEl - fa + 2},${elY + 32}  ${rEl - fa},${elY + 8}
      C ${rEl - fa - 2},${elY - 16}   ${rEl - ua - 4},${elY - 44}  ${rSj - 6},${pitY + 6}
      C ${rSj - 2},${pitY - 6}        ${rSj - 6},${shY + 12}       ${rSj - 4},${shY - 2}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- ════ NECK ════ -->
    <path d="
      M ${cx - nk - 2},${neckBase}
      C ${cx - nk - 2},${neckBase - 4}  ${cx - nk + 1},${chin + 4}  ${cx - nk + 2},${chin + 2}
      Q ${cx},${chin + 6}               ${cx + nk - 2},${chin + 2}
      C ${cx + nk - 1},${chin + 4}      ${cx + nk + 2},${neckBase - 4} ${cx + nk + 2},${neckBase}
      Z" fill="${bf}" stroke="${mc}" stroke-width="1.2"/>

    <!-- ════ HEAD ════ -->
    <ellipse cx="${cx}" cy="${headCy}" rx="24" ry="28" fill="${hf}" stroke="${mc}" stroke-width="1.4"/>

    <!-- Subtle hair -->
    ${isMale ? `
    <path d="M ${cx - 22},${headCy - 16} C ${cx - 20},${headCy - 30} ${cx - 8},${headCy - 34} ${cx},${headCy - 32}
             C ${cx + 8},${headCy - 34} ${cx + 20},${headCy - 30} ${cx + 22},${headCy - 16}"
          fill="none" stroke="${mc}" stroke-width="1.1"/>` :
    `<path d="M ${cx - 24},${headCy - 6} C ${cx - 26},${headCy - 32} ${cx - 10},${headCy - 38} ${cx},${headCy - 36}
             C ${cx + 10},${headCy - 38} ${cx + 26},${headCy - 32} ${cx + 24},${headCy - 6}"
          fill="none" stroke="${mc}" stroke-width="1.1"/>
     <path d="M ${cx - 24},${headCy - 6} C ${cx - 28},${headCy + 12} ${cx - 26},${headCy + 36} ${cx - 22},${headCy + 44}"
          fill="none" stroke="${lc}" stroke-width=".9"/>
     <path d="M ${cx + 24},${headCy - 6} C ${cx + 28},${headCy + 12} ${cx + 26},${headCy + 36} ${cx + 22},${headCy + 44}"
          fill="none" stroke="${lc}" stroke-width=".9"/>`}

    <!-- Minimal face -->
    <!-- Eyebrows -->
    <path d="M ${cx - 14},${headCy - 7} Q ${cx - 10},${headCy - 10} ${cx - 5},${headCy - 7}" fill="none" stroke="${lc}" stroke-width=".8"/>
    <path d="M ${cx + 14},${headCy - 7} Q ${cx + 10},${headCy - 10} ${cx + 5},${headCy - 7}" fill="none" stroke="${lc}" stroke-width=".8"/>
    <!-- Eyes (subtle almond shapes) -->
    <path d="M ${cx - 14},${headCy - 1} Q ${cx - 10},${headCy - 4} ${cx - 6},${headCy - 1} Q ${cx - 10},${headCy + 1} ${cx - 14},${headCy - 1}" fill="none" stroke="${lc}" stroke-width=".7"/>
    <path d="M ${cx + 6},${headCy - 1} Q ${cx + 10},${headCy - 4} ${cx + 14},${headCy - 1} Q ${cx + 10},${headCy + 1} ${cx + 6},${headCy - 1}" fill="none" stroke="${lc}" stroke-width=".7"/>
    <!-- Nose hint -->
    <path d="M ${cx},${headCy + 3} L ${cx - 3},${headCy + 10} Q ${cx},${headCy + 11.5} ${cx + 3},${headCy + 10}" fill="none" stroke="${dc}" stroke-width=".6"/>
    <!-- Mouth hint -->
    <path d="M ${cx - 6},${headCy + 16} Q ${cx},${headCy + 18.5} ${cx + 6},${headCy + 16}" fill="none" stroke="${dc}" stroke-width=".5"/>

    <!-- ═══ ANATOMY DETAIL LINES ═══ -->

    <!-- Clavicle (collar bone) V -->
    <path d="M ${cx - 2},${neckBase + 1} L ${cx - sj + 4},${shY + 3}" fill="none" stroke="${dc}" stroke-width=".8"/>
    <path d="M ${cx + 2},${neckBase + 1} L ${cx + sj - 4},${shY + 3}" fill="none" stroke="${dc}" stroke-width=".8"/>

    <!-- Centre line -->
    <line x1="${cx}" y1="${shY + 10}" x2="${cx}" y2="${pubic - 4}" stroke="${fc}" stroke-width=".7"/>

    ${isMale ? `
    <!-- Pectorals -->
    <path d="M ${cx - 4},${pec - 8}
             C ${cx - ch/2 - 8},${pec - 4}  ${cx - ch/2 - 10},${pec + 14}  ${cx - 8},${pec + 16}"
          fill="none" stroke="${dc}" stroke-width=".9"/>
    <path d="M ${cx + 4},${pec - 8}
             C ${cx + ch/2 + 8},${pec - 4}  ${cx + ch/2 + 10},${pec + 14}  ${cx + 8},${pec + 16}"
          fill="none" stroke="${dc}" stroke-width=".9"/>
    ` : `
    <!-- Bust contours -->
    <path d="M ${cx - 6},${pec - 4}
             C ${cx - ch/2 + 2},${pec - 2}  ${cx - ch/2 - 2},${pec + 18}  ${cx - 6},${pec + 16}"
          fill="none" stroke="${dc}" stroke-width=".8"/>
    <path d="M ${cx + 6},${pec - 4}
             C ${cx + ch/2 - 2},${pec - 2}  ${cx + ch/2 + 2},${pec + 18}  ${cx + 6},${pec + 16}"
          fill="none" stroke="${dc}" stroke-width=".8"/>
    `}

    ${bmi < 30 ? `
    <!-- Serratus lines (ribs) -->
    <path d="M ${cx - ch + 8},${ribY - 6}  L ${cx - wa - 2},${ribY + 2}" fill="none" stroke="${fc}" stroke-width=".5"/>
    <path d="M ${cx - ch + 10},${ribY + 4} L ${cx - wa},${ribY + 12}" fill="none" stroke="${fc}" stroke-width=".5"/>
    <path d="M ${cx + ch - 8},${ribY - 6}  L ${cx + wa + 2},${ribY + 2}" fill="none" stroke="${fc}" stroke-width=".5"/>
    <path d="M ${cx + ch - 10},${ribY + 4} L ${cx + wa},${ribY + 12}" fill="none" stroke="${fc}" stroke-width=".5"/>

    <!-- Abdominal lines -->
    ${isMale && bmi < 26 ? `
    <line x1="${cx - 14}" y1="${ribY + 22}" x2="${cx + 14}" y2="${ribY + 22}" stroke="${fc}" stroke-width=".5"/>
    <line x1="${cx - 13}" y1="${ribY + 36}" x2="${cx + 13}" y2="${ribY + 36}" stroke="${fc}" stroke-width=".5"/>
    <line x1="${cx - 12}" y1="${ribY + 50}" x2="${cx + 12}" y2="${ribY + 50}" stroke="${fc}" stroke-width=".5"/>
    ` : ''}

    <!-- Oblique lines -->
    <path d="M ${cx - wa + 2},${waistY} C ${cx - wa + 6},${waistY + 12} ${cx - hi + 14},${iliac - 2} ${cx - hi + 10},${iliac + 6}" fill="none" stroke="${fc}" stroke-width=".5"/>
    <path d="M ${cx + wa - 2},${waistY} C ${cx + wa - 6},${waistY + 12} ${cx + hi - 14},${iliac - 2} ${cx + hi - 10},${iliac + 6}" fill="none" stroke="${fc}" stroke-width=".5"/>

    <!-- Iliac V-line -->
    <path d="M ${cx - hi + 12},${iliac + 4} C ${cx - 16},${pubic - 6} ${cx - 8},${pubic + 4} ${cx - 4},${crotchY - 4}" fill="none" stroke="${fc}" stroke-width=".6"/>
    <path d="M ${cx + hi - 12},${iliac + 4} C ${cx + 16},${pubic - 6} ${cx + 8},${pubic + 4} ${cx + 4},${crotchY - 4}" fill="none" stroke="${fc}" stroke-width=".6"/>
    ` : ''}

    <!-- Navel -->
    <ellipse cx="${cx}" cy="${navelY}" rx="2.5" ry="3" fill="none" stroke="${lc}" stroke-width=".8"/>

    ${bmi < 30 ? `
    <!-- Deltoid separation -->
    <path d="M ${lSj + 2},${shY + 2} C ${lSj - dR + 4},${shY + 14} ${lSj - dR + 2},${shY + 28} ${lSj - dR + 6},${shY + 38}" fill="none" stroke="${dc}" stroke-width=".6"/>
    <path d="M ${rSj - 2},${shY + 2} C ${rSj + dR - 4},${shY + 14} ${rSj + dR - 2},${shY + 28} ${rSj + dR - 6},${shY + 38}" fill="none" stroke="${dc}" stroke-width=".6"/>

    <!-- Bicep / arm centre lines -->
    <line x1="${lSj - dR/2}" y1="${shY + 42}" x2="${lEl - 1}" y2="${elY - 6}" stroke="${fc}" stroke-width=".4"/>
    <line x1="${rSj + dR/2}" y1="${shY + 42}" x2="${rEl + 1}" y2="${elY - 6}" stroke="${fc}" stroke-width=".4"/>

    <!-- Elbow crease -->
    <path d="M ${lEl - ua + 2},${elY + 2} Q ${lEl},${elY + 6} ${lEl + ua - 2},${elY + 2}" fill="none" stroke="${fc}" stroke-width=".5"/>
    <path d="M ${rEl - ua + 2},${elY + 2} Q ${rEl},${elY + 6} ${rEl + ua - 2},${elY + 2}" fill="none" stroke="${fc}" stroke-width=".5"/>

    <!-- Kneecap circles -->
    <ellipse cx="${lLc}" cy="${kneeY}" rx="${kn - 4}" ry="8" fill="none" stroke="${fc}" stroke-width=".5"/>
    <ellipse cx="${rLc}" cy="${kneeY}" rx="${kn - 4}" ry="8" fill="none" stroke="${fc}" stroke-width=".5"/>

    <!-- Quad centre lines -->
    <line x1="${lLc}" y1="${crotchY + 12}" x2="${lLc}" y2="${kneeTop - 4}" stroke="${fc}" stroke-width=".4"/>
    <line x1="${rLc}" y1="${crotchY + 12}" x2="${rLc}" y2="${kneeTop - 4}" stroke="${fc}" stroke-width=".4"/>

    <!-- Calf inner curve -->
    <path d="M ${lLc + 2},${kneeBot + 4} C ${lLc + cf/3},${calfY - 10} ${lLc + cf/4},${calfY + 10} ${lLc + 2},${ankleY - 16}" fill="none" stroke="${fc}" stroke-width=".4"/>
    <path d="M ${rLc - 2},${kneeBot + 4} C ${rLc - cf/3},${calfY - 10} ${rLc - cf/4},${calfY + 10} ${rLc - 2},${ankleY - 16}" fill="none" stroke="${fc}" stroke-width=".4"/>
    ` : ''}

    </g>

    <!-- ═══ MEASUREMENT ANNOTATIONS ═══ -->
    <g font-family="Inter,sans-serif" font-size="9" fill="${lc}" font-weight="500">
      <line x1="42" y1="${headTop}" x2="42" y2="${toeY}" stroke="${fc}" stroke-width=".7" stroke-dasharray="3 3"/>
      <line x1="36" y1="${headTop}" x2="48" y2="${headTop}" stroke="${fc}" stroke-width=".7"/>
      <line x1="36" y1="${toeY}" x2="48" y2="${toeY}" stroke="${fc}" stroke-width=".7"/>
      <text x="30" y="${(headTop + toeY) / 2}" text-anchor="middle"
            transform="rotate(-90 30 ${(headTop + toeY) / 2})">${heightCm} cm</text>

      <text x="458" y="${waistY}" text-anchor="middle">${weight} lbs</text>
      <text x="458" y="${waistY + 14}" text-anchor="middle">${(weight * 0.453592).toFixed(1)} kg</text>

      <rect x="${cx - 38}" y="${toeY + 12}" width="76" height="22" rx="11"
            fill="${bmiCat.color}" fill-opacity=".18" stroke="${bmiCat.color}" stroke-width=".8" stroke-opacity=".4"/>
      <text x="${cx}" y="${toeY + 27}" text-anchor="middle"
            fill="${bmiCat.color}" font-size="10" font-weight="700">${bmiCat.text} · ${bmi.toFixed(1)}</text>
    </g>
    `;
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
