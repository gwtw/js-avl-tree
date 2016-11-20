# js-avl-tree

[![Build Status](https://travis-ci.org/gwtw/js-avl-tree.svg?branch=master)](http://travis-ci.org/gwtw/js-avl-tree)
[![Coverage Status](https://coveralls.io/repos/github/gwtw/js-avl-tree/badge.svg?branch=master)](https://coveralls.io/github/gwtw/js-avl-tree?branch=master)

A JavaScript implementation of the [AVL tree](http://www.growingwiththeweb.com/data-structures/avl-tree/overview/) data structure.

![](http://www.growingwiththeweb.com/images/data-structures/avl-tree/avl-tree.svg)

## API

### AvlTree

Creates a new AVL Tree.

**Parameters**

-   `customCompare`

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

#### insert

Inserts a new node with a specific key into the tree.

**Parameters**

-   `key` **Object** The key being inserted.

#### isEmpty

Returns **boolean** Whether the tree is empty.

#### size

Returns **number** The size of the tree.
