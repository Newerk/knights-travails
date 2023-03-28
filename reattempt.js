function moveValidityCheck(arr) {
    let min = 0;
    let max = 7;

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

const oneSpaceMovement = (startingLocationArray) => {
    const moveset = [
        [startingLocationArray[0] - 1, startingLocationArray[1]],
        [startingLocationArray[0] + 1, startingLocationArray[1]],
        [startingLocationArray[0], startingLocationArray[1] - 1],
        [startingLocationArray[0], startingLocationArray[1] + 1]
    ]

    return moveset
}

const knightMovement = (startingLocationArray) => {
    const moveset = [
        [startingLocationArray[0] - 2, startingLocationArray[1] + 1],
        [startingLocationArray[0] + 2, startingLocationArray[1] + 1],
        [startingLocationArray[0] - 1, startingLocationArray[1] + 2],
        [startingLocationArray[0] + 1, startingLocationArray[1] + 2],
        [startingLocationArray[0] - 2, startingLocationArray[1] - 1],
        [startingLocationArray[0] + 2, startingLocationArray[1] - 1],
        [startingLocationArray[0] - 1, startingLocationArray[1] - 2],
        [startingLocationArray[0] + 1, startingLocationArray[1] - 2],
    ]

    return moveset;
}

//takes a certain moveset array as an argument, and returns an array of valid spots. This makes sure that every move will remain on the chess board 
function avaliableLocations(moveset) {
    const routes = [];
    moveset.forEach(el => {
        routes.push(el)
    })

    return moveValidityCheck(routes);
}

function buildBoard() {
    let board = new UndirectedGraph();
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            board.addVertex([j, i]);
            avaliableLocations(knightMovement([j, i])).forEach(edge => {
                board.addEdge([j, i], edge);
            })
        }
    }

    return board;
}

// console.log(buildBoard().adjacent);
// console.log(buildBoard().breadthFirstSearch([0, 7], [1, 5]));


class UndirectedGraph {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
    }

    addVertex(vertex) {
        this.adjacent[vertex] = [];
        this.vertices.push(vertex);
    }

    addEdge(vertex, nextVertex) {
        this.adjacent[vertex].push(nextVertex);
        this.edges++;
    }

    // return the amount of edges to reach a value
    shortestPath(value, root = this.vertices[0]) {
        let queue = [root];
        let visited = [];
        let distances = {};
        let verticies = this.vertices;
        verticies.forEach(el => {
            distances[el] = -1;
        })
        if (value.toString() === root.toString()) {
            console.log(`You made it in 0 moves!  Here's your path`);
            return `[${value}]`;
        }

        while (queue.length > 0) {
            let current = queue.shift();
            visited.push(current);

            if (current === value) {
                console.log(`shortest path is ${distances[current] + 1} moves`);
                return;

            } else {
                distances[current] += 1;
                for (let i = 0; i < this.adjacent[current].length; i++) {
                    const element = this.adjacent[current][i];
                    if (!queue.toString().includes(element) && !visited.toString().includes(element)) {
                        queue.push(element);
                        distances[element] = distances[current];
                    }

                    if (element.toString() === value.toString()) {
                        console.log(`shortest path is ${distances[current] + 1} moves`);
                        return;
                    }
                }
            }
    
        }
        console.log(visited)
        return 'Value not in grid. Please input a valid coordinate';
    }

}


console.log(buildBoard().shortestPath([0, 6], [0, 0]));
// console.log(avaliableLocations(knightMovement([0, 2])))


