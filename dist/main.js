"use strict";
let candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows = 9;
let columns = 9;
let score = 0;
let board = [];
let sourceTile;
let destinationTile;
// load game on browser
window.onload = function () {
    startGame();
    // check 10X / sec 
    setInterval(() => {
        crushingCandy();
        slideDownCandy();
        generateCandy();
    }, 100);
};
function startGame() {
    loadRandomCandiesOnBoard();
}
// Defining Event Handler functions (Drag & Drop)
function dragStart() {
    // get the source Tile Referance
    sourceTile = this;
}
function dragDrop() {
    // get the destination Tile Referance
    destinationTile = this;
}
function dragEnd() {
    // do not swap if source or destination tile is empty
    if (sourceTile.src.includes('blank') || destinationTile.src.includes('blank')) {
        return;
    }
    // check for candy only move to there adjacent {T,R,B,L}
    if (isAdjacent(sourceTile, destinationTile)) {
        swapTiles(sourceTile, destinationTile);
        // swap the tile images if move is valid
        if (!checkValidMove()) {
            swapTiles(sourceTile, destinationTile);
        }
    }
}
// ******* Some Functionalities in GAME starts here *******
// on each function call return the random candy name
function randomCandy() {
    let randomIndex = Math.floor(Math.random() * candies.length);
    return candies[randomIndex];
}
// Load the Random candies on play board
function loadRandomCandiesOnBoard() {
    var _a;
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = new Image();
            tile.id = `${r}-${c}`;
            tile.src = `./assets/images/${randomCandy()}.png`;
            row.push(tile);
            (_a = document.querySelector("#board")) === null || _a === void 0 ? void 0 : _a.appendChild(tile);
            // Drag and Drop Events
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('drop', dragDrop);
            tile.addEventListener('dragend', dragEnd);
            // prevent default events
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('dragenter', dragEnter);
        }
        board.push(row);
    }
    console.log(board);
}
function isAdjacent(sourceTile, destinationTile) {
    // get the [row][column] of source and destination Tile
    let sr = Number(sourceTile.id.split('-')[0]);
    let sc = Number(sourceTile.id.split('-')[1]);
    let dr = Number(destinationTile.id.split('-')[0]);
    let dc = Number(destinationTile.id.split('-')[1]);
    // Only swap tile on Adjacent (TOP,DOWN,LEFT,RIGHT)
    let top = sc === dc && sr === dr + 1;
    let bottom = sc === dc && sr === dr - 1;
    let left = sr === dr && sc === dc + 1;
    let right = sr === dr && sc === dc - 1;
    // swaping Tiles
    return (top || bottom || left || right);
}
// swap the tiles
function swapTiles(sourceTile, destinationTile) {
    let sourceTileImage = sourceTile.src;
    let destinationTileImage = destinationTile.src;
    // swaping tiles
    sourceTile.src = destinationTileImage;
    destinationTile.src = sourceTileImage;
}
// crushing candies function
function crushingCandy() {
    crush3CandiesRowCol();
    //    crush4CandiesRowCol();  //develop in future
    //    crush5CandiesRowCol();  // develop in future
    // display the score on the screen on every crush
    let showScore = document.querySelector('#score');
    if (showScore != null) {
        showScore.innerText = String(score);
    }
}
// crush the 3 similar candies on same row or column
function crush3CandiesRowCol() {
    // crash candy Row wise
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                candy1.src = './assets/images/blank.png';
                candy2.src = './assets/images/blank.png';
                candy3.src = './assets/images/blank.png';
                // increase score by 30 if 3 candy crush
                score += 30;
            }
        }
    }
    // crash candy column wise
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                candy1.src = './assets/images/blank.png';
                candy2.src = './assets/images/blank.png';
                candy3.src = './assets/images/blank.png';
                // increase score by 30 if 3 candy crush
                score += 30;
            }
        }
    }
}
// check for valid move or not (check 3 candy row,col wise match or not before swap)
function checkValidMove() {
    // check candy Row wise
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                return true;
            }
        }
    }
    // check candy column wise
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                return true;
            }
        }
    }
    return false;
}
// slide down candies if any empty space in board
function slideDownCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes('blank')) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = './assets/images/blank.png';
        }
    }
}
// generate new candies for fill the empty spaces in board
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes('blank')) {
            board[0][c].src = `./assets/images/${randomCandy()}.png`;
        }
    }
}
// ******* Some Functionalities in GAME ends here *******
// prevent Default Events
function dragOver(event) {
    event.preventDefault();
}
function dragLeave(event) {
    event.preventDefault();
}
function dragEnter(event) {
    event.preventDefault();
}
