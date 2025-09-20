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
    {"question":"to know (a person/place)","answer":"conocer","sort":"verb"},
    {"question":"to know (a fact/how to do something)","answer":"saber","sort":"verb"},
    {"question":"to come","answer":"venir","sort":"verb"},
    {"question":"to put","answer":"poner","sort":"verb"},
    {"question":"to take","answer":"tomar","sort":"verb"},
    {"question":"to give","answer":"dar","sort":"verb"},
    {"question":"to buy","answer":"comprar","sort":"verb"},
    {"question":"to sell","answer":"vender","sort":"verb"},
    {"question":"to work","answer":"trabajar","sort":"verb"},
    {"question":"to read","answer":"leer","sort":"verb"},
    {"question":"to write","answer":"escribir","sort":"verb"},
    {"question":"to open","answer":"abrir","sort":"verb"},
    {"question":"to close","answer":"cerrar","sort":"verb"},
    {"question":"to sleep","answer":"dormir","sort":"verb"},
    {"question":"to wake up","answer":"despertarse","sort":"verb"},
    {"question":"to clean","answer":"limpiar","sort":"verb"},
    {"question":"to sing","answer":"cantar","sort":"verb"},
    {"question":"to dance","answer":"bailar","sort":"verb"},
    {"question":"to find","answer":"encontrar","sort":"verb"},
    {"question":"to help","answer":"ayudar","sort":"verb"},
    {"question":"to listen","answer":"escuchar","sort":"verb"},
    {"question":"to run","answer":"correr","sort":"verb"},
    {"question":"to play (a sport/game)","answer":"jugar","sort":"verb"},
    {"question":"to play (an instrument)","answer":"tocar","sort":"verb"},
    {"question":"to arrive","answer":"llegar","sort":"verb"},
    {"question":"to leave","answer":"salir","sort":"verb"},
    {"question":"to finish","answer":"terminar","sort":"verb"},
    {"question":"to begin","answer":"empezar","sort":"verb"},
    {"question":"to look for","answer":"buscar","sort":"verb"},
    {"question":"to wait for","answer":"esperar","sort":"verb"},
    {"question":"to ask for","answer":"pedir","sort":"verb"},
    {"question":"to think","answer":"pensar","sort":"verb"},
    {"question":"to bring","answer":"traer","sort":"verb"},
    {"question":"to remember","answer":"recordar","sort":"verb"},
    {"question":"to understand","answer":"entender","sort":"verb"},
    {"question":"to pay","answer":"pagar","sort":"verb"},
    {"question":"to study","answer":"estudiar","sort":"verb"},
    {"question":"to travel","answer":"viajar","sort":"verb"},
    {"question":"to lose","answer":"perder","sort":"verb"},
    {"question":"to win","answer":"ganar","sort":"verb"},
    {"question":"to feel","answer":"sentir","sort":"verb"},
    {"question":"to need","answer":"necesitar","sort":"verb"},
    {"question":"to receive","answer":"recibir","sort":"verb"},

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
    {"question":"country","answer":"país","sort":"noun"},
    {"question":"person","answer":"persona","sort":"noun"},
    {"question":"man","answer":"hombre","sort":"noun"},
    {"question":"woman","answer":"mujer","sort":"noun"},
    {"question":"boy","answer":"chico","sort":"noun"},
    {"question":"girl","answer":"chica","sort":"noun"},
    {"question":"food","answer":"comida","sort":"noun"},
    {"question":"money","answer":"dinero","sort":"noun"},
    {"question":"time","answer":"tiempo","sort":"noun"},
    {"question":"day","answer":"día","sort":"noun"},
    {"question":"night","answer":"noche","sort":"noun"},
    {"question":"morning","answer":"mañana","sort":"noun"},
    {"question":"afternoon/evening","answer":"tarde","sort":"noun"},
    {"question":"thing","answer":"cosa","sort":"noun"},
    {"question":"place","answer":"lugar","sort":"noun"},
    {"question":"work","answer":"trabajo","sort":"noun"},
    {"question":"school","answer":"escuela","sort":"noun"},
    {"question":"university","answer":"universidad","sort":"noun"},
    {"question":"restaurant","answer":"restaurante","sort":"noun"},
    {"question":"store","answer":"tienda","sort":"noun"},
    {"question":"street","answer":"calle","sort":"noun"},
    {"question":"phone","answer":"teléfono","sort":"noun"},
    {"question":"computer","answer":"computadora","sort":"noun"},
    {"question":"family","answer":"familia","sort":"noun"},
    {"question":"mother","answer":"madre","sort":"noun"},
    {"question":"father","answer":"padre","sort":"noun"},
    {"question":"brother","answer":"hermano","sort":"noun"},
    {"question":"sister","answer":"hermana","sort":"noun"},
    {"question":"sun","answer":"sol","sort":"noun"},
    {"question":"moon","answer":"luna","sort":"noun"},
    {"question":"key","answer":"llave","sort":"noun"},
    {"question":"door","answer":"puerta","sort":"noun"},
    {"question":"window","answer":"ventana","sort":"noun"},
    {"question":"music","answer":"música","sort":"noun"},
    {"question":"movie","answer":"película","sort":"noun"},
    {"question":"sport","answer":"deporte","sort":"noun"},
    {"question":"teacher","answer":"profesor","sort":"noun"},
    {"question":"student","answer":"estudiante","sort":"noun"},
    {"question":"doctor","answer":"doctor","sort":"noun"},

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
    {"question":"tall","answer":"alto","sort":"adjective"},
    {"question":"short","answer":"bajo","sort":"adjective"},
    {"question":"easy","answer":"fácil","sort":"adjective"},
    {"question":"difficult","answer":"difícil","sort":"adjective"},
    {"question":"young","answer":"joven","sort":"adjective"},
    {"question":"old (for people)","answer":"mayor","sort":"adjective"},
    {"question":"intelligent","answer":"inteligente","sort":"adjective"},
    {"question":"stupid","answer":"estúpido","sort":"adjective"},
    {"question":"rich","answer":"rico","sort":"adjective"},
    {"question":"poor","answer":"pobre","sort":"adjective"},
    {"question":"strong","answer":"fuerte","sort":"adjective"},
    {"question":"weak","answer":"débil","sort":"adjective"},
    {"question":"clean","answer":"limpio","sort":"adjective"},
    {"question":"dirty","answer":"sucio","sort":"adjective"},
    {"question":"loud","answer":"ruidoso","sort":"adjective"},
    {"question":"quiet","answer":"tranquilo","sort":"adjective"},
    {"question":"fast","answer":"rápido","sort":"adjective"},
    {"question":"slow","answer":"lento","sort":"adjective"},
    {"question":"hot","answer":"caliente","sort":"adjective"},
    {"question":"cold","answer":"frío","sort":"adjective"},
    {"question":"cheap","answer":"barato","sort":"adjective"},
    {"question":"expensive","answer":"caro","sort":"adjective"},
    {"question":"empty","answer":"vacío","sort":"adjective"},
    {"question":"full","answer":"lleno","sort":"adjective"},
    {"question":"healthy","answer":"sano","sort":"adjective"},
    {"question":"sick","answer":"enfermo","sort":"adjective"},
    {"question":"tired","answer":"cansado","sort":"adjective"},
    {"question":"bored","answer":"aburrido","sort":"adjective"},
    {"question":"excited","answer":"emocionado","sort":"adjective"},
    {"question":"busy","answer":"ocupado","sort":"adjective"},
    {"question":"free","answer":"libre","sort":"adjective"},

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
    {"question":"Excuse me","answer":"Con permiso","sort":"phrase"},
    {"question":"Good morning","answer":"Buenos días","sort":"phrase"},
    {"question":"Good afternoon/evening","answer":"Buenas tardes","sort":"phrase"},
    {"question":"Good night","answer":"Buenas noches","sort":"phrase"},
    {"question":"How much does it cost?","answer":"¿Cuánto cuesta?","sort":"phrase"},
    {"question":"I need help","answer":"Necesito ayuda","sort":"phrase"},
    {"question":"Where is the bathroom?","answer":"¿Dónde está el baño?","sort":"phrase"},
    {"question":"I'm hungry","answer":"Tengo hambre","sort":"phrase"},
    {"question":"I'm thirsty","answer":"Tengo sed","sort":"phrase"},
    {"question":"I'm tired","answer":"Estoy cansado","sort":"phrase"},
    {"question":"What's the weather like?","answer":"¿Qué tiempo hace?","sort":"phrase"},
    {"question":"It's hot","answer":"Hace calor","sort":"phrase"},
    {"question":"It's cold","answer":"Hace frío","sort":"phrase"},
    {"question":"Nice to meet you","answer":"Mucho gusto","sort":"phrase"},
    {"question":"See you later","answer":"Hasta luego","sort":"phrase"},
    {"question":"See you tomorrow","answer":"Hasta mañana","sort":"phrase"},
    {"question":"I am from...","answer":"Soy de...","sort":"phrase"},
    {"question":"I speak a little Spanish","answer":"Hablo un poco de español","sort":"phrase"},
    {"question":"What do you want to eat?","answer":"¿Qué quieres comer?","sort":"phrase"},
    {"question":"How old are you?","answer":"¿Cuántos años tienes?","sort":"phrase"},
    {"question":"I have 20 years (I am 20 years old)","answer":"Tengo 20 años","sort":"phrase"},
    {"question":"What is your profession?","answer":"¿A qué te dedicas?","sort":"phrase"},
    {"question":"Where are you going?","answer":"¿A dónde vas?","sort":"phrase"},
    {"question":"Do you like it?","answer":"¿Te gusta?","sort":"phrase"},
    {"question":"I like it a lot","answer":"Me gusta mucho","sort":"phrase"},
    {"question":"I'm sorry, I can't","answer":"Lo siento, no puedo","sort":"phrase"},
    {"question":"Can you help me?","answer":"¿Me puedes ayudar?","sort":"phrase"},
    {"question":"What time is it?","answer":"¿Qué hora es?","sort":"phrase"},
    {"question":"It's one o'clock","answer":"Es la una","sort":"phrase"},
    {"question":"It's two o'clock","answer":"Son las dos","sort":"phrase"},
    {"question":"Right now","answer":"Ahora mismo","sort":"phrase"},
    {"question":"A little bit","answer":"Un poquito","sort":"phrase"},
    {"question":"What's up?","answer":"¿Qué pasa?","sort":"phrase"},
    {"question":"What's the matter?","answer":"¿Qué te pasa?","sort":"phrase"},
    {"question":"Take it easy","answer":"Tómalo con calma","sort":"phrase"},
    {"question":"Don't worry","answer":"No te preocupes","sort":"phrase"},
    {"question":"Let's go!","answer":"¡Vamos!","sort":"phrase"},
    {"question":"Come here","answer":"Ven aquí","sort":"phrase"},
    {"question":"I'm lost","answer":"Estoy perdido","sort":"phrase"},
    {"question":"I'm happy","answer":"Estoy feliz","sort":"phrase"},
    {"question":"I'm sad","answer":"Estoy triste","sort":"phrase"},
    {"question":"It's delicious","answer":"Está delicioso","sort":"phrase"},
    {"question":"Cheers!","answer":"¡Salud!","sort":"phrase"},
    {"question":"One, two, three","answer":"Uno, dos, tres","sort":"phrase"},
    {"question":"I have a question","answer":"Tengo una pregunta","sort":"phrase"}
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