// Authentication functions

// SHA-256 hash for password storage
async function sha256(text) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', enc.encode(text));
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function showLogin() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const hashed = await sha256(password);
    
    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    
    // Support both hashed and legacy plain-text passwords
    let user = users.find(u => 
        (u.username === username || u.email === username) && u.password === hashed
    );
    
    // Fallback: check plain-text (legacy) and migrate
    if (!user) {
        user = users.find(u => 
            (u.username === username || u.email === username) && u.password === password && !u.password.match(/^[a-f0-9]{64}$/)
        );
        if (user) {
            // Migrate to hashed password
            user.password = hashed;
            localStorage.setItem('fitforge_users', JSON.stringify(users));
        }
    }
    
    if (user) {
        localStorage.setItem('fitforge_current_user', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again or sign up.');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const age = parseInt(document.getElementById('signupAge').value);
    const gender = document.getElementById('signupGender').value;
    const height = parseFloat(document.getElementById('signupHeight').value);
    const weight = parseFloat(document.getElementById('signupWeight').value);
    const hashed = await sha256(password);
    
    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    
    if (users.some(u => u.username === username || u.email === email)) {
        alert('Username or email already exists. Please choose different credentials.');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        username,
        password: hashed,
        age,
        gender,
        height,
        weight,
        createdAt: new Date().toISOString(),
        startWeight: weight,
        calorieGoal: 2000,
        proteinGoal: 150,
        carbsGoal: 200,
        fatsGoal: 65
    };
    
    users.push(newUser);
    localStorage.setItem('fitforge_users', JSON.stringify(users));
    localStorage.setItem('fitforge_current_user', JSON.stringify(newUser));
    
    alert('Account created successfully! Welcome to FitForge!');
    window.location.href = 'dashboard.html';
}

// Import data on login page (uses importAllData from app.js if available, else inline)
function importOnLogin(event) {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith('.json')) {
        alert('Please select a valid .json backup file.');
        event.target.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (typeof data !== 'object' || data === null || Array.isArray(data)) throw new Error('Invalid format');
            const keys = Object.keys(data).filter(k => k.startsWith('fitforge_'));
            if (keys.length === 0) throw new Error('No FitForge data found');
            if (!confirm('Import ' + keys.length + ' data entries? Existing data with same keys will be overwritten.')) {
                event.target.value = '';
                return;
            }
            keys.forEach(key => {
                const val = data[key];
                localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
            });
            alert('Data imported successfully! You can now log in with your existing credentials.');
            location.reload();
        } catch (err) {
            alert('Import failed: ' + err.message);
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default time
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const timeInput = document.getElementById('mealTime');
    if (timeInput) {
        timeInput.value = currentTime;
    }
});
