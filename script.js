const STAR_MASK = [
  [0,0,1,1,1,0,0],
  [0,1,1,1,1,1,0],
  [1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1],
  [0,1,1,1,1,1,0],
  [0,0,1,1,1,0,0],
];

const SIZE = 7;

let board = [];
let currentPlayer = 1;
let selected = null;

const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");
const hintText = document.getElementById("hint");
const controls = document.getElementById("controls");

function initBoard() {
  boardDiv.innerHTML = "";
  board = [];
  selected = null;
  controls.classList.add("hidden");
  hintText.innerText = "Select a marble";

  for (let r = 0; r < SIZE; r++) {
    board[r] = [];
    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement("div");
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (STAR_MASK[r][c]) {
        board[r][c] = true;
        cell.className = "cell";

        const marble = document.createElement("div");
        marble.className = "marble";
        cell.appendChild(marble);

        cell.onmouseenter = () => !selected && preview(r, c);
        cell.onmouseleave = () => !selected && clearPreview();
        cell.onclick = () => select(r, c);
      } else {
        board[r][c] = null;
        cell.className = "cell inactive";
      }

      boardDiv.appendChild(cell);
    }
  }
}

function preview(r, c) {
  clearPreview();
  for (let i = 0; i < SIZE; i++) {
    if (board[r][i] !== null) getCell(r, i).classList.add("row-hover");
    if (board[i][c] !== null) getCell(i, c).classList.add("col-hover");
  }
}

function clearPreview() {
  document
    .querySelectorAll(".row-hover,.col-hover")
    .forEach(c => c.classList.remove("row-hover","col-hover"));
}

function select(r, c) {
  selected = { r, c };
  preview(r, c);
  controls.classList.remove("hidden");
  hintText.innerText = "Choose Row or Column";
}

function commitMove(type) {
  if (!selected) return;

  if (type === "row") {
    for (let c = 0; c < SIZE; c++) removeCell(selected.r, c);
  } else {
    for (let r = 0; r < SIZE; r++) removeCell(r, selected.c);
  }

  if (board.flat().filter(v => v === true).length === 0) {
    alert(`Player ${currentPlayer} loses 💀`);
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  turnText.innerText = `Player ${currentPlayer}`;
  selected = null;
  controls.classList.add("hidden");
  hintText.innerText = "Select a marble";
  clearPreview();
}

function removeCell(r, c) {
  if (board[r][c] === true) {
    board[r][c] = false;
    getCell(r, c).firstChild?.classList.add("removed");
  }
}

function getCell(r, c) {
  return boardDiv.children[r * SIZE + c];
}

function resetGame() {
  currentPlayer = 1;
  turnText.innerText = "Player 1";
  initBoard();
}
function isValidLine(type, index) {
  const cells = [];

  if (type === "row") {
    for (let c = 0; c < SIZE; c++) {
      if (board[index][c] === true) cells.push([index, c]);
    }
  } else {
    for (let r = 0; r < SIZE; r++) {
      if (board[r][index] === true) cells.push([r, index]);
    }
  }

  // Rule 2: dead line
  if (cells.length === 0) return false;

  // Rule 4: single-marble line
  if (cells.length === 1 && existsOtherMove()) return false;

  return true;
}
const CENTER = { r: 3, c: 3 };

function includesCenter(type, index) {
  return type === "row"
    ? index === CENTER.r && board[CENTER.r][CENTER.c]
    : index === CENTER.c && board[CENTER.r][CENTER.c];
}


resetGame();
