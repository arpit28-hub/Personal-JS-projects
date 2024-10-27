const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "BlueWhale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Girrafe", correct: false },

    ]
  },
  {
    question: "Which is the largest country in the world?",
    answers: [
      { text: "India", correct: false },
      { text: "Russia", correct: true },
      { text: "China", correct: false },
      { text: "Canada", correct: false },

    ]
  },
  {
    question: "What is the capital of the India?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Paris", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Moscow", correct: false },
    ]
  },
  {
    question: "What is the capital of the U.P?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Paris", correct: false },
      { text: "Lucknow", correct: true },
      { text: "Moscow", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// console.log(typeof(answerButtons)) //objects
let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}




function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}




function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {  // true until answerbuttons contain atleast one child node
    answerButtons.removeChild(answerButtons.firstChild);
  }
}



function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }

    button.disabled = true;
  });
  nextButton.style.display = "block";
}



function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

