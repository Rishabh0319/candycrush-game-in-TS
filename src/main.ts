
let candies: string[] = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows: number = 9;
let columns: number = 9;
let board: HTMLImageElement[][] = [];

window.onload = startGame;

function startGame() {
    loadRandomCandiesOnBoard();
}

// on each function call return the random candy name
function randomCandy(): string {
    let randomIndex: number = Math.floor(Math.random() * candies.length);
    return candies[randomIndex];
}

// Load the Random candies on play board
function loadRandomCandiesOnBoard() {
    for (let r = 0; r < rows; r++) {
        let row: HTMLImageElement[] = [];
        for (let c = 0; c < columns; c++) {
            let tile: HTMLImageElement = new Image();
            tile.id = `${r}-${c}`;
            tile.src = `../src/assets/images/${randomCandy()}.png`;
            row.push(tile);
            document.querySelector("#board")?.appendChild(tile);
        }
        board.push(row);
    }
}
