const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");

const width = 8;

let playerTurn = "white"; // defining whose move it is
playerDisplay.textContent = "white"; // showing whose move it is

// fetching the visuals for each piece from fontawesome
const king =
  '<div class="piece" id="king"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const queen =
  '<div class="piece" id="queen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg></div>';
const rook =
  '<div class="piece" id="rook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const knight =
  '<div class="piece" id="knight"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg></div>';
const bishop =
  '<div class="piece" id="bishop"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg></div>';
const pawn =
  '<div class="piece" id="pawn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z"/></svg></div>';

// placing the pieces on the board
const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];

// inject into the #gameboard
function createInitialBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div"); // create a div for each startpiece. Call the div "square"
    square.classList.add("square"); // give each square a class called "square"
    square.innerHTML = startPiece; // make the pieces appear on the squares
    square.firstChild?.setAttribute("draggable", true); // Check whether a square should be draggable (it should be if it has a firstChild, i.e. if there is a piece on it). If it is, give it the attribute "draggable";
    square.setAttribute("square-id", i); // give each square an attribute "square-id" of "i"
    const row = Math.floor((63 - i) / width) + 1; // define what row we're currently in
    // TODO(Martin): Try also adding `const column = ...` line above, and then use `column` below, together with `row`,
    //   to decide if field should be light or dark. Instead of using `row` and then again `i`. It will be a bit nicer.
    if (row % 2 === 0) {
      // every other row add the class "bright" or "dark" to a square, depending on whether the index of that square can be divided by 2 (meaning: every other square)
      square.classList.add(i % 2 === 0 ? "bright" : "dark");
    } else {
      square.classList.add(i % 2 === 0 ? "dark" : "bright");
    }
    if (i <= 15) {
      // add a class of "black" to the pieces in the first 16 squares of the board
      square.firstChild.firstChild.classList.add("black");
    }
    if (i >= 48) {
      // add a class of "white" to the pieces in the last 16 squares of the board
      square.firstChild.firstChild.classList.add("white");
    }
    gameBoard.append(square); // append each square to the game board
  });
}
createInitialBoard();

// ENABLING DRAG & DROP FUNCTIONALITY
const allSquares = document.querySelectorAll(".square"); // grab all squares (i.e. every HTML element with the class "square") and save them as const allSquares

allSquares.forEach((square) => {
  square.addEventListener("dragStart", dragStart); // listen out for a dragsStart even, and when it starts call the dragStart function
  square.addEventListener("dragOver", dragOver); // I don't understand: how does the programme know what dragStart, dragOver and drop are?
  square.addEventListener("drop", dragDrop);
});

// TODO(martin): I would rename `startPositionId` to `currentlyDraggedSquareId`.
//   Although I don't quite get why you need both this variable and the one below, `draggedElement`,
//   when you can easily obtain square id from the `draggedElement` by just doing
//   `draggedElement.parentNode.getAttribute("square-id")`.
let startPositionId; // global level. Starts with null. As soon as we drag a piece we get the square-id through the getAttribute function below, which then gets saved to StartPositionId.
let draggedElement;

function dragStart(e) {
  // I don't understand what this "e" for event is for. Why do I need it?
  startPositionId = e.target.parentNode.getAttribute("square-id"); // the parentNode points to the square-id. This is equivalent to the startPosition of a piece.
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault(); // without this, the script would tell me all the squares I'm dragging a piece over. That's not something I care about.
}

function dragDrop(e) {
  e.stopPropagation(); // this prevents any funky behaviour, e.g. dropping two pieces and call this function twice
  const isCorrectTurn =
    draggedElement.firstChild.classList.contains(playerTurn); // define a correct turn by saving all draggedElements with a class of "playerTurn" to const isCorrectTurn

  const taken = e.target.classList.contains(piece); // this ensures that a piece can only be taken if there is already a piece on the target square
  const valid = checkIfValid(e.target);
  const opponentTurn = playerTurn === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn); // check whether the firstChild of the target square exists. If it does, check if the class contains opponentTurn

  if (isCorrectTurn) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement); // let the draggedElement appear in the target square. This only applies if there already is a piece in the target square. If there isn't, then e.target.append(draggedElement) applies.
      e.target.remove(); // remove any existing elements in that square after appending the draggedElement
      checkForVictory();
      changePlayer();
      return;
    }
    if (taken && !takenByOpponent) {
      infoDisplay.textContent = "This move is invalid";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      checkForVictory();
      changePlayer();
      return;
    }
  }
}

function checkIfValid(target) {
  const targetId =
    Number(e.target.getAttribute("square-id")) ||
    Number(e.target.parentNode.getAttribute("square-id")); // The Number function converts any type of value to numbers
  const startId = Number(startPositionId);
  const piece = draggedElement.id;

  // DEFINING THE MOVES OF THE VARIOUS PIECES
  // The switch statement evaluates an expression, matching the expression's value against a series of case clauses, and executes statements after the first case clause with a matching value, until a break statement is encountered.
  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]; // for the pawns we need to define the starterRow because only if they're in the starterRow can they move two spaces forward
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild) || // check that there is an opponent on this square, or this move is not allowed
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild) // check that there is an opponent on this square, or this move is not allowed
      ) {
        return true;
      }
      break;
    case "knight":
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width + 2 === targetId ||
        startId + width - 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width + 2 === targetId ||
        startId - width - 2 === targetId
      ) {
        return true;
      }
      break;
    case "bishop":
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstchild) || // checking that there is no other piece in the way, preventing the bishop to reach the target square
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstchild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstchild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstchild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`)
            .firstChild)
      ) {
        return true;
      }
      break;
    case "rook":
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6}"]`)
            .firstChild) ||
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 6}"]`).firstChild) ||
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 6}"]`).firstChild)
      ) {
        return true;
      }
      break;
    case "queen":
      if (
        // bishop's moves
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstchild) || // checking that there is no other piece in the way, preventing the bishop to reach the target square
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstchild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstchild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstchild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`)
            .firstChild) ||
        //rook's moves
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6}"]`)
            .firstChild) ||
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 6}"]`).firstChild) ||
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 6}"]`).firstChild)
      ) {
        return true;
      }
      break;
    case "king":
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width + 1 === targetId ||
        startId + width - 1 === targetId ||
        startId - width + 1 === targetId ||
        startId - width - 1 === targetId
      ) {
        return true;
      }
  }
}

// SWITCHING PLAYERS' TURNS
function changePlayer() {
  if (playerTurn === "white") {
    revertIds(); // how can the programme call the revertIds function already here if it's written only further below in the script?
    playerTurn = "black";
    playerDisplay.textContent = "black";
  } else {
    reverseIds();
    playerTurn = "white";
    playerDisplay.textContent = "white";
  }
}

function reverseIds() {
  //   // I'm confused as to when to use a parameter in a function and when not. Why wouldn't I use "i" here as a parameter?
  const allSquares = document.querySelectorAll(".square"); // grab everything that has the class "square"
  allSquares.forEach((square, i) =>
    // for each square, override the existing squareId with its reverse (width * width - 1) - i
    // TODO(Martin): Oh wow what is the point of this, reversing all ids? I wonder why would we do that? Quite wild.
    square.setAttribute("square-id", width * width - 1 - i)
  ); // set the reversed squareId as the attribute
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}

function checkForVictory() {
  const kings = Array.from(document.querySelectorAll("#king"));
  if (!kings.some((king) => king.firstChild.classList.contains(white))) {
    // if there is no white king in my array of kings, black wins (and vv)
    infoDisplay.innerHTML = "Black wins!";
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) =>
      square.firstChild?.setAttribute("draggable", false)
    ); // once game is over, the pieces should no longer be draggable
  }
  if (!kings.some((king) => king.firstChild.classList.contains(black))) {
    infoDisplay.innerHTML = "White wins!";
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) =>
      square.firstChild?.setAttribute("draggable", false)
    );
  }
}

// TODO(Martin): Nice :)! This is actually quite complex code though, hard to reason about, and easy to make mistakes with.
//   Not pleasant to write nor read. Not because you wrote it badly, but because of overall architecture, it is all too
//   intertwined and mixed up. So I will recommend you a different, typical approach for these kind of programmes,
//   that will make code much nicer and easier to work with, and it should be much more enjoyable.
//
//   So, the main idea is that you want to separate "view" logic from "business"/"core" logic (let's call it "core" logic).
//
//   View logic would be: I know what the chess board looks like, how do I show it on screen?
//
//   Core logic would be: If player wants to do a move, how do I udpate the board to reflect that?
//   How do I know if the move is valid? Whose turn is it? So really, all chess-related stuff and
//   rules and so on, without worrying about how to actually show this to user: will it be shown in
//   brwoser, or will you print the whole board into console with console.log and ascii characters.
//   Core logic doesn't care about that, it cares about chess.
//
//   Actually there is also "model" logic, which is about how we represent the actual board in Javascript,
//   how do we "model" it.
//   You could say that is part of "core" logic, but you can also look at it as a separate "model" logic.
//
//   So this is called MVC (Model-View-Controller) architecture (controller == core logic), and is a popular pattern in
//   programming, for certain tasks where it is a good fit. You can google this, although it will probably be a bit
//   to abstractly explained, but still give it a look.
//
//   So you really want to work in this way, because otherwise it will be too hard (already is).
//
//   In our case, this would mean something like this:
//
//   function displayBoard(board) { ... } // Does all the `document.` stuff to show the board in the browser.
//     // Any board though, not just initial board! That is important.
//     // This is our "View" logic.
//
//   const initialBoard = [     // List of 8 lists where each of those inner lists has 8 elements. This is our "model" logic.
//     [{ type: "rook", color: "white"}, { type: "knight", color: "white"}, ... ],
//     [null, null, null, ...],
//     [null, ...],
//     ...,
//     [{ type: "rook", color: "black"}, { type: "knight", color: "black"}, ...]
//   ];
//   const initialGameState = {  // This is another part of our "model" logic.
//     currentPlayer: "white",
//     board: initialBoard
//   }
//
//   And now comes the crux of things, our "core" logic (or Controller).
//   It will consists of bunch of functions.
//
//   function movePiece([startRow, startCol], [endRow, endCol], board) { ... }
//   // This function will, given the current board, return a new board that will have the piece moved from start to end location.
//   // We could also have one global `currentBoard` variable that this function would just update, that is alternative approach,
//   // but this is even nicer, where you don't have global variable but are instead passing the board around and creating modifications of it.
//
//   function isMoveValid([startRow, startCol], [endRow, endCol], board) { ... }
//
//   function checkForVictory(board) { ... }
//
//   function calculateCurrentScore(board) { ... }
//
//   And so on and on.
//
//   The whole point is, when doing complex stuff like chess rules and logic, you dont' have to dig through `docuemnt` and classes and DOM elements and stuff, you instead always focus on your simple list of lists and all is nice and simple.
//   So you will want to rewrite your chess like this!
//   I would suggest you forget drag and drop for start. Just try to get initial board to draw with this MVC approach, and then provide two input fields in your program, where user says initial field and end field, liek F1 and F2 and then they can press "move", and then try to get that move happening. Later we can upgrade that to be drag and drop instead of entering moves via text.
