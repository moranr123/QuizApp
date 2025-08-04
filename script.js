class QuizApp {
    constructor() {
        // Quiz questions data
        this.questions = {
            math: [
                {
                    question: "What is 7 + 5?",
                    choices: ["10", "12", "14", "11"],
                    answer: "12"
                },
                {
                    question: "What is the square root of 81?",
                    choices: ["9", "8", "7", "6"],
                    answer: "9"
                },
                {
                    question: "What is 15 divided by 3?",
                    choices: ["3", "4", "5", "6"],
                    answer: "5"
                },
                {
                    question: "What is 12 × 8?",
                    choices: ["94", "96", "98", "92"],
                    answer: "96"
                },
                {
                    question: "What is 64 ÷ 8?",
                    choices: ["6", "7", "8", "9"],
                    answer: "8"
                }
            ],
            english: [
                {
                    question: "Which word is a noun?",
                    choices: ["Run", "Happy", "Apple", "Quickly"],
                    answer: "Apple"
                },
                {
                    question: "Choose the correct past tense of 'go'.",
                    choices: ["goed", "gone", "went", "goes"],
                    answer: "went"
                },
                {
                    question: "Which sentence is correct?",
                    choices: [
                        "She go to school.",
                        "He goes to school.",
                        "They goes to school.",
                        "We goes to school."
                    ],
                    answer: "He goes to school."
                },
                {
                    question: "What is the plural of 'child'?",
                    choices: ["childs", "childes", "children", "child"],
                    answer: "children"
                },
                {
                    question: "Which word is an adjective?",
                    choices: ["Beautiful", "Run", "Table", "Singing"],
                    answer: "Beautiful"
                }
            ],
            science: [
                {
                    question: "What planet is known as the Red Planet?",
                    choices: ["Mars", "Venus", "Earth", "Jupiter"],
                    answer: "Mars"
                },
                {
                    question: "What do plants need to make food?",
                    choices: ["Water, sunlight, air", "Milk, sun, sugar", "Water, wind, fire", "Soil, air, oil"],
                    answer: "Water, sunlight, air"
                },
                {
                    question: "Which part of the body pumps blood?",
                    choices: ["Lungs", "Brain", "Heart", "Stomach"],
                    answer: "Heart"
                },
                {
                    question: "How many bones are in the adult human body?",
                    choices: ["196", "206", "216", "186"],
                    answer: "206"
                },
                {
                    question: "What gas do plants absorb from the atmosphere?",
                    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                    answer: "Carbon Dioxide"
                }
            ],
            history: [
                {
                    question: "In which year did World War II end?",
                    choices: ["1943", "1944", "1945", "1946"],
                    answer: "1945"
                },
                {
                    question: "Who was the first President of the United States?",
                    choices: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                    answer: "George Washington"
                },
                {
                    question: "Which ancient wonder was located in Alexandria?",
                    choices: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Temple of Artemis"],
                    answer: "Lighthouse of Alexandria"
                },
                {
                    question: "In which year did Columbus discover America?",
                    choices: ["1490", "1491", "1492", "1493"],
                    answer: "1492"
                },
                {
                    question: "Which empire was ruled by the Aztecs?",
                    choices: ["Inca Empire", "Maya Empire", "Aztec Empire", "Olmec Empire"],
                    answer: "Aztec Empire"
                }
            ]
        };

        // Application state
        this.currentSubject = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.totalQuestions = 0;
        this.startTime = null;
        this.endTime = null;

        // DOM elements
        this.appContainer = document.getElementById('app');
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the quiz application
     */
    init() {
        this.showWelcomeScreen();
    }

    /**
     * Display the welcome screen
     */
    showWelcomeScreen() {
        this.appContainer.innerHTML = `
            <div class="welcome-screen">
                <h1 class="welcome-title">🎓 Smart Quiz</h1>
                <p class="welcome-subtitle">Test your knowledge and challenge your mind!</p>
                <div class="subject-selector">
                    <div class="subject-card english" data-subject="english">
                        <i class="fas fa-book subject-icon"></i>
                        <div class="subject-title">English</div>
                        <div class="subject-description">Grammar, vocabulary & language skills</div>
                    </div>
                    <div class="subject-card math" data-subject="math">
                        <i class="fas fa-calculator subject-icon"></i>
                        <div class="subject-title">Mathematics</div>
                        <div class="subject-description">Numbers, calculations & problem solving</div>
                    </div>
                    <div class="subject-card science" data-subject="science">
                        <i class="fas fa-flask subject-icon"></i>
                        <div class="subject-title">Science</div>
                        <div class="subject-description">Nature, space & scientific facts</div>
                    </div>
                    <div class="subject-card history" data-subject="history">
                        <i class="fas fa-landmark subject-icon"></i>
                        <div class="subject-title">History</div>
                        <div class="subject-description">Past events, civilizations & discoveries</div>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to subject cards
        this.attachSubjectListeners();
    }

    /**
     * Attach event listeners to subject selection cards
     */
    attachSubjectListeners() {
        const subjectCards = this.appContainer.querySelectorAll('.subject-card');
        subjectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const subject = e.currentTarget.dataset.subject;
                this.startQuiz(subject);
            });
        });
    }

    /**
     * Start a quiz for the selected subject
     * @param {string} subject - The subject to start quiz for
     */
    startQuiz(subject) {
        this.currentSubject = subject;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = this.questions[subject].length;
        this.startTime = Date.now();
        this.showQuestion();
    }

    /**
     * Display the current question
     */
    showQuestion() {
        const currentQuestion = this.questions[this.currentSubject][this.currentQuestionIndex];
        this.isAnswered = false;
        this.selectedAnswer = null;

        const progressPercentage = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;

        this.appContainer.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <div class="subject-info">
                        <i class="fas fa-${this.getSubjectIcon(this.currentSubject)}"></i>
                        <span>${this.capitalizeFirst(this.currentSubject)}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="question-counter">
                        ${this.currentQuestionIndex + 1} / ${this.totalQuestions}
                    </div>
                </div>
                
                <div class="question">${currentQuestion.question}</div>
                
                <div class="choices">
                    ${currentQuestion.choices.map((choice, index) => 
                        `<button class="choice-btn" data-choice="${choice}" data-index="${index}">
                            <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="choice-text">${choice}</span>
                        </button>`
                    ).join('')}
                </div>
                
                <div class="controls">
                    <div class="score-display">
                        <i class="fas fa-trophy"></i>
                        Score: ${this.score}/${this.totalQuestions}
                    </div>
                    <div class="button-group">
                        <button class="btn btn-secondary" id="restartBtn">
                            <i class="fas fa-home"></i>
                            Home
                        </button>
                        <button class="btn btn-primary" id="nextBtn" disabled>
                            ${this.currentQuestionIndex === this.totalQuestions - 1 ? 
                                '<i class="fas fa-flag-checkered"></i> Finish' : 
                                '<i class="fas fa-arrow-right"></i> Next'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.attachQuestionListeners();
    }

    /**
     * Get subject icon for display
     * @param {string} subject - The subject name
     * @returns {string} Icon class name
     */
    getSubjectIcon(subject) {
        const icons = {
            english: 'book',
            math: 'calculator',
            science: 'flask',
            history: 'landmark'
        };
        return icons[subject] || 'question';
    }

    /**
     * Attach event listeners for the question screen
     */
    attachQuestionListeners() {
        const choiceButtons = this.appContainer.querySelectorAll('.choice-btn');
        const nextButton = this.appContainer.querySelector('#nextBtn');
        const restartButton = this.appContainer.querySelector('#restartBtn');

        // Choice button listeners
        choiceButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isAnswered) {
                    this.handleAnswerSelection(e.currentTarget);
                }
            });
        });

        // Next button listener
        nextButton.addEventListener('click', () => {
            this.nextQuestion();
        });

        // Restart button listener
        restartButton.addEventListener('click', () => {
            this.showWelcomeScreen();
        });
    }

    /**
     * Handle when user selects an answer
     * @param {HTMLElement} selectedButton - The button that was clicked
     */
    handleAnswerSelection(selectedButton) {
        const currentQuestion = this.questions[this.currentSubject][this.currentQuestionIndex];
        const selectedAnswer = selectedButton.dataset.choice;
        const isCorrect = selectedAnswer === currentQuestion.answer;

        this.isAnswered = true;
        this.selectedAnswer = selectedAnswer;

        // Update score if correct
        if (isCorrect) {
            this.score++;
        }

        // Disable all choice buttons and apply styling
        const choiceButtons = this.appContainer.querySelectorAll('.choice-btn');
        choiceButtons.forEach(btn => {
            btn.disabled = true;
            const choice = btn.dataset.choice;
            
            if (choice === currentQuestion.answer) {
                btn.classList.add('correct');
                btn.innerHTML += '<i class="fas fa-check correct-icon"></i>';
            } else if (choice === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
                btn.innerHTML += '<i class="fas fa-times incorrect-icon"></i>';
            }
        });

        // Enable next button
        this.appContainer.querySelector('#nextBtn').disabled = false;

        // Provide audio feedback
        this.playFeedbackSound(isCorrect);

        // Show feedback message
        this.showFeedbackMessage(isCorrect, selectedAnswer, currentQuestion.answer);
    }

    /**
     * Show feedback message for the answer
     * @param {boolean} isCorrect - Whether the answer was correct
     * @param {string} selectedAnswer - The selected answer
     * @param {string} correctAnswer - The correct answer
     */
    showFeedbackMessage(isCorrect, selectedAnswer, correctAnswer) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackDiv.innerHTML = `
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
            <span>${isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${correctAnswer}`}</span>
        `;

        const questionElement = this.appContainer.querySelector('.question');
        questionElement.appendChild(feedbackDiv);

        // Remove feedback after 3 seconds
        setTimeout(() => {
            if (feedbackDiv.parentNode) {
                feedbackDiv.remove();
            }
        }, 3000);
    }

    /**
     * Play feedback sound for correct/incorrect answers
     * @param {boolean} isCorrect - Whether the answer was correct
     */
    playFeedbackSound(isCorrect) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (isCorrect) {
                // Higher pitch for correct answers
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
            } else {
                // Lower pitch for incorrect answers
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio feedback not supported');
        }
    }

    /**
     * Move to the next question or show final results
     */
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.totalQuestions) {
            this.showQuestion();
        } else {
            this.endTime = Date.now();
            this.showFinalScore();
        }
    }

    /**
     * Display the final score and results
     */
    showFinalScore() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const performanceData = this.getPerformanceData(percentage);
        const timeTaken = this.formatTime(Math.floor((this.endTime - this.startTime) / 1000));

        this.appContainer.innerHTML = `
            <div class="final-score">
                <h2>${performanceData.emoji} Quiz Completed!</h2>
                <div class="score">${this.score} out of ${this.totalQuestions}</div>
                <div class="percentage">${percentage}%</div>
                <div class="performance-message">${performanceData.message}</div>
                
                <div class="score-breakdown">
                    <div class="correct">
                        <i class="fas fa-check-circle"></i>
                        Correct: ${this.score}
                    </div>
                    <div class="incorrect">
                        <i class="fas fa-times-circle"></i>
                        Incorrect: ${this.totalQuestions - this.score}
                    </div>
                </div>
                
                <div class="quiz-stats">
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        Time: ${timeTaken}
                    </div>
                    <div class="stat">
                        <i class="fas fa-tachometer-alt"></i>
                        Speed: ${this.calculateSpeed()} questions/min
                    </div>
                </div>
                
                <div class="button-group">
                    <button class="btn btn-secondary" id="restartBtn">
                        <i class="fas fa-home"></i>
                        Home
                    </button>
                    <button class="btn btn-primary" id="retakeBtn">
                        <i class="fas fa-redo"></i>
                        Retake Quiz
                    </button>
                </div>
            </div>
        `;

        this.attachFinalScoreListeners();
    }

    /**
     * Calculate questions per minute
     * @returns {string} Speed in questions per minute
     */
    calculateSpeed() {
        const timeInMinutes = (this.endTime - this.startTime) / 1000 / 60;
        return Math.round(this.totalQuestions / timeInMinutes);
    }

    /**
     * Get performance data based on percentage score
     * @param {number} percentage - The percentage score
     * @returns {Object} Performance data with emoji and message
     */
    getPerformanceData(percentage) {
        if (percentage >= 90) {
            return {
                emoji: '🎉',
                message: 'Outstanding! You\'re a true champion!'
            };
        } else if (percentage >= 80) {
            return {
                emoji: '🌟',
                message: 'Excellent work! You really know your stuff!'
            };
        } else if (percentage >= 70) {
            return {
                emoji: '👍',
                message: 'Good job! You\'re on the right track!'
            };
        } else if (percentage >= 60) {
            return {
                emoji: '💪',
                message: 'Not bad! Keep practicing to improve!'
            };
        } else if (percentage >= 50) {
            return {
                emoji: '📚',
                message: 'You\'re getting there! More study needed!'
            };
        } else {
            return {
                emoji: '🎯',
                message: 'Don\'t give up! Practice makes perfect!'
            };
        }
    }

    /**
     * Attach event listeners for the final score screen
     */
    attachFinalScoreListeners() {
        const restartButton = this.appContainer.querySelector('#restartBtn');
        const retakeButton = this.appContainer.querySelector('#retakeBtn');

        restartButton.addEventListener('click', () => {
            this.showWelcomeScreen();
        });

        retakeButton.addEventListener('click', () => {
            this.startQuiz(this.currentSubject);
        });
    }

    /**
     * Capitalize the first letter of a string
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Format time duration
     * @param {number} seconds - Duration in seconds
     * @returns {string} Formatted time string
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Shuffle array elements (for future randomization features)
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize the quiz application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Add some utility functions for potential future features
const QuizUtils = {
    /**
     * Save quiz results to local storage
     * @param {Object} results - Quiz results to save
     */
    saveResults(results) {
        try {
            const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
            existingResults.push({
                ...results,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('quizResults', JSON.stringify(existingResults));
        } catch (error) {
            console.log('Could not save results:', error);
        }
    },

    /**
     * Get saved quiz results from local storage
     * @returns {Array} Array of saved results
     */
    getSavedResults() {
        try {
            return JSON.parse(localStorage.getItem('quizResults') || '[]');
        } catch (error) {
            console.log('Could not load results:', error);
            return [];
        }
    },

    /**
     * Clear saved results
     */
    clearResults() {
        try {
            localStorage.removeItem('quizResults');
        } catch (error) {
            console.log('Could not clear results:', error);
        }
    }
};