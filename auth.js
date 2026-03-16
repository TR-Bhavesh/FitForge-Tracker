// Authentication functions
function showSignup() {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function showLogin() {
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    
    // Find user
    const user = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
        // Set current user
        localStorage.setItem('fitforge_current_user', JSON.stringify(user));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again or sign up.');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const age = parseInt(document.getElementById('signupAge').value);
    const gender = document.getElementById('signupGender').value;
    const height = parseFloat(document.getElementById('signupHeight').value);
    const weight = parseFloat(document.getElementById('signupWeight').value);
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
    
    // Check if username or email already exists
    if (users.some(u => u.username === username || u.email === email)) {
        alert('Username or email already exists. Please choose different credentials.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        username,
        password,
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
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('fitforge_users', JSON.stringify(users));
    
    // Set as current user
    localStorage.setItem('fitforge_current_user', JSON.stringify(newUser));
    
    // Show success message
    alert('Account created successfully! Welcome to FitForge!');
    
    // Redirect to dashboard
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
