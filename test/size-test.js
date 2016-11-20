import test from 'ava';
import Tree from '../';

test('should return the size of the tree', function (t) {
  var tree = new Tree();
  t.is(tree.size(), 0);
  tree.insert(1);
  t.is(tree.size(), 1);
  tree.insert(2);
  t.is(tree.size(), 2);
  tree.insert(3);
  t.is(tree.size(), 3);
  tree.insert(4);
  t.is(tree.size(), 4);
  tree.insert(5);
  t.is(tree.size(), 5);
  tree.insert(6);
  t.is(tree.size(), 6);
  tree.insert(7);
  t.is(tree.size(), 7);
  tree.insert(8);
  t.is(tree.size(), 8);
  tree.insert(9);
  t.is(tree.size(), 9);
  tree.insert(10);
  t.is(tree.size(), 10);
});
