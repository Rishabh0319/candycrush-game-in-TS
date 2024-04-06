
let candies: string[] = ['Blue', 'Orange', 'Green', 'Yellow', 'Red', 'Purple'];
let rows: number = 9;
let columns: number = 9;
let board: HTMLImageElement[][] = [];

let sourceTile: HTMLImageElement;
let destinationTile: HTMLImageElement;

// load game on browser
window.onload = function () {
    startGame();
    // check 10X / sec 
    setInterval(() => {
        crushingCandy();
    }, 100);
};

function startGame() {
    loadRandomCandiesOnBoard();
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

function isAdjacent(sourceTile: HTMLImageElement, destinationTile: HTMLImageElement): boolean {

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
    return (top || bottom || left || right);
}

// swap the tiles
function swapTiles(sourceTile: HTMLImageElement, destinationTile: HTMLImageElement) {
    let sourceTileImage: string = sourceTile.src;
    let destinationTileImage: string = destinationTile.src;

    // swaping tiles
    sourceTile.src = destinationTileImage;
    destinationTile.src = sourceTileImage;
}

// crushing candies function
function crushingCandy() {
    crush3CandiesRowCol();
    //    crush4CandiesRowCol();  //develop in future
    //    crush5CandiesRowCol();  // develop in future
}

// crush the 3 similar candies on same row or column
function crush3CandiesRowCol() {

    // crash candy Row wise
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1: HTMLImageElement = board[r][c];
            let candy2: HTMLImageElement = board[r][c + 1];
            let candy3: HTMLImageElement = board[r][c + 2];

            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                candy1.src = './assets/images/blank.png';
                candy2.src = './assets/images/blank.png';
                candy3.src = './assets/images/blank.png';
            }

        }
    }


    // crash candy column wise
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1: HTMLImageElement = board[r][c];
            let candy2: HTMLImageElement = board[r + 1][c];
            let candy3: HTMLImageElement = board[r + 2][c];

            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                candy1.src = './assets/images/blank.png';
                candy2.src = './assets/images/blank.png';
                candy3.src = './assets/images/blank.png';
            }

        }
    }
}

// check for valid move or not (check 3 candy row,col wise match or not before swap)
function checkValidMove(): boolean {

    // check candy Row wise
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1: HTMLImageElement = board[r][c];
            let candy2: HTMLImageElement = board[r][c + 1];
            let candy3: HTMLImageElement = board[r][c + 2];

            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                return true;
            }

        }
    }

    // check candy column wise
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns; c++) {
            let candy1: HTMLImageElement = board[r][c];
            let candy2: HTMLImageElement = board[r + 1][c];
            let candy3: HTMLImageElement = board[r + 2][c];

            // c1=c2 and c2=c3 and c1!=empty (LOGIC)
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank')) {
                return true;
            }

        }
    }

    return false;
}

// ******* Some Functionalities in GAME ends here *******




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



