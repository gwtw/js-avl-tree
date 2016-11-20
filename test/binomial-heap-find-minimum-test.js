import test from 'ava';
import Heap from '../';

test.cb('should find minimum when it\'s not the head of the tree', function (t) {
  // Construct this binomial heap:
  //
  //   2
  //   |
  //   3
  //
  var heap1 = new Heap();
  heap1.insert(2, null);
  heap1.insert(3, null);
  // Construct this binomial heap:
  //
  //   1
  //
  var heap2 = new Heap();
  heap2.insert(1, null);

  // Union the heaps:
  //
  //   2--1
  //   |
  //   3
  //
  heap1.union(heap2);

  // Ensure the minimum can be retrieved when it is not the head (2)
  t.is(heap1.findMinimum().key, 1);

  t.end();
});
