// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file
// Your code here
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

class BinarySearchTree {

    constructor() {
      // Your code here
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      // Your code here
      let newNode = new TreeNode(val);
      if (this.root === null) {
        this.root = newNode;
      } else {
        let cur = this.root;
        while (cur) {
          if (cur.val > val) {
            if (cur.left === null) {
              cur.left = newNode;
              return
            } else {
              cur = cur.left;
            }
          } else {
            if (cur.right === null) {
              cur.right = newNode;
              return
            } else {
              cur = cur.right;
            }
          }
        }
      }
    }

    search(val) {
      // Your code here
      let cur = this.root;
      while (cur) {
        if (cur.val === val) {
          return true;
        } else if (cur.val > val) {
          cur = cur.left;
        } else {
          cur = cur.right;
        }
      }

      return false;
    }


    preOrderTraversal(currentNode = this.root) {
      // Your code here
      if (!currentNode) {
        return
      }
      console.log(currentNode.val);
      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);
    }


    inOrderTraversal(currentNode = this.root) {
      // Your code here
      if (!currentNode) {
        return
      }
      this.inOrderTraversal(currentNode.left);
      console.log(currentNode.val);
      this.inOrderTraversal(currentNode.right);
    }


    postOrderTraversal(currentNode = this.root) {
      // Your code here
      if (!currentNode) {
        return
      }
      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);
    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      // your code here
      let stack = [this.root];

      while (stack.length > 0) {
        let cur = stack.shift();
        console.log(cur.val);
        if (cur.left) {
          stack.push(cur.left);
        }
        if (cur.right) {
          stack.push(cur.right);
        }
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      // your code here
      let stack = [this.root];

      while (stack.length > 0) {
        let cur = stack.pop();
        console.log(cur.val);
        if (cur.left) {
          stack.push(cur.left);
        }
        if (cur.right) {
          stack.push(cur.right);
        }
      }
    }
}

module.exports = { BinarySearchTree, TreeNode };
