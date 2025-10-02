// Authentication System for Earth Saver Game
// Uses localStorage for persistent user data

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.loadCurrentUser();
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('earthSaverUsers');
        return users ? JSON.parse(users) : {};
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('earthSaverUsers', JSON.stringify(this.users));
    }

    // Load current user session
    loadCurrentUser() {
        const currentUser = localStorage.getItem('earthSaverCurrentUser');
        if (currentUser) {
            this.currentUser = JSON.parse(currentUser);
        }
    }

    // Save current user session
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('earthSaverCurrentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('earthSaverCurrentUser');
        }
    }

    // Register new user
    register(username, email, password) {
        // Validate input
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        if (username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        // Check if user already exists
        if (this.users[username.toLowerCase()]) {
            throw new Error('Username already exists');
        }

        // Check if email already exists
        for (let user in this.users) {
            if (this.users[user].email.toLowerCase() === email.toLowerCase()) {
                throw new Error('Email already registered');
            }
        }

        // Create new user
        const newUser = {
            username: username,
            email: email,
            password: this.hashPassword(password), // In real app, use proper hashing
            createdAt: new Date().toISOString(),
            stats: {
                gamesPlayed: 0,
                totalScore: 0,
                bestScore: 0,
                questionsAnswered: 0,
                correctAnswers: 0,
                currentStreak: 0,
                bestStreak: 0,
                earthSaved: 0
            },
            achievements: [],
            level: 1,
            experience: 0
        };

        this.users[username.toLowerCase()] = newUser;
        this.saveUsers();

        return newUser;
    }

    // Login user
    login(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const user = this.users[username.toLowerCase()];
        if (!user) {
            throw new Error('Invalid username or password');
        }

        if (user.password !== this.hashPassword(password)) {
            throw new Error('Invalid username or password');
        }

        this.currentUser = user;
        this.saveCurrentUser();

        return user;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user stats after game
    updateUserStats(gameData) {
        if (!this.currentUser) return;

        const stats = this.currentUser.stats;
        stats.gamesPlayed++;
        stats.totalScore += gameData.score;
        stats.bestScore = Math.max(stats.bestScore, gameData.score);
        stats.questionsAnswered += gameData.questionsAnswered;
        stats.correctAnswers += gameData.correctAnswers;
        stats.currentStreak = gameData.finalStreak;
        stats.bestStreak = Math.max(stats.bestStreak, gameData.maxStreak);

        // Earth saved if health >= 80%
        if (gameData.earthHealth >= 80) {
            stats.earthSaved++;
        }

        // Update experience and level
        const experienceGained = Math.floor(gameData.score / 10);
        this.currentUser.experience += experienceGained;
        
        // Level up system (every 1000 XP)
        const newLevel = Math.floor(this.currentUser.experience / 1000) + 1;
        if (newLevel > this.currentUser.level) {
            this.currentUser.level = newLevel;
            this.checkAchievements('levelUp', newLevel);
        }

        // Check for achievements
        this.checkAchievements('gameComplete', gameData);

        // Save updated user data
        this.users[this.currentUser.username.toLowerCase()] = this.currentUser;
        this.saveUsers();
        this.saveCurrentUser();
    }

    // Check and award achievements
    checkAchievements(type, data) {
        const achievements = [];
        const stats = this.currentUser.stats;

        if (type === 'gameComplete') {
            // First game achievement
            if (stats.gamesPlayed === 1) {
                achievements.push({
                    id: 'first_game',
                    name: 'Eco Rookie',
                    description: 'Played your first game!',
                    icon: '🌱',
                    unlockedAt: new Date().toISOString()
                });
            }

            // Perfect score achievement
            if (data.correctAnswers === data.questionsAnswered) {
                achievements.push({
                    id: 'perfect_score',
                    name: 'Eco Expert',
                    description: 'Got 100% correct answers!',
                    icon: '🏆',
                    unlockedAt: new Date().toISOString()
                });
            }

            // Earth saver achievement
            if (data.earthHealth >= 90) {
                achievements.push({
                    id: 'earth_saver',
                    name: 'Planet Protector',
                    description: 'Saved Earth with 90%+ health!',
                    icon: '🌍',
                    unlockedAt: new Date().toISOString()
                });
            }

            // Streak achievements
            if (data.maxStreak >= 5) {
                achievements.push({
                    id: 'streak_5',
                    name: 'Knowledge Streak',
                    description: 'Got 5 answers correct in a row!',
                    icon: '🔥',
                    unlockedAt: new Date().toISOString()
                });
            }
        }

        if (type === 'levelUp') {
            if (data === 5) {
                achievements.push({
                    id: 'level_5',
                    name: 'Eco Warrior',
                    description: 'Reached level 5!',
                    icon: '⚔️',
                    unlockedAt: new Date().toISOString()
                });
            }
        }

        // Milestone achievements
        if (stats.gamesPlayed === 10) {
            achievements.push({
                id: 'games_10',
                name: 'Dedicated Player',
                description: 'Played 10 games!',
                icon: '🎮',
                unlockedAt: new Date().toISOString()
            });
        }

        if (stats.earthSaved === 5) {
            achievements.push({
                id: 'earth_saved_5',
                name: 'Earth Guardian',
                description: 'Saved Earth 5 times!',
                icon: '🛡️',
                unlockedAt: new Date().toISOString()
            });
        }

        // Add new achievements (avoid duplicates)
        achievements.forEach(achievement => {
            const exists = this.currentUser.achievements.find(a => a.id === achievement.id);
            if (!exists) {
                this.currentUser.achievements.push(achievement);
                this.showAchievementNotification(achievement);
            }
        });
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification pixel-slide-in';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--pixel-earth-green);
                color: white;
                border: 4px solid var(--pixel-black);
                box-shadow: 6px 6px 0 var(--pixel-black);
                padding: 20px;
                z-index: 9999;
                max-width: 300px;
                font-family: var(--pixel-font-family);
            ">
                <div style="font-weight: bold; margin-bottom: 10px;">
                    ${achievement.icon} Achievement Unlocked!
                </div>
                <div style="font-weight: bold; margin-bottom: 5px;">
                    ${achievement.name}
                </div>
                <div style="font-size: 14px;">
                    ${achievement.description}
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Simple password hashing (use proper hashing in production)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // Get user leaderboard
    getLeaderboard() {
        const allUsers = Object.values(this.users);
        return allUsers
            .filter(user => user.stats.gamesPlayed > 0)
            .sort((a, b) => b.stats.bestScore - a.stats.bestScore)
            .slice(0, 10);
    }

    // Delete account (for testing/demo purposes)
    deleteAccount(username, password) {
        if (!this.currentUser || this.currentUser.username.toLowerCase() !== username.toLowerCase()) {
            throw new Error('Not authorized');
        }

        if (this.currentUser.password !== this.hashPassword(password)) {
            throw new Error('Invalid password');
        }

        delete this.users[username.toLowerCase()];
        this.saveUsers();
        this.logout();
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Modal functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('registerModal').style.display = 'none';
}

function showRegister() {
    document.getElementById('registerModal').style.display = 'flex';
    document.getElementById('loginModal').style.display = 'none';
}

function hideModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

// Handle login form
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const user = auth.login(username, password);
        console.log('Login successful:', user.username);
        
        // Redirect to homepage
        window.location.href = 'homepage.html';
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

// Handle registration form
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validate password confirmation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const user = auth.register(username, email, password);
        console.log('Registration successful:', user.username);
        
        // Auto-login after registration
        auth.login(username, password);
        
        // Redirect to homepage
        window.location.href = 'homepage.html';
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // If already logged in and on landing page, redirect to homepage
    if (auth.isLoggedIn() && window.location.pathname.includes('landing.html')) {
        window.location.href = 'homepage.html';
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        
        if (event.target === loginModal) {
            hideModal();
        }
        if (event.target === registerModal) {
            hideModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    });
});

// Export for use in other files
if (typeof window !== 'undefined') {
    window.auth = auth;
}