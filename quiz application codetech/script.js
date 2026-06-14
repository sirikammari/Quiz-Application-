const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
    ],
    explanation: "HTML stands for Hyper Text Markup Language, used to structure content on the web.",
  },
  {
    question: "What year was JavaScript created?",
    answers: [
      { text: "1995", correct: true },
      { text: "2000", correct: false },
      { text: "1999", correct: false },
      { text: "1985", correct: false },
    ],
    explanation: "JavaScript was created in 1995 by Brendan Eich while working at Netscape.",
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "Laravel", correct: false },
      { text: "React", correct: true },
      { text: "Django", correct: false },
      { text: "Flask", correct: false },
    ],
    explanation: "React is a popular JavaScript library for building user interfaces.",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<css>", correct: false },
      { text: "<style>", correct: true },
      { text: "<script>", correct: false },
      { text: "<link>", correct: false },
    ],
    explanation: "The <style> tag is used inside the head tag to define internal CSS styles.",
  },
  {
    question: "How can you make a numbered list in HTML?",
    answers: [
      { text: "<ul>", correct: false },
      { text: "<dl>", correct: false },
      { text: "<ol>", correct: true },
      { text: "<list>", correct: false },
    ],
    explanation: "<ol> stands for ordered list, which is used to create numbered lists in HTML.",
  },
  {
    question: "Which property is used in CSS to change the text color of an element?",
    answers: [
      { text: "text-color", correct: false },
      { text: "fgcolor", correct: false },
      { text: "color", correct: true },
      { text: "font-color", correct: false },
    ],
    explanation: "In CSS, 'color' is used to change the text color of an element.",
  },
  {
    question: "Which CSS value is used to make an element hidden?",
    answers: [
      { text: "display: none;", correct: true },
      { text: "visibility: hidden;", correct: false },
      { text: "opacity: 0;", correct: false },
      { text: "hide: true;", correct: false },
    ],
    explanation: "'display: none;' completely removes the element from the document layout.",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "<!-- comment -->", correct: false },
      { text: "# comment", correct: false },
      { text: "/* comment */", correct: false },
      { text: "// comment", correct: true },
    ],
    explanation: "// is used for single-line comments in JavaScript.",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: 'var colors = (1:"red", 2:"blue", 3:"green")', correct: false },
      { text: 'var colors = ["red", "blue", "green"]', correct: true },
      { text: 'var colors = "red", "blue", "green"', correct: false },
      { text: 'var colors = { "red", "blue", "green" }', correct: false },
    ],
    explanation: 'Arrays in JavaScript are defined using square brackets [].',
  },
  {
    question: "What will the following JavaScript code output? console.log(typeof null);",
    answers: [
      { text: "null", correct: false },
      { text: "object", correct: true },
      { text: "undefined", correct: false },
      { text: "boolean", correct: false },
    ],
    explanation: "In JavaScript, typeof null returns 'object' — it's a well-known bug in the language.",
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  wrongAnswers = [];
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  const oldReview = document.getElementById("review-box");
    if (oldReview) {
    oldReview.remove();
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = questions[currentQuestionIndex];

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    const correctAnswer = currentQuestion.answers.find(a => a.correct).text;

    wrongAnswers.push({
      question: currentQuestion.question,
      yourAnswer: selectedBtn.innerText,
      correctAnswer: correctAnswer,
      explanation: currentQuestion.explanation
    });
  }

  // Show correct answers
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `✅ You scored ${score} out of ${questions.length}!`;

  const reviewBox = document.createElement("div");
  reviewBox.id = "review-box";
  reviewBox.style.marginTop = "20px";

  if (wrongAnswers.length > 0) {
    const heading = document.createElement("h3");
    heading.innerText = "❌ Review Incorrect Answers:";
    heading.style.color = "#ff5555";
    reviewBox.appendChild(heading);

    wrongAnswers.forEach((item, index) => {
      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.style.padding = "10px";
      div.style.backgroundColor = "#1e1e1e";
      div.style.borderRadius = "8px";
      div.style.color = "#eee";

      const explanationId = `explanation-${index}`;

      div.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${item.question}</p>
        <p style="color: #ff6b6b;">❌ Your answer: ${item.yourAnswer}</p>
        <p style="color: #4caf50;">✅ Correct answer: ${item.correctAnswer}</p>
        <button class="btn" onclick="toggleExplanation('${explanationId}')">Show Explanation</button>
        <div id="${explanationId}" class="explanation">${item.explanation}</div>
      `;

      reviewBox.appendChild(div);
    });

    document.querySelector(".quiz").appendChild(reviewBox);
  } else {
    const allCorrect = document.createElement("p");
    allCorrect.innerText = "🔥 Perfect! You got all answers right!";
    allCorrect.style.color = "#00ffcc";
    allCorrect.style.marginTop = "20px";
    reviewBox.appendChild(allCorrect);
    document.querySelector(".quiz").appendChild(reviewBox);
  }

  nextButton.innerText = "Play Again";
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

function toggleExplanation(id) {
  const explanationDiv = document.getElementById(id);
  if (explanationDiv.style.display === "none" || explanationDiv.style.display === "") {
    explanationDiv.style.display = "block";
  } else {
    explanationDiv.style.display = "none";
  }
}

function showScore() {
  resetState();
  questionElement.innerText = `✅ You scored ${score} out of ${questions.length}!`;

  const reviewBox = document.createElement("div");
  reviewBox.id = "review-box";
  reviewBox.style.marginTop = "20px";

  if (wrongAnswers.length > 0) {
    const heading = document.createElement("h3");
    heading.innerText = "❌ Review Incorrect Answers:";
    heading.style.color = "#ff5555";
    reviewBox.appendChild(heading);

    wrongAnswers.forEach((item, index) => {
      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.style.padding = "10px";
      div.style.backgroundColor = "#1e1e1e";
      div.style.borderRadius = "8px";
      div.style.color = "#eee";

      const explanationId = `explanation-${index}`;
      div.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${item.question}</p>
        <p style="color: #ff6b6b;">❌ Your answer: ${item.yourAnswer}</p>
        <p style="color: #4caf50;">✅ Correct answer: ${item.correctAnswer}</p>
        <button class="btn" onclick="toggleExplanation('${explanationId}')">Show Explanation</button>
        <div id="${explanationId}" class="explanation">${item.explanation}</div>
      `;
      reviewBox.appendChild(div);
    });

    document.querySelector(".quiz").appendChild(reviewBox);
  } else {
    const allCorrect = document.createElement("p");
    allCorrect.innerText = "🔥 Perfect! You got all answers right!";
    allCorrect.style.color = "#00ffcc";
    allCorrect.style.marginTop = "20px";
    reviewBox.appendChild(allCorrect);
    document.querySelector(".quiz").appendChild(reviewBox);
  }

  // 🟡 SHOW PIE CHART AFTER EXPLANATION
  setTimeout(() => {
    document.getElementById("chart-container").style.display = "block";
    renderPieChart(score, questions.length - score);
  }, 500); // delay to make sure explanations are rendered

  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function renderPieChart(correct, incorrect) {
  const ctx = document.getElementById("resultChart").getContext("2d");

  // destroy previous chart if exists
  if (window.resultPieChart) {
    window.resultPieChart.destroy();
  }

  window.resultPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ['#4CAF50', '#FF5252'],
        borderColor: ['#1b5e20', '#b71c1c'],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#fff',
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: 'Your Quiz Results',
          color: '#fff',
          font: {
            size: 18
          }
        }
      }
    }
  });
}


startQuiz();

   
