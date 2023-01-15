type combinationsArray = number[][]

const gameBoard: HTMLDivElement = document.querySelector('[data-gameboard]')
const boardCell: NodeListOf<HTMLElement | null> = document.querySelectorAll('[data-cell]')
const score: HTMLDivElement = document.querySelector('[data-score]')
const restartBtn: HTMLButtonElement = document.querySelector('[data-restartbtn]')
const result: HTMLParagraphElement = document.querySelector('[data-result]')
const winingComb: combinationsArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let board: string[] = new Array(8)
let round: number = 0
let currentPlayer: string

enum Players {
  PLAYER_X = 'x',
  PLAYER_O = 'o'
}

function gameStart(): void {
  score.style.visibility = 'hidden'
  boardCell.forEach(cell => cell.style.cursor = 'pointer')
  gameBoard.addEventListener('click', e => {
    const currentTarget = e.target as HTMLElement

    if (currentTarget.classList.contains(Players.PLAYER_X) || currentTarget.classList.contains(Players.PLAYER_O)) {
      return
    }

    if (currentPlayer === undefined) {
      currentPlayer = Players.PLAYER_X
    }

    if (currentTarget.classList.contains('cell')) {
      currentTarget.classList.add(currentPlayer)
      const datasetValue: number = Number((currentTarget as HTMLDivElement).dataset.cell)
      board[datasetValue] = currentPlayer
      currentTarget.style.cursor = 'default'

      checkWin()

      currentPlayer = currentPlayer === Players.PLAYER_O ? Players.PLAYER_X : Players.PLAYER_O
    }
  })
}

function checkWin(): void {
  for (let i = 0; i < winingComb.length; i++) {
    let winingCombCheck: string[] = [];
    for (let y = 0; y < winingComb[i].length; y++) {
      winingCombCheck.push(board[winingComb[i][y]])
    }
    if (winingCombCheck[0] != undefined) {
      if (winingCombCheck[0] === winingCombCheck[1] && winingCombCheck[1] === winingCombCheck[2]) {
        displayScore(`${currentPlayer.toLocaleUpperCase()}'s wins!`)
      } else if (round === 8) {
        displayScore('Draw!')
      }
    }
  }
  round++
}

function reset(): void {
  restartBtn.addEventListener('click', () => {

    currentPlayer = Players.PLAYER_X
    board = new Array(8)
    boardCell.forEach(board => {
      board.classList.remove('x', 'o')
      board.style.cursor = 'pointer'
    })
    score.style.visibility = 'hidden'
    round = 0
  })
}

function displayScore(message: string): void {
  const resultMessage = message;
  score.style.visibility = 'visible';
  result.innerHTML = resultMessage
  reset()
}

gameStart()