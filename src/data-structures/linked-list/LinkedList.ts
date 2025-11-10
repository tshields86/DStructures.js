import { LinkedListNode } from './LinkedListNode';

/**
 * Singly linked list that keeps track of the first and last element.
 * Provides O(1) insertion and removal at both ends, and O(n) for middle operations.
 *
 * @template T - The type of elements stored in the list
 * @category Data Structures
 */
export class LinkedList<T> implements Iterable<T> {
  /**
   * Reference to the first node in the list
   */
  public head: LinkedListNode<T> | null = null;

  /**
   * Reference to the last node in the list
   */
  public tail: LinkedListNode<T> | null = null;

  /**
   * The number of elements in the list
   */
  public size = 0;

  /**
   * Creates a new LinkedList
   *
   * @param iterable - Optional iterable to populate the list
   * @example
   * ```typescript
   * const list = new LinkedList([1, 2, 3]);
   * const emptyList = new LinkedList<number>();
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
      this.head = this.tail = new LinkedListNode(value);
    } else {
      this.head = new LinkedListNode(value, this.head);
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
      this.head = this.tail = new LinkedListNode(value);
    } else {
      this.tail!.next = new LinkedListNode(value);
      this.tail = this.tail!.next;
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

    const newNode = new LinkedListNode(value);
    const beforeNode = this.getNode(index - 1);
    if (!beforeNode) return null;

    const afterNode = beforeNode.next;
    beforeNode.next = newNode;
    newNode.next = afterNode;
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
    }
    this.size--;
    return oldHead.value;
  }

  /**
   * Removes and returns the last element from the list.
   * Time complexity: O(n)
   *
   * @returns The removed value, or null if the list is empty
   */
  removeLast(): T | null {
    if (this.isEmpty()) return null;
    const oldTail = this.tail!;
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      const beforeNode = this.getNode(this.size - 2);
      if (!beforeNode) return null;
      this.tail = beforeNode;
      this.tail.next = null;
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
    beforeNode.next = node.next;
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
   * Time complexity: O(n)
   *
   * @param index - The position to get (0-indexed)
   * @returns The node at the index, or null if index is invalid
   */
  getNode(index: number): LinkedListNode<T> | null {
    if (index < 0 || index >= this.size) return null;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) return null;
      node = node.next;
    }
    return node;
  }

  /**
   * Returns the element at the specified index in the list.
   * Time complexity: O(n)
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
  toArrayNodes(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];
    let node = this.head;
    while (node) {
      nodes.push(node);
      node = node.next;
    }
    return nodes;
  }

  /**
   * Reverses the list in place.
   * Time complexity: O(n)
   *
   * @returns The list instance for chaining
   */
  reverse(): this {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next: LinkedListNode<T> | null;
    let prev: LinkedListNode<T> | null = null;
    for (let i = 0; i < this.size; i++) {
      if (!node) break;
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
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
