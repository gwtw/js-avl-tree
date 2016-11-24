# js-avl-tree

[![Build Status](https://travis-ci.org/gwtw/js-avl-tree.svg?branch=master)](http://travis-ci.org/gwtw/js-avl-tree)
[![Coverage Status](https://coveralls.io/repos/github/gwtw/js-avl-tree/badge.svg?branch=master)](https://coveralls.io/github/gwtw/js-avl-tree?branch=master)

A JavaScript implementation of the [AVL tree](http://www.growingwiththeweb.com/data-structures/avl-tree/overview/) data structure.

![](http://www.growingwiththeweb.com/images/data-structures/avl-tree/avl-tree.svg)

## Features

- 100% test coverage
- Supports all common tree operations

## Install

```bash
npm install --save @tyriar/avl-tree
```

## Usage

```javascript
// Import npm module
var AvlTree = require('@tyriar/avl-tree');

// Construct AvlTree
var tree = new AvlTree();

// Insert keys
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
console.log('size: ' + tree.size());
console.log('contains 2: ' + tree.contains(2));
console.log('contains 7: ' + tree.contains(7));
// > size: 5
// > contains 2: true
// > contains 7: false

// Delete a key
tree.delete(2);
console.log('size: ' + tree.size());
console.log('contains 2: ' + tree.contains(2));
// > size: 4
// > contains 2: false

// Construct custom compare AvlTree
tree = new AvlTree(function (a, b) {
  return a.localeCompare(b);
});
tree.insert('a');
tree.insert('A');
tree.insert('b');
tree.insert('B');

// Delete the minimum key
var minKey = tree.findMinimum();
tree.delete(minKey);
console.log('minKey: ' + minKey);
console.log('new minKey: ' + tree.findMinimum());
// > min key: 'a'
// > new min key: 'A'
```

## Operation time complexity

| Operation   | Complexity |
| ----------- | ---------- |
| contains    | Θ(log n)   |
| delete      | Θ(log n)   |
| findMaximum | Θ(log n)   |
| findMinimum | Θ(log n)   |
| insert      | Θ(log n)   |
| isEmpty     | Θ(1)       |
| size        | Θ(1)       |

## API

### AvlTree

Creates a new AVL Tree.

**Parameters**

-   `customCompare` **function** An optional custom compare function.

#### contains

Gets whether a node with a specific key is within the tree.

**Parameters**

-   `key` **Object** The key being searched for.

Returns **boolean** Whether a node with the key exists.

#### delete

Deletes a node with a specific key from the tree.

**Parameters**

-   `key` **Object** The key being deleted.

#### findMaximum

Returns **Object** The maximum key in the tree.

#### findMinimum

Returns **Object** The minimum key in the tree.

#### get

Gets the value of a node within the tree with a specific key.

**Parameters**

-   `key` **Object** The key being searched for.

Returns **Object** The value of the node or null if it doesn't exist.

#### insert

Inserts a new node with a specific key into the tree.

**Parameters**

-   `key` **Object** The key being inserted.
-   `value` **Object** The value being inserted.

#### isEmpty

Returns **boolean** Whether the tree is empty.

#### size

Returns **number** The size of the tree.
