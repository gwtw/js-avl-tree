import test from 'ava';
import Tree from '../';

test('should return false if the tree is empty', function (t) {
  var tree = new Tree();
  t.false(tree.contains(1));
});

test('should return whether the tree contains a node', function (t) {
  var tree = new Tree();
  t.false(tree.contains(1));
  t.false(tree.contains(2));
  t.false(tree.contains(3));
  tree.insert(3, null);
  tree.insert(1, null);
  tree.insert(2, null);
  t.true(tree.contains(1));
  t.true(tree.contains(2));
  t.true(tree.contains(3));
});
