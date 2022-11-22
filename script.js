let unsolvedPuzzle = [
    "---26-7-1",
    "68--7--9-",
    "19---45--",
    "82-1---4-",
    "--46-29--",
    "-5---3-28",
    "--93---74",
    "-4--5--36",
    "7-3-18---"
]

let solvedPuzzle = [
    "435269781",
    "682571493",
    "197834562",
    "826195347",
    "374682915",
    "951743628",
    "519326874",
    "248957136",
    "763418259"
]

let errors = 0, correctNumbersPlaced = 0;

window.onload = function() {
    startGame();
}

function startGame() {
    for (let i = 1; i < 10; ++i) {
        let number = document.createElement("div");
        number.className = "number";
        number.id = i;
        number.innerHTML = i;
        number.onclick = function() {
            makeSelection(number);
        };
        document.getElementById("digits").appendChild(number);
        
    }

    for (let row = 0; row < 9; ++row) {
        for (let column = 0; column < 9; ++column) {
            let tile = document.createElement("div");
            tile.id = row + "-" + column;
            tile.className = "tile";
            if (row == 2 || row == 5) {
                tile.style.borderBottom = "1px solid black";
            }
            if (column == 2 || column == 5) {
                tile.style.borderRight = "1px solid black";
            }
            tile.innerHTML = unsolvedPuzzle[row][column];
            if (tile.innerHTML === "-") {
                tile.innerHTML = '';
            } else {
                tile.style.backgroundColor = "whitesmoke";
            }
            tile.onclick = function() {
                if (tile.style.backgroundColor != 'whitesmoke') {
                    insertNumber(tile);
                }
                checkEndGame();  
            }
            document.getElementById("board").appendChild(tile);
        }
    }
}

function makeSelection(number) {
    for (let j = 1; j < 10; ++j) {
        if (document.getElementById(j).style.backgroundColor === "grey") {
            document.getElementById(j).style.backgroundColor = "white";
        }
    }
    number.style.backgroundColor = "grey";
}

function insertNumber(tile) {
    for (let i = 1; i < 10; ++i) {
        if (document.getElementById(i).style.backgroundColor === "grey") {
            tile.innerHTML = document.getElementById(i).innerHTML;
            checkCorrectNumber(tile);
        }
    }

}

function checkCorrectNumber(tile) {
    if (tile.innerHTML != solvedPuzzle[tile.id.split('-')[0]][tile.id.split('-')[1]]) {
        ++errors;
        document.getElementById("errors").innerHTML = errors;
    } else {
        ++correctNumbersPlaced;
    }
}

function checkEndGame() {
    if (correctNumbersPlaced === 45) {
        document.getElementById("endGameMessage").innerHTML = "Congratulations! You won the game!";
        document.getElementById("endGameButton").style.display = "inline-block";
    }
}

function resetGame() {
    document.location.reload();
}