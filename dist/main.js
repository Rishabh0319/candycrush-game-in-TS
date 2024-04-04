"use strict";
let candies = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows = 9;
let columns = 9;
let board = [];
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
            tile.src = `../src/assets/images/${randomCandy()}.png`;
            row.push(tile);
            (_a = document.querySelector("#board")) === null || _a === void 0 ? void 0 : _a.appendChild(tile);
        }
        board.push(row);
    }
}
