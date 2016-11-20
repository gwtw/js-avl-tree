import test from 'ava';
import Tree from '../';

test('should delete a single key', function (t) {
  var tree = new Tree();
  tree.insert(1);
  tree.delete(1);
  t.true(tree.isEmpty());
});

test('should correctly balance the left left case', function (t) {
  var tree = new Tree();
  tree.insert(3);
  tree.insert(2);
  tree.insert(1);
});
