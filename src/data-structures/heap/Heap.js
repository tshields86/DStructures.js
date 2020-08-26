const { swap } = require('../../utils/utils');

/**
 * Heap
 */
class Heap {
  /**
   * @param {function} [compare]
   */
  constructor(compare = (a, b) => a - b) {
    this.container = [];
    this.size = 0;
    this.compare = (i1, i2) => compare(this.container[i1], this.container[i2]);
  }

  /**
   * Adds element to the heap.
   * @param {*} value
   * @return {Heap}
   */
  offer(value) {
    this.container[this.size] = value;
    this.size++;
    this.heapifyUp();
    return this;
  }

  /**
   * Removes and returns the head of the heap.
   * @return {(*|null)}
   */
  poll() {
    if (this.isEmpty()) return null;
    swap(this.container, 0, this.size - 1);
    const value = this.container.pop();
    this.size--;
    this.heapifyDown();
    return value;
  }

  /**
   * Returns the head of the heap.
   * @return {(*|null)}
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.container[0];
  }

  /**
   * Returns true if the heap is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Removes all nodes from the heap.
   * @return {Heap}
   */
  clear() {
    this.container = [];
    this.size = 0;
    return this;
  }

  /**
   * If out of order, move element upwards in the heap.
   */
  heapifyUp() {
    const getParentIdx = i => Math.ceil(i / 2 - 1);

    let idx = this.size - 1;
    let parentIdx = getParentIdx(idx);
    while (parentIdx >= 0 && this.compare(parentIdx, idx) > 0) {
      swap(this.container, parentIdx, idx);
      idx = parentIdx;
      parentIdx = getParentIdx(idx);
    }
  }

  /**
   * If out of order, move element downwards in the heap.
   */
  heapifyDown() {
    const getLeftIdx = i => 2 * i + 1;
    const getRightIdx = i => 2 * i + 2;
    const getTopChildIdx = i => (getRightIdx(i) < this.size
      && this.compare(getLeftIdx(i), getRightIdx(i)) > 0 ? getRightIdx(i) : getLeftIdx(i));

    let idx = 0;
    while (getLeftIdx(idx) < this.size && this.compare(idx, getTopChildIdx(idx)) > 0) {
      const next = getTopChildIdx(idx);
      swap(this.container, idx, next);
      idx = next;
    }
  }
}

/* Aliases */
Heap.prototype.add = Heap.prototype.offer;
Heap.prototype.remove = Heap.prototype.poll;

module.exports = Heap;
