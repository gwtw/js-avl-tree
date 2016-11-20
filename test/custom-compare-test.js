import test from 'ava';
import Tree from '../';

test('should function correctly given a non-reverse customCompare', function (t) {
  var tree = new Tree(function (a, b) {
    return b - a;
  });
  tree.insert(2);
  tree.insert(1);
  tree.insert(3);
  t.is(tree.size(), 3);
  t.is(tree.findMinimum(), 3);
  t.is(tree.findMaximum(), 1);
  tree.delete(3);
  t.is(tree.size(), 2);
  t.is(tree._root.key, 2);
  t.is(tree._root.left, null);
  t.is(tree._root.right.key, 1);
});
