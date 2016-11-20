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
