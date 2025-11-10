import { LinkedList } from '../linked-list/LinkedList';

/**
 * Stack - add and remove elements last-in, first-out (LIFO).
 * Implemented using a LinkedList for O(1) push and pop operations.
 *
 * @template T - The type of elements stored in the stack
 * @category Data Structures
 */
export class Stack<T> implements Iterable<T> {
  private linkedList: LinkedList<T>;

  /**
   * Creates a new Stack
   *
   * @param iterable - Optional iterable to populate the stack
   * @example
   * ```typescript
   * const stack = new Stack([1, 2, 3]);
   * const emptyStack = new Stack<number>();
   * ```
   */
  constructor(iterable?: Iterable<T>) {
    this.linkedList = new LinkedList<T>();

    if (iterable) {
      for (const value of iterable) {
        this.push(value);
      }
    }
  }

  /**
   * Adds element to the top of the stack.
   * Time complexity: O(1)
   *
   * @param value - The value to add
   * @returns The stack instance for chaining
   */
  push(value: T): this {
    this.linkedList.addFirst(value);
    return this;
  }

  /**
   * Removes and returns the top element from the stack.
   * Time complexity: O(1)
   *
   * @returns The removed value, or null if the stack is empty
   */
  pop(): T | null {
    return this.linkedList.removeFirst();
  }

  /**
   * Returns the number of elements in the stack.
   * Time complexity: O(1)
   *
   * @returns The number of elements
   */
  get size(): number {
    return this.linkedList.size;
  }

  /**
   * Returns the top element without removing it.
   * Time complexity: O(1)
   *
   * @returns The top value, or null if the stack is empty
   */
  peek(): T | null {
    return this.linkedList.getFirst();
  }

  /**
   * Removes all elements from the stack.
   * Time complexity: O(1)
   *
   * @returns The stack instance for chaining
   */
  clear(): this {
    this.linkedList.clear();
    return this;
  }

  /**
   * Returns true if the stack is empty.
   * Time complexity: O(1)
   *
   * @returns True if the stack has no elements
   */
  isEmpty(): boolean {
    return this.linkedList.isEmpty();
  }

  /**
   * Adds each element in the array to the stack.
   * Time complexity: O(n)
   *
   * @param values - Array of values to add
   * @returns The stack instance for chaining
   */
  fromArray(values: T[]): this {
    values.forEach((value) => this.push(value));
    return this;
  }

  /**
   * Returns an array containing all elements in the stack
   * from top to bottom.
   * Time complexity: O(n)
   *
   * @returns Array of all values in the stack
   */
  toArray(): T[] {
    return this.linkedList.toArray();
  }

  /**
   * Returns an iterator for the stack values (top to bottom).
   *
   * @returns An iterator over the stack values
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.linkedList;
  }

  /**
   * Alias for push. Adds element to the stack.
   */
  add(value: T): this {
    return this.push(value);
  }

  /**
   * Alias for pop. Removes and returns element from the stack.
   */
  remove(): T | null {
    return this.pop();
  }
}
