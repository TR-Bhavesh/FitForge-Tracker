// ═══════════════════════════════════════════════
// ANALYTICS — Fixed, with Projections & More Charts
// ═══════════════════════════════════════════════
let currentRange = '7days';
let currentProjection = '1m';
let charts = {};

document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.href.includes('analytics')) return;
    checkAuth();
    updateUserDisplay();
    document.getElementById('weightDate').value = getTodayDate();
    initializeCharts();
    loadAnalytics();
    renderWeeklyCalendar();
    renderMilestones();
    updateProjections();
});

// ─── Range & Projection selectors ────────────
function changeRange(range, btn) {
    currentRange = range;
    document.querySelectorAll('.time-range-selector .btn-range').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    loadAnalytics();
}

function changeProjection(period, btn) {
    currentProjection = period;
    document.querySelectorAll('.projection-tabs .btn-range').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    updateProjections();
}

function getDateRange() {
    const today = new Date(); today.setHours(23,59,59,999);
    let start = new Date();
    switch (currentRange) {
        case '7days':  start.setDate(today.getDate() - 7); break;
        case '30days': start.setDate(today.getDate() - 30); break;
        case '90days': start.setDate(today.getDate() - 90); break;
        case 'all':    start = new Date(currentUser.createdAt || '2024-01-01'); break;
    }
    start.setHours(0,0,0,0);
    return { start, end: today };
}

function getDatesInRange(start, end) {
    const dates = [];
    const d = new Date(start);
    while (d <= end) { dates.push(d.toISOString().split('T')[0]); d.setDate(d.getDate() + 1); }
    return dates;
}

// ─── Load All Analytics ──────────────────────
function loadAnalytics() {
    const range = getDateRange();
    calcSummary(range);
    updateWeightChart(range);
    updateCalorieChart(range);
    updateWorkoutCharts(range);
    updateNutritionCharts(range);
    updateNetCalorieChart(range);
    updateWorkoutFreqChart(range);
}

// ─── Summary Stats ───────────────────────────
function calcSummary(range) {
    const meals = loadUserData('meals');
    const workouts = loadUserData('workouts');
    const weightH = loadUserData('weight_log') || [];
    const water = loadUserData('water');
    const dates = getDatesInRange(range.start, range.end);

    // Weight change
    const wInRange = weightH.filter(w => new Date(w.date) >= range.start && new Date(w.date) <= range.end);
    if (wInRange.length >= 2) {
        const first = wInRange[0].weight, last = wInRange[wInRange.length - 1].weight;
        const ch = last - first;
        document.getElementById('weightChange').textContent = (ch >= 0 ? '+' : '') + ch.toFixed(1) + ' lbs';
        document.getElementById('weightChangeText').textContent = ch < 0 ? `Lost ${Math.abs(ch).toFixed(1)} lbs` : ch > 0 ? `Gained ${ch.toFixed(1)} lbs` : 'No change';
        document.getElementById('weightChangeText').className = 'change-indicator ' + (ch < 0 ? 'positive' : ch > 0 ? 'negative' : '');
    } else {
        document.getElementById('weightChange').textContent = '—';
        document.getElementById('weightChangeText').textContent = 'Need 2+ weigh-ins';
    }

    // Avg calories
    const calByDay = {};
    meals.filter(m => new Date(m.date) >= range.start && new Date(m.date) <= range.end)
         .forEach(m => { calByDay[m.date] = (calByDay[m.date] || 0) + m.calories * m.quantity; });
    const calDays = Object.keys(calByDay).length;
    const avgCal = calDays > 0 ? Math.round(Object.values(calByDay).reduce((s, v) => s + v, 0) / calDays) : 0;
    document.getElementById('avgCalories').textContent = avgCal;

    // Total workouts
    const wInR = workouts.filter(w => new Date(w.date) >= range.start && new Date(w.date) <= range.end);
    document.getElementById('totalWorkouts').textContent = wInR.length;

    // Avg burned
    const burnByDay = {};
    wInR.forEach(w => { burnByDay[w.date] = (burnByDay[w.date] || 0) + (w.caloriesBurned || 0); });
    const burnDays = Object.keys(burnByDay).length;
    document.getElementById('avgBurned').textContent = burnDays > 0 ? Math.round(Object.values(burnByDay).reduce((s, v) => s + v, 0) / burnDays) : 0;

    // Streak
    const allDates = new Set([...meals.map(m => m.date), ...workouts.map(w => w.date), ...water.map(w => w.date)]);
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today); d.setDate(today.getDate() - i);
        if (allDates.has(d.toISOString().split('T')[0])) streak++; else break;
    }
    document.getElementById('streak').textContent = streak;

    // Consistency
    const activeDays = dates.filter(d => allDates.has(d)).length;
    document.getElementById('consistency').textContent = dates.length > 0 ? Math.round((activeDays / dates.length) * 100) + '%' : '0%';
}

// ─── Log Weight ──────────────────────────────
function logWeight() {
    const w = parseFloat(document.getElementById('currentWeight').value);
    const d = document.getElementById('weightDate').value || getTodayDate();
    if (!w) { alert('Enter weight'); return; }

    let wh = loadUserData('weight_log') || [];
    wh = wh.filter(e => e.date !== d);
    wh.push({ id: Date.now(), date: d, weight: w, timestamp: new Date().toISOString() });
    wh.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveUserData('weight_log', wh);

    currentUser.weight = w;
    localStorage.setItem('fitforge_current_user', JSON.stringify(currentUser));
    document.getElementById('currentWeight').value = '';
    loadAnalytics();
    updateProjections();
    showNotification('Weight logged!');
}

// ─── Chart Initialization ────────────────────
function initializeCharts() {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
    Chart.defaults.font.family = "'Inter', sans-serif";
    const dg = { color: 'rgba(255,255,255,0.06)' };
    const dt = { color: '#94a3b8', maxTicksLimit: 8 };
    const ds = { x: { grid: dg, ticks: dt }, y: { grid: dg, ticks: dt, beginAtZero: false } };
    const ds0 = { x: { grid: dg, ticks: dt }, y: { grid: dg, ticks: dt, beginAtZero: true } };

    const mk = (id, type, datasets, scales) => {
        const ctx = document.getElementById(id);
        if (!ctx) return null;
        return new Chart(ctx, { type, data: { labels: [], datasets }, options: { responsive: true, maintainAspectRatio: false, scales, plugins: { legend: { labels: { boxWidth: 12 } } } } });
    };

    charts.weight = mk('weightChart', 'line', [{ label: 'Weight (lbs)', data: [], borderColor: '#818cf8', backgroundColor: 'rgba(129,140,248,0.1)', tension: .4, fill: true, pointRadius: 4 }], ds);
    charts.calorie = mk('calorieChart', 'bar', [
        { label: 'Intake', data: [], backgroundColor: 'rgba(129,140,248,0.7)', borderRadius: 6 },
        { label: 'Burned', data: [], backgroundColor: 'rgba(251,113,133,0.7)', borderRadius: 6 },
        { label: 'Goal', type: 'line', data: [], borderColor: '#34d399', borderWidth: 2, borderDash: [6, 4], fill: false, pointRadius: 0 }
    ], ds0);
    charts.exercise = mk('exerciseDistribution', 'doughnut', [{ data: [0,0,0,0], backgroundColor: ['#818cf8','#34d399','#fbbf24','#fb7185'], borderWidth: 0 }], undefined);
    if (charts.exercise) charts.exercise.options.cutout = '65%';
    charts.burned = mk('caloriesBurnedChart', 'bar', [{ label: 'Burned', data: [], backgroundColor: 'rgba(251,113,133,0.7)', borderRadius: 6 }], ds0);
    charts.macro = mk('macroChart', 'doughnut', [{ data: [0, 0, 0], backgroundColor: ['#fb7185', '#818cf8', '#fbbf24'], borderWidth: 0 }], undefined);
    if (charts.macro) charts.macro.options.cutout = '65%';
    charts.protein = mk('proteinChart', 'line', [{ label: 'Protein (g)', data: [], borderColor: '#fb7185', backgroundColor: 'rgba(251,113,133,0.1)', tension: .4, fill: true, pointRadius: 3 }], ds0);
    charts.netCal = mk('netCalorieChart', 'line', [{ label: 'Net Calories', data: [], borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.1)', tension: .3, fill: true, pointRadius: 3 }], ds);
    charts.workoutFreq = mk('workoutFreqChart', 'bar', [{ label: 'Workout Minutes', data: [], backgroundColor: 'rgba(52,211,153,0.7)', borderRadius: 6 }], ds0);
    charts.projection = mk('projectionChart', 'line', [
        { label: 'Actual', data: [], borderColor: '#818cf8', backgroundColor: 'rgba(129,140,248,0.1)', tension: .4, fill: true, pointRadius: 3 },
        { label: 'Projected', data: [], borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.08)', tension: .4, fill: true, pointRadius: 2, borderDash: [6, 4] }
    ], ds);
}

// ─── Chart Updates ───────────────────────────
function updateWeightChart(range) {
    if (!charts.weight) return;
    const wh = (loadUserData('weight_log') || []).filter(w => new Date(w.date) >= range.start && new Date(w.date) <= range.end).sort((a, b) => new Date(a.date) - new Date(b.date));
    charts.weight.data.labels = wh.map(w => formatDate(w.date));
    charts.weight.data.datasets[0].data = wh.map(w => w.weight);
    charts.weight.update();
}

function updateCalorieChart(range) {
    if (!charts.calorie) return;
    const meals = loadUserData('meals'), workouts = loadUserData('workouts');
    const dates = getDatesInRange(range.start, range.end);
    const goal = currentUser.calorieGoal || 2000;
    charts.calorie.data.labels = dates.map(d => formatDate(d));
    charts.calorie.data.datasets[0].data = dates.map(d => meals.filter(m => m.date === d).reduce((s, m) => s + m.calories * m.quantity, 0));
    charts.calorie.data.datasets[1].data = dates.map(d => workouts.filter(w => w.date === d).reduce((s, w) => s + (w.caloriesBurned || 0), 0));
    charts.calorie.data.datasets[2].data = new Array(dates.length).fill(goal);
    charts.calorie.update();
}

function updateWorkoutCharts(range) {
    const workouts = loadUserData('workouts').filter(w => new Date(w.date) >= range.start && new Date(w.date) <= range.end);
    if (charts.exercise) {
        const cats = { cardio: 0, strength: 0, flexibility: 0, sports: 0 };
        workouts.forEach(w => { if (cats.hasOwnProperty(w.category)) cats[w.category] += w.duration || 0; });
        charts.exercise.data.datasets[0].data = Object.values(cats);
        charts.exercise.data.labels = ['Cardio', 'Strength', 'Flexibility', 'Sports'];
        charts.exercise.update();
    }
    if (charts.burned) {
        const dates = getDatesInRange(range.start, range.end);
        charts.burned.data.labels = dates.map(d => formatDate(d));
        charts.burned.data.datasets[0].data = dates.map(d => workouts.filter(w => w.date === d).reduce((s, w) => s + (w.caloriesBurned || 0), 0));
        charts.burned.update();
    }
}

function updateNutritionCharts(range) {
    const meals = loadUserData('meals').filter(m => new Date(m.date) >= range.start && new Date(m.date) <= range.end);
    let tp = 0, tc = 0, tf = 0;
    meals.forEach(m => { tp += (m.protein || 0) * m.quantity; tc += (m.carbs || 0) * m.quantity; tf += (m.fat || 0) * m.quantity; });
    if (charts.macro && meals.length > 0) { charts.macro.data.datasets[0].data = [tp, tc, tf]; charts.macro.update(); }
    if (charts.protein) {
        const dates = getDatesInRange(range.start, range.end);
        charts.protein.data.labels = dates.map(d => formatDate(d));
        charts.protein.data.datasets[0].data = dates.map(d => meals.filter(m => m.date === d).reduce((s, m) => s + (m.protein || 0) * m.quantity, 0));
        charts.protein.update();
    }
}

function updateNetCalorieChart(range) {
    if (!charts.netCal) return;
    const meals = loadUserData('meals'), workouts = loadUserData('workouts');
    const dates = getDatesInRange(range.start, range.end);
    charts.netCal.data.labels = dates.map(d => formatDate(d));
    charts.netCal.data.datasets[0].data = dates.map(d => {
        const intake = meals.filter(m => m.date === d).reduce((s, m) => s + m.calories * m.quantity, 0);
        const burn = workouts.filter(w => w.date === d).reduce((s, w) => s + (w.caloriesBurned || 0), 0);
        return intake - burn;
    });
    charts.netCal.update();
}

function updateWorkoutFreqChart(range) {
    if (!charts.workoutFreq) return;
    const workouts = loadUserData('workouts').filter(w => new Date(w.date) >= range.start && new Date(w.date) <= range.end);
    const dates = getDatesInRange(range.start, range.end);
    charts.workoutFreq.data.labels = dates.map(d => formatDate(d));
    charts.workoutFreq.data.datasets[0].data = dates.map(d => workouts.filter(w => w.date === d).reduce((s, w) => s + (w.duration || 0), 0));
    charts.workoutFreq.update();
}

// ═══════════════════════════════════════════════
// PROJECTIONS
// ═══════════════════════════════════════════════
function updateProjections() {
    const wh = (loadUserData('weight_log') || []).sort((a, b) => new Date(a.date) - new Date(b.date));
    const meals = loadUserData('meals');
    const workouts = loadUserData('workouts');

    const periodDays = { '1m': 30, '3m': 90, '6m': 180, '1y': 365, '2y': 730 };
    const days = periodDays[currentProjection] || 30;

    const currentW = currentUser.weight || 160;
    const heightIn = (currentUser.height || 170) / 2.54;
    const age = currentUser.age || 25;
    const gender = currentUser.gender || 'male';

    // Calculate average daily net calories over the last 14 days
    const last14 = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const d = new Date(today); d.setDate(today.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const intake = meals.filter(m => m.date === ds).reduce((s, m) => s + m.calories * m.quantity, 0);
        const burn = workouts.filter(w => w.date === ds).reduce((s, w) => s + (w.caloriesBurned || 0), 0);
        if (intake > 0 || burn > 0) last14.push(intake - burn);
    }

    // BMR for TDEE
    const wKg = currentW * 0.453592;
    const hCm = currentUser.height || 170;
    let bmr = gender === 'male' ? 10 * wKg + 6.25 * hCm - 5 * age + 5 : 10 * wKg + 6.25 * hCm - 5 * age - 161;
    const tdee = bmr * (currentUser.activityLevel || 1.55);

    // Average daily surplus/deficit
    const avgNet = last14.length > 0 ? last14.reduce((s, v) => s + v, 0) / last14.length : tdee;
    const avgBurn = workouts.length > 0 ? workouts.slice(-14).reduce((s, w) => s + (w.caloriesBurned || 0), 0) / Math.min(14, workouts.length) : 0;
    const dailyDeficit = tdee - avgNet; // positive = deficit (losing weight)

    // 1 lb fat ≈ 3500 calories
    const projectedWeightChange = -(dailyDeficit * days) / 3500; // negative deficit = gain
    const projW = Math.max(80, currentW + projectedWeightChange);
    const projBMI = calculateBMIValue(projW, heightIn);
    const projBMICat = getBMICategory(projBMI);

    // Body fat projection
    let currentBF = gender === 'male' ? (1.20 * calculateBMIValue(currentW, heightIn)) + (0.23 * age) - 16.2 : (1.20 * calculateBMIValue(currentW, heightIn)) + (0.23 * age) - 5.4;
    currentBF = Math.max(5, Math.min(currentBF, 55));
    let projBF = gender === 'male' ? (1.20 * projBMI) + (0.23 * age) - 16.2 : (1.20 * projBMI) + (0.23 * age) - 5.4;
    projBF = Math.max(5, Math.min(projBF, 55));

    const totalBurn = Math.round(avgBurn * days);

    // Update UI
    document.getElementById('projWeight').textContent = projW.toFixed(1) + ' lbs';
    const wDelta = projW - currentW;
    document.getElementById('projWeightDelta').textContent = (wDelta >= 0 ? '+' : '') + wDelta.toFixed(1) + ' lbs';
    document.getElementById('projWeightDelta').style.color = wDelta < 0 ? 'var(--emerald)' : wDelta > 0 ? 'var(--rose)' : 'var(--text-secondary)';

    document.getElementById('projBMI').textContent = projBMI.toFixed(1);
    document.getElementById('projBMICategory').textContent = projBMICat.text;
    document.getElementById('projBMICategory').style.color = projBMICat.color;

    document.getElementById('projBF').textContent = projBF.toFixed(1) + '%';
    const bfDelta = projBF - currentBF;
    document.getElementById('projBFDelta').textContent = (bfDelta >= 0 ? '+' : '') + bfDelta.toFixed(1) + '%';

    document.getElementById('projCalsBurned').textContent = totalBurn.toLocaleString();

    // Projection chart
    if (charts.projection) {
        // Actual weight history (last 30 entries)
        const actualLabels = wh.slice(-30).map(w => formatDate(w.date));
        const actualData = wh.slice(-30).map(w => w.weight);

        // Projected future
        const projLabels = [];
        const projData = [];
        for (let i = 0; i <= Math.min(days, 60); i += Math.max(1, Math.floor(days / 30))) {
            const d = new Date(); d.setDate(d.getDate() + i);
            projLabels.push(formatDate(d.toISOString().split('T')[0]));
            projData.push(+(currentW + (projectedWeightChange * i / days)).toFixed(1));
        }

        const allLabels = [...actualLabels, ...projLabels];
        const padActual = [...actualData, ...new Array(projLabels.length).fill(null)];
        const padProj = [...new Array(actualLabels.length).fill(null), ...projData];
        // Connect the projection line to the last actual point
        if (actualData.length > 0) padProj[actualLabels.length - 1] = actualData[actualData.length - 1];

        charts.projection.data.labels = allLabels;
        charts.projection.data.datasets[0].data = padActual;
        charts.projection.data.datasets[1].data = padProj;
        charts.projection.update();
    }
}

// ─── Weekly Calendar ─────────────────────────
function renderWeeklyCalendar() {
    const container = document.getElementById('weeklyCalendar');
    if (!container) return;
    const meals = loadUserData('meals'), workouts = loadUserData('workouts');
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let html = '';
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today); d.setDate(today.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        const cal = meals.filter(m => m.date === ds).reduce((s, m) => s + m.calories * m.quantity, 0);
        const hasActivity = meals.some(m => m.date === ds) || workouts.some(w => w.date === ds);
        html += `<div class="calendar-day${hasActivity ? ' active' : ''}">
            <p class="day-name">${dayNames[d.getDay()]}</p>
            <div class="day-indicator"></div>
            <p class="day-stat">${Math.round(cal)}</p>
        </div>`;
    }
    container.innerHTML = html;
}

// ─── Milestones ──────────────────────────────
function renderMilestones() {
    const container = document.getElementById('milestonesContainer');
    if (!container) return;
    const workouts = loadUserData('workouts');
    const meals = loadUserData('meals');
    const wh = loadUserData('weight_log') || [];
    const water = loadUserData('water');

    const allDates = new Set([...meals.map(m => m.date), ...workouts.map(w => w.date), ...water.map(w => w.date)]);
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const d = new Date(today); d.setDate(today.getDate() - i);
        if (allDates.has(d.toISOString().split('T')[0])) streak++; else break;
    }

    const milestones = [
        { icon: '🎯', title: 'First Workout', desc: 'Logged your first exercise', done: workouts.length >= 1 },
        { icon: '🍽️', title: 'First Meal', desc: 'Logged your first meal', done: meals.length >= 1 },
        { icon: '🔥', title: '7-Day Streak', desc: '7 consecutive tracking days', done: streak >= 7 },
        { icon: '💪', title: '30-Day Champion', desc: '30 days of consistency', done: streak >= 30 },
        { icon: '🏋️', title: '100 Workouts', desc: '100 workout sessions', done: workouts.length >= 100 },
        { icon: '🥗', title: '500 Meals', desc: 'Logged 500 meals', done: meals.length >= 500 },
        { icon: '⭐', title: '10 lbs Change', desc: 'Lost or gained 10 lbs', done: wh.length >= 2 && Math.abs(wh[0].weight - wh[wh.length - 1].weight) >= 10 },
        { icon: '🔥', title: '1000 Cal Day', desc: 'Burned 1000 cal in a day', done: (() => { const bd = {}; workouts.forEach(w => { bd[w.date] = (bd[w.date] || 0) + (w.caloriesBurned || 0); }); return Object.values(bd).some(v => v >= 1000); })() },
    ];

    container.innerHTML = milestones.map(m =>
        `<div class="milestone-card${m.done ? ' achieved' : ''}">
            <div class="milestone-icon">${m.icon}</div>
            <h4>${m.title}</h4>
            <p>${m.desc}</p>
        </div>`
    ).join('');
}

// ─── Export ──────────────────────────────────
function exportData(format) {
    const data = { user: currentUser, meals: loadUserData('meals'), workouts: loadUserData('workouts'), water: loadUserData('water'), weightLog: loadUserData('weight_log'), activity: loadUserData('activity'), bmi: loadUserData('bmi') };

    if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        dl(blob, `fitforge-data-${getTodayDate()}.json`);
    } else {
        let csv = 'Date,Meal Type,Food,Qty,Calories,Protein,Carbs,Fat\n';
        data.meals.forEach(m => csv += `${m.date},${m.mealType},"${m.foodName}",${m.quantity},${m.calories},${m.protein},${m.carbs},${m.fat}\n`);
        dl(new Blob([csv], { type: 'text/csv' }), `fitforge-meals-${getTodayDate()}.csv`);
    }
    showNotification('Data exported!');
}

function dl(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
}
