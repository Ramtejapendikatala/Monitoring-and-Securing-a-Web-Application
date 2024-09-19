const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = false;
let mode = '';

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return null;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        statusText.textContent = `${winner} Wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    if (mode === 'Person vs Computer' && currentPlayer === 'X') {
        setTimeout(() => computerMove(), 500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

function computerMove() {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';

    const winner = checkWin();
    if (winner) {
        statusText.textContent = `${winner} Wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    statusText.textContent = "X's Turn";
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "X's Turn";
}

function startGame(selectedMode) {
    mode = selectedMode;
    board.style.display = 'grid';
    restartButton.style.display = 'inline-block';
    statusText.textContent = "X's Turn";
    gameActive = true;
}

document.getElementById('person-vs-person').addEventListener('click', () => startGame('Person vs Person'));
document.getElementById('person-vs-computer').addEventListener('click', () => startGame('Person vs Computer'));
restartButton.addEventListener('click', restartGame);

cells.forEach(cell => cell.addEventListener('click', handleClick));
