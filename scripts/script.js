// Earth Saver Game - Main Game Logic

class EarthSaverGame {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.earthHealth = 100;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.gameQuestions = [];
        this.isGameActive = false;
        this.totalQuestions = 10;
        
        this.initializeElements();
        this.initializeGame();
    }
    
    initializeElements() {
        // Game elements
        this.questionContainer = document.getElementById('question-container');
        this.gameOverScreen = document.getElementById('game-over');
        this.loadingScreen = document.getElementById('loading');
        
        // Question elements
        this.questionText = document.getElementById('question-text');
        this.answersContainer = document.getElementById('answers-container');
        this.explanationDiv = document.getElementById('explanation');
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.questionNumberElement = document.getElementById('question-number');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.streakElement = document.getElementById('streak');
        
        // Earth health elements
        this.healthFill = document.getElementById('health-fill');
        this.healthPercentage = document.getElementById('health-percentage');
        this.earthSphere = document.getElementById('earth-sphere');
        
        // Buttons
        this.nextButton = document.getElementById('next-question');
        this.restartButton = document.getElementById('restart-game');
        this.playAgainButton = document.getElementById('play-again');
        
        // Final stats elements
        this.finalScore = document.getElementById('final-score');
        this.finalHealth = document.getElementById('final-health');
        this.correctAnswersElement = document.getElementById('correct-answers');
        this.totalAnsweredElement = document.getElementById('total-answered');
        this.finalMessage = document.getElementById('final-message');
        this.earthMessage = document.getElementById('earth-message');
        
        // Event listeners
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.playAgainButton.addEventListener('click', () => this.restartGame());
    }
    
    initializeGame() {
        this.showLoading();
        
        // Simulate loading time for better UX
        setTimeout(() => {
            this.setupNewGame();
            this.hideLoading();
            this.displayQuestion();
        }, 1500);
    }
    
    setupNewGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.earthHealth = 100;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.isGameActive = true;
        
        // Get random questions for this game session
        this.gameQuestions = questionUtils.getRandomQuestions(this.totalQuestions);
        
        this.updateUI();
        this.updateEarthHealth();
        this.hideGameOver();
        this.showQuestionContainer();
    }
    
    displayQuestion() {
        if (this.currentQuestionIndex >= this.gameQuestions.length) {
            this.endGame();
            return;
        }
        
        const question = this.gameQuestions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        
        // Clear previous answers
        this.answersContainer.innerHTML = '';
        this.explanationDiv.classList.add('hidden');
        this.hideNextButton();
        
        // Create answer buttons
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.textContent = answer;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answersContainer.appendChild(button);
        });
        
        // Update question counter
        this.questionNumberElement.textContent = this.currentQuestionIndex + 1;
        this.totalQuestionsElement.textContent = this.gameQuestions.length;
    }
    
    selectAnswer(selectedIndex) {
        if (!this.isGameActive) return;
        
        const question = this.gameQuestions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        // Disable all answer buttons
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });
        
        // Update game state
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
        
        // Show explanation
        this.showExplanation(question.explanation);
        this.showNextButton();
        
        this.updateUI();
        this.updateEarthHealth();
    }
    
    handleCorrectAnswer() {
        this.correctAnswers++;
        this.streak++;
        this.maxStreak = Math.max(this.maxStreak, this.streak);
        
        // Calculate score with streak bonus
        let points = 100;
        if (this.streak >= 5) points += 50; // Streak bonus
        if (this.streak >= 3) points += 25; // Smaller streak bonus
        
        this.score += points;
        
        // Earth health improves slightly with correct answers
        this.earthHealth = Math.min(100, this.earthHealth + 2);
        
        this.showFeedback('Correct! 🌱', 'success');
    }
    
    handleWrongAnswer() {
        this.streak = 0;
        
        // Earth health decreases with wrong answers
        this.earthHealth = Math.max(0, this.earthHealth - 10);
        
        this.showFeedback('Incorrect 😔', 'error');
    }
    
    showExplanation(text) {
        this.explanationDiv.innerHTML = `
            <h3>💡 Did you know?</h3>
            <p>${text}</p>
        `;
        this.explanationDiv.classList.remove('hidden');
    }
    
    showFeedback(message, type) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.classList.add('feedback', type);
        feedback.textContent = message;
        
        this.questionContainer.appendChild(feedback);
        
        // Remove after animation
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }
    
    endGame() {
        this.isGameActive = false;
        this.hideQuestionContainer();
        this.showGameOver();
        
        // Update final stats
        this.finalScore.textContent = this.score;
        this.finalHealth.textContent = this.earthHealth + '%';
        this.correctAnswersElement.textContent = this.correctAnswers;
        this.totalAnsweredElement.textContent = this.gameQuestions.length;
        
        // Save game stats to user profile
        if (auth.isLoggedIn()) {
            const gameData = {
                score: this.score,
                earthHealth: this.earthHealth,
                correctAnswers: this.correctAnswers,
                questionsAnswered: this.gameQuestions.length,
                maxStreak: this.maxStreak,
                finalStreak: this.streak
            };
            auth.updateUserStats(gameData);
        }
        
        // Determine final message based on performance
        this.setFinalMessage();
    }
    
    setFinalMessage() {
        const percentage = (this.correctAnswers / this.gameQuestions.length) * 100;
        
        if (this.earthHealth >= 80) {
            this.finalMessage.textContent = '🌍 Earth Saved!';
            this.earthMessage.innerHTML = '<p class="success">Congratulations! Your environmental knowledge helped save our planet! Earth is thriving thanks to eco-warriors like you.</p>';
        } else if (this.earthHealth >= 50) {
            this.finalMessage.textContent = '🌱 Earth Recovering';
            this.earthMessage.innerHTML = '<p class="warning">Good effort! Earth is on the path to recovery. Keep learning about environmental protection to make an even bigger impact!</p>';
        } else {
            this.finalMessage.textContent = '🆘 Earth Needs Help';
            this.earthMessage.innerHTML = '<p class="danger">Earth needs more help! Don\'t worry - every expert was once a beginner. Try again and help save our planet!</p>';
        }
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.streakElement.textContent = this.streak;
    }
    
    updateEarthHealth() {
        this.healthFill.style.width = this.earthHealth + '%';
        this.healthPercentage.textContent = Math.round(this.earthHealth) + '%';
        
        // Update Earth visual based on health
        this.earthSphere.className = 'earth-sphere';
        if (this.earthHealth >= 80) {
            this.earthSphere.classList.add('healthy');
        } else if (this.earthHealth >= 50) {
            this.earthSphere.classList.add('warning');
        } else {
            this.earthSphere.classList.add('critical');
        }
    }
    
    // UI Helper Methods
    showLoading() {
        this.loadingScreen.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loadingScreen.classList.add('hidden');
    }
    
    showQuestionContainer() {
        this.questionContainer.classList.remove('hidden');
    }
    
    hideQuestionContainer() {
        this.questionContainer.classList.add('hidden');
    }
    
    showGameOver() {
        this.gameOverScreen.classList.remove('hidden');
    }
    
    hideGameOver() {
        this.gameOverScreen.classList.add('hidden');
    }
    
    showNextButton() {
        this.nextButton.classList.remove('hidden');
    }
    
    hideNextButton() {
        this.nextButton.classList.add('hidden');
    }
    
    restartGame() {
        this.initializeGame();
    }
}

// Profile and logout functions
function showProfile() {
    const user = auth.getCurrentUser();
    if (user) {
        alert(`Profile: ${user.username}\nLevel: ${user.level}\nGames Played: ${user.stats.gamesPlayed}\nBest Score: ${user.stats.bestScore}`);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout? Your current game progress will be lost.')) {
        auth.logout();
        window.location.href = 'landing.html';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!auth.isLoggedIn()) {
        window.location.href = 'landing.html';
        return;
    }

    // Check if questions are loaded
    if (typeof questions === 'undefined') {
        console.error('Questions not loaded! Make sure questions.js is included.');
        return;
    }
    
    // Start the game
    window.game = new EarthSaverGame();
});

// Add some keyboard shortcuts for better accessibility
document.addEventListener('keydown', function(event) {
    if (!window.game || !window.game.isGameActive) return;
    
    // Numbers 1-4 for answer selection
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= 4) {
        const answerButtons = document.querySelectorAll('.answer-btn:not([disabled])');
        if (answerButtons[keyNum - 1]) {
            answerButtons[keyNum - 1].click();
        }
    }
    
    // Enter or Space for next question
    if ((event.key === 'Enter' || event.key === ' ') && !document.getElementById('next-question').classList.contains('hidden')) {
        event.preventDefault();
        document.getElementById('next-question').click();
    }
});