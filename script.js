const gameBoard = document.querySelector('[data-gameboard]');
const boardCell = document.querySelectorAll('[data-cell]');
const score = document.querySelector('[data-score]');
const restartBtn = document.querySelector('[data-restartbtn]');
const result = document.querySelector('[data-result]');
const winingComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let board = new Array(8);
let round = 0;
let currentPlayer;
var Players;
(function (Players) {
    Players["PLAYER_X"] = "x";
    Players["PLAYER_O"] = "o";
})(Players || (Players = {}));
function gameStart() {
    score.style.visibility = 'hidden';
    boardCell.forEach(cell => cell.style.cursor = 'pointer');
    gameBoard.addEventListener('click', e => {
        const currentTarget = e.target;
        if (currentTarget.classList.contains(Players.PLAYER_X) || currentTarget.classList.contains(Players.PLAYER_O)) {
            return;
        }
        if (currentPlayer === undefined) {
            currentPlayer = Players.PLAYER_X;
        }
        if (currentTarget.classList.contains('cell')) {
            currentTarget.classList.add(currentPlayer);
            const datasetValue = Number(currentTarget.dataset.cell);
            board[datasetValue] = currentPlayer;
            currentTarget.style.cursor = 'default';
            checkWin();
            currentPlayer = currentPlayer === Players.PLAYER_O ? Players.PLAYER_X : Players.PLAYER_O;
        }
    });
}
function checkWin() {
    for (let i = 0; i < winingComb.length; i++) {
        let winingCombCheck = [];
        for (let y = 0; y < winingComb[i].length; y++) {
            winingCombCheck.push(board[winingComb[i][y]]);
        }
        if (winingCombCheck[0] != undefined) {
            if (winingCombCheck[0] === winingCombCheck[1] && winingCombCheck[1] === winingCombCheck[2]) {
                displayScore(`${currentPlayer.toLocaleUpperCase()}'s wins!`);
            }
            else if (round === 8) {
                displayScore('Draw!');
            }
        }
    }
    round++;
}
function reset() {
    restartBtn.addEventListener('click', () => {
        currentPlayer = Players.PLAYER_X;
        board = new Array(8);
        boardCell.forEach(board => {
            board.classList.remove('x', 'o');
            board.style.cursor = 'pointer';
        });
        score.style.visibility = 'hidden';
        round = 0;
    });
}
function displayScore(message) {
    const resultMessage = message;
    score.style.visibility = 'visible';
    result.innerHTML = resultMessage;
    reset();
}
gameStart();
//# sourceMappingURL=script.js.map