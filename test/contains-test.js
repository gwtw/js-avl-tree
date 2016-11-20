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
  tree.insert(3);
  tree.insert(1);
  tree.insert(2);
  t.true(tree.contains(1));
  t.true(tree.contains(2));
  t.true(tree.contains(3));
});

test('should return false when the expected parent has no children', function (t) {
  var tree = new Tree();
  tree.insert(2);
  t.false(tree.contains(1));
  t.false(tree.contains(3));
});
