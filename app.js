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
// TODO(Martin): Then rename to createInitialBoard and you can remove the comment above!
function createBoard() {
  startPieces.forEach((startPiece, i) => {
    // this function injects into the #gameboard
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
createBoard();

// ENABLING DRAG & DROP FUNCTIONALITY
const allSquares = document.querySelectorAll(".square"); // grab all squares (i.e. every HTML element with the class "square") and save them as const allSquares

allSquares.forEach((square) => {
  square.addEventListener("dragStart", dragStart); // listen out for a dragsStart even, and when it starts call the dragStart function
  square.addEventListener("dragOver", dragOver);
  square.addEventListener("drop", dragDrop);
});

// TODO(martin): I would rename `startPositionId` to `currentlyDraggedSquareId`.
//   Although I don't quite get why you need both this variable and the one below, `draggedElement`,
//   when you can easily obtain square id from the `draggedElement` by just doing
//   `draggedElement.parentNode.getAttribute("square-id")`.
let startPositionId; // global level. Starts with null. As soon as we drag a piece we get the square-id through the getAttribute function below, which then gets saved to StartPositionId.
let draggedElement;

function dragStart(e) {
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
  const opponentTurn = playerTurn === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn); // check whether the firstChild of the target square exists. If it does, check if the class contains opponentTurn
  const taken = e.target.classList.contains("piece"); // this ensures that a piece can only be taken if there is already a piece on the target square
  const valid = checkIfValid(e.target);

  if (isCorrectTurn) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement); // let the draggedElement appear in the target square. This only applies if there already is a piece in the target square. If there isn't, then e.target.append(draggedElement) applies.
      e.target.remove();
      changePlayer();
      return;
    }
    if (taken) {
      infoDisplay.textContent = "This move is invalid";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      changePlayer();
    }
  }
}

function checkIfValid(target) {
  const targetId =
    Number(e.target.getAttribute("square-id")) ||
    Number(e.target.parentNode.getAttribute("square-id")); // The Number function converts any type of value to numbers
  const start = Number(startPositionId);
  const piece = draggedElement.id;

  // DEFINING THE MOVES OF THE VARIOUS PIECES
  switch (
    piece // The switch statement evaluates an expression, matching the expression's value against a series of case clauses, and executes statements after the first case clause with a matching value, until a break statement is encountered.
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

function reverseIds() {
  // I'm confused as to when to use a parameter in a function and when not. Why wouldn't I use "i" here as a parameter?
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
