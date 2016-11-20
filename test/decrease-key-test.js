import test from 'ava';
import Heap from '../';
import testHelper from '@tyriar/heap-tests/decrease-key-tests';

testHelper.run(test, Heap);
