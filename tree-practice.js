const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // Your code here
  while (rootNode.left) {
    rootNode = rootNode.left;
  }

  return rootNode.val;
}

function findMaxBST (rootNode) {
  // Your code here
  while (rootNode.right) {
    rootNode = rootNode.right;
  }

  return rootNode.val;
}

function findMinBT (rootNode) {
  // Your code here
  let minVal = Infinity;
  let stack = [rootNode];

  while (stack.length > 0) {
    let cur = stack.pop();
    minVal = Math.min(minVal, cur.val);
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }

  return minVal;
}

function findMaxBT (rootNode) {
  // Your code here
  let maxVal = -Infinity;
  let stack = [rootNode];

  while (stack.length > 0) {
    let cur = stack.pop();
    maxVal = Math.max(cur.val, maxVal);
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }

  return maxVal;
}

function getHeight (rootNode) {
  // Your code here
  if (!rootNode) {
    return -1;
  }
  if (!rootNode.left && !rootNode.right) {
    return 0;
  }

  let left_height = 0;
  let right_height = 0;
  if (rootNode.left) {
      left_height = 1 + getHeight(rootNode.left);
  }
  if (rootNode.right) {
      right_height = 1 + getHeight(rootNode.right);
  }

  return Math.max(left_height, right_height);
}

function balancedTree (rootNode) {
  // Your code here
  if (!rootNode) {
    return true;
  }
  if (!rootNode.left && !rootNode.right) {
    return true;
  }

  let leftHeight = 0;
  let rightHeight = 0;
  if (rootNode.left) {
    leftHeight = 1 + getHeight(rootNode.left);
  }
  if (rootNode.right) {
    rightHeight = 1 + getHeight(rootNode.right);
  }

  if (Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight) > 1) {
    return false;
  }

  return balancedTree(rootNode.left) && balancedTree(rootNode.right);
}

function countNodes (rootNode) {
  // Your code here
  if (!rootNode) {
    return 0;
  }

  let count = 0;
  let stack = [rootNode];

  while (stack.length > 0) {
    let cur = stack.pop();
    count += 1;
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }

  return count;
}

function getParentNode (rootNode, target) {
  // Your code here
  if (!rootNode) {
    return
  }
  let stack = [{"parent": null, "node": rootNode}];

  while (stack.length > 0) {
    let cur = stack.shift();
    if (cur.node.val === target) {
      return cur.parent;
    }
    if (cur.node.left) {
      stack.push({"parent": cur.node, 'node': cur.node.left})
    }
    if (cur.node.right) {
      stack.push({"parent": cur.node, 'node': cur.node.right})
    }
  }

  return
}

function inOrderPredecessor (rootNode, target) {
  // Your code here
  if (!rootNode) {
    return
  }

  let pre = null;
  let stack = [];

  while (stack.length > 0 || rootNode) {
    while (rootNode) {
      stack.push(rootNode)
      rootNode = rootNode.left;
    }
    rootNode = stack.pop();
    if (rootNode.val === target) {
      if (pre === null) {
        return null;
      } else {
        return pre.val;
      }
    }
    pre = rootNode;
    rootNode = rootNode.right;
  }

}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = getParentNode(rootNode, target);
  // Undefined if the target cannot be found
  if (parent === undefined) {
    return
  }
  // Set target based on parent
  let targetNode = new TreeNode(target);
  if (parent === null) {
    targetNode = rootNode;
  } else {
    if (parent.left && parent.left.val === target) {
      targetNode = parent.left;
    } else if (parent.right && parent.right.val === target) {
      targetNode = parent.right;
    }
  }

  // Case 0: Zero children and no parent:
  if (parent === null && !targetNode.left && !targetNode.right) {
  //   return null
    return null;
  }

  // Case 1: Zero children:
  //   Set the parent that points to it to null
  else if (!targetNode.left && !targetNode.right) {
    if (parent.left.val === target) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }
  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  else if (targetNode.left && targetNode.right) {
    let inOrderPredecessorNode;
    let inOrderPredecessorNodeVal = inOrderPredecessor(rootNode, target);

    let cur = rootNode;
    let out = true;
    while (out) {
      if (cur.val === inOrderPredecessorNodeVal) {
        inOrderPredecessorNode = cur;
        out = false;
      } else if (cur.val > inOrderPredecessorNodeVal) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
    // console.log(inOrderPredecessorNode.val);
    let inOrderPredecessorNodeParent = getParentNode(rootNode, inOrderPredecessorNodeVal);
    // console.log(inOrderPredecessorNodeParent.val);
    // console.log(inOrderPredecessorNodeParent.left.val);
    if (inOrderPredecessorNode.left) {
      if (inOrderPredecessorNodeParent.left === inOrderPredecessorNode) {
        inOrderPredecessorNodeParent.left = inOrderPredecessorNode.left;
      } else {
        inOrderPredecessorNodeParent.right = inOrderPredecessorNode.left;
      }
    } else {
      if (inOrderPredecessorNodeParent.left === inOrderPredecessorNode) {
        inOrderPredecessorNodeParent.left = null;
      } else {
        inOrderPredecessorNodeParent.right = null;
      }
    }
    targetNode.val = inOrderPredecessorNodeVal;
  }

  // Case 3: One child:
  //   Make the parent point to the child
  else {
    if (targetNode.left) {
      targetNode.val = targetNode.left.val;
      let temp = targetNode.left;
      targetNode.left = temp.left;
      targetNode.right = temp.right;
    } else {
      targetNode.val = targetNode.right.val;
      let temp = targetNode.right;
      targetNode.left = temp.left;
      targetNode.right = temp.right;
    }
  }


}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}


// let bstRoot;
// bstRoot = new TreeNode(4);
// bstRoot.left = new TreeNode(2);
// bstRoot.left.left = new TreeNode(1);
// bstRoot.left.right = new TreeNode(3);
// bstRoot.right = new TreeNode(6);
// bstRoot.right.left = new TreeNode(5);
// bstRoot.right.right = new TreeNode(7);


// deleteNodeBST(bstRoot, 6);
// console.log(bstRoot);
