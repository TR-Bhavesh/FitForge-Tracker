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
