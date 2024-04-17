const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");
const width = 8;
let playerTurn = "white"; // defining whose move it is
playerDisplay.textContent = "white"; // showing whose move it is
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

// CREATING THE INITIAL BOARD
function createBoard() {
  startPieces.forEach((startPiece, i) => {
    // this function injects into the #gameboard
    const square = document.createElement("div"); // create a div for each startpiece. Call the div "square"
    square.classList.add("square"); // give each square a class called "square"
    square.innerHTML = startPiece; // make the pieces appear on the squares
    square.firstChild?.setAttribute("draggable", true); // Check whether a square should be draggable (it should be if it has a firstChild, i.e. if there is a piece on it). If it is, give it the attribute "draggable";
    square.setAttribute("square-id", i); // give each square an attribute "square-id" of "i"
    const row = Math.floor((63 - i) / width) + 1; // define what row we're currently in
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
createBoard();

// ENABLING DRAG & DROP FUNCTIONALITY
const allSquares = document.querySelectorAll(".square"); // grab all squares (i.e. every HTML element with the class "square") and save them as const allSquares

allSquares.forEach((square) => {
  square.addEventListener("dragStart", dragStart); // listen out for a dragsStart even, and when it starts call the dragStart function
  square.addEventListener("dragOver", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId; // global level. Starts with null. As soon as we drag a piece we get the square-id through the getAttribute function below, which then gets saved to StartPositionId.
let draggedElement; // could I define these variables at the very top? Would it make any difference?

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id"); // the parentNode points to the square-id. This is equivalent to the startPosition of a piece.
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault(); // without this, the script would tell me all the squares I'm dragging a piece over. That's not something I care about.
}

function dragDrop(e) {
  e.stopPropagation(); // this prevents any funky behaviour, e.g. dropping two pieces and call this function twice
  // define a correct turn by saving all draggedElements with a class of "playerTurn" to const correctTurn
  const correctTurn =
    draggedElement.firstChild.classList.contains("playerTurn");
  const opponentTurn = playerTurn === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn); // check whether the firstChild of the target square exists. If it does, check if the class contains opponentTurn
  const taken = e.target.classList.contains("piece"); // this ensures that a piece can only be taken if there is already a piece on the target square
  const valid = checkIfValid(e.target);

  if (correctTurn) {
    // if the target square is taken by an opponent piece and the move is valid
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement); // let the draggedElement appear in the target square. This only applies if there already is a piece in the target square. If there isn't, then e.target.append(draggedElement) applies (see below).
      e.target.remove(); // this removes the existing piece from the square
      changePlayer();
      return;
    }
    // if the target square is taken but not by the opponent (an invalid move)
    if (taken) {
      infoDisplay.textContent = "Invalid move";
      setTimeout(() => (infoDisplay.textContent = ""), 2000); // set a timer of 2 secs, after which remove any wording in the infoDisplay
      return;
    }
    // if the target square is empty and the move is valid
    if (valid) {
      e.target.append(draggedElement);
      changePlayer(); // how can the programme call the this function already here if it's written only further below in the script?
    }
  }
}

function checkIfValid(target) {
  const targetId =
    Number(e.target.getAttribute("square-id")) ||
    Number(e.target.parentNode.getAttribute("square-id")); // the Number() function converts values of other types to numbers
  const start = Number(startPositionId);
  const piece = draggedElement.id;

  switch (
    piece // check how the switch and case operators work
  ) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild)
      ) {
        return true;
      }
      break;
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

// I'm confused as to when to use a parameter in a function and when not. Why wouldn't I use "i" here as a parameter?
function reverseIds() {
  const allSquares = document.querySelectorAll(".square"); // grab everything that has the class "square"
  allSquares.forEach((square, i) =>
    // for each square, override the existing squareId with its reverse (width * width - 1) - i
    square.setAttribute("square-id", width * width - 1 - i)
  ); // set the reversed squareId as the attribute
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}
