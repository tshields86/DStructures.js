/**
 * Node with reference to next element.
 */
class LinkedListNode {
  /**
   * @param {*} value
   * @param {LinkedListNode} [next]
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedListNode;
