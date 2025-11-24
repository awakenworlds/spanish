document.addEventListener('DOMContentLoaded', () => {
    // Re-mapped DOM Elements from Nepali IDs
    const questionEl = document.getElementById('question');
    const answerEl = document.getElementById('answer');
    const feedbackEl = document.getElementById('feedback'); 
    
    // Updated Input elements
    const spanishInput = document.getElementById('spanish-answer-input'); // Renamed from romanizedInput
    const submitSpanishBtn = document.getElementById('submit-spanish-btn'); // Renamed from submitRomanizedBtn
    const showSpanishBtn = document.getElementById('show-spanish-answer-btn'); // Renamed from showRomanBtn
    const spanishActionRow = document.getElementById('spanish-action-row'); // Renamed from romanActionRow

    const prevBtn = document.getElementById('prev-card-btn');
    const nextBtn = document.getElementById('next-card-btn');
    const englishModeBtn = document.getElementById('english-mode-btn'); // Toggles Q: English <-> Spanish
    const filterDropdown = document.getElementById('filter-dropdown');
    const randomizeToggle = document.getElementById('random-toggle');
    const multipleChoiceToggle = document.getElementById('multiple-choice-toggle');
    const categoryLimitedToggle = document.getElementById('category-limited-toggle'); 
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsList = document.getElementById('search-results-list');
    const quizContent = document.getElementById('quiz-content');
    const backToQuizBtn = document.getElementById('back-to-quiz-btn');
    const multipleChoiceContainer = document.getElementById('multiple-choice-container');
    const secondaryMCContainer = document.getElementById('secondary-mc-container'); 
    
    // Simplified Tracker for Spanish and English only
    let quizData = [];
    let filteredQuizData = [];
    let currentCardIndex = 0;
    // isSpanishQuestionMode = false: Question is English, Answer is Spanish (default)
    // isSpanishQuestionMode = true: Question is Spanish, Answer is English
    let isSpanishQuestionMode = false; 

    const tracker = {
        spanish: { correct: 0, incorrect: 0 },
        english: { correct: 0, incorrect: 0 }
    };

    // ---------------- TRACKER UPDATE ----------------
    function updateTracker() {
        const totalCorrect = tracker.spanish.correct + tracker.english.correct;
        const totalIncorrect = tracker.spanish.incorrect + tracker.english.incorrect;
        const totalAttempts = totalCorrect + totalIncorrect;
        const totalPercent = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

        function calcPercent(correct, incorrect) {
            const attempts = correct + incorrect;
            return attempts ? Math.round((correct / attempts) * 100) : 0;
        }

        document.querySelector('.tracker-container').innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th class="lang-col"></th>
                        <th>Correct</th>
                        <th>Incorrect</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="total-row">
                        <td class="lang-col">Total:</td>
                        <td class="score-col correct-col"><span style="color:#4ade80">${totalCorrect}</span></td>
                        <td class="score-col incorrect-col"><span style="color:#f87171">${totalIncorrect}</span></td>
                        <td>${totalPercent}%</td>
                    </tr>
                    <tr>
                        <td class="lang-col">Spanish:</td>
                        <td class="score-col correct-col"><span style="color:#4ade80">${tracker.spanish.correct}</span></td>
                        <td class="score-col incorrect-col"><span style="color:#f87171">${tracker.spanish.incorrect}</span></td>
                        <td>${calcPercent(tracker.spanish.correct, tracker.spanish.incorrect)}%</td>
                    </tr>
                    <tr>
                        <td class="lang-col">English:</td>
                        <td class="score-col correct-col"><span style="color:#4ade80">${tracker.english.correct}</span></td>
                        <td class="score-col incorrect-col"><span style="color:#f87171">${tracker.english.incorrect}</span></td>
                        <td>${calcPercent(tracker.english.correct, tracker.english.incorrect)}%</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    multipleChoiceToggle.checked = true;
    categoryLimitedToggle.checked = true;

    function capitalize(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Normalization for Spanish: removes accents for looser matching
    function normalizeAnswer(ans) {
        return String(ans || '').toLowerCase().trim()
            .replace(/[áéíóúüñ]/g, match => {
                if (match === 'á') return 'a';
                if (match === 'é') return 'e';
                if (match === 'í') return 'i';
                if (match === 'ó') return 'o';
                if (match === 'ú') return 'u';
                if (match === 'ü') return 'u';
                if (match === 'ñ') return 'n';
                return match;
            });
    }

    function isAnswerCorrect(userAnswer, cardAnswer) {
        userAnswer = normalizeAnswer(userAnswer);
        cardAnswer = normalizeAnswer(cardAnswer);
        // Assuming answers might have alternatives separated by /
        const bracketIndex = cardAnswer.indexOf('(');
        if (bracketIndex !== -1) cardAnswer = cardAnswer.slice(0, bracketIndex).trim();
        return cardAnswer.split('/').map(e => e.trim()).includes(userAnswer);
    }

    function populateFilterDropdown(data) {
        const categories = new Set();
        data.forEach(item => {
            if (item.sort) categories.add(item.sort.toLowerCase());
            if (item.sort2) categories.add(item.sort2.toLowerCase());
        });
        while (filterDropdown.children.length > 1) {
            filterDropdown.removeChild(filterDropdown.lastChild);
        }
        Array.from(categories).sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = capitalize(category);
            filterDropdown.appendChild(option);
        });
    }

    function toggleInputRowButtons(inputRow, disabled) {
        const buttons = inputRow.querySelectorAll('button:not(.reveal)');
        buttons.forEach(btn => btn.disabled = disabled);
    }

    function displayCard() {
        const card = filteredQuizData[currentCardIndex];
        if (!card) {
            questionEl.textContent = "No flashcards with current filters.";
            answerEl.classList.add('hidden');
            feedbackEl.classList.add('hidden'); 
            spanishActionRow.style.display = 'none';
            multipleChoiceContainer.classList.add('hidden');
            secondaryMCContainer.classList.add('hidden');
            return;
        }

        // --- Question/Answer Mapping ---
        // key 'answer' = Spanish word, key 'question' = English definition
        const questionKey = isSpanishQuestionMode ? 'answer' : 'question';
        const answerKey = isSpanishQuestionMode ? 'question' : 'answer';

        questionEl.textContent = card[questionKey];
        answerEl.textContent = '';
        answerEl.classList.add('hidden');
        feedbackEl.textContent = '';
        feedbackEl.classList.add('hidden');
        feedbackEl.classList.remove('incorrect');

        spanishActionRow.style.display = 'none';
        multipleChoiceContainer.classList.add('hidden');
        secondaryMCContainer.classList.add('hidden');
        multipleChoiceContainer.innerHTML = '';
        secondaryMCContainer.innerHTML = '';
        spanishInput.value = '';

        toggleInputRowButtons(spanishActionRow, false);

        const useMC = multipleChoiceToggle.checked;
        const limitCategory = categoryLimitedToggle.checked;

        if (useMC) {
            // Display Multiple Choice for the target answer key
            generateMC(card, answerKey, multipleChoiceContainer, limitCategory);
        } else {
            // Display Input row for the target answer key
            spanishActionRow.style.display = 'flex';
            
            // Update input placeholder based on the required answer language
            spanishInput.placeholder = answerKey === 'answer' ? 'Spanish Answer' : 'English Answer';
        }
    }
    
    function handleMultipleChoiceSelection(selectedButton, isCorrect, correctText, key) {
        feedbackEl.classList.remove('hidden', 'incorrect'); 
        const container = selectedButton.parentElement;
        
        if (isCorrect) {
            selectedButton.style.backgroundColor = 'green';
            selectedButton.style.color = 'white';
            feedbackEl.textContent = 'Correct | Correcto';
            if (key === 'answer') tracker.spanish.correct++; // Spanish Answer
            else if (key === 'question') tracker.english.correct++; // English Answer
            
            // Disable all buttons in the container after correct answer
            Array.from(container.querySelectorAll('button')).forEach(b => b.disabled = true);
        } else {
            selectedButton.style.backgroundColor = 'red';
            selectedButton.style.color = 'white'; 
            feedbackEl.textContent = 'Incorrect | Incorrecto'; 
            feedbackEl.classList.add('incorrect'); 
            if (key === 'answer') tracker.spanish.incorrect++;
            else if (key === 'question') tracker.english.incorrect++;

            // Highlight the correct answer
            Array.from(container.querySelectorAll('button')).forEach(b => {
                if(b.textContent === correctText) {
                    b.style.backgroundColor = 'green';
                    b.style.color = 'white';
                }
                b.disabled = true;
            });
        }
        updateTracker();
    }

    function generateMC(card, key, container, limitCategory) {
        container.innerHTML = '';
        container.classList.remove('hidden');
        const correctAnswer = card[key];
        let options = [correctAnswer];

        let pool = quizData.filter(c => c[key] !== correctAnswer);
        if (limitCategory) {
            pool = pool.filter(c => c.sort === card.sort || c.sort2 === card.sort); 
        }
        pool = pool.map(c => c[key]);
        shuffle(pool);

        while (options.length < 4 && pool.length > 0) {
            const potentialOption = pool.pop();
            // Ensure option is unique and not an empty string
            if(potentialOption && !options.includes(potentialOption)) {
                options.push(potentialOption);
            }
        }
        shuffle(options); 

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            const isCorrect = (opt === correctAnswer);
            
            btn.addEventListener('click', () => {
                handleMultipleChoiceSelection(btn, isCorrect, correctAnswer, key);
            });
            container.appendChild(btn);
        });
    }

    function checkSpanishAnswer() {
        const card = filteredQuizData[currentCardIndex];
        if (!card) return;

        // Determine which answer is being checked based on the current mode
        const answerKey = isSpanishQuestionMode ? 'question' : 'answer';
        const isSpanishAnswer = (answerKey === 'answer'); // True if we are expecting a Spanish response

        const userAnswer = spanishInput.value.replace(/[✅❌]/g, '').trim();
        if (!userAnswer) return;

        feedbackEl.classList.remove('hidden', 'incorrect');
        
        // Use the appropriate answer from the card
        const cardAnswer = card[answerKey];

        if (isAnswerCorrect(userAnswer, cardAnswer)) {
            spanishInput.value = userAnswer + ' ✅';
            feedbackEl.textContent = 'Correct | Correcto';
            if (isSpanishAnswer) tracker.spanish.correct++;
            else tracker.english.correct++;
        } else {
            spanishInput.value = userAnswer + ' ❌';
            feedbackEl.textContent = 'Incorrect | Incorrecto';
            feedbackEl.classList.add('incorrect');
            if (isSpanishAnswer) tracker.spanish.incorrect++;
            else tracker.english.incorrect++;
        }
        updateTracker();
        toggleInputRowButtons(spanishActionRow, true);
    }

    // EVENT LISTENERS 
    submitSpanishBtn.addEventListener('click', checkSpanishAnswer);
    spanishInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkSpanishAnswer(); });

    spanishInput.addEventListener('input', () => { 
        spanishInput.value = spanishInput.value.replace(/[✅❌]/g, '');
        feedbackEl.classList.add('hidden');
        toggleInputRowButtons(spanishActionRow, false);
    });

    prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + filteredQuizData.length) % filteredQuizData.length;
        displayCard();
    });

    nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % filteredQuizData.length;
        displayCard();
    });

    // Toggle logic update: changes question language
    englishModeBtn.addEventListener('click', () => {
        isSpanishQuestionMode = !isSpanishQuestionMode; 
        // Display opposite language hint (Es = Question in English, En = Question in Spanish)
        englishModeBtn.textContent = isSpanishQuestionMode ? "En" : "Es"; 
        displayCard();
    });

    multipleChoiceToggle.addEventListener('change', displayCard);
    categoryLimitedToggle.addEventListener('change', () => displayCard());

    filterDropdown.addEventListener('change', () => {
        const value = filterDropdown.value;
        if (value === "all") {
            filteredQuizData = quizData.slice();
        } else {
            // Filter by 'sort' OR 'sort2' property
            filteredQuizData = quizData.filter(card => card.sort === value || card.sort2 === value);
        }
        if (randomizeToggle.checked) shuffle(filteredQuizData);
        currentCardIndex = 0;
        displayCard();
    });

    randomizeToggle.addEventListener('change', () => {
        if (randomizeToggle.checked) shuffle(filteredQuizData);
        currentCardIndex = 0;
        displayCard();
    });

    searchInput.addEventListener('input', () => {
        const term = normalizeAnswer(searchInput.value);
        if (!term) {
            searchResultsContainer.classList.add('hidden');
            quizContent.style.display = 'block';
            filterDropdown.style.display = '';
            englishModeBtn.style.display = '';
            return;
        }
        quizContent.style.display = 'none';
        searchResultsContainer.classList.remove('hidden');
        filterDropdown.style.display = 'none';
        englishModeBtn.style.display = 'none';

        const results = quizData.filter(card =>
            normalizeAnswer(card.answer).includes(term) || // Spanish Answer
            normalizeAnswer(card.question).includes(term)   // English Question
        );
        displaySearchResults(results);
    });

    function displaySearchResults(results) {
        searchResultsList.innerHTML = '';
        if (results.length === 0 && searchInput.value.length > 0) {
            searchResultsList.innerHTML = '<li>No matches found.</li>';
        } else {
            results.forEach(card => {
                const li = document.createElement('li');
                // Display Spanish (answer) and English (question)
                li.innerHTML = `<span class="result-spanish">${card.answer}</span> <span class="result-english">(${card.question})</span>`;
                li.addEventListener('click', () => {
                    const cardSortValue = card.sort || card.sort2;
                    filterDropdown.value = cardSortValue;
                    filteredQuizData = quizData.filter(c => c.sort === cardSortValue || c.sort2 === cardSortValue);
                    if (randomizeToggle.checked) shuffle(filteredQuizData);
                    // Find the index of the clicked card
                    const newIndex = filteredQuizData.findIndex(item => item.answer === card.answer);
                    currentCardIndex = newIndex !== -1 ? newIndex : 0;
                    resetSearchAndGoToQuiz();
                    displayCard();
                });
                searchResultsList.appendChild(li);
            });
        }
    }

    backToQuizBtn.addEventListener('click', resetSearchAndGoToQuiz);
    function resetSearchAndGoToQuiz() {
        searchInput.value = '';
        searchResultsContainer.classList.add('hidden');
        quizContent.style.display = 'block';
        filterDropdown.style.display = '';
        englishModeBtn.style.display = '';
        displayCard();
    }

    // Show answer logic updated
    showSpanishBtn.addEventListener('click', () => {
        const card = filteredQuizData[currentCardIndex];
        if (card) {
            spanishInput.value = '';
            // Determine which answer to show based on the current mode
            const answerKey = isSpanishQuestionMode ? 'question' : 'answer'; 
            answerEl.textContent = card[answerKey];
            answerEl.classList.remove('hidden');
            feedbackEl.classList.add('hidden');
        }
    });

    function initializeQuiz() {
        // Fetch data.json
        fetch('./data.json')
            .then(res => res.json())
            .then(data => {
                // Map the data to ensure required keys are present
                quizData = data.map(item => ({
                    question: item.question, // English
                    answer: item.answer,     // Spanish
                    sort: item.sort,
                    sort2: item.sort2
                }));
                
                filteredQuizData = quizData.slice();
                populateFilterDropdown(quizData);
                if (randomizeToggle.checked) shuffle(filteredQuizData);
                displayCard();
                englishModeBtn.textContent = 'Es'; // Initial mode: Question English (Es button visible)
                updateTracker();
            })
            .catch(err => {
                console.error('Error loading data.json:', err);
                questionEl.textContent = 'Failed to load flashcards. Check the console for error details.';
            });
    }

    initializeQuiz();

    // ------------------- KEYBOARD NAVIGATION -------------------
    document.addEventListener('keydown', (e) => {
        // Allow Enter key to submit only when the input field is focused
        if (document.activeElement === spanishInput && e.key === 'Enter') {
            checkSpanishAnswer();
            return;
        }

        // Allow arrow keys to navigate only when no input field is focused
        if (document.activeElement !== spanishInput && document.activeElement !== searchInput) {
            if (e.key === "ArrowRight") {
                nextBtn.click();
            } else if (e.key === "ArrowLeft") {
                prevBtn.click();
            }
        }
    });

    // --- About toggle section ---
    const aboutToggle = document.getElementById("about-toggle");
    const aboutContent = document.getElementById("about-content");

    aboutToggle.addEventListener("click", () => {
        const isHidden = aboutContent.classList.contains("hidden");
        aboutContent.classList.toggle("hidden");

        aboutToggle.textContent = isHidden ? "Less ▲" : "More ▼";
    });

});

