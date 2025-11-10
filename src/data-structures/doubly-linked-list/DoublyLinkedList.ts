import { DoublyLinkedListNode } from './DoublyLinkedListNode';

/**
 * Doubly linked list that keeps track of the first and last element.
 * Each node has references to both next and previous nodes, allowing
 * bidirectional traversal and O(1) operations at both ends.
 *
 * @template T - The type of elements stored in the list
 * @category Data Structures
 */
export class DoublyLinkedList<T> implements Iterable<T> {
  /**
   * Reference to the first node in the list
   */
  public head: DoublyLinkedListNode<T> | null = null;

  /**
   * Reference to the last node in the list
   */
  public tail: DoublyLinkedListNode<T> | null = null;

  /**
   * The number of elements in the list
   */
  public size = 0;

  /**
   * Creates a new DoublyLinkedList
   *
   * @param iterable - Optional iterable to populate the list
   * @example
   * ```typescript
   * const list = new DoublyLinkedList([1, 2, 3]);
   * const emptyList = new DoublyLinkedList<number>();
   * ```
   */
  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const value of iterable) {
        this.addLast(value);
      }
    }
  }

  /**
   * Adds element to the beginning of the list.
   * Time complexity: O(1)
   *
   * @param value - The value to add
   * @returns The list instance for chaining
   */
  addFirst(value: T): this {
    if (this.isEmpty()) {
      this.head = this.tail = new DoublyLinkedListNode(value);
    } else {
      const newNode = new DoublyLinkedListNode(value, this.head);
      this.head!.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    return this;
  }

  /**
   * Adds element to the end of the list.
   * Time complexity: O(1)
   *
   * @param value - The value to add
   * @returns The list instance for chaining
   */
  addLast(value: T): this {
    if (this.isEmpty()) {
      this.head = this.tail = new DoublyLinkedListNode(value);
    } else {
      const newNode = new DoublyLinkedListNode(value, null, this.tail);
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }

  /**
   * Adds element at the specified index in the list.
   * Time complexity: O(n)
   *
   * @param index - The position to insert at (0-indexed)
   * @param value - The value to insert
   * @returns The list instance for chaining, or null if index is invalid
   */
  add(index: number, value: T): this | null {
    if (index < 0 || index > this.size) return null;
    if (index === 0) return this.addFirst(value);
    if (index === this.size) return this.addLast(value);

    const newNode = new DoublyLinkedListNode(value);
    const beforeNode = this.getNode(index - 1);
    if (!beforeNode || !beforeNode.next) return null;

    const afterNode = beforeNode.next;
    beforeNode.next = newNode;
    newNode.prev = beforeNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;
    this.size++;
    return this;
  }

  /**
   * Removes all nodes from the list.
   * Time complexity: O(1)
   *
   * @returns The list instance for chaining
   */
  clear(): this {
    this.head = this.tail = null;
    this.size = 0;
    return this;
  }

  /**
   * Returns true if the list contains the specified element.
   * Time complexity: O(n)
   *
   * @param value - The value to search for
   * @returns True if the value exists in the list
   */
  contains(value: T): boolean {
    let node = this.head;
    while (node) {
      if (node.value === value) return true;
      node = node.next;
    }
    return false;
  }

  /**
   * Returns the index of the first occurrence of the specified element,
   * or -1 if the list does not contain the element.
   * Time complexity: O(n)
   *
   * @param value - The value to search for
   * @returns The index of the value, or -1 if not found
   */
  indexOf(value: T): number {
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
   * Time complexity: O(1)
   *
   * @returns True if the list has no elements
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Removes and returns the first element from the list.
   * Time complexity: O(1)
   *
   * @returns The removed value, or null if the list is empty
   */
  removeFirst(): T | null {
    if (this.isEmpty()) return null;
    const oldHead = this.head!;
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }
    this.size--;
    return oldHead.value;
  }

  /**
   * Removes and returns the last element from the list.
   * Time complexity: O(1)
   *
   * @returns The removed value, or null if the list is empty
   */
  removeLast(): T | null {
    if (this.isEmpty()) return null;
    const oldTail = this.tail!;
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }
    this.size--;
    return oldTail.value;
  }

  /**
   * Removes and returns the element at the specified index in the list.
   * Time complexity: O(n)
   *
   * @param index - The position to remove from (0-indexed)
   * @returns The removed value, or null if index is invalid
   */
  remove(index: number): T | null {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();

    const beforeNode = this.getNode(index - 1);
    if (!beforeNode || !beforeNode.next) return null;

    const node = beforeNode.next;
    const afterNode = node.next;
    if (!afterNode) return null;

    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
    this.size--;
    return node.value;
  }

  /**
   * Replaces the element at the specified index with the specified element.
   * Time complexity: O(n)
   *
   * @param index - The position to update (0-indexed)
   * @param value - The new value
   * @returns The old value, or null if index is invalid
   */
  set(index: number, value: T): T | null {
    if (index < 0 || index >= this.size) return null;
    const node = this.getNode(index);
    if (!node) return null;
    const oldValue = node.value;
    node.value = value;
    return oldValue;
  }

  /**
   * Returns the node at the specified index in the list.
   * Optimized to traverse from the closer end (head or tail).
   * Time complexity: O(n/2)
   *
   * @param index - The position to get (0-indexed)
   * @returns The node at the index, or null if index is invalid
   */
  getNode(index: number): DoublyLinkedListNode<T> | null {
    if (index < 0 || index >= this.size) return null;
    let node: DoublyLinkedListNode<T> | null;

    // Traverse from the closer end
    if (index <= this.size / 2) {
      node = this.head;
      for (let i = 0; i < index; i++) {
        if (!node) return null;
        node = node.next;
      }
    } else {
      node = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        if (!node) return null;
        node = node.prev;
      }
    }
    return node;
  }

  /**
   * Returns the element at the specified index in the list.
   * Time complexity: O(n/2)
   *
   * @param index - The position to get (0-indexed)
   * @returns The value at the index, or null if index is invalid
   */
  get(index: number): T | null {
    const node = this.getNode(index);
    return node ? node.value : null;
  }

  /**
   * Returns the first element in the list.
   * Time complexity: O(1)
   *
   * @returns The first value, or null if the list is empty
   */
  getFirst(): T | null {
    if (this.isEmpty()) return null;
    return this.head!.value;
  }

  /**
   * Returns the last element in the list.
   * Time complexity: O(1)
   *
   * @returns The last value, or null if the list is empty
   */
  getLast(): T | null {
    if (this.isEmpty()) return null;
    return this.tail!.value;
  }

  /**
   * Adds each element in the array to the list.
   * Time complexity: O(n)
   *
   * @param values - Array of values to add
   * @returns The list instance for chaining
   */
  fromArray(values: T[]): this {
    values.forEach((value) => this.addLast(value));
    return this;
  }

  /**
   * Returns an array containing all elements in proper sequence.
   * Time complexity: O(n)
   *
   * @returns Array of all values in the list
   */
  toArray(): T[] {
    const values: T[] = [];
    let node = this.head;
    while (node) {
      values.push(node.value);
      node = node.next;
    }
    return values;
  }

  /**
   * Returns an array containing all nodes in proper sequence.
   * Time complexity: O(n)
   *
   * @returns Array of all nodes in the list
   */
  toArrayNodes(): DoublyLinkedListNode<T>[] {
    const nodes: DoublyLinkedListNode<T>[] = [];
    let node = this.head;
    while (node) {
      nodes.push(node);
      node = node.next;
    }
    return nodes;
  }

  /**
   * Reverses the list in place by swapping prev and next pointers.
   * Time complexity: O(n)
   *
   * @returns The list instance for chaining
   */
  reverse(): this {
    let temp: DoublyLinkedListNode<T> | null = null;
    let current = this.head;

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }

    if (temp) {
      this.tail = this.head;
      this.head = temp.prev;
    }

    return this;
  }

  /**
   * Calls a function for each element in the list.
   * Time complexity: O(n)
   *
   * @param callback - Function to call for each element
   */
  forEach(callback: (value: T, index: number) => void): void {
    if (this.isEmpty()) return;
    let node = this.head;
    let index = 0;
    while (node) {
      callback(node.value, index);
      node = node.next;
      index++;
    }
  }

  /**
   * Iterate through the list until the callback returns a truthy value.
   * Time complexity: O(n)
   *
   * @param callback - Function to test each element
   * @returns The first element that satisfies the callback, or undefined
   */
  find(callback: (value: T) => boolean): T | undefined {
    for (const value of this) {
      if (callback(value)) return value;
    }
    return undefined;
  }

  /**
   * Returns an iterator for the list values.
   *
   * @returns An iterator over the list values
   */
  *[Symbol.iterator](): Iterator<T> {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  /**
   * Alias for addFirst. Adds element to the beginning of the list.
   */
  unshift(value: T): this {
    return this.addFirst(value);
  }

  /**
   * Alias for addLast. Adds element to the end of the list.
   */
  push(value: T): this {
    return this.addLast(value);
  }

  /**
   * Alias for removeFirst. Removes and returns the first element.
   */
  shift(): T | null {
    return this.removeFirst();
  }

  /**
   * Alias for removeLast. Removes and returns the last element.
   */
  pop(): T | null {
    return this.removeLast();
  }
}
