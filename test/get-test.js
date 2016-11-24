import test from 'ava';
import Tree from '../';

test('should return the size of the tree', function (t) {
  var tree = new Tree();
  t.is(tree.get(1), null);
  t.is(tree.get(2), null);
  t.is(tree.get(3), null);
  tree.insert(1, 4);
  tree.insert(2, 5);
  tree.insert(3, 6);
  t.is(tree.get(1), 4);
  t.is(tree.get(2), 5);
  t.is(tree.get(3), 6);
});
