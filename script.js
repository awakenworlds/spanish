const quizData = [
    // Verbs
    {"question":"to eat","answer":"comer","sort":"verb"},
    {"question":"to live","answer":"vivir","sort":"verb"},
    {"question":"to speak","answer":"hablar","sort":"verb"},
    {"question":"to see","answer":"ver","sort":"verb"},
    {"question":"to want","answer":"querer","sort":"verb"},
    {"question":"to make/to do","answer":"hacer","sort":"verb"},
    {"question":"to be (permanent)","answer":"ser","sort":"verb"},
    {"question":"to be (temporary)","answer":"estar","sort":"verb"},
    {"question":"to have","answer":"tener","sort":"verb"},
    {"question":"to go","answer":"ir","sort":"verb"},

    // Nouns
    {"question":"house","answer":"casa","sort":"noun"},
    {"question":"book","answer":"libro","sort":"noun"},
    {"question":"table","answer":"mesa","sort":"noun"},
    {"question":"car","answer":"coche","sort":"noun"},
    {"question":"dog","answer":"perro","sort":"noun"},
    {"question":"cat","answer":"gato","sort":"noun"},
    {"question":"water","answer":"agua","sort":"noun"},
    {"question":"friend (male)","answer":"amigo","sort":"noun"},
    {"question":"friend (female)","answer":"amiga","sort":"noun"},
    {"question":"city","answer":"ciudad","sort":"noun"},

    // Adjectives
    {"question":"big","answer":"grande","sort":"adjective"},
    {"question":"small","answer":"pequeño","sort":"adjective"},
    {"question":"happy","answer":"feliz","sort":"adjective"},
    {"question":"sad","answer":"triste","sort":"adjective"},
    {"question":"good","answer":"bueno","sort":"adjective"},
    {"question":"bad","answer":"malo","sort":"adjective"},
    {"question":"new","answer":"nuevo","sort":"adjective"},
    {"question":"old","answer":"viejo","sort":"adjective"},
    {"question":"beautiful","answer":"bonito","sort":"adjective"},
    {"question":"ugly","answer":"feo","sort":"adjective"},

    // Common Phrases
    {"question":"Hello, how are you?","answer":"Hola, ¿cómo estás?","sort":"phrase"},
    {"question":"Thank you very much","answer":"Muchas gracias","sort":"phrase"},
    {"question":"Please","answer":"Por favor","sort":"phrase"},
    {"question":"You're welcome","answer":"De nada","sort":"phrase"},
    {"question":"I love you","answer":"Te quiero","sort":"phrase"},
    {"question":"What's your name?","answer":"¿Cómo te llamas?","sort":"phrase"},
    {"question":"Where are you from?","answer":"¿De dónde eres?","sort":"phrase"},
    {"question":"I don't understand","answer":"No entiendo","sort":"phrase"},
    {"question":"I'm sorry","answer":"Lo siento","sort":"phrase"},
    {"question":"Excuse me","answer":"Con permiso","sort":"phrase"}
];

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

let currentCardIndex = 0;
let filteredQuizData = [];
let isEnglishToSpanish = true; // New state variable

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayCard() {
    if (filteredQuizData.length === 0) {
        questionEl.textContent = 'Oops! No flashcards found for this category. Please choose a different one.';
        answerEl.textContent = '';
        answerEl.classList.add('hidden');
        spanishInput.value = '';
        return;
    }

    const currentCard = filteredQuizData[currentCardIndex];
    if (isEnglishToSpanish) {
        questionEl.textContent = currentCard.question;
        answerEl.textContent = currentCard.answer;
        spanishInput.placeholder = "Spanish Answer";
    } else {
        questionEl.textContent = currentCard.answer;
        answerEl.textContent = currentCard.question;
        spanishInput.placeholder = "English Answer";
    }
    answerEl.classList.add('hidden');
    feedbackEl.textContent = '';
    spanishInput.value = '';
    spanishInput.focus();
}

function checkSpanishAnswer() {
    const userAnswer = spanishInput.value.toLowerCase().trim();
    const currentCard = filteredQuizData[currentCardIndex];
    
    let correctAnswer;
    if (isEnglishToSpanish) {
        correctAnswer = currentCard.answer.toLowerCase().trim();
    } else {
        correctAnswer = currentCard.question.toLowerCase().trim();
    }

    // Normalize unicode characters for accurate comparison (e.g., é to e)
    function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    if (normalizeText(userAnswer) === normalizeText(correctAnswer)) {
        feedbackEl.textContent = "Correct! 🎉";
        feedbackEl.classList.remove('incorrect');
        feedbackEl.classList.add('correct');
        answerEl.classList.remove('hidden');
    } else {
        feedbackEl.textContent = "Not quite. Try again!";
        feedbackEl.classList.remove('correct');
        feedbackEl.classList.add('incorrect');
        answerEl.classList.add('hidden');
    }
}

submitBtn.addEventListener('click', checkSpanishAnswer);

spanishInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkSpanishAnswer();
    }
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % filteredQuizData.length;
    displayCard();
});

prevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + filteredQuizData.length) % filteredQuizData.length;
    displayCard();
});

showAnswerBtn.addEventListener('click', () => {
    answerEl.classList.remove('hidden');
});

resetBtn.addEventListener('click', () => {
    displayCard();
});

switchLanguageBtn.addEventListener('click', () => {
    isEnglishToSpanish = !isEnglishToSpanish;
    displayCard();
});

categorySelect.addEventListener('change', applyFilterAndLoad);

function applyFilterAndLoad() {
    const selectedCategory = categorySelect.value;
    if (selectedCategory === 'all') {
        filteredQuizData = [...quizData];
    } else {
        filteredQuizData = quizData.filter(card => card.sort === selectedCategory);
    }
    shuffle(filteredQuizData);
    currentCardIndex = 0;
    displayCard();
}

applyFilterAndLoad();