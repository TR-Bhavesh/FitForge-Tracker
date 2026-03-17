// Exercise database
const exerciseDatabase = [
    // Cardio
    { name: 'Treadmill Walk', category: 'cardio', met: 3.5, description: 'Walking on treadmill' },
    { name: 'Treadmill Incline Walk', category: 'cardio', met: 5.0, description: 'Walking on incline' },
    { name: 'Treadmill Run', category: 'cardio', met: 8.0, description: 'Running on treadmill' },
    { name: 'Jogging', category: 'cardio', met: 7.0, description: 'Outdoor jogging' },
    { name: 'Running', category: 'cardio', met: 9.8, description: 'Fast running' },
    { name: 'Cycling', category: 'cardio', met: 7.5, description: 'Moderate cycling' },
    { name: 'Stationary Bike', category: 'cardio', met: 6.8, description: 'Indoor cycling' },
    { name: 'Swimming', category: 'cardio', met: 8.0, description: 'General swimming' },
    { name: 'Elliptical', category: 'cardio', met: 6.5, description: 'Elliptical machine' },
    { name: 'Stair Climber', category: 'cardio', met: 8.5, description: 'Stair climbing machine' },
    { name: 'Rowing Machine', category: 'cardio', met: 8.5, description: 'Indoor rowing' },
    { name: 'Jump Rope', category: 'cardio', met: 12.3, description: 'Skipping rope' },
    { name: 'Dancing', category: 'cardio', met: 6.0, description: 'General dancing' },
    { name: 'Hiking', category: 'cardio', met: 6.0, description: 'Outdoor hiking' },
    { name: 'Basketball', category: 'sports', met: 8.0, description: 'Playing basketball' },
    { name: 'Soccer', category: 'sports', met: 10.0, description: 'Playing soccer' },
    { name: 'Tennis', category: 'sports', met: 7.3, description: 'Playing tennis' },
    { name: 'Badminton', category: 'sports', met: 5.5, description: 'Playing badminton' },
    { name: 'Cricket', category: 'sports', met: 5.0, description: 'Playing cricket' },
    { name: 'Table Tennis', category: 'sports', met: 4.0, description: 'Table tennis' },
    
    // Strength Training
    { name: 'Bench Press', category: 'strength', met: 5.0, description: 'Chest exercise' },
    { name: 'Incline Dumbbell Press', category: 'strength', met: 5.0, description: 'Upper chest' },
    { name: 'Decline Bench Press', category: 'strength', met: 5.0, description: 'Lower chest' },
    { name: 'Dumbbell Flyes', category: 'strength', met: 4.5, description: 'Chest isolation' },
    { name: 'Cable Flyes', category: 'strength', met: 4.5, description: 'Chest isolation' },
    { name: 'Chest Press Machine', category: 'strength', met: 4.5, description: 'Machine chest press' },
    { name: 'Push-ups', category: 'strength', met: 3.8, description: 'Bodyweight chest' },
    { name: 'Tricep Dips', category: 'strength', met: 4.2, description: 'Triceps exercise' },
    { name: 'Tricep Pushdown', category: 'strength', met: 4.0, description: 'Cable triceps' },
    { name: 'Skull Crushers', category: 'strength', met: 4.0, description: 'Lying tricep extension' },
    { name: 'Overhead Tricep Extension', category: 'strength', met: 4.0, description: 'Overhead triceps' },
    { name: 'Lat Pulldown', category: 'strength', met: 5.0, description: 'Back exercise' },
    { name: 'Cable Rows', category: 'strength', met: 5.0, description: 'Back rows' },
    { name: 'Barbell Rows', category: 'strength', met: 5.5, description: 'Bent-over rows' },
    { name: 'Dumbbell Rows', category: 'strength', met: 5.0, description: 'One-arm rows' },
    { name: 'T-Bar Rows', category: 'strength', met: 5.5, description: 'T-bar back rows' },
    { name: 'Deadlifts', category: 'strength', met: 6.0, description: 'Full body pull' },
    { name: 'Romanian Deadlift', category: 'strength', met: 5.5, description: 'Hamstring focus' },
    { name: 'Pull-ups', category: 'strength', met: 8.0, description: 'Bodyweight back' },
    { name: 'Chin-ups', category: 'strength', met: 8.0, description: 'Underhand pull-ups' },
    { name: 'Barbell Curls', category: 'strength', met: 4.0, description: 'Biceps exercise' },
    { name: 'Hammer Curls', category: 'strength', met: 4.0, description: 'Biceps variation' },
    { name: 'Preacher Curls', category: 'strength', met: 4.0, description: 'Isolated biceps' },
    { name: 'Concentration Curls', category: 'strength', met: 4.0, description: 'Focused biceps' },
    { name: 'Squats', category: 'strength', met: 6.0, description: 'Leg exercise' },
    { name: 'Front Squats', category: 'strength', met: 6.0, description: 'Quad-dominant squat' },
    { name: 'Hack Squat', category: 'strength', met: 5.5, description: 'Machine squat' },
    { name: 'Leg Press', category: 'strength', met: 5.5, description: 'Quad exercise' },
    { name: 'Leg Curls', category: 'strength', met: 4.5, description: 'Hamstring exercise' },
    { name: 'Leg Extensions', category: 'strength', met: 4.5, description: 'Quad isolation' },
    { name: 'Calf Raises', category: 'strength', met: 4.0, description: 'Calf exercise' },
    { name: 'Lunges', category: 'strength', met: 5.0, description: 'Walking lunges' },
    { name: 'Bulgarian Split Squat', category: 'strength', met: 5.5, description: 'Single-leg squat' },
    { name: 'Hip Thrust', category: 'strength', met: 5.0, description: 'Glute exercise' },
    { name: 'Shoulder Press', category: 'strength', met: 5.0, description: 'Overhead press' },
    { name: 'Dumbbell Shoulder Press', category: 'strength', met: 5.0, description: 'Dumbbell overhead' },
    { name: 'Lateral Raises', category: 'strength', met: 4.5, description: 'Side delts' },
    { name: 'Front Raises', category: 'strength', met: 4.5, description: 'Front delts' },
    { name: 'Rear Delt Flyes', category: 'strength', met: 4.5, description: 'Rear delts' },
    { name: 'Face Pulls', category: 'strength', met: 4.0, description: 'Rear delts / rotator' },
    { name: 'Shrugs', category: 'strength', met: 4.0, description: 'Trap exercise' },
    { name: 'Upright Rows', category: 'strength', met: 4.5, description: 'Traps & delts' },
    
    // Core
    { name: 'Plank', category: 'strength', met: 3.5, description: 'Core stability' },
    { name: 'Bicycle Crunches', category: 'strength', met: 4.0, description: 'Ab exercise' },
    { name: 'Mountain Climbers', category: 'strength', met: 8.0, description: 'Dynamic core' },
    { name: 'Russian Twists', category: 'strength', met: 4.0, description: 'Obliques' },
    { name: 'Leg Raises', category: 'strength', met: 4.5, description: 'Lower abs' },
    { name: 'Sit-ups', category: 'strength', met: 3.8, description: 'Classic abs' },
    { name: 'Cable Crunches', category: 'strength', met: 4.0, description: 'Weighted abs' },
    { name: 'Ab Wheel Rollout', category: 'strength', met: 5.0, description: 'Advanced core' },
    { name: 'Hanging Leg Raise', category: 'strength', met: 5.0, description: 'Advanced lower abs' },
    
    // Flexibility
    { name: 'Yoga', category: 'flexibility', met: 3.0, description: 'General yoga' },
    { name: 'Stretching', category: 'flexibility', met: 2.3, description: 'Static stretching' },
    { name: 'Pilates', category: 'flexibility', met: 3.7, description: 'Core strengthening' },
    { name: 'Foam Rolling', category: 'flexibility', met: 2.0, description: 'Myofascial release' }
];

// Workout templates
const workoutTemplates = {
    'chest-triceps': [
        { exercise: 'Bench Press', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Incline Dumbbell Press', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Cable Flyes', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Tricep Dips', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Treadmill Incline Walk', sets: 1, reps: 1, duration: 30 }
    ],
    'back-biceps': [
        { exercise: 'Lat Pulldown', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Cable Rows', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Deadlifts', sets: 3, reps: 8, duration: 15 },
        { exercise: 'Barbell Curls', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Hammer Curls', sets: 3, reps: 12, duration: 10 }
    ],
    'legs': [
        { exercise: 'Squats', sets: 4, reps: 10, duration: 20 },
        { exercise: 'Leg Press', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Leg Curls', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Calf Raises', sets: 4, reps: 15, duration: 10 },
        { exercise: 'Treadmill Incline Walk', sets: 1, reps: 1, duration: 30 }
    ],
    'shoulders-core': [
        { exercise: 'Shoulder Press', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Lateral Raises', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Front Raises', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Plank', sets: 3, reps: 1, duration: 3 },
        { exercise: 'Bicycle Crunches', sets: 3, reps: 20, duration: 5 },
        { exercise: 'Mountain Climbers', sets: 3, reps: 40, duration: 5 }
    ],
    'cardio': [
        { exercise: 'Treadmill Incline Walk', sets: 1, reps: 1, duration: 30 },
        { exercise: 'Stationary Bike', sets: 1, reps: 1, duration: 20 },
        { exercise: 'Jump Rope', sets: 3, reps: 100, duration: 5 }
    ],
    'full-body': [
        { exercise: 'Deadlifts', sets: 3, reps: 8, duration: 15 },
        { exercise: 'Bench Press', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Pull-ups', sets: 3, reps: 8, duration: 10 },
        { exercise: 'Squats', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Shoulder Press', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Plank', sets: 3, reps: 1, duration: 3 }
    ]
};

// ═══════════════════════════════════════════════
// SESSION STATE
// ═══════════════════════════════════════════════
let activeSession = null;   // { startTime, exercises: [ { name, category, met, sets: [{weight,reps,done}] } ] }
let sessionTimerInterval = null;

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('workout.html')) {
        checkAuth();
        updateUserDisplay();
        loadTodaysWorkout();
        loadActivityData();
        document.getElementById('workoutDate').value = getTodayDate();
        restoreSession();
    }
});

// ═══════════════════════════════════════════════
// LIVE SESSION — start / end / timer
// ═══════════════════════════════════════════════
function startSession() {
    activeSession = {
        startTime: Date.now(),
        exercises: []
    };
    persistSession();
    enterSessionUI();
    showNotification('Workout session started! 💪');
}

function enterSessionUI() {
    document.getElementById('startSessionCard').style.display = 'none';
    document.getElementById('liveSessionBanner').style.display = '';
    document.getElementById('liveAddExercise').style.display = '';

    // Start timer
    if (sessionTimerInterval) clearInterval(sessionTimerInterval);
    sessionTimerInterval = setInterval(updateSessionTimer, 1000);
    updateSessionTimer();
}

function updateSessionTimer() {
    if (!activeSession) return;
    const elapsed = Date.now() - activeSession.startTime;
    const secs = Math.floor(elapsed / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const display = h > 0
        ? `${h}:${String(mm).padStart(2,'0')}:${String(s).padStart(2,'0')}`
        : `${String(mm).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    document.getElementById('sessionTimer').textContent = display;
}

function endSession() {
    if (!activeSession) return;
    if (!confirm('End this workout session?')) return;

    clearInterval(sessionTimerInterval);

    const elapsedMs = Date.now() - activeSession.startTime;
    const totalMin = Math.round(elapsedMs / 60000);
    const date = getTodayDate();
    const workouts = loadUserData('workouts');

    let totalCals = 0;
    let totalSets = 0;
    let totalExercises = activeSession.exercises.filter(ex => ex.sets.some(s => s.done)).length || 1;

    // Distribute time by completed sets proportionally (more sets = more time)
    let totalCompletedSets = 0;
    activeSession.exercises.forEach(ex => { totalCompletedSets += ex.sets.filter(s => s.done).length; });
    if (totalCompletedSets === 0) totalCompletedSets = totalExercises; // fallback

    activeSession.exercises.forEach(ex => {
        const completedSets = ex.sets.filter(s => s.done);
        totalSets += completedSets.length;

        // Duration: proportional to sets completed (not equal split)
        const setFraction = completedSets.length > 0 ? completedSets.length / totalCompletedSets : 1 / totalExercises;
        const durPerExercise = Math.max(1, Math.round(totalMin * setFraction));
        const cals = calculateCaloriesBurned(ex.name, durPerExercise, currentUser.weight, currentUser.height, currentUser.age, currentUser.gender, 'moderate');
        totalCals += cals;

        const workout = {
            id: Date.now() + Math.random(),
            date: date,
            exercise: ex.name,
            category: ex.category,
            duration: durPerExercise,
            intensity: 'moderate',
            caloriesBurned: cals,
            sets: completedSets.length,
            reps: completedSets.length > 0 ? completedSets[0].reps : 0,
            weight: completedSets.length > 0 ? completedSets[0].weight : 0,
            setsDetail: completedSets.map(s => ({ weight: s.weight, reps: s.reps })),
            sessionId: activeSession.startTime,
            timestamp: new Date().toISOString()
        };
        workouts.push(workout);
    });

    saveUserData('workouts', workouts);

    // Show summary
    showSessionSummary(totalMin, totalExercises, totalSets, totalCals);

    // Reset
    activeSession = null;
    clearPersistedSession();
    exitSessionUI();
    loadTodaysWorkout();
}

function exitSessionUI() {
    document.getElementById('startSessionCard').style.display = '';
    document.getElementById('liveSessionBanner').style.display = 'none';
    document.getElementById('liveAddExercise').style.display = 'none';
    document.getElementById('liveExerciseCards').innerHTML = '';
    document.getElementById('sessionExCount').textContent = '0 exercises';
}

function showSessionSummary(mins, exercises, sets, cals) {
    const body = document.getElementById('sessionSummaryBody');
    body.innerHTML = `
        <div class="summary-item"><span class="summary-label">⏱️ Duration</span><span class="summary-value">${mins} min</span></div>
        <div class="summary-item"><span class="summary-label">🏋️ Exercises</span><span class="summary-value">${exercises}</span></div>
        <div class="summary-item"><span class="summary-label">📊 Total Sets</span><span class="summary-value">${sets}</span></div>
        <div class="summary-item"><span class="summary-label">🔥 Calories</span><span class="summary-value">${cals} kcal</span></div>
    `;
    document.getElementById('sessionSummaryModal').style.display = 'flex';
}

function closeSessionSummary() {
    document.getElementById('sessionSummaryModal').style.display = 'none';
}

// Persist session to localStorage so it survives page reload
function persistSession() {
    if (activeSession) {
        localStorage.setItem('fitforge_live_session', JSON.stringify(activeSession));
    }
}
function clearPersistedSession() {
    localStorage.removeItem('fitforge_live_session');
}
function restoreSession() {
    const raw = localStorage.getItem('fitforge_live_session');
    if (raw) {
        try {
            activeSession = JSON.parse(raw);
            enterSessionUI();
            renderAllLiveCards();
        } catch(e) {
            localStorage.removeItem('fitforge_live_session');
        }
    }
}

// ═══════════════════════════════════════════════
// LIVE SESSION — add exercise / sets
// ═══════════════════════════════════════════════
function addExerciseToSession() {
    if (!activeSession) { startSession(); }

    const nameInput = document.getElementById('exerciseSearch');
    const exName = nameInput.value.trim();
    if (!exName) { showNotification('Type an exercise name first'); return; }

    const dbEntry = exerciseDatabase.find(e => e.name.toLowerCase() === exName.toLowerCase());
    const category = dbEntry ? dbEntry.category : (document.getElementById('exerciseCategory').value || 'strength');
    const met = dbEntry ? dbEntry.met : 5.0;

    const exercise = {
        name: dbEntry ? dbEntry.name : exName,
        category: category,
        met: met,
        sets: [{ weight: 0, reps: 0, done: false }]  // start with 1 blank set
    };

    activeSession.exercises.push(exercise);
    persistSession();
    renderAllLiveCards();

    nameInput.value = '';
    document.getElementById('exerciseSuggestions').classList.remove('active');
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length > 1 ? 's' : ''}`;
    showNotification(`Added ${exercise.name}`);
}

function renderAllLiveCards() {
    const container = document.getElementById('liveExerciseCards');
    if (!activeSession) { container.innerHTML = ''; return; }

    container.innerHTML = activeSession.exercises.map((ex, ei) => {
        const allDone = ex.sets.length > 0 && ex.sets.every(s => s.done);
        return `
        <div class="live-exercise-card${allDone ? ' completed' : ''}">
            <div class="live-exercise-header">
                <div>
                    <h3>${ex.name}</h3>
                    <span style="font-size:.8rem;color:var(--text-secondary)">${ex.category}</span>
                </div>
                <button class="btn-delete" onclick="removeSessionExercise(${ei})" title="Remove">✕</button>
            </div>
            <table class="sets-table">
                <thead><tr><th>Set</th><th>Weight (kg)</th><th>Reps</th><th></th></tr></thead>
                <tbody>
                    ${ex.sets.map((s, si) => `
                    <tr class="${s.done ? 'set-done' : ''}">
                        <td>${si + 1}</td>
                        <td><input type="number" min="0" value="${s.weight || ''}" placeholder="0"
                            onchange="updateSet(${ei},${si},'weight',this.value)" ${s.done ? 'disabled' : ''}></td>
                        <td><input type="number" min="0" value="${s.reps || ''}" placeholder="0"
                            onchange="updateSet(${ei},${si},'reps',this.value)" ${s.done ? 'disabled' : ''}></td>
                        <td>
                            <button class="btn-complete-set${s.done ? ' done' : ''}" onclick="toggleSet(${ei},${si})">
                                ${s.done ? '✓' : '○'}
                            </button>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
            <button class="btn-add-set" onclick="addSet(${ei})">+ Add Set</button>
        </div>`;
    }).join('');
}

function updateSet(exIdx, setIdx, field, val) {
    if (!activeSession) return;
    activeSession.exercises[exIdx].sets[setIdx][field] = parseFloat(val) || 0;
    persistSession();
}

function toggleSet(exIdx, setIdx) {
    if (!activeSession) return;
    const s = activeSession.exercises[exIdx].sets[setIdx];
    s.done = !s.done;
    persistSession();
    renderAllLiveCards();
}

function addSet(exIdx) {
    if (!activeSession) return;
    const lastSet = activeSession.exercises[exIdx].sets.slice(-1)[0];
    activeSession.exercises[exIdx].sets.push({
        weight: lastSet ? lastSet.weight : 0,
        reps: lastSet ? lastSet.reps : 0,
        done: false
    });
    persistSession();
    renderAllLiveCards();
}

function removeSessionExercise(exIdx) {
    if (!activeSession) return;
    if (!confirm(`Remove ${activeSession.exercises[exIdx].name}?`)) return;
    activeSession.exercises.splice(exIdx, 1);
    persistSession();
    renderAllLiveCards();
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length !== 1 ? 's' : ''}`;
}

// ═══════════════════════════════════════════════
// EXERCISE SEARCH (session search + quick-log)
// ═══════════════════════════════════════════════
function searchExercise() {
    const searchTerm = document.getElementById('exerciseSearch').value.toLowerCase();
    const suggestions = document.getElementById('exerciseSuggestions');
    
    if (searchTerm.length < 2) { suggestions.classList.remove('active'); return; }
    
    let matches = exerciseDatabase.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) || ex.description.toLowerCase().includes(searchTerm)
    );
    const category = document.getElementById('exerciseCategory').value;
    if (category) matches = matches.filter(ex => ex.category === category);
    matches = matches.slice(0, 8);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(ex => `
            <div class="suggestion-item" onclick="selectExercise('${ex.name}', '${ex.category}')">
                <strong>${ex.name}</strong>
                <span>${ex.description} • ${ex.category}</span>
            </div>
        `).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function filterExercises() { searchExercise(); }

function selectExercise(exerciseName, category) {
    document.getElementById('exerciseSearch').value = exerciseName;
    document.getElementById('exerciseSuggestions').classList.remove('active');
}

// Quick-log search (separate inputs)
function searchExerciseQuick() {
    const searchTerm = document.getElementById('quickExSearch').value.toLowerCase();
    const suggestions = document.getElementById('quickExSuggestions');
    
    if (searchTerm.length < 2) { suggestions.classList.remove('active'); return; }
    
    let matches = exerciseDatabase.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm) || ex.description.toLowerCase().includes(searchTerm)
    );
    const category = document.getElementById('quickExCategory').value;
    if (category) matches = matches.filter(ex => ex.category === category);
    matches = matches.slice(0, 8);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(ex => `
            <div class="suggestion-item" onclick="selectExerciseQuick('${ex.name}', '${ex.category}')">
                <strong>${ex.name}</strong>
                <span>${ex.description} • ${ex.category}</span>
            </div>
        `).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function selectExerciseQuick(exerciseName, category) {
    document.getElementById('quickExSearch').value = exerciseName;
    document.getElementById('quickExSuggestions').classList.remove('active');
    const sf = document.getElementById('quickStrengthFields');
    if (category === 'strength') sf.classList.remove('hidden'); else sf.classList.add('hidden');
}

// ═══════════════════════════════════════════════
// QUICK LOG — add exercise directly (no session)
// ═══════════════════════════════════════════════
function addExercise() {
    const exerciseName = document.getElementById('quickExSearch').value;
    const duration = parseInt(document.getElementById('quickExDuration').value);
    const intensity = document.getElementById('quickExIntensity').value;
    const notes = document.getElementById('quickExNotes').value;
    const date = document.getElementById('workoutDate').value || getTodayDate();
    
    if (!exerciseName || !duration) {
        alert('Please enter exercise name and duration');
        return;
    }
    
    const exercise = exerciseDatabase.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
    let category = exercise ? exercise.category : 'cardio';
    
    const caloriesBurned = calculateCaloriesBurned(exerciseName, duration, currentUser.weight, currentUser.height, currentUser.age, currentUser.gender, intensity);
    
    const workout = {
        id: Date.now(),
        date: date,
        exercise: exerciseName,
        category: category,
        duration: duration,
        intensity: intensity,
        caloriesBurned: caloriesBurned,
        notes: notes,
        timestamp: new Date().toISOString()
    };
    
    if (category === 'strength') {
        workout.sets = parseInt(document.getElementById('quickExSets').value) || 0;
        workout.reps = parseInt(document.getElementById('quickExReps').value) || 0;
        workout.weight = parseInt(document.getElementById('quickExWeight').value) || 0;
    }
    
    const workouts = loadUserData('workouts');
    workouts.push(workout);
    saveUserData('workouts', workouts);
    
    // Clear
    document.getElementById('quickExSearch').value = '';
    document.getElementById('quickExDuration').value = '';
    document.getElementById('quickExNotes').value = '';
    document.getElementById('quickExSets').value = '';
    document.getElementById('quickExReps').value = '';
    document.getElementById('quickExWeight').value = '';
    
    loadTodaysWorkout();
    showNotification(`Logged ${exerciseName}! Burned ${caloriesBurned} calories!`);
}

// ═══════════════════════════════════════════════
// TODAY'S WORKOUT DISPLAY
// ═══════════════════════════════════════════════
function loadTodaysWorkout() {
    const date = document.getElementById('workoutDate')?.value || getTodayDate();
    const workouts = getDataForDate('workouts', date);
    
    const container = document.getElementById('todayWorkouts');
    
    if (workouts.length === 0) {
        container.innerHTML = '<p class="empty-message">No exercises logged yet. Start your workout!</p>';
        document.getElementById('todayCaloriesBurned').textContent = '0';
        document.getElementById('todayDuration').textContent = '0';
        document.getElementById('todayExercises').textContent = '0';
        return;
    }
    
    let totalCalories = 0, totalDuration = 0;
    workouts.forEach(w => { totalCalories += w.caloriesBurned || 0; totalDuration += w.duration || 0; });
    
    document.getElementById('todayCaloriesBurned').textContent = totalCalories;
    document.getElementById('todayDuration').textContent = totalDuration;
    document.getElementById('todayExercises').textContent = workouts.length;
    
    container.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div class="workout-header">
                <div>
                    <h4>${workout.exercise}</h4>
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">${workout.category} • ${workout.intensity} intensity</span>
                </div>
                <button class="btn-delete" onclick="deleteWorkout(${workout.id})">Delete</button>
            </div>
            <div class="workout-details">
                <div class="workout-detail"><span>Duration</span><span>${workout.duration} min</span></div>
                <div class="workout-detail"><span>Calories</span><span>${workout.caloriesBurned} kcal</span></div>
                ${workout.sets ? `<div class="workout-detail"><span>Sets</span><span>${workout.sets}</span></div>` : ''}
                ${workout.setsDetail ? `<div class="workout-detail"><span>Detail</span><span>${workout.setsDetail.map((s,i)=>`S${i+1}: ${s.weight}kg×${s.reps}`).join(', ')}</span></div>` : 
                    (workout.sets && workout.reps ? `<div class="workout-detail"><span>Sets × Reps</span><span>${workout.sets} × ${workout.reps}</span></div>` : '')}
                ${workout.weight ? `<div class="workout-detail"><span>Weight</span><span>${workout.weight} kg</span></div>` : ''}
            </div>
            ${workout.notes ? `<p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">📝 ${workout.notes}</p>` : ''}
        </div>
    `).join('');
}

function deleteWorkout(workoutId) {
    if (!confirm('Delete this workout entry?')) return;
    let workouts = loadUserData('workouts');
    workouts = workouts.filter(w => w.id !== workoutId);
    saveUserData('workouts', workouts);
    loadTodaysWorkout();
    showNotification('Workout deleted');
}

function loadWorkoutForDate() { loadTodaysWorkout(); }

// ═══════════════════════════════════════════════
// TEMPLATES — now starts a live session
// ═══════════════════════════════════════════════
function loadTemplate(templateId) {
    const template = workoutTemplates[templateId];
    if (!template) return;

    // Start a session with template exercises
    if (!activeSession) {
        activeSession = { startTime: Date.now(), exercises: [] };
    }

    template.forEach(item => {
        const dbEntry = exerciseDatabase.find(e => e.name === item.exercise);
        if (!dbEntry) return;
        const sets = [];
        for (let i = 0; i < (item.sets || 3); i++) {
            sets.push({ weight: 0, reps: item.reps || 0, done: false });
        }
        activeSession.exercises.push({
            name: item.exercise,
            category: dbEntry.category,
            met: dbEntry.met,
            sets: sets
        });
    });

    persistSession();
    enterSessionUI();
    renderAllLiveCards();
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length > 1 ? 's' : ''}`;
    showNotification('Template loaded into session! Fill in weights & reps as you go.');
}

// ═══════════════════════════════════════════════
// ACTIVITY TRACKING (unchanged)
// ═══════════════════════════════════════════════
function loadActivityData() {
    const today = getTodayDate();
    const activityData = getDataForDate('activity', today);
    
    let steps = 0, activeMinutes = 0;
    if (activityData.length > 0) {
        const latest = activityData[activityData.length - 1];
        steps = latest.steps || 0;
        activeMinutes = latest.activeMinutes || 0;
    }
    
    document.getElementById('stepsToday').value = steps;
    document.getElementById('activeMinutes').value = activeMinutes;
    updateSteps();
    updateActiveMinutes();
}

function updateSteps() {
    const steps = parseInt(document.getElementById('stepsToday').value) || 0;
    const percentage = Math.min((steps / 10000) * 100, 100);
    document.getElementById('stepsDisplay').textContent = steps.toLocaleString();
    document.getElementById('stepsProgress').style.width = percentage + '%';
    saveActivityData();
}

function updateActiveMinutes() {
    const minutes = parseInt(document.getElementById('activeMinutes').value) || 0;
    const percentage = Math.min((minutes / 60) * 100, 100);
    document.getElementById('activeDisplay').textContent = minutes;
    document.getElementById('activeProgress').style.width = percentage + '%';
    saveActivityData();
}

function saveActivityData() {
    const today = getTodayDate();
    const steps = parseInt(document.getElementById('stepsToday').value) || 0;
    const activeMinutes = parseInt(document.getElementById('activeMinutes').value) || 0;
    
    let allActivity = loadUserData('activity');
    allActivity = allActivity.filter(a => a.date !== today);
    allActivity.push({
        id: Date.now(),
        date: today,
        steps: steps,
        activeMinutes: activeMinutes,
        timestamp: new Date().toISOString()
    });
    saveUserData('activity', allActivity);
}
