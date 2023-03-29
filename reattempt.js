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
        let path = [];
        verticies.forEach(el => {
            distances[el] = -1;
        })

        //iterate through the visited list backwards. if the popped value from the is a parent of the end element(this updates as we go along), then store it in the path(might have to use .unshift(). but not sure yet)
        const buildPath = (start, end, visitedArray, pathArray) => {
            // if (start === end) {
            //     pathArray.unshift(start);
            //     console.log(`path: ${pathArray}`)
            //     return pathArray;
            // }

            for (const key in this.adjacent[start]) {
                const element = this.adjacent[start][key];
                if (element === end) {
                    pathArray.unshift(element);
                    pathArray.unshift(start);
                    console.log(`path: ${pathArray}`)
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

        if (value.toString() === root.toString()) {
            console.log(`You made it in 0 moves!  Here's your path`);
            return `[${value}]`;
        }

        while (queue.length > 0) {
            let current = queue.shift();
            visited.push(current);

            if (current.toString() === value.toString()) {
                console.log(`shortest path is ${distances[current] + 1} moves`);

                return;

            } else {

                distances[current] += 1;
                for (let i = 0; i < this.adjacent[current].length; i++) {
                    const element = this.adjacent[current][i];
                    if (!queue.includes(element) && !visited.includes(element)) {
                        if (value.toString() === element.toString()) {
                            console.log(`shortest path is ${distances[current] + 1} moves`);
                            visited.push(element);
                            return buildPath(root, element, visited, path);
                        }
                        queue.push(element);
                        distances[element] = distances[current];
                    }
                }
            }

        }
        return 'Value not in grid. Please input a valid coordinate';
    }

}

buildBoard().shortestPath([3, 3], [0, 0]);

let example = new UndirectedGraph();
example.addVertex('A');
example.addVertex('B');
example.addVertex('C');
example.addVertex('D');
example.addVertex('E');
example.addVertex('F');
example.addVertex('G');
example.addEdge('A', 'B');
example.addEdge('A', 'C');
example.addEdge('A', 'D');
example.addEdge('B', 'C');
example.addEdge('B', 'D');
example.addEdge('C', 'D');
example.addEdge('C', 'E');
example.addEdge('D', 'F');
example.addEdge('F', 'G');


example.shortestPath('E')
