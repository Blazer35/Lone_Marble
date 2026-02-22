console.log("Script loaded");
const STAR_MASK = [
  [0,0,0,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,0,0,0],
];

const SIZE = 9;
const ROWS = 7;

let board = [];
let currentPlayer = 1;

let selected = null;
let selectionMode = -1;

const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");
const controls = document.getElementById("controls");
const modeLabel = document.getElementById("modeLabel");
let lastMoveType = null;
// Can be: "row", "col", "diag1", "diag2"


function initBoard() {
  console.log("initBoard running");
  boardDiv.innerHTML = "";
  board = [];

  for (let r = 0; r < STAR_MASK.length; r++) {
    board[r] = [];

    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement("div");
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (STAR_MASK[r][c] === 1) {
        board[r][c] = true;
        cell.className = "cell";

        const marble = document.createElement("div");
        marble.className = "marble";
        cell.appendChild(marble);
        cell.onclick = () => select(r, c);
      } else {
        board[r][c] = null;
        cell.className = "cell inactive";
      }

      boardDiv.appendChild(cell);
    }
  }

  resetSelection();
}

function select(r, c) {
  if (!selected || selected.r !== r || selected.c !== c) {
    selected = { r, c };
    selectionMode = 0;
  } else {
    selectionMode++;
    if (selectionMode > 3) {
      resetSelection();
      return;
    }
  }

  updatePreview();
  controls.classList.remove("hidden");
}

function updatePreview() {
  clearPreview();
  if (!selected) return;

  const { r, c } = selected;

  switch (selectionMode) {
    case 0:
      modeLabel.innerText = "Mode: ROW";
      highlightRow(r);
      break;
    case 1:
      modeLabel.innerText = "Mode: COLUMN";
      highlightColumn(c);
      break;
    case 2:
      modeLabel.innerText = "Mode: DIAGONAL ↘";
      highlightDiag1(r, c);
      break;
    case 3:
      modeLabel.innerText = "Mode: DIAGONAL ↙";
      highlightDiag2(r, c);
      break;
  }
}

function highlightRow(r) {
  for (let c = 0; c < SIZE; c++) {
    if (board[r][c] !== null)
      getCell(r, c).classList.add("row-hover");
  }
}

function highlightColumn(c) {
  for (let r = 0; r < STAR_MASK.length; r++) {
    if (board[r][c] !== null)
      getCell(r, c).classList.add("col-hover");
  }
}

function highlightDiag1(r, c) {
  const diff = r - c;
  for (let i = 0; i < STAR_MASK.length; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (i - j === diff && board[i][j] !== null)
        getCell(i, j).classList.add("diag-hover");
    }
  }
}

function highlightDiag2(r, c) {
  const sum = r + c;
  for (let i = 0; i < STAR_MASK.length; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (i + j === sum && board[i][j] !== null)
        getCell(i, j).classList.add("diag-hover");
    }
  }
}

function clearPreview() {
  for (let r = 0; r < STAR_MASK.length; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] !== null) {
        const cell = getCell(r, c);
        cell.classList.remove("row-hover");
        cell.classList.remove("col-hover");
        cell.classList.remove("diag-hover");
      }
    }
  }
}
function commitMove() {
  if (!selected) return;

  const { r, c } = selected;

  let currentMoveType = null;

  if (selectionMode === 0) currentMoveType = "row";
  if (selectionMode === 1) currentMoveType = "col";
  if (selectionMode === 2) currentMoveType = "diag1";
  if (selectionMode === 3) currentMoveType = "diag2";

  // 🔒 LOCK RULE CHECK
  if (lastMoveType === currentMoveType) {
    if (otherMoveExists(currentMoveType)) {
      alert("Lock Rule: Cannot use same line type twice!");
      return;
    }
  }

  // Perform removal
  if (selectionMode === 0) {
    for (let i = 0; i < SIZE; i++) removeCell(r, i);
  }

  if (selectionMode === 1) {
    for (let i = 0; i < STAR_MASK.length; i++) removeCell(i, c);
  }

  if (selectionMode === 2) {
    const diff = r - c;
    for (let i = 0; i < STAR_MASK.length; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (i - j === diff) removeCell(i, j);
      }
    }
  }

  if (selectionMode === 3) {
    const sum = r + c;
    for (let i = 0; i < STAR_MASK.length; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (i + j === sum) removeCell(i, j);
      }
    }
  }

  lastMoveType = currentMoveType;

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  turnText.innerText = `Player ${currentPlayer}`;

  resetSelection();
}

function otherMoveExists(blockedType) {
  const types = ["row", "col", "diag1", "diag2"];

  for (let type of types) {
    if (type === blockedType) continue;

    if (moveTypeHasAvailableLine(type)) {
      return true;
    }
  }

  return false;
}
function moveTypeHasAvailableLine(type) {
  for (let r = 0; r < STAR_MASK.length; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === true) {

        if (type === "row") {
          if (board[r].some(cell => cell === true)) return true;
        }

        if (type === "col") {
          for (let i = 0; i < STAR_MASK.length; i++) {
            if (board[i][c] === true) return true;
          }
        }

        if (type === "diag1") {
          const diff = r - c;
          for (let i = 0; i < STAR_MASK.length; i++) {
            for (let j = 0; j < SIZE; j++) {
              if (i - j === diff && board[i][j] === true)
                return true;
            }
          }
        }

        if (type === "diag2") {
          const sum = r + c;
          for (let i = 0; i < STAR_MASK.length; i++) {
            for (let j = 0; j < SIZE; j++) {
              if (i + j === sum && board[i][j] === true)
                return true;
            }
          }
        }
      }
    }
  }

  return false;
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

function resetSelection() {
  selected = null;
  selectionMode = -1;
  clearPreview();
  controls.classList.add("hidden");
  modeLabel.innerText = "";
}

function resetGame() {
  currentPlayer = 1;
  turnText.innerText = "Player 1";
  initBoard();
}

initBoard();