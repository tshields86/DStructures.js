/* data structures */
const BinarySearchTree = require('./data-structures/tree/BinarySearchTree');
const DoublyLinkedList = require('./data-structures/doubly-linked-list/DoublyLinkedList');
const Graph = require('./data-structures/graph/Graph');
const HashMap = require('./data-structures/map/HashMap');
const HashSet = require('./data-structures/set/HashSet');
const Heap = require('./data-structures/heap/Heap');
const LinkedList = require('./data-structures/linked-list/LinkedList');
const MaxHeap = require('./data-structures/heap/MaxHeap');
const MinHeap = require('./data-structures/heap/MinHeap');
const PriorityQueue = require('./data-structures/priority-queue/PriorityQueue');
const Stack = require('./data-structures/stack/Stack');
const Queue = require('./data-structures/queue/Queue');

/* algorithms */
const dijkstra = require('./algorithms/graph/dijkstra/dijkstra');

module.exports = {
  BinarySearchTree,
  dijkstra,
  DoublyLinkedList,
  Graph,
  HashMap,
  HashSet,
  Heap,
  LinkedList,
  MaxHeap,
  MinHeap,
  PriorityQueue,
  Stack,
  Queue,
};
