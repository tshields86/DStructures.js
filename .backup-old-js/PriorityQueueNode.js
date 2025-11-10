/**
 * Node with value and priority.
 */
class PriorityQueueNode {
  /**
   * @param {*} value
   * @param {PriorityQueueNode} [next]
   */
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

module.exports = PriorityQueueNode;
