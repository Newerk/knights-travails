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
    let board = new Graph();
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

class Graph {
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

    shortestPath(start, end) {
        let queue = [start];
        let visited = [];
        let distances = {};
        let verticies = this.vertices;
        let path = [];
        verticies.forEach(el => {
            distances[el] = -1;
        })

        const buildPath = (start, end, visitedArray, pathArray) => {
            for (const key in this.adjacent[start]) {
                const element = this.adjacent[start][key];
                if (element === end) {
                    pathArray.unshift(element);
                    pathArray.unshift(start);
                    return pathArray;
                }
            }

            visitedArray.pop();
            let predecessor = visitedArray[visitedArray.length - 1];

            for (const key in this.adjacent[predecessor]) {
                const element = this.adjacent[predecessor][key];
                if (element === end) {
                    pathArray.unshift(element);
                    end = predecessor;
                }
            }

            return buildPath(start, end, visitedArray, pathArray)
        }

        while (queue.length > 0) {
            let current = queue.shift();
            visited.push(current);

            if (end.toString() === start.toString()) {
                console.log(`You made it in 0 moves!  Here's your path\n[${start}]`);
                return;
            }

            distances[current] += 1;
            for (let i = 0; i < this.adjacent[current].length; i++) {
                const element = this.adjacent[current][i];
                if (!queue.includes(element) && !visited.includes(element)) {
                    if (end.toString() === element.toString()) {
                        console.log(`shortest path is ${distances[current] + 1} moves`);
                        visited.push(element);
                        buildPath(start, element, visited, path)
                        return path.forEach(el => console.log(`[${el}]`));
                    }
                    queue.push(element);
                    distances[element] = distances[current];
                }
            }

        }
        return 'Value not in grid. Please input a valid coordinate';
    }

}

buildBoard().shortestPath([0, 0], [3, 3]);

// let example = new Graph();
// example.addVertex('A');
// example.addVertex('B');
// example.addVertex('C');
// example.addVertex('D');
// example.addVertex('E');
// example.addVertex('F');
// example.addVertex('G');
// example.addEdge('A', 'B');
// example.addEdge('A', 'C');
// example.addEdge('A', 'D');
// example.addEdge('B', 'C');
// example.addEdge('B', 'D');
// example.addEdge('C', 'D');
// example.addEdge('C', 'E');
// example.addEdge('D', 'F');
// example.addEdge('F', 'G');


// example.shortestPath('E')
