const LinkedList = require('../linked-list/LinkedList');

/**
 * Queue - add and remove elements first-in, first-out (FIFO).
 */
class Queue {
  /**
   * @param {*} [iterable] - Iterable to populate the queue.
   */
  constructor(iterable = null) {
    this.linkedList = new LinkedList(iterable);
  }

  /**
   * Adds element to the queue.
   * @param {*} value
   * @return {Queue}
   */
  enqueue(value) {
    this.linkedList.addLast(value);
    return this;
  }

  /**
   * Removes and returns element from the queue.
   * @return {(*|null)}
   */
  dequeue() {
    return this.linkedList.removeFirst();
  }

  /**
   * Returns number of nodes in the queue.
   * @return {number}
   */
  get size() {
    return this.linkedList.size;
  }

  /**
   * Returns the first element in the queue.
   * @return {(*|null)}
   */
  peek() {
    return this.linkedList.getFirst();
  }

  /**
   * Removes all nodes from the queue.
   * @return {LinkedList}
   */
  clear() {
    return this.linkedList.clear();
  }

  /**
   * Returns true if the queue is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.linkedList.isEmpty();
  }

  /**
   * Adds each element in the array to the queue.
   * @param {array} values
   * @return {LinkedList}
   */
  fromArray(values) {
    this.linkedList.fromArray(values);
    return this;
  }

  /**
   * Returns an array containing all of the elements in the queue
   * in proper sequence (from first to last element).
   * @return {array}
   */
  toArray() {
    return this.linkedList.toArray();
  }

  * [Symbol.iterator]() {
    let node = this.linkedList.head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}

/* Aliases */
Queue.prototype.add = Queue.prototype.enqueue;
Queue.prototype.remove = Queue.prototype.dequeue;

module.exports = Queue;
