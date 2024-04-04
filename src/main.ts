
let candies: string[] = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows: number = 9;
let columns: number = 9;
let board: HTMLImageElement[][] = [];

let sourceTile: HTMLImageElement;
let destinationTile: HTMLImageElement;

// load game on browser
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
            tile.src = `./assets/images/${randomCandy()}.png`;
            row.push(tile);
            document.querySelector("#board")?.appendChild(tile);

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

function dragStart(this: HTMLImageElement) {
    // get the source Tile Referance
    sourceTile = this;
}

function dragDrop(this: HTMLImageElement) {
    // get the destination Tile Referance
    destinationTile = this;
}

function dragEnd(this: HTMLImageElement) {
    // swap the tile images
    swapTiles(sourceTile, destinationTile);
}

function swapTiles(sourceTile: HTMLImageElement, destinationTile: HTMLImageElement) {
    let sourceTileImage: string = sourceTile.src;
    let destinationTileImage: string = destinationTile.src;

    // get the [row][column] of source and destination Tile
    let sr: number = Number(sourceTile.id.split('-')[0]);
    let sc: number = Number(sourceTile.id.split('-')[1]);
    let dr: number = Number(destinationTile.id.split('-')[0]);
    let dc: number = Number(destinationTile.id.split('-')[1]);

    // Only swap tile on Adjacent (TOP,DOWN,LEFT,RIGHT)
    let top: boolean = sc === dc && sr === dr + 1;
    let bottom: boolean = sc === dc && sr === dr - 1;
    let left: boolean = sr === dr && sc === dc + 1;
    let right: boolean = sr === dr && sc === dc - 1;

    // swaping Tiles
    if (top || bottom || left || right) {
        sourceTile.src = destinationTileImage;
        destinationTile.src = sourceTileImage;
    }
}

// prevent Default Events
function dragOver(event: DragEvent) {
    event.preventDefault();
}
function dragLeave(event: DragEvent) {
    event.preventDefault();
}
function dragEnter(event: DragEvent) {
    event.preventDefault();
}