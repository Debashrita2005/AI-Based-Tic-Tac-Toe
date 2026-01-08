const cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];
const human = "X";
const ai = "O";

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
  const i = e.target.dataset.index;
  if (board[i] === "") {
    board[i] = human;
    e.target.textContent = human;
    if (!checkWin(human)) aiMove();
  }
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = ai;
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = ai;
  cells[move].textContent = ai;
}

function minimax(board, depth, isMax) {
  if (checkWin(ai)) return 10 - depth;
  if (checkWin(human)) return depth - 10;
  if (!board.includes("")) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = ai;
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = human;
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = "";
      }
    }
    return best;
  }
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(w => w.every(i => board[i] === player));
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
}
