const chicken = document.getElementById('chicken');
const stepBtn = document.getElementById('step-btn');
const startBtn = document.getElementById('start-btn');
const cashoutBtn = document.getElementById('cashout-btn');
const winModal = document.getElementById('win-modal');
const road = document.getElementById('road');

let currentPosition = 0;
let currentBet = 0;
const stepSize = 100;
const totalSteps = 5;
const burnProbability = 0.2; // 20% вероятность сгореть

startBtn.addEventListener('click', startGame);
stepBtn.addEventListener('click', makeStep);
cashoutBtn.addEventListener('click', cashout);

function startGame() {
    currentBet = 10; // Ставка 10$
    currentPosition = 0;
    chicken.style.left = '10px';
    startBtn.disabled = true;
    stepBtn.disabled = false;
    cashoutBtn.disabled = false;
    // Здесь должна быть логика списания денег
}

function makeStep() {
    if (Math.random() < burnProbability) {
        alert('Курочка сгорела! Начинаем сначала.');
        resetGame();
        return;
    }

    currentPosition++;
    const newPosition = 10 + (currentPosition * stepSize);
    chicken.style.left = `${newPosition}px`;

    if (currentPosition >= totalSteps) {
        winGame();
    }
}

function cashout() {
    const winAmount = calculateWinAmount();
    alert(`Вы забрали выигрыш! Ваш выигрыш: ${winAmount}`);
    resetGame();
}

function calculateWinAmount() {
    // Формула расчета выигрыша в зависимости от пройденных шагов
    return currentPosition * 20; // Например, 20$ за каждый шаг
}

function winGame() {
    winModal.classList.remove('hidden');
    stepBtn.disabled = true;
    cashoutBtn.disabled = true;
}

function resetGame() {
    currentPosition = 0;
    chicken.style.left = '10px';
    startBtn.disabled = false;
    stepBtn.disabled = true;
    cashoutBtn.disabled = true;
    winModal.classList.add('hidden');
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target === winModal) {
        winModal.classList.add('hidden');
    }
});
