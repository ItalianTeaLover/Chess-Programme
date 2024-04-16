const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("info-display");
const width = 8;
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
  // this function injects into the #gameboard
  startPieces.forEach((startPiece, i) => {
    // create a div for each startpiece. Call the div "square"
    const square = document.createElement("div");
    // give each square a class called "square"
    square.classList.add("square");
    // make the pieces appear on the squares
    square.innerHTML = startPiece;
    // Check whether a square should be draggable (it should be if it has a firstChild, i.e. if there is a piece on it). If it is, give it the attribute "draggable";
    square.firstChild?.setAttribute("draggable", true);
    // give each square an attribute "square-id" of "i"
    square.setAttribute("square-id", i);
    // define what row we're currently in
    const row = Math.floor((63 - i) / width) + 1;
    // every other row add the class "bright" or "dark" to a square, depending on whether the index of that square can be divided by 2 (meaning: every other square)
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "bright" : "dark");
    } else {
      square.classList.add(i % 2 === 0 ? "dark" : "bright");
    }
    // add a class of "black" to the pieces in the first 16 squares of the board
    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }
    // add a class of "white" to the pieces in the last 16 squares of the board
    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }
    // append each square to the game board
    gameBoard.append(square);
  });
}
createBoard();

// ENABLING DRAG & DROP FUNCTIONALITY
const allSquares = document.querySelectorAll("#gameboard .square"); // grab all squares on the gameboard (every HTML element with the class "square") and save them as const AllSquares

allSquares.forEach((square) => {
  square.addEventListener("dragStart", dragStart); // listen out for a dragsStart even, and when it starts call the dragStart function
  square.addEventListener("dragOver", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId; // global level. Starts with null. As soon as we drag a piece we get the square-id through the getAttribute function below, which then gets saved to StartPositionId.
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id"); // the parentNode points to the square-id. This is equivalent to the startPosition of a piece.
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault(); // without this, the script would tell me all the squares I'm dragging a piece over. That's not something I care about.
}

// function dragDrop(e) {
//   e.stopPropagation();
//   const targetSquare = e.target.classList.contains("square") ? e.target : e.target.parentNode;
//   if (targetSquare.firstChild) {
//     targetSquare.firstChild.remove();
//   }
//   targetSquare.append(draggedElement);
// }

function dragDrop(e) {
  e.stopPropagation(); // this prevents any funky behaviour, e.g. dropping two pieces and call this function twice
  e.target.parentNode.append(draggedElement); // let the draggedElement appear in the target square. This only applies if there already is a piece in the target square. If there isn't, then e.target.append(draggedElement) applies.
  // e.target.append(draggedElement);
  e.target.remove();
}

console.log();
