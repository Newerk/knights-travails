const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = deleteDupe(array.sort((a, b) => a - b));
        this.root = buildTree(this.array, 0, this.array.length - 1);
    }

    find(value, root = this.root) {
        try {
            if (root.data === value) {
                return root;
            } else {
                if (value < root.data) {
                    return this.find(value, root.left);
                }
                if (value > root.data) {
                    return this.find(value, root.right);
                }
            }
        } catch (error) {
        }

    }

    levelOrder(callback, root = this.root) {
        if (callback) {//if function is provided, execute function on each node
            if (root === null) {
                return callback(root);
            } else {
                callback(root.left);
                callback(root.right)
            }
        }
        if (root === null) {
            return;
        }

        let queue = [root];
        let output = [root.data];

        while (queue.length > 0) {
            if (queue[0].left !== null) {
                output.push(queue[0].left.data)
                queue.push(queue[0].left)
            }
            if (queue[0].right !== null) {
                output.push(queue[0].right.data)
                queue.push(queue[0].right)
            }
            queue.shift();
        }
        return output;

    }

    inorder(callback, root = this.root, array = []) {
        if (root === null) {
            return array;
        } else {
            this.inorder(callback, root.left, array);
            array.push(root.data);
            this.inorder(callback, root.right, array);

            return array;
        }
    }

    preorder(callback, root = this.root, array = []) {
        if (root === null) {
            return array;
        } else {
            array.push(root.data);
            this.preorder(callback, root.left, array);
            this.preorder(callback, root.right, array);

            return array;
        }
    }

    postorder(callback, root = this.root, array = []) {
        if (root === null) {
            return array;
        } else {
            this.postorder(callback, root.left, array);
            this.postorder(callback, root.right, array);
            array.push(root.data);

            return array;
        }
    }
}

function buildTree(array, start, end) {

    if (start > end) {
        return null;
    }

    let mid = Math.round((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
}

function getLeftMostLeaf(root) {
    if (root.left === null) {
        return root;

    } else {
        return getLeftMostLeaf(root.left)
    }

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
function driverScript() {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    let startPosition = [getRandomInt(0, 7), getRandomInt(0, 7)];
    let endPosition = [getRandomInt(0, 7), getRandomInt(0, 7)];

    console.log(`
    starting position: ${startPosition}
    ending position: ${endPosition}`);

}

driverScript();

const knightTraversal = (array) => {
    //shows the next value of the 4 directions a knight can take
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
        // const oneUp_twoLeft = 
        [array[0] - 2, array[1] + 1],

        // const oneUp_twoRight = 
        [array[0] + 2, array[1] + 1],

        // const twoUp_oneLeft = 
        [array[0] - 1, array[1] + 2],

        // const twoUp_oneRight = 
        [array[0] + 1, array[1] + 2],

        // const oneDown_twoLeft = 
        [array[0] - 2, array[1] - 1],

        // const oneDown_twoRight = 
        [array[0] + 2, array[1] - 1],

        // const twoDown_oneLeft = 
        [array[0] - 1, array[1] - 2],

        // const twoDown_oneRight = 
        [array[0] + 1, array[1] - 2],
    ]

    moveset.forEach(el => routes.push(el))

    switch (moveValidityCheck(routes).length) {
        case 8:
            console.log(`the knight has 8 different routes`)
            break;
        case 7:
            console.log(`the knight has 7 different routes`)
            break;

        case 6:
            console.log(`the knight has 6 different routes`)
            break;

        case 5:
            console.log(`the knight has 5 different routes`)
            break;

        case 4:
            console.log(`the knight has 4 different routes`)
            break;

        case 3:
            console.log(`the knight has 3 different routes`)
            break;

        case 2:
            console.log(`the knight has 2 different routes`)
            break;
    }
}

knightTraversal([4, 4]);