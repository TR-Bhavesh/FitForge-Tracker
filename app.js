// Common application functions
let currentUser = null;

// ── Hamburger mobile nav ─────────────────────
function toggleMobileNav() {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.toggle('open');
}

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('fitforge_current_user');
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    currentUser = JSON.parse(user);
    return currentUser;
}

// Update user display name
function updateUserDisplay() {
    const user = checkAuth();
    if (user) {
        const userNameElements = document.querySelectorAll('#userName, #userNameMain');
        userNameElements.forEach(element => {
            if (element) {
                element.textContent = user.name.split(' ')[0];
            }
        });
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('fitforge_current_user');
        window.location.href = 'index.html';
    }
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Format time for display
function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Get user data key
function getUserDataKey(dataType) {
    return `fitforge_${currentUser.id}_${dataType}`;
}

// Save user data
function saveUserData(dataType, data) {
    localStorage.setItem(getUserDataKey(dataType), JSON.stringify(data));
}

// Load user data
function loadUserData(dataType) {
    const data = localStorage.getItem(getUserDataKey(dataType));
    return data ? JSON.parse(data) : [];
}

// Get data for specific date
function getDataForDate(dataType, date) {
    const allData = loadUserData(dataType);
    return allData.filter(item => item.date === date);
}

// Calculate BMI
function calculateBMIValue(weightLbs, heightInches) {
    // BMI = (weight in pounds × 703) / (height in inches²)
    return (weightLbs * 703) / (heightInches * heightInches);
}

// Get BMI category
function getBMICategory(bmi) {
    if (bmi < 18.5) return { text: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { text: 'Normal Weight', color: '#22c55e' };
    if (bmi < 30) return { text: 'Overweight', color: '#f59e0b' };
    return { text: 'Obese', color: '#ef4444' };
}

// Calculate calories burned for exercise (BMI-aware)
function calculateCaloriesBurned(exercise, duration, weight, heightCm, age, gender, intensity) {
    // MET values for different exercises
    const metValues = {
        // Cardio
        'walking': 3.5, 'walk': 3.5, 'incline_walk': 4.5, 'jogging': 7.0,
        'running': 9.8, 'run': 9.8, 'sprinting': 14.5,
        'cycling': 7.5, 'bike': 6.5, 'stationary_bike': 6.5,
        'swimming': 8.0, 'swim': 8.0, 'treadmill': 7.0,
        'elliptical': 6.5, 'stair_climber': 8.5, 'stair': 8.5,
        'rowing': 8.5, 'row': 5.0, 'jump_rope': 12.3,
        'dancing': 6.0, 'dance': 6.0, 'hiking': 6.0, 'hike': 6.0,
        'basketball': 8.0, 'soccer': 10.0, 'football': 8.0,
        'tennis': 7.3, 'badminton': 5.5, 'volleyball': 4.0,
        'table_tennis': 4.0, 'cricket': 5.0,
        'boxing': 9.0, 'kickboxing': 10.0, 'martial_arts': 10.3,
        'hiit': 12.0, 'zumba': 6.5, 'aerobics': 7.3,
        'spinning': 8.5, 'climbing': 8.0, 'skiing': 7.0,
        'skateboarding': 5.0, 'surfing': 3.0,
        // Strength Training — compound
        'bench_press': 5.0, 'bench': 5.0, 'chest_press': 4.5,
        'incline': 5.0, 'decline': 5.0, 'flyes': 3.8, 'fly': 3.8,
        'squats': 6.0, 'squat': 6.0, 'front_squat': 6.0, 'hack_squat': 5.5,
        'deadlifts': 6.0, 'deadlift': 6.0, 'romanian': 5.5,
        'pullups': 8.0, 'pull_up': 8.0, 'chin_up': 8.0, 'pull': 5.0,
        'pushups': 3.8, 'push_up': 3.8, 'push': 3.8,
        'plank': 3.5, 'weightlifting': 5.0, 'bodyweight': 4.5,
        'overhead_press': 5.0, 'shoulder_press': 5.0, 'press': 5.0,
        'barbell_curls': 4.5, 'barbell_curl': 4.5, 'curl': 4.5,
        'lunges': 5.5, 'lunge': 5.5, 'split_squat': 5.5, 'bulgarian': 5.5,
        'leg_press': 5.5, 'leg_curl': 4.5, 'leg_extension': 4.5,
        'calf_raise': 3.5, 'calf': 3.5, 'hip_thrust': 5.5,
        'lat_pulldown': 5.0, 'lat': 5.0, 'cable': 4.5,
        'dumbbell': 5.0, 'kettlebell': 6.0, 'battle_ropes': 10.3,
        'resistance_band': 4.0, 'hammer_curls': 4.5, 'hammer': 4.5,
        'tricep': 4.5, 'dips': 5.0, 'dip': 5.0, 'skull_crusher': 4.5,
        'shrug': 4.0, 'shrugs': 4.0, 'upright_row': 4.5,
        'lateral_raise': 3.8, 'front_raise': 3.8, 'rear_delt': 3.8,
        'face_pull': 3.8, 'preacher': 4.5, 'concentration': 4.0,
        't_bar': 5.5, 'mountain_climber': 8.0, 'crunches': 3.5,
        'crunch': 3.5, 'sit_up': 3.5, 'russian_twist': 4.0,
        'leg_raise': 4.0, 'ab_wheel': 5.0, 'hanging': 5.0,
        // Flexibility
        'yoga': 3.0, 'stretching': 2.3, 'stretch': 2.3,
        'pilates': 3.7, 'tai_chi': 3.0, 'foam_rolling': 2.0, 'foam': 2.0
    };

    const exerciseLower = exercise.toLowerCase().replace(/[\s\-]+/g, '_');
    let met = 5.0; // Default
    let bestLen = 0;

    // Find the longest matching key (more specific match wins)
    for (const [key, value] of Object.entries(metValues)) {
        if (exerciseLower.includes(key) && key.length > bestLen) {
            met = value;
            bestLen = key.length;
        } else if (key.includes(exerciseLower) && exerciseLower.length > bestLen) {
            met = value;
            bestLen = exerciseLower.length;
        }
    }

    // Intensity multiplier
    if (intensity === 'low') met *= 0.8;
    else if (intensity === 'high') met *= 1.2;

    const weightKg = weight * 0.453592;
    const timeHours = duration / 60;

    // Base burn = MET × weight(kg) × time(hours)
    let burn = met * weightKg * timeHours;

    // BMI adjustment — overweight individuals burn slightly more due to extra mass
    if (heightCm && weight) {
        const heightIn = heightCm / 2.54;
        const bmi = calculateBMIValue(weight, heightIn);
        if (bmi > 30) burn *= 1.08;        // obese: +8%
        else if (bmi > 25) burn *= 1.04;   // overweight: +4%
        else if (bmi < 18.5) burn *= 0.95; // underweight: -5%
    }

    // Age adjustment — older individuals have lower efficiency
    if (age) {
        if (age > 50) burn *= 0.92;
        else if (age > 40) burn *= 0.96;
    }

    return Math.round(burn);
}

// Calculate daily calorie needs
function calculateDailyCalories(weight, height, age, gender, activityLevel, goal) {
    // Convert to metric
    const weightKg = weight * 0.453592;
    const heightCm = height;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
    
    // Apply activity multiplier
    const tdee = bmr * parseFloat(activityLevel);
    
    // Apply goal adjustment
    const targetCalories = tdee + parseInt(goal);
    
    return Math.round(targetCalories);
}

// Calculate macros
function calculateMacros(calories, goal) {
    let proteinPercent, carbsPercent, fatsPercent;
    
    if (goal < 0) {
        // Weight loss - high protein
        proteinPercent = 0.35;
        carbsPercent = 0.35;
        fatsPercent = 0.30;
    } else if (goal > 0) {
        // Muscle gain - moderate protein, high carbs
        proteinPercent = 0.30;
        carbsPercent = 0.45;
        fatsPercent = 0.25;
    } else {
        // Maintenance
        proteinPercent = 0.30;
        carbsPercent = 0.40;
        fatsPercent = 0.30;
    }
    
    return {
        protein: Math.round((calories * proteinPercent) / 4),
        carbs: Math.round((calories * carbsPercent) / 4),
        fats: Math.round((calories * fatsPercent) / 9)
    };
}

// Initialize date inputs
function initializeDateInputs() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = getTodayDate();
    
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = '.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to   { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to   { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ── Export all FitForge data ──────────────────
function exportAllData() {
    const exportObj = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('fitforge_')) {
            try {
                exportObj[key] = JSON.parse(localStorage.getItem(key));
            } catch {
                exportObj[key] = localStorage.getItem(key);
            }
        }
    }

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fitforge-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Data exported successfully!', 'success');
}

// ── Import FitForge data ─────────────────────
function importAllData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('importStatus');

    if (!file.name.endsWith('.json')) {
        showNotification('Please select a valid .json file', 'error');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            // Validate: must be an object with fitforge_ keys
            if (typeof data !== 'object' || data === null || Array.isArray(data)) {
                throw new Error('Invalid format');
            }

            const keys = Object.keys(data);
            const fitforgeKeys = keys.filter(k => k.startsWith('fitforge_'));
            if (fitforgeKeys.length === 0) {
                throw new Error('No FitForge data found in file');
            }

            // Confirm before importing
            const proceed = confirm(
                'This will import ' + fitforgeKeys.length + ' data entries.\n' +
                'Array data (meals, workouts, water) will be MERGED.\n' +
                'Duplicates are avoided by matching entry IDs.\n\n' +
                'Continue?'
            );
            if (!proceed) {
                event.target.value = '';
                return;
            }

            let imported = 0;
            fitforgeKeys.forEach(key => {
                const val = data[key];
                // Merge arrays by id to avoid duplicates
                if (Array.isArray(val)) {
                    let local = [];
                    try { local = JSON.parse(localStorage.getItem(key)) || []; } catch { local = []; }
                    if (Array.isArray(local)) {
                        const map = new Map();
                        local.forEach(item => { if (item && item.id) map.set(item.id, item); });
                        val.forEach(item => {
                            if (item && item.id && !map.has(item.id)) map.set(item.id, item);
                        });
                        localStorage.setItem(key, JSON.stringify(Array.from(map.values())));
                    } else {
                        localStorage.setItem(key, JSON.stringify(val));
                    }
                } else {
                    localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
                }
                imported++;
            });

            if (statusEl) {
                statusEl.classList.remove('hidden');
                statusEl.innerHTML = '✅ Imported <strong>' + imported + '</strong> data entries successfully.';
            }

            showNotification('Data imported! Refreshing…', 'success');

            // Re-login with imported current user if available
            const importedUser = data['fitforge_current_user'];
            if (importedUser) {
                localStorage.setItem('fitforge_current_user', JSON.stringify(importedUser));
            }

            setTimeout(() => location.reload(), 1200);
        } catch (err) {
            showNotification('Import failed: ' + err.message, 'error');
            if (statusEl) {
                statusEl.classList.remove('hidden');
                statusEl.innerHTML = '❌ Import failed: ' + err.message;
            }
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('diet.html') || 
        window.location.pathname.includes('workout.html') || 
        window.location.pathname.includes('analytics.html')) {
        updateUserDisplay();
        initializeDateInputs();
    }
});
