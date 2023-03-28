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

const nextValidLocations = (array = randomKnightLocation().startPosition) => {
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

class Graph {
    constructor(verticies) {
        this.verticies = verticies;
        this.edges = {};
        let count = 0;
        let visited = [this.verticies]
        nextValidLocations(this.verticies).forEach(el => {
            if (!visited.includes(el)) {
                this.edges[`edge${count += 1}`] = new Node(el);
                visited.push(el)
            }
        })

    }
}

class Node {
    constructor(data) {
        let count = 0;
        this.data = data;
        this.children = {};
        nextValidLocations(this.data).forEach(el => {
            this.children[`child${count += 1}`] = el;
        })
    }
}

function knightMove(start, end) {
    let node = new Node(start);
    let path = [start]

    for (const key in node.children) {
        const value = node.children[key];
    }

}

function breadthFirstSearch(root, value) {
    let queue = [root];
    let visited = [];
    let paths = [];
    let currentPath = [];

    while (queue.length > 0) {
        let first = queue.shift();
        visited.push(first.data)
        currentPath.push(first.data);

        if (first.data.toString() !== value.toString()) {
            for (const key in first.children) {
                const element = first.children[key];
                let node = new Node(element);
                if (element.toString() === value.toString()) {
                    console.log(`found value`)
                    visited.push(value);
                    console.log(`visted: ${visited}`)
                    return;
                }
                queue.push(node)

            }
        }

    }
    return paths;
}



//is a location was already visited and its a child of a node, remove it
function removeChild(children, visited) {
    for (const key in children) {
        const element = children[key];
        if (JSON.stringify(visited).includes(JSON.stringify(element))) {
            delete element;
        }
    }
}

// console.log(knightMove([0, 0], [3, 3]));

// console.log(nextValidLocations([0, 6]))


let node = new Node([3, 3]);

console.log(breadthFirstSearch(node, [0, 0]));