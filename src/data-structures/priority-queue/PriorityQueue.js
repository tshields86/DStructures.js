const Heap = require('../heap/Heap');
const PriorityQueueNode = require('./PriorityQueueNode');

/**
 * PriorityQueue
 */
class PriorityQueue extends Heap {
  /**
   * @param {function} [compare]
   */
  constructor(compare = (a, b) => a - b) {
    super();
    this.compare = (i1, i2) => compare(this.container[i1].priority, this.container[i2].priority);
  }

  /**
   * Adds element to the priority queue.
   * @param {*} value
   * @param {number} priority
   * @return {Heap}
   */
  offer(value, priority) {
    return super.offer(new PriorityQueueNode(value, priority));
  }

  /**
   * Removes and returns the top of the priority queue.
   * @return {(*|null)}
   */
  poll() {
    if (super.isEmpty()) return null;
    return super.poll().value;
  }

  /**
   * Returns the top of the priority queue.
   * @return {(*|null)}
   */
  peek() {
    if (super.isEmpty()) return null;
    return this.container[0].value;
  }
}

/* Aliases */
PriorityQueue.prototype.add = PriorityQueue.prototype.offer;
PriorityQueue.prototype.remove = PriorityQueue.prototype.poll;

module.exports = PriorityQueue;
