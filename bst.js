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


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
  }
}



