const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("questionText");
const stars = document.querySelectorAll("#starRating span");
const confirmBtn = document.getElementById("confirmBtn");
const errorMsg = document.getElementById("errorMsg");
const thankYou = document.getElementById("thankYou");

const questions = [
  "Comment a été votre journée ?",
  "Notez à quel point je vous ai manqué. ♥️"
];

let currentQuestionIndex = 0;
let selectedRating = 0;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  questionContainer.style.display = "block";
  loadQuestion(currentQuestionIndex);
});

function loadQuestion(index) {
  questionText.textContent = questions[index];
  clearStars();
  confirmBtn.disabled = true;
  selectedRating = 0;
  errorMsg.style.display = "none";
  questionContainer.classList.remove("vibrate", "scary-effect");
}

stars.forEach((star, idx) => {
  star.addEventListener("click", () => {
    selectedRating = idx + 1;
    updateStars(idx);
    confirmBtn.disabled = false;
    errorMsg.style.display = "none";
  });
});

function clearStars() {
  stars.forEach(s => s.classList.remove("active"));
}

function updateStars(idx) {
  clearStars();
  for (let i = 0; i <= idx; i++) {
    stars[i].classList.add("active");
  }
}

confirmBtn.addEventListener("click", () => {
  if (currentQuestionIndex === 1 && selectedRating < 5) {
    errorMsg.style.display = "block";
    return;
  }

  if (currentQuestionIndex === 1) {
    questionContainer.classList.add("vibrate", "scary-effect");
    setTimeout(() => {
      questionContainer.style.display = "none";
      thankYou.style.display = "block";
    }, 1200);
  } else {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
});