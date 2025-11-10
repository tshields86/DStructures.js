/* data structures */
const BinarySearchTree = require('./data-structures/tree/BinarySearchTree');
const BinarySearchTreeNode = require('./data-structures/tree/BinarySearchTreeNode');
const DoublyLinkedList = require('./data-structures/doubly-linked-list/DoublyLinkedList');
const DoublyLinkedListNode = require('./data-structures/doubly-linked-list/DoublyLinkedListNode');
const Graph = require('./data-structures/graph/Graph');
const GraphVertex = require('./data-structures/graph/GraphVertex');
const HashMap = require('./data-structures/map/HashMap');
const HashSet = require('./data-structures/set/HashSet');
const Heap = require('./data-structures/heap/Heap');
const LinkedList = require('./data-structures/linked-list/LinkedList');
const LinkedListNode = require('./data-structures/linked-list/LinkedListNode');
const MaxHeap = require('./data-structures/heap/MaxHeap');
const MinHeap = require('./data-structures/heap/MinHeap');
const PriorityQueue = require('./data-structures/priority-queue/PriorityQueue');
const PriorityQueueNode = require('./data-structures/priority-queue/PriorityQueueNode');
const Queue = require('./data-structures/queue/Queue');
const Stack = require('./data-structures/stack/Stack');

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
  BinarySearchTreeNode,
  DoublyLinkedList,
  DoublyLinkedListNode,
  Graph,
  GraphVertex,
  HashMap,
  HashSet,
  Heap,
  LinkedList,
  LinkedListNode,
  MaxHeap,
  MinHeap,
  PriorityQueue,
  PriorityQueueNode,
  Queue,
  Stack,
  binarySearch,
  bubbleSort,
  dijkstra,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
};
