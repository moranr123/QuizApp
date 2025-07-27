// All the questions and answers
const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ]
  },
  {
    question: "What color is the sky?",
    answers: [
      { text: "Blue", correct: true },
      { text: "Green", correct: false },
      { text: "Red", correct: false },
      { text: "Yellow", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = "lightgreen";
    score++;
  } else {
    button.style.backgroundColor = "salmon";
  }
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionEl.innerText = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();
