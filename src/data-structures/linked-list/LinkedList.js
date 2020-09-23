const LinkedListNode = require('./LinkedListNode');

/**
 * Singly linked list that keeps track of
 * the first and last element.
 */
class LinkedList {
  /**
   * @param {*} [iterable] - Iterable to populate the list.
   */
  constructor(iterable = null) {
    this.head = this.tail = null;
    this.size = 0;

    if (iterable) Array.from(iterable, value => this.addLast(value));
  }

  /**
   * Adds element to the beginning of the list.
   * @param {*} value
   * @return {LinkedList}
   */
  addFirst(value) {
    if (this.isEmpty()) this.head = this.tail = new LinkedListNode(value);
    else this.head = new LinkedListNode(value, this.head);
    this.size++;
    return this;
  }

  /**
   * Adds element to the end of the list.
   * @param {*} value
   * @return {LinkedList}
   */
  addLast(value) {
    if (this.isEmpty()) this.head = this.tail = new LinkedListNode(value);
    else this.tail = this.tail.next = new LinkedListNode(value);
    this.size++;
    return this;
  }

  /**
   * Adds element at the specified index in the list.
   * @param {number} index
   * @param {*} value
   * @returns {(LinkedList|null)}
   */
  add(index, value) {
    if (index < 0 || index > this.size) return null;
    if (index === 0) return this.addFirst(value);
    if (index === this.size) return this.addLast(value);

    const newNode = new LinkedListNode(value);
    const beforeNode = this.getNode(index - 1);
    const afterNode = beforeNode.next;
    beforeNode.next = newNode;
    newNode.next = afterNode;
    this.size++;
    return this;
  }

  /**
   * Removes all nodes from the list.
   * @return {LinkedList}
   */
  clear() {
    this.head = this.tail = null;
    this.size = 0;
    return this;
  }

  /**
   * Returns true if the list contains the specified element.
   * @param {*} value
   * @return {boolean}
   */
  contains(value) {
    let node = this.head;
    while (node) {
      if (node.value === value) return true;
      node = node.next;
    }
    return false;
  }

  /**
   * Returns the index of the first occurrence of the specified element in
   * the list, or -1 if the list does not contain the element.
   * @param {*} value
   * @return {number}
   */
  indexOf(value) {
    let node = this.head;
    let i = 0;
    while (node) {
      if (node.value === value) return i;
      node = node.next;
      i++;
    }
    return -1;
  }

  /**
   * Returns true if the list is empty.
   * @return {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Removes and returns the first element from the list.
   * @return {(*|null)}
   */
  removeFirst() {
    if (this.isEmpty()) return null;
    const oldHead = this.head;
    if (this.size === 1) this.head = this.tail = null;
    else this.head = this.head.next;
    this.size--;
    return oldHead.value;
  }

  /**
   * Removes and returns the last element from the list.
   * @return {(*|null)}
   */
  removeLast() {
    if (this.isEmpty()) return null;
    const oldTail = this.tail;
    if (this.size === 1) this.head = this.tail = null;
    else {
      const beforeNode = this.getNode(this.size - 2);
      this.tail = beforeNode;
      this.tail.next = null;
    }
    this.size--;
    return oldTail.value;
  }

  /**
   * Removes and returns the element at the specified index in the list.
   * @param {number} index
   * @return {(*|null)}
   */
  remove(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();

    const beforeNode = this.getNode(index - 1);
    const node = beforeNode.next;
    beforeNode.next = node.next;
    this.size--;
    return node.value;
  }

  /**
   * Replaces the element at the specified index in the list
   * with the specified element.
   * @param {number} index
   * @param {*} value
   * @return {(*|null)}
   */
  set(index, value) {
    if (index < 0 || index >= this.size) return null;
    const node = this.getNode(index);
    const oldValue = node.value;
    node.value = value;
    return oldValue;
  }

  /**
   * Returns the node at the specified index in the list.
   * @param {number} index
   * @return {(LinkedListNode|null)}
   */
  getNode(index) {
    if (index < 0 || index >= this.size) return null;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  /**
   * Returns the element at the specified index in the list.
   * @param {number} index
   * @return {(*|null)}
   */
  get(index) {
    if (index < 0 || index >= this.size) return null;
    return this.getNode(index).value;
  }

  /**
   * Returns the first element in the list.
   * @return {(*|null)}
   */
  getFirst() {
    if (this.isEmpty()) return null;
    return this.head.value;
  }

  /**
   * Returns the last element in the list.
   * @return {(*|null)}
   */
  getLast() {
    if (this.isEmpty()) return null;
    return this.tail.value;
  }

  /**
   * Adds each element in the array to the list.
   * @param {array} values
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.addLast(value));
    return this;
  }

  /**
   * Returns an array containing all of the elements in the list
   * in proper sequence (from first to last element).
   * @return {array}
   */
  toArray() {
    const values = [];
    let node = this.head;
    while (node) {
      values.push(node.value);
      node = node.next;
    }
    return values;
  }

  /**
   * Returns an array containing all of the nodes in the list
   * in proper sequence (from first to last element).
   * @return {array}
   */
  toArrayNodes() {
    const nodes = [];
    let node = this.head;
    while (node) {
      nodes.push(node);
      node = node.next;
    }
    return nodes;
  }

  /**
   * Returns a string of all the elements in the list.
   * @param {function} callback
   * @return {string}
   */
  toString(callback) {
    return this.toArrayNodes()
      .map(node => node.toString(callback)).toString();
  }

  /**
   * Returns the list in reverse order.
   * @return {LinkedList}
   */
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    for (let i = 0; i < this.size; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  /**
   * Calls a function for each element in the list.
   * @param {function} callback
   */
  forEach(callback) {
    if (this.isEmpty()) return;
    let node = this.head;
    while (node) {
      callback(node.value);
      node = node.next;
    }
  }

  /**
   * Iterate through the list until the callback returns a truthy value.
   * @param {function} callback
   * @return {*}
   */
  find(callback) {
    for (const node of this) {
      const result = callback(node);
      if (result !== null) return result;
    }
    return undefined;
  }

  * [Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}

/* Aliases */
LinkedList.prototype.unshift = LinkedList.prototype.addFirst;
LinkedList.prototype.push = LinkedList.prototype.addLast;
LinkedList.prototype.shift = LinkedList.prototype.removeFirst;
LinkedList.prototype.pop = LinkedList.prototype.removeLast;

module.exports = LinkedList;
