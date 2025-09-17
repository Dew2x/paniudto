// Paniudto Restaurant Website - JavaScript
// IT Student Project - Enhanced with JSON Database Integration
// FileMaker Pro Compatible

// ===== DATABASE INTEGRATION =====
// Modern async/await user management with JSON database

// Initialize database connection
let database = null;

// Initialize database when page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        if (window.PaniudtoDB) {
            database = window.PaniudtoDB;
            console.log('✅ Database connection established');
        } else {
            console.warn('Database not available, falling back to localStorage');
            initializeUsers(); // Fallback to old system
        }
    } catch (error) {
        console.error('Database initialization failed:', error);
        initializeUsers(); // Fallback to old system
    }
});

// Legacy localStorage functions (fallback)
function initializeUsers() {
    if (!localStorage.getItem('paniudtoUsers')) {
        const defaultUsers = [
            { username: 'student', password: 'password123' },
            { username: 'admin', password: 'admin123' },
            { username: 'test', password: 'test123' }
        ];
        localStorage.setItem('paniudtoUsers', JSON.stringify(defaultUsers));
    }
}

function getAllUsers() {
    initializeUsers();
    return JSON.parse(localStorage.getItem('paniudtoUsers'));
}

function addUser(username, password) {
    const users = getAllUsers();
    users.push({ username: username, password: password });
    localStorage.setItem('paniudtoUsers', JSON.stringify(users));
}

function userExists(username) {
    const users = getAllUsers();
    return users.find(u => u.username === username);
}

// ===== MODERN DATABASE FUNCTIONS =====

// Get all users from JSON database
async function getAllUsersAsync() {
    try {
        if (database) {
            return await database.getUsers();
        } else {
            return getAllUsers().map((user, index) => ({
                id: index + 1,
                username: user.username,
                password: user.password,
                email: `${user.username}@paniudto.com`,
                created_at: new Date().toISOString(),
                last_login: null,
                role: user.username === 'admin' ? 'admin' : 'user'
            }));
        }
    } catch (error) {
        console.error('Error getting users:', error);
        return getAllUsers();
    }
}

// Check if user exists in JSON database
async function userExistsAsync(username) {
    try {
        if (database) {
            const user = await database.getUserByUsername(username);
            return user;
        } else {
            return userExists(username);
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return userExists(username);
    }
}

// Add user to JSON database
async function addUserAsync(username, password, email) {
    try {
        if (database) {
            return await database.addUser({
                username: username,
                password: password,
                email: email || `${username}@paniudto.com`
            });
        } else {
            addUser(username, password);
            return { username, password, email: email || `${username}@paniudto.com` };
        }
    } catch (error) {
        console.error('Error adding user:', error);
        addUser(username, password);
        return { username, password, email: email || `${username}@paniudto.com` };
    }
}

// Update user last login
async function updateUserLoginAsync(username) {
    try {
        if (database) {
            await database.updateUserLogin(username);
        }
    } catch (error) {
        console.error('Error updating user login:', error);
    }
}

// Local dishes from Cantilan, Surigao del Sur
const cantilanDishes = [
    {
        id: 1,
        name: 'Kinilaw na Tuna',
        description: 'Fresh tuna cured in vinegar and calamansi, mixed with onions, ginger, and local herbs. A signature dish of coastal Cantilan.',
        price: '₱280',
        image: 'images/kinilaw-tuna.jpg',
        fallbackEmoji: '🐟'
    },
    {
        id: 2,
        name: 'Tinolang Isda',
        description: 'Clear fish soup with ginger, malunggay leaves, and fresh fish caught from Cantilan waters. Comfort food at its finest.',
        price: '₱220',
        image: 'images/tinolang-isda.jpg',
        fallbackEmoji: '🍲'
    },
    {
        id: 3,
        name: 'Sinuglaw',
        description: 'A fusion of sinugba (grilled pork) and kinilaw (ceviche). A perfect combination of smoky and tangy flavors.',
        price: '₱320',
        image: 'images/sinuglaw.jpg',
        fallbackEmoji: '🥩'
    },
    {
        id: 4,
        name: 'Lato Salad',
        description: 'Fresh sea grapes with tomatoes, onions, and local vinegar dressing. A healthy and refreshing seaweed delicacy.',
        price: '₱150',
        image: 'images/lato-salad.jpg',
        fallbackEmoji: '🥗'
    },
    {
        id: 5,
        name: 'Lechon Kawali Cantilan Style',
        description: 'Crispy pork belly with a unique Cantilan marinade, served with spiced vinegar and rice.',
        price: '₱380',
        image: 'images/lechon-kawali.jpg',
        fallbackEmoji: '🍖'
    },
    {
        id: 6,
        name: 'Buko Pie',
        description: 'Traditional coconut pie made with fresh coconut from local farms. A sweet ending to your meal.',
        price: '₱120',
        image: 'images/buko-pie.jpg',
        fallbackEmoji: '🥥'
    },
    {
        id: 7,
        name: 'Ginataang Langka',
        description: 'Young jackfruit cooked in coconut milk with shrimp and local spices. A creamy, flavorful vegetable dish.',
        price: '₱200',
        image: 'images/ginataang-langka.jpg',
        fallbackEmoji: '🍛'
    },
    {
        id: 8,
        name: 'Pancit Cantilan',
        description: 'Local version of pancit with fresh seafood, vegetables, and a special sauce recipe passed down through generations.',
        price: '₱180',
        image: 'images/pancit-cantilan.jpg',
        fallbackEmoji: '🍜'
    }
];

// ===== UTILITY FUNCTIONS =====

// Simple function to get current user from localStorage
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Simple function to set current user in localStorage
function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

// Simple function to clear current user
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// ===== LOGIN FUNCTIONALITY =====

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');
            
            // Simple validation
            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            try {
                // Check credentials against JSON database
                const users = await getAllUsersAsync();
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    // Login successful
                    setCurrentUser(username);
                    await updateUserLoginAsync(username); // Update last login time
                    updateNavigation(); // Update nav immediately
                    showSuccess('Login successful! Redirecting to dashboard...');
                    
                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    showError('Invalid username or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                showError('Login failed. Please try again.');
            }
        });
    }
});

// ===== REGISTER FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('register-message');
            
            // Simple validation
            if (!username || !password || !confirmPassword) {
                showRegisterMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showRegisterMessage('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showRegisterMessage('Password must be at least 6 characters', 'error');
                return;
            }
            
            try {
                // Check if username already exists in JSON database
                const existingUser = await userExistsAsync(username);
                if (existingUser) {
                    showRegisterMessage('Username already exists', 'error');
                    return;
                }
                
                // Save user to JSON database
                await addUserAsync(username, password, `${username}@paniudto.com`);
                
                showRegisterMessage('Registration successful! Account created and synced with database.', 'success');
                
                // Clear form
                registerForm.reset();
                
                // Redirect to login after delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                
            } catch (error) {
                console.error('Registration error:', error);
                showRegisterMessage('Registration failed. Please try again.', 'error');
            }
        });
    }
});

// ===== DASHBOARD FUNCTIONALITY =====

// Check if user is logged in for dashboard access
function checkLoginStatus() {
    const currentUser = getCurrentUser();
    const welcomeUser = document.getElementById('welcomeUser');
    
    // If we're on the dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        if (!currentUser) {
            // Redirect to login if not logged in
            alert('Please login to access the dashboard');
            window.location.href = 'login.html';
            return;
        } else {
            // Show welcome message
            if (welcomeUser) {
                welcomeUser.textContent = `Welcome back, ${currentUser}!`;
            }
        }
    }
}

// Load dishes into the dashboard
async function loadDishes() {
    const dishesGrid = document.querySelector('.dishes-grid');
    
    if (dishesGrid) {
        // Show loading message
        dishesGrid.innerHTML = '<div class="loading">Loading delicious dishes from database...</div>';
        
        try {
            // Get dishes from JSON database
            let dishes;
            if (database) {
                dishes = await database.getDishes();
                console.log('✅ Dishes loaded from JSON database');
            } else {
                dishes = cantilanDishes;
                console.log('📦 Using fallback dishes data');
            }
            
            // Clear loading message
            dishesGrid.innerHTML = '';
            
            // Create dish cards
            dishes.forEach(dish => {
                const dishCard = createDishCard(dish);
                dishesGrid.appendChild(dishCard);
            });
            
            // Add fade-in animation
            dishesGrid.classList.add('fade-in');
            
        } catch (error) {
            console.error('Error loading dishes:', error);
            dishesGrid.innerHTML = '<div class="error">Failed to load dishes. Using default menu...</div>';
            
            // Fallback to static dishes
            setTimeout(() => {
                dishesGrid.innerHTML = '';
                cantilanDishes.forEach(dish => {
                    const dishCard = createDishCard(dish);
                    dishesGrid.appendChild(dishCard);
                });
                dishesGrid.classList.add('fade-in');
            }, 1000);
        }
    }
}

// Create a dish card element
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    
    // Handle both old and new dish data formats
    const fallbackEmoji = dish.fallback_emoji || dish.fallbackEmoji || '🍽️';
    const available = dish.available !== undefined ? dish.available : true;
    const category = dish.category ? `<span class="dish-category">${dish.category}</span>` : '';
    const prepTime = dish.prep_time ? `<span class="prep-time">⏱️ ${dish.prep_time} min</span>` : '';
    
    card.innerHTML = `
        <div class="dish-image ${!available ? 'unavailable' : ''}">
            <img src="${dish.image}" alt="${dish.name}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="emoji-fallback" style="display:none;">
                ${fallbackEmoji}
            </div>
            ${!available ? '<div class="unavailable-overlay">Unavailable</div>' : ''}
        </div>
        <div class="dish-content">
            <div class="dish-header">
                <h3>${dish.name}</h3>
                ${category}
            </div>
            <p>${dish.description}</p>
            <div class="dish-footer">
                <div class="dish-price">${dish.price}</div>
                ${prepTime}
            </div>
        </div>
    `;
    
    return card;
}

// ===== LOGOUT FUNCTIONALITY =====

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        updateNavigation(); // Update nav immediately
        alert('You have been logged out successfully');
        window.location.href = 'index.html';
    }
}

// ===== UTILITY FUNCTIONS FOR MESSAGES =====

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.className = 'success-message';
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.className = 'error-message'; // Reset class
        }, 5000);
    }
}

function showRegisterMessage(message, type) {
    const messageDiv = document.getElementById('register-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// ===== NAVIGATION HELPER =====

// Check login status immediately when script loads (before DOM)
const currentUserOnLoad = getCurrentUser();

// Update navigation based on login status and highlight current page
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationFast();
    highlightCurrentPage();
});

// Fast navigation update - uses pre-loaded user status
function updateNavigationFast() {
    const loginButton = document.querySelector('.login-btn');
    
    if (loginButton) {
        if (currentUserOnLoad) {
            // User is logged in - show logout
            loginButton.textContent = 'Logout';
            loginButton.href = '#';
            loginButton.onclick = logout;
            loginButton.removeAttribute('href');
        } else {
            // User is not logged in - show login
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
        
        // Mark button as ready (makes it visible via CSS)
        loginButton.classList.add('ready');
    }
}

// Update navigation to show Login/Logout based on user status (for live updates)
function updateNavigation() {
    const currentUser = getCurrentUser();
    const loginButton = document.querySelector('.login-btn');
    
    if (loginButton) {
        if (currentUser) {
            // User is logged in - show logout
            loginButton.textContent = 'Logout';
            loginButton.href = '#';
            loginButton.onclick = logout;
            loginButton.removeAttribute('href');
        } else {
            // User is not logged in - show login
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
        
        // Ensure button is visible
        loginButton.classList.add('ready');
    }
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== SIMPLE FORM ENHANCEMENTS =====

// Add some basic form interaction improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
});

// ===== CONSOLE MESSAGES FOR DEMO =====

console.log('🍽️ Paniudto Restaurant Website Loaded!');
console.log('Demo Login Credentials:');
console.log('Username: student, Password: password123');
console.log('Username: admin, Password: admin123');
console.log('Username: test, Password: test123');
console.log('---');
console.log('✅ User registration now saves to localStorage!');
console.log('New accounts will persist between page loads.');
console.log('This is an IT student project showcasing local Cantilan cuisine!');
