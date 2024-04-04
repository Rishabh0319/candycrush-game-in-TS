"use strict";
let candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows = 9;
let columns = 9;
let board = [];
let sourceTile;
let destinationTile;
// load game on browser
window.onload = startGame;
function startGame() {
    loadRandomCandiesOnBoard();
}
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
    // swap the tile images
    swapTiles(sourceTile, destinationTile);
}
function swapTiles(sourceTile, destinationTile) {
    let sourceTileImage = sourceTile.src;
    let destinationTileImage = destinationTile.src;
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
    if (top || bottom || left || right) {
        sourceTile.src = destinationTileImage;
        destinationTile.src = sourceTileImage;
    }
}
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
