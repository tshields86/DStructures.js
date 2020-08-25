/**
 * Node with reference to next and previous elements.
 */
class DoublyLinkedListNode {
  /**
   * @param {*} value
   * @param {LinkedListNode} [next]
   * @param {LinkedListNode} [prev]
   */
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

module.exports = DoublyLinkedListNode;
