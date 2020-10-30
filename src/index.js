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
const binarySearch = require('./algorithms/search/binarySearch');
const bubbleSort = require('./algorithms/sorting/bubbleSort');
const dijkstra = require('./algorithms/graph/dijkstra/dijkstra');
const insertionSort = require('./algorithms/sorting/insertionSort');
const mergeSort = require('./algorithms/sorting/mergeSort');
const quickSort = require('./algorithms/sorting/quickSort');
const selectionSort = require('./algorithms/sorting/selectionSort');

module.exports = {
  BinarySearchTree,
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
  binarySearch,
  bubbleSort,
  dijkstra,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
};
