var questionEl = document.getElementById("question");
var questionFormEl = document.getElementById("questionForm");
var scoreEl = document.getElementById("score");
var score = 0;
var storedAnswer;

var randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var generateQuestion = () => {
  var randomNumber1 = randomNumber(1, 10);
  var randomNumber2 = randomNumber(1, 20);
  var questionType = randomNumber(1, 4);
  var question;
  var answer;
  let firstNumber;
  let secondNumber;

  if (randomNumber1 > randomNumber2 && questionType > 2) {
    firstNumber = randomNumber1;
    secondNumber = randomNumber2;
  } else {
    firstNumber = randomNumber2;
    secondNumber = randomNumber1;
  }

  switch (questionType) {
    case 1:
      question = `Q. What is ${firstNumber} multiply by ${secondNumber}?`;
      answer = firstNumber * secondNumber;
      break;
    case 2:
      question = `Q. What is ${firstNumber} added to ${secondNumber}?`;
      answer = firstNumber + secondNumber;
      break;
    case 3:
      question = `Q. What is ${firstNumber} divided by ${secondNumber}?`;
      answer = firstNumber / secondNumber;
      break;
    case 4:
      question = `Q. What is ${firstNumber} subtracted from ${secondNumber}?`;
      answer = firstNumber - secondNumber;
      break;
    default:
      question = `Q. What is ${firstNumber} subtracted from ${secondNumber}?`;
      answer = firstNumber - secondNumber;
      break;
  }

  return { question, answer };
};

var showQuestion = () => {
  var { question, answer } = generateQuestion();
  questionEl.innerHTML = question;
  storedAnswer = answer;
};
showQuestion();

var checkAnswer = (event) => {
  event.preventDefault();
  var formData = new FormData(questionFormEl);

  var userAnswer = +formData.get("answer");
  if (userAnswer == storedAnswer) {
    score += 1;
    Toastify({
      text: `Correct, Score is now ${score}`,
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: `Wrong, Score is now ${score}`,
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #e33217, #ff001e)",
      },
    }).showToast();
  }
  scoreEl.innerText = score;
  event.target.reset();
  showQuestion();
  console.log(userAnswer);
};
