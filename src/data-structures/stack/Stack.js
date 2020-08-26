const LinkedList = require('../linked-list/LinkedList');

/**
 * Stack - add and remove elements last-in, first-out (LIFO).
 */
class Stack {
  /**
   * @param {*} [iterable] - Iterable to populate the stack.
   */
  constructor(iterable = null) {
    this.linkedList = new LinkedList();

    if (iterable) Array.from(iterable, value => this.push(value));
  }

  /**
   * Adds element to the stack.
   * @param {*} value
   * @return {Stack}
   */
  push(value) {
    this.linkedList.addFirst(value);
    return this;
  }

  /**
   * Removes and returns element from the stack.
   * @return {(*|null)}
   */
  pop() {
    return this.linkedList.removeFirst();
  }

  /**
   * Returns number of nodes in the stack.
   * @return {number}
   */
  get size() {
    return this.linkedList.size;
  }

  /**
   * Returns the first element in the stack.
   * @return {(*|null)}
   */
  peek() {
    return this.linkedList.getFirst();
  }

  /**
   * Removes all nodes from the stack.
   * @return {LinkedList}
   */
  clear() {
    return this.linkedList.clear();
  }

  /**
   * Returns true if the stack is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.linkedList.isEmpty();
  }

  /**
   * Adds each element in the array to the stack.
   * @param {array} values
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.push(value));
    return this;
  }

  /**
   * Returns an array containing all of the elements in the queue
   * in proper sequence (from bottom to top element).
   * @return {array}
   */
  toArray() {
    return this.linkedList.toArray().reverse();
  }

  /**
   * Returns a string of all the elements in the stack.
   * @param {function} callback
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toArrayNodes()
      .map(node => node.toString(callback)).toString();
  }
}

/* Aliases */
Stack.prototype.add = Stack.prototype.push;
Stack.prototype.remove = Stack.prototype.pop;

module.exports = Stack;
