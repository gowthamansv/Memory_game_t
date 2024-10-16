let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cards = Array.from(document.querySelectorAll('.card'));
const restartButton = document.getElementById('restartButton');

function shuffleCards() {
    cards.forEach(card => {
        const randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition;
    });
}
function initializeGame() {
    cards.forEach(card => {
        card.classList.remove('flipped', 'bg-white', 'text-gray-800', 'matched');
        card.classList.add('bg-green-500', 'text-white');
        card.textContent = ''; // Hide the card name
        card.addEventListener('click', flipCard);
    });
    shuffleCards();
}
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped', 'bg-white', 'text-gray-800');
    this.classList.remove('bg-green-500', 'text-white');
    this.textContent = this.getAttribute('data-name');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');
    isMatch ? markAsMatched() : unflipCards();
}
// markAsMatched
function markAsMatched() {
    firstCard.classList.add('matched', 'bg-red-300', 'text-black');
    secondCard.classList.add('matched', 'bg-red-300', 'text-black');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoardState();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped', 'bg-white', 'text-gray-800');
        secondCard.classList.remove('flipped', 'bg-white', 'text-gray-800');
        firstCard.classList.add('bg-green-500', 'text-white');
        secondCard.classList.add('bg-green-500', 'text-white');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoardState();
    }, 1000);
}
function resetBoardState() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
restartButton.addEventListener('click', initializeGame);
initializeGame();