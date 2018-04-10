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

test('should function correctly given a non-reverse rangeCompare', function (t) {
  const tree = new Tree((a, b) => {
    let result = 0;
    if (
      (a.end <= b.end && a.start >= b.start) ||
      (b.end <= a.end && b.start >= a.start)
    ) {
      result = 0;
    }
    if (a.end > b.end) {
      result = 1;
    }
    if (a.start < b.start) {
      result = -1;
    }
    return result;
  });
  tree.insert({start: 16777472, end: 16778239});
  tree.insert({start: 16779264, end: 16781311});
  t.true(tree.contains({start: 16777473, end: 16777473}));
  t.false(tree.contains({start: 16781312, end: 16781312}));
});
