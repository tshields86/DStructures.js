import { swap, type CompareFn } from '../../utils/utils';

/**
 * Helper functions for heap index calculations
 */
const getParentIdx = (i: number): number => Math.ceil(i / 2 - 1);
const getLeftIdx = (i: number): number => 2 * i + 1;
const getRightIdx = (i: number): number => 2 * i + 2;

/**
 * Heap - A complete binary tree data structure that satisfies the heap property.
 * Can be configured as min-heap or max-heap via comparison function.
 * Provides O(log n) insertion and O(1) access to min/max element.
 *
 * @template T - The type of elements stored in the heap
 * @category Data Structures
 */
export class Heap<T> {
  /**
   * Internal array storage for heap elements
   */
  protected container: T[] = [];

  /**
   * The number of elements in the heap
   */
  public size = 0;

  /**
   * Comparison function that compares indices in the container
   */
  protected compare: (i1: number, i2: number) => number;

  /**
   * Creates a new Heap
   *
   * @param compareFn - Comparison function (a, b) => number.
   *                    Return negative if a < b, positive if a > b, zero if equal.
   *                    Default: (a, b) => a - b (min-heap)
   * @example
   * ```typescript
   * // Min heap
   * const minHeap = new Heap<number>((a, b) => a - b);
   * // Max heap
   * const maxHeap = new Heap<number>((a, b) => b - a);
   * ```
   */
  constructor(compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)) {
    this.compare = (i1: number, i2: number) =>
      compareFn(this.container[i1]!, this.container[i2]!);
  }

  /**
   * Adds an element to the heap.
   * Time complexity: O(log n)
   *
   * @param value - The value to add
   * @returns The heap instance for chaining
   */
  offer(value: T): this {
    this.container[this.size] = value;
    this.size++;
    this.heapifyUp();
    return this;
  }

  /**
   * Removes and returns the top element of the heap (min or max).
   * Time complexity: O(log n)
   *
   * @returns The top element, or null if heap is empty
   */
  poll(): T | null {
    if (this.isEmpty()) return null;
    swap(this.container, 0, this.size - 1);
    const value = this.container.pop()!;
    this.size--;
    this.heapifyDown();
    return value;
  }

  /**
   * Returns the top element without removing it.
   * Time complexity: O(1)
   *
   * @returns The top element, or null if heap is empty
   */
  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.container[0]!;
  }

  /**
   * Removes all occurrences of a value from the heap.
   * Time complexity: O(n log n)
   *
   * @param value - The value to remove
   * @returns The heap instance for chaining
   */
  removeValue(value: T): this {
    const numberOfItemsToRemove = this.find(value).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indices = this.find(value);
      const indexToRemove = indices[indices.length - 1];

      if (indexToRemove === undefined) break;

      if (indexToRemove === this.size - 1) {
        this.container.pop();
        this.size--;
      } else {
        this.container[indexToRemove] = this.container.pop()!;
        this.size--;

        const parent = this.container[getParentIdx(indexToRemove)];
        const hasLeft = getLeftIdx(indexToRemove) < this.size;

        if (hasLeft && !parent) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * Finds all indices where a value exists in the heap.
   * Time complexity: O(n)
   *
   * @param value - The value to find
   * @returns Array of indices where the value exists
   */
  find(value: T): number[] {
    return this.container.reduce<number[]>((indices, currValue, i) => {
      if (value === currValue) indices.push(i);
      return indices;
    }, []);
  }

  /**
   * Checks if the heap contains a value.
   * Time complexity: O(n)
   *
   * @param value - The value to check for
   * @returns True if the value exists in the heap
   */
  has(value: T): boolean {
    return this.find(value).length > 0;
  }

  /**
   * Returns true if the heap is empty.
   * Time complexity: O(1)
   *
   * @returns True if the heap has no elements
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Removes all elements from the heap.
   * Time complexity: O(1)
   *
   * @returns The heap instance for chaining
   */
  clear(): this {
    this.container = [];
    this.size = 0;
    return this;
  }

  /**
   * Restores heap property by moving an element up.
   * Time complexity: O(log n)
   *
   * @param startIdx - Index to start heapifying from (default: last element)
   */
  protected heapifyUp(startIdx?: number): void {
    let idx = startIdx !== undefined ? startIdx : this.size - 1;
    let parentIdx = getParentIdx(idx);

    while (parentIdx >= 0 && this.compare(parentIdx, idx) > 0) {
      swap(this.container, parentIdx, idx);
      idx = parentIdx;
      parentIdx = getParentIdx(idx);
    }
  }

  /**
   * Restores heap property by moving an element down.
   * Time complexity: O(log n)
   *
   * @param startIdx - Index to start heapifying from (default: root)
   */
  protected heapifyDown(startIdx = 0): void {
    const getTopChildIdx = (i: number): number => {
      const leftIdx = getLeftIdx(i);
      const rightIdx = getRightIdx(i);
      return rightIdx < this.size && this.compare(leftIdx, rightIdx) > 0
        ? rightIdx
        : leftIdx;
    };

    let idx = startIdx;
    while (
      getLeftIdx(idx) < this.size &&
      this.compare(idx, getTopChildIdx(idx)) > 0
    ) {
      const next = getTopChildIdx(idx);
      swap(this.container, idx, next);
      idx = next;
    }
  }

  /**
   * Returns an array containing all elements in the heap.
   * Note: The array is not sorted, it's in heap order.
   * Time complexity: O(1)
   *
   * @returns Array of all elements
   */
  toArray(): T[] {
    return [...this.container];
  }

  /**
   * Alias for offer. Adds an element to the heap.
   */
  add(value: T): this {
    return this.offer(value);
  }

  /**
   * Alias for poll. Removes and returns the top element.
   */
  remove(): T | null {
    return this.poll();
  }
}
