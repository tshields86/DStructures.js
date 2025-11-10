import { LinkedList } from '../linked-list/LinkedList';

/**
 * Queue - add and remove elements first-in, first-out (FIFO).
 * Implemented using a LinkedList for O(1) enqueue and dequeue operations.
 *
 * @template T - The type of elements stored in the queue
 * @category Data Structures
 */
export class Queue<T> implements Iterable<T> {
  private linkedList: LinkedList<T>;

  /**
   * Creates a new Queue
   *
   * @param iterable - Optional iterable to populate the queue
   * @example
   * ```typescript
   * const queue = new Queue([1, 2, 3]);
   * const emptyQueue = new Queue<number>();
   * ```
   */
  constructor(iterable?: Iterable<T>) {
    this.linkedList = new LinkedList<T>(iterable);
  }

  /**
   * Adds element to the back of the queue.
   * Time complexity: O(1)
   *
   * @param value - The value to add
   * @returns The queue instance for chaining
   */
  enqueue(value: T): this {
    this.linkedList.addLast(value);
    return this;
  }

  /**
   * Removes and returns the front element from the queue.
   * Time complexity: O(1)
   *
   * @returns The removed value, or null if the queue is empty
   */
  dequeue(): T | null {
    return this.linkedList.removeFirst();
  }

  /**
   * Returns the number of elements in the queue.
   * Time complexity: O(1)
   *
   * @returns The number of elements
   */
  get size(): number {
    return this.linkedList.size;
  }

  /**
   * Returns the front element without removing it.
   * Time complexity: O(1)
   *
   * @returns The front value, or null if the queue is empty
   */
  peek(): T | null {
    return this.linkedList.getFirst();
  }

  /**
   * Removes all elements from the queue.
   * Time complexity: O(1)
   *
   * @returns The queue instance for chaining
   */
  clear(): this {
    this.linkedList.clear();
    return this;
  }

  /**
   * Returns true if the queue is empty.
   * Time complexity: O(1)
   *
   * @returns True if the queue has no elements
   */
  isEmpty(): boolean {
    return this.linkedList.isEmpty();
  }

  /**
   * Adds each element in the array to the queue.
   * Time complexity: O(n)
   *
   * @param values - Array of values to add
   * @returns The queue instance for chaining
   */
  fromArray(values: T[]): this {
    this.linkedList.fromArray(values);
    return this;
  }

  /**
   * Returns an array containing all elements in the queue
   * from front to back.
   * Time complexity: O(n)
   *
   * @returns Array of all values in the queue
   */
  toArray(): T[] {
    return this.linkedList.toArray();
  }

  /**
   * Returns an iterator for the queue values (front to back).
   *
   * @returns An iterator over the queue values
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.linkedList;
  }

  /**
   * Alias for enqueue. Adds element to the queue.
   */
  add(value: T): this {
    return this.enqueue(value);
  }

  /**
   * Alias for dequeue. Removes and returns element from the queue.
   */
  remove(): T | null {
    return this.dequeue();
  }
}
