let currentCardIndex = 0;
let flashcards = [];
const wordElement = document.getElementById('word');
const answerElement = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');

async function fetchData() {
    const response = await fetch('data.json');
    flashcards = await response.json();
    shuffleArray(flashcards);
    displayCard();
}


function displayCard() {
    wordElement.textContent = flashcards[currentCardIndex].word;
    answerElement.value = '';
    feedbackElement.textContent = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}


function checkAnswer() {
    const userAnswer = answerElement.value.trim().toLowerCase(); // Convert to lowercase and trim whitespace
    const correctAnswer = flashcards[currentCardIndex].translation.toLowerCase(); // Convert correct answer to lowercase

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correcto ! 😸';
        setTimeout(() => {
            nextCard();
        }, 1000);
    } else {
        feedbackElement.textContent = 'Lo siento, Rung, eso no es correcto. 😿';
        setTimeout(function() {
            feedbackElement.textContent = '';
        }, 2000);
    }
}

function showAnswer() {
    feedbackElement.textContent = `✔️ The correct answer is : ${flashcards[currentCardIndex].translation}`;
}



function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    displayCard();
}

const toggleSidebarButton = document.getElementById('toggleSidebarButton');
const sidebar = document.querySelector('.sidebar');
let isSidebarOpen = false;

toggleSidebarButton.addEventListener('click', function() {
    if (isSidebarOpen) {
        sidebar.style.left = '-250px'; // Close the sidebar
    } else {
        sidebar.style.left = '0'; // Open the sidebar
    }
    
    isSidebarOpen = !isSidebarOpen; // Toggle the sidebar state
});


const openModalButton = document.getElementById('openModalButton');
const modalContainer = document.getElementById('modalContainer');
const closeModalButton = document.getElementById('closeModalButton');

openModalButton.addEventListener('click', function() {
    modalContainer.classList.remove('hidden');
});

closeModalButton.addEventListener('click', function() {
    modalContainer.classList.add('hidden');
});





fetchData();
