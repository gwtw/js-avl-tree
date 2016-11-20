import test from 'ava';
import Heap from '../';

test.cb('should be able to insert elements after decreasing key', function (t) {
  var heap = new Heap();
  var node1 = heap.insert(1, null);
  var node2 = heap.insert(2, null);
  var node3 = heap.insert(3, null);
  var node4 = heap.insert(4, null);
  var node5 = heap.insert(5, null);
  var node6 = heap.insert(6, null);
  var node7 = heap.insert(7, null);
  var node8 = heap.insert(8, null);
  var node9 = heap.insert(9, null);

  heap.decreaseKey(node9, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node6, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum(), node1);
  heap.decreaseKey(node3, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node2, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node5, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node7, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node8, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);
  heap.decreaseKey(node4, 0);
  t.is(heap.extractMinimum().key, 0);
  t.is(heap.findMinimum().key, 1);

  t.is(heap.extractMinimum(), node1);
  t.true(heap.isEmpty());

  t.end();
});
