/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */
'use strict';

var Node = require('./node');

/**
 * Represents how balanced a node's left and right children are.
 */
var BalanceState = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

var AvlTree = function (customCompare) {
  this._root = null;
  this._size = 0;

  if (customCompare) {
    this._compare = customCompare;
  }
};

/**
 * Compares two nodes with each other.
 *
 * @private
 * @param {Object} a The first key to compare.
 * @param {Object} b The second key to compare.
 * @return {number} -1, 0 or 1 if a < b, a == b or a > b respectively.
 */
AvlTree.prototype._compare = function (a, b) {
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
};

/**
 * Inserts a new node with a specific key into the tree.
 *
 * @param {Object} key The key being inserted.
 */
AvlTree.prototype.insert = function (key) {
  this._root = this._insert(key, this._root);
  this._size++;
};

/**
 * Inserts a new node with a specific key into the tree.
 *
 * @param {Object} key The key being inserted.
 * @param {Node} root The root of the tree to insert in.
 * @return {Node} The new tree root.
 */
AvlTree.prototype._insert = function (key, root) {
  // Perform regular BST insertion
  if (root === null) {
    return new Node(key);
  }

  if (this._compare({key: key}, root) < 0) {
    root.left = this._insert(key, root.left);
  } else if (this._compare({key: key}, root) > 0) {
    root.right = this._insert(key, root.right);
  } else {
    // It's a duplicate so insertion failed, decrement size to make up for it
    this._size--;
    return root;
  }

  // Update height and rebalance tree
  root.height = Math.max(root.getLeftHeight(), root.getRightHeight()) + 1;
  var balanceState = getBalanceState(root);

  if (balanceState === BalanceState.UNBALANCED_LEFT) {
    if (this._compare({key: key}, root.left) < 0) {
      // Left left case
      root = root.rightRotate();
    } else {
      // Left right case
      root.left = root.left.leftRotate();
      return root.rightRotate();
    }
  }

  if (balanceState === BalanceState.UNBALANCED_RIGHT) {
    if (this._compare({key: key}, root.right) > 0) {
      // Right right case
      root = root.leftRotate();
    } else {
      // Right left case
      root.right = root.right.rightRotate();
      return root.leftRotate();
    }
  }

  return root;
};

/**
 * Deletes a node with a specific key from the tree.
 *
 * @param {Object} key The key being deleted.
 */
AvlTree.prototype.delete = function (key) {
  this._root = this._delete(key, this._root);
  this._size--;
};

/**
 * Deletes a node with a specific key from the tree.
 *
 * @param {Object} key The key being deleted.
 * @param {Node} root The root of the tree to delete from.
 * @return {Node} The new tree root.
 */
AvlTree.prototype._delete = function (key, root) {
  // Perform regular BST deletion
  if (root === null) {
    this._size++;
    return root;
  }

  if (this._compare({key: key}, root) < 0) {
    // The key to be deleted is in the left sub-tree
    root.left = this._delete(key, root.left);
  } else if (this._compare({key: key}, root) > 0) {
    // The key to be deleted is in the right sub-tree
    root.right = this._delete(key, root.right);
  } else {
    // root is the node to be deleted
    if (!root.left && !root.right) {
      root = null;
    } else if (!root.leftExists() && root.rightExists()) {
      root = root.getRight();
    } else if (root.leftExists() && !root.rightExists()) {
      root = root.getLeft();
    } else {
      // Node has 2 children, get the in-order successor
      var inOrderSuccessor = this._minValueNode(root.right);
      root.key = inOrderSuccessor.key;
      root.right = this._delete(inOrderSuccessor.key, root.right);
    }
  }

  if (root === null) {
    return root;
  }

  // Update height and rebalance tree
  root.height = Math.max(root.getLeftHeight(), root.getRightHeight()) + 1;
  var balanceState = getBalanceState(root);

  if (balanceState === BalanceState.UNBALANCED_LEFT) {
    // Left left case
    if (getBalanceState(root.left) === BalanceState.BALANCED ||
        getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
      return root.rightRotate();
    }
    // Left right case
    if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
      root.left = root.left.leftRotate();
      return root.rightRotate();
    }
  }

  // Right right case
  if (balanceState === BalanceState.UNBALANCED_RIGHT) {
    if (getBalanceState(root.left) === BalanceState.BALANCED ||
        getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
      return root.leftRotate();
    }
    // TODO: Confirm this case is correct (it's inconsistent with left right)
    // Right left case
    if (getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
      root.right = root.right.rightRotate();
      return root.leftRotate();
    }
  }

  return root;
};

/**
 * Gets whether a node with a specific key is within the tree.
 *
 * @param {Object} key The key being searched for.
 * @return {boolean} Whether a node with the key exists.
 */
AvlTree.prototype.contains = function (key) {
  if (this._root === null) {
    return false;
  }

  return this._contains(key, this._root);
};

/**
 * Gets whether a node with a specific key is within the tree.
 *
 * @param {Object} key The key being searched for.
 * @param {Node} root The root of the tree to search in.
 * @return {boolean} Whether a node with the key exists.
 */
AvlTree.prototype._contains = function (key, root) {
  if (key === root.key) {
    return true;
  }

  if (this._compare({key: key}, root) < 0) {
    if (!root.left) {
      return false;
    }
    return this._contains(key, root.left);
  }

  if (this._compare({key: key}, root) > 0) {
    if (!root.right) {
      return false;
    }
    return this._contains(key, root.right);
  }

  return false;
};

/**
 * @return {Object} The minimum key in the tree.
 */
AvlTree.prototype.findMinimum = function () {
  return minValueNode(this._root).key;
};

/**
 * Gets the minimum value node, rooted in a particular node.
 *
 * @param {Node} root The node to search.
 * @return {Node} The node with the minimum key in the tree.
 */
function minValueNode(root) {
  var current = root;
  while (current.left) {
    current = current.left;
  }
  return current;
}

/**
 * @return The maximum key in the tree.
 */
AvlTree.prototype.findMaximum = function () {
  return maxValueNode(this._root).key;
};

/**
 * Gets the maximum value node, rooted in a particular node.
 *
 * @param {Node} root The node to search.
 * @return {Node} The node with the maximum key in the tree.
 */
function maxValueNode(root) {
  var current = root;
  while (current.right) {
    current = current.right;
  }
  return current;
}

AvlTree.prototype.size = function () {
  return this._size;
};

AvlTree.prototype.isEmpty = function () {
  return this._size === 0;
};

/**
 * Gets the balance state of a node, indicating whether the left or right sub-trees are
 * unbalanced.
 *
 * @param {Node} node The node to get the difference from.
 * @return {BalanceState} The BalanceState of the node.
 */
function getBalanceState(node) {
  if (node === null) {
    return BalanceState.BALANCED;
  }
  var heightDifference = node.getLeftHeight() - node.getRightHeight();
  switch (heightDifference) {
    case -2: return BalanceState.UNBALANCED_RIGHT;
    case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
    case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
    case 2: return BalanceState.UNBALANCED_LEFT;
    default: return BalanceState.BALANCED;
  }
}

module.exports = AvlTree;
