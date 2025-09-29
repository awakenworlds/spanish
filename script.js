let quizData = [];
let currentCardIndex = 0;
let filteredQuizData = [];
let isEnglishToSpanish = true;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const spanishInput = document.getElementById('spanish-answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const prevBtn = document.getElementById('prev-card-btn');
const showAnswerBtn = document.getElementById('show-answer-btn');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-card-btn');
const switchLanguageBtn = document.getElementById('switch-language-btn');
const categorySelect = document.getElementById('category-select');

// Load data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    applyFilterAndLoad(); // initialize deck
  })
  .catch(error => {
    console.error("Error loading flashcards:", error);
    questionEl.textContent = "Could not load flashcards.";
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayCard() {
  if (!filteredQuizData.length) {
    questionEl.textContent = "No flashcards available.";
    answerEl.textContent = "";
    feedbackEl.textContent = "";
    return;
  }

  const card = filteredQuizData[currentCardIndex];

  if (isEnglishToSpanish) {
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
  } else {
    questionEl.textContent = card.answer;
    answerEl.textContent = card.question;
  }

  answerEl.classList.add('hidden');
  feedbackEl.textContent = '';
  spanishInput.value = '';
}

function checkSpanishAnswer() {
  if (!filteredQuizData.length) return;

  const card = filteredQuizData[currentCardIndex];
  const userAnswer = spanishInput.value.trim().toLowerCase();
  const correctAnswer = (isEnglishToSpanish ? card.answer : card.question).toLowerCase();

  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Incorrect. Correct answer: ${correctAnswer}`;
    feedbackEl.style.color = "red";
  }
}

function showAnswer() {
  if (!filteredQuizData.length) return;
  answerEl.classList.remove('hidden');
}

function resetCard() {
  spanishInput.value = '';
  feedbackEl.textContent = '';
  answerEl.classList.add('hidden');
}

function nextCard() {
  if (!filteredQuizData.length) return;
  currentCardIndex = (currentCardIndex + 1) % filteredQuizData.length;
  displayCard();
}

function prevCard() {
  if (!filteredQuizData.length) return;
  currentCardIndex = (currentCardIndex - 1 + filteredQuizData.length) % filteredQuizData.length;
  displayCard();
}

function switchLanguage() {
  isEnglishToSpanish = !isEnglishToSpanish;
  displayCard();
}

function applyFilterAndLoad() {
  const category = categorySelect.value;
  filteredQuizData = category === "all" ? [...quizData] : quizData.filter(card => card.sort === category);

  shuffle(filteredQuizData);
  currentCardIndex = 0;
  displayCard();
}

// Event listeners
submitBtn.addEventListener('click', checkSpanishAnswer);
spanishInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkSpanishAnswer();
});
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);
showAnswerBtn.addEventListener('click', showAnswer);
resetBtn.addEventListener('click', resetCard);
switchLanguageBtn.addEventListener('click', switchLanguage);
categorySelect.addEventListener('change', applyFilterAndLoad);
