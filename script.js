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
            ]
        };

        // Application state
        this.currentSubject = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.totalQuestions = 0;

        // DOM elements
        this.appContainer = document.getElementById('app');
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the quiz application
     */
    init() {
        this.showSubjectSelector();
    }

    /**
     * Display the subject selection screen
     */
    showSubjectSelector() {
        const subjectEmojis = {
            english: '📘',
            math: '🧮',
            science: '🔬'
        };

        this.appContainer.innerHTML = `
            <div class="subject-selector">
                ${Object.keys(this.questions).map(subject => `
                    <button class="subject-btn ${subject}" data-subject="${subject}">
                        ${subjectEmojis[subject]} ${this.capitalizeFirst(subject)}
                    </button>
                `).join('')}
            </div>
        `;

        // Attach event listeners to subject buttons
        this.attachSubjectListeners();
    }

    /**
     * Attach event listeners to subject selection buttons
     */
    attachSubjectListeners() {
        const subjectButtons = this.appContainer.querySelectorAll('.subject-btn');
        subjectButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subject = e.target.dataset.subject;
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
        this.showQuestion();
    }

    /**
     * Display the current question
     */
    showQuestion() {
        const currentQuestion = this.questions[this.currentSubject][this.currentQuestionIndex];
        this.isAnswered = false;
        this.selectedAnswer = null;

        this.appContainer.innerHTML = `
            <div class="quiz-container">
                <div class="question">${currentQuestion.question}</div>
                <div class="choices">
                    ${currentQuestion.choices.map(choice => 
                        `<button class="choice-btn" data-choice="${choice}">${choice}</button>`
                    ).join('')}
                </div>
                <div class="controls">
                    <div class="score-display">
                        📊 Question ${this.currentQuestionIndex + 1} of ${this.totalQuestions} | 
                        Score: ${this.score}/${this.totalQuestions}
                    </div>
                    <div class="button-group">
                        <button class="restart-btn" id="restartBtn">🏠 Home</button>
                        <button class="next-btn" id="nextBtn" disabled>
                            ${this.currentQuestionIndex === this.totalQuestions - 1 ? '📊 Finish' : '➡️ Next'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.attachQuestionListeners();
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
                    this.handleAnswerSelection(e.target);
                }
            });
        });

        // Next button listener
        nextButton.addEventListener('click', () => {
            this.nextQuestion();
        });

        // Restart button listener
        restartButton.addEventListener('click', () => {
            this.showSubjectSelector();
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
            } else if (choice === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Enable next button
        this.appContainer.querySelector('#nextBtn').disabled = false;

        // Provide audio feedback (if supported)
        this.playFeedbackSound(isCorrect);
    }

    /**
     * Play feedback sound for correct/incorrect answers
     * @param {boolean} isCorrect - Whether the answer was correct
     */
    playFeedbackSound(isCorrect) {
        // Simple audio feedback using Web Audio API
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
            } else {
                // Lower pitch for incorrect answers
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Audio feedback not supported, fail silently
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
            this.showFinalScore();
        }
    }

    /**
     * Display the final score and results
     */
    showFinalScore() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const performanceData = this.getPerformanceData(percentage);

        this.appContainer.innerHTML = `
            <div class="final-score">
                <h2>${performanceData.emoji} Quiz Completed!</h2>
                <div class="score">${this.score} out of ${this.totalQuestions}</div>
                <div class="percentage">${percentage}%</div>
                <div class="performance-message">${performanceData.message}</div>
                <div style="margin: 25px 0;">
                    ${this.generateScoreBreakdown()}
                </div>
                <div class="button-group">
                    <button class="restart-btn" id="restartBtn">🏠 Home</button>
                    <button class="next-btn" id="retakeBtn">🔄 Retake Quiz</button>
                </div>
            </div>
        `;

        this.attachFinalScoreListeners();
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
     * Generate a visual breakdown of the score
     * @returns {string} HTML string for score breakdown
     */
    generateScoreBreakdown() {
        const correctCount = this.score;
        const incorrectCount = this.totalQuestions - this.score;
        
        return `
            <div style="display: flex; justify-content: center; gap: 20px; font-size: 14px;">
                <div style="color: #28a745;">✅ Correct: ${correctCount}</div>
                <div style="color: #dc3545;">❌ Incorrect: ${incorrectCount}</div>
            </div>
        `;
    }

    /**
     * Attach event listeners for the final score screen
     */
    attachFinalScoreListeners() {
        const restartButton = this.appContainer.querySelector('#restartBtn');
        const retakeButton = this.appContainer.querySelector('#retakeBtn');

        restartButton.addEventListener('click', () => {
            this.showSubjectSelector();
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
     * Save quiz results to local storage (if needed in the future)
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
     * Format time duration
     * @param {number} seconds - Duration in seconds
     * @returns {string} Formatted time string
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
};