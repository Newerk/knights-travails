function buildBoard() {
    let board = [];
    for (let i = 7; i >= 0; i--) {
        let row = [];
        for (let j = 0; j < 8; j++) {
            row.push(`[${[j, i]}]`)
        }
        board.push(row)
    }

    console.log(`[
        [${board[0]}]
        [${board[1]}]
        [${board[2]}]
        [${board[3]}]
        [${board[4]}]
        [${board[5]}]
        [${board[6]}]
        [${board[7]}]
]
`)

    return board;
}
buildBoard();

//This will choose a random starting point on the chess board, and choose and random end point. It will then console log the amount of moves made and the path taken
function randomKnightLocation() {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    let startPosition = [getRandomInt(0, 7), getRandomInt(0, 7)];
    let endPosition = [getRandomInt(0, 7), getRandomInt(0, 7)];

    return {
        startPosition,
        endPosition
    }
}

const nextValidLocation = (array = randomKnightLocation().startPosition) => {
    let min = 0;
    let max = 7;
    const routes = [];

    const moveValidityCheck = (arr) => {
        arr.forEach(el => {
            if (el[0] < min) {
                el[0] = null;
            }
            if (el[1] > max) {
                el[1] = null;
            }
            if (el[1] < min) {
                el[1] = null;
            }
            if (el[0] > max) {
                el[0] = null;
            }
        })

        let removeNulls = arr.filter(el => el[0] !== null && el[1] !== null)

        return removeNulls;
    }

    //knight's moveset
    const moveset = [
        [array[0] - 2, array[1] + 1],
        [array[0] + 2, array[1] + 1],
        [array[0] - 1, array[1] + 2],
        [array[0] + 1, array[1] + 2],
        [array[0] - 2, array[1] - 1],
        [array[0] + 2, array[1] - 1],
        [array[0] - 1, array[1] - 2],
        [array[0] + 1, array[1] - 2],
    ]

    moveset.forEach(el => {
        routes.push(el)
    })

    switch (moveValidityCheck(routes).length) {
        case 8:
            console.log(`the knight cant land on 8 different locations`)
            break;

        case 7:
            console.log(`the knight cant land on 7 different locations`)
            break;

        case 6:
            console.log(`the knight cant land on 6 different locations`)
            break;

        case 5:
            console.log(`the knight cant land on 5 different locations`)
            break;

        case 4:
            console.log(`the knight cant land on 4 different locations`)
            break;

        case 3:
            console.log(`the knight cant land on 3 different locations`)
            break;

        case 2:
            console.log(`the knight cant land on 2 different locations`)
            break;
    }

    return moveValidityCheck(routes);
}

function deleteDupe(array) {
    let noDupes = [];

    array.forEach(el => {
        if (!noDupes.includes(el)) {
            noDupes.push(el)
        }
    })

    return noDupes;
}

class Node {
    constructor(data) {
        let count = 0;
        this.data = data;

        nextValidLocation(this.data).forEach(el => {
            this[`child${count += 1}`] = el
        })
    }

}

// function knightMove(startArray, endArray) {
//     let nextMoves = nextValidLocation(startArray);

// }

// knightMove([0, 0], [5, 1]);

let moves = new Node([0, 0]);

console.log(moves);


