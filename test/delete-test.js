import test from 'ava';
import Tree from '../';

test('should delete a single key', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.delete(1);
  t.true(tree.isEmpty());
});

/**
 *       _4_                       _2_
 *      /   \                     /   \
 *     2     6  -> delete(6) ->  1     4
 *    / \                             /
 *   1   3                           3
 */
test('should correctly balance the left left case', function (t) {
  var tree = new Tree();
  tree.insert(4);
  tree.insert(2);
  tree.insert(6);
  tree.insert(3);
  tree.insert(5);
  tree.insert(1);
  tree.insert(7);
  tree.delete(7);
  tree.delete(5);
  tree.delete(6);
  t.is(tree._root.key, 2);
  t.is(tree._root.left.key, 1);
  t.is(tree._root.right.key, 4);
  t.is(tree._root.right.left.key, 3);
});

/**
 *       _4_                       _6_
 *      /   \                     /   \
 *     2     6  -> delete(2) ->  4     7
 *          / \                   \
 *         5   7                  5
 */
test('should correctly balance the right right case', function (t) {
  var tree = new Tree();
  tree.insert(4);
  tree.insert(2);
  tree.insert(6);
  tree.insert(3);
  tree.insert(5);
  tree.insert(1);
  tree.insert(7);
  tree.delete(1);
  tree.delete(3);
  tree.delete(2);
  t.is(tree._root.key, 6);
  t.is(tree._root.left.key, 4);
  t.is(tree._root.left.right.key, 5);
  t.is(tree._root.right.key, 7);
});

/**
 *       _6_                       _4_
 *      /   \                     /   \
 *     2     7  -> delete(8) ->  2     6
 *    / \     \                 / \   / \
 *   1   4     8               1   3 5   7
 *      / \
 *     3   5
 */
test('should correctly balance the left right case', function (t) {
  var tree = new Tree();
  tree.insert(6);
  tree.insert(2);
  tree.insert(7);
  tree.insert(1);
  tree.insert(8);
  tree.insert(4);
  tree.insert(3);
  tree.insert(5);
  tree.delete(8);
  t.is(tree._root.key, 4);
  t.is(tree._root.left.key, 2);
  t.is(tree._root.left.left.key, 1);
  t.is(tree._root.left.right.key, 3);
  t.is(tree._root.right.key, 6);
  t.is(tree._root.right.left.key, 5);
  t.is(tree._root.right.right.key, 7);
});

/**
 *       _3_                       _5_
 *      /   \                     /   \
 *     2     7  -> delete(1) ->  3     7
 *    /     / \                 / \   / \
 *   1     5   8               2   4 6   8
 *        / \
 *       4   6
 */
test('should correctly balance the right left case', function (t) {
  var tree = new Tree();
  tree.insert(3);
  tree.insert(2);
  tree.insert(7);
  tree.insert(1);
  tree.insert(8);
  tree.insert(5);
  tree.insert(4);
  tree.insert(6);
  tree.delete(1);
  t.is(tree._root.key, 5);
  t.is(tree._root.left.key, 3);
  t.is(tree._root.left.left.key, 2);
  t.is(tree._root.left.right.key, 4);
  t.is(tree._root.right.key, 7);
  t.is(tree._root.right.left.key, 6);
  t.is(tree._root.right.right.key, 8);
});
