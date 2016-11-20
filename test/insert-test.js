import test from 'ava';
import Tree from '../';

test('should return the size of the tree', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  t.is(tree.size(), 5);
});

test('should ignore insert of duplicate key', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.insert(1);
  t.is(tree.size(), 1);
});

/**
 *         c
 *        / \           _b_
 *       b   z         /   \
 *      / \     ->    a     c
 *     a   y         / \   / \
 *    / \           w   x y   z
 *   w   x
 */
test('should correctly balance the left left case', function (t) {
  var tree = new Tree();
  tree.insert(3);
  tree.insert(2);
  tree.insert(1);
  t.is(tree._root.key, 2);
});

/**
 *       c
 *      / \           _b_
 *     a   z         /   \
 *    / \     ->    a     c
 *   w   b         / \   / \
 *      / \       w   x y   z
 *     x   y
 */
test('should correctly balance the left right case', function (t) {
  var tree = new Tree();
  tree.insert(3);
  tree.insert(1);
  tree.insert(2);
  t.is(tree._root.key, 2);
});

/**
 *     a
 *    / \               _b_
 *   w   b             /   \
 *      / \     ->    a     c
 *     x   c         / \   / \
 *        / \       w   x y   z
 *       y   z
 */
test('should correctly balance the right right case', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  t.is(tree._root.key, 2);
});

/**
 *     a
 *    / \             _b_
 *   w   c           /   \
 *      / \   ->    a     c
 *     b   z       / \   / \
 *    / \         w   x y   z
 *   x   y
 */
test('should correctly balance the right left case', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.insert(3);
  tree.insert(2);
  t.is(tree._root.key, 2);
});
