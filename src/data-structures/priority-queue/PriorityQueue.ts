import { Heap } from '../heap/Heap';
import { PriorityQueueNode } from './PriorityQueueNode';
import type { CompareFn } from '../../utils/utils';

/**
 * PriorityQueue - A queue where elements are dequeued based on priority.
 * Built on top of a Heap for efficient O(log n) operations.
 * Lower priority numbers are dequeued first by default.
 *
 * @template T - The type of values stored in the queue
 * @category Data Structures
 */
export class PriorityQueue<T> extends Heap<PriorityQueueNode<T>> {
  /**
   * Creates a new PriorityQueue
   *
   * @param compareFn - Optional comparison function for priorities.
   *                    Default: (a, b) => a - b (lower priority first)
   * @example
   * ```typescript
   * const pq = new PriorityQueue<string>();
   * pq.offer('low priority task', 5);
   * pq.offer('high priority task', 1);
   * console.log(pq.poll()); // 'high priority task'
   * ```
   */
  constructor(compareFn: CompareFn<number> = (a, b) => a - b) {
    super();
    this.compare = (i1: number, i2: number) =>
      compareFn(this.container[i1]!.priority, this.container[i2]!.priority);
  }

  /**
   * Adds an element with priority to the queue.
   * Time complexity: O(log n)
   *
   * @param value - The value to add
   * @param priority - The priority of the value (lower = higher priority by default)
   * @returns The queue instance for chaining
   */
  // @ts-expect-error - Intentional signature change from parent class
  override offer(value: T, priority: number): this {
    super.offer(new PriorityQueueNode(value, priority));
    return this;
  }

  /**
   * Removes and returns the highest priority element.
   * Time complexity: O(log n)
   *
   * @returns The value with highest priority, or null if queue is empty
   */
  // @ts-expect-error - Intentional signature change from parent class
  override poll(): T | null {
    if (super.isEmpty()) return null;
    const node = super.poll();
    return node ? node.value : null;
  }

  /**
   * Returns the highest priority element without removing it.
   * Time complexity: O(1)
   *
   * @returns The value with highest priority, or null if queue is empty
   */
  // @ts-expect-error - Intentional signature change from parent class
  override peek(): T | null {
    if (super.isEmpty()) return null;
    return this.container[0]!.value;
  }

  /**
   * Changes the priority of an element in the queue.
   * Removes the old entry and adds it with new priority.
   * Time complexity: O(n log n)
   *
   * @param value - The element to re-prioritize
   * @param priority - The new priority
   * @returns The queue instance for chaining
   */
  changePriority(value: T, priority: number): this {
    // Remove all instances of the value
    const indices = this.find(value);
    indices.forEach(() => {
      this.removeValue(value);
    });
    // Add back with new priority
    this.offer(value, priority);
    return this;
  }

  /**
   * Finds all indices where a value exists in the queue.
   * Time complexity: O(n)
   *
   * @param value - The value to find
   * @returns Array of indices where the value exists
   */
  // @ts-expect-error - Intentional signature change from parent class
  override find(value: T): number[] {
    return this.container.reduce<number[]>((indices, node, i) => {
      if (value === node.value) indices.push(i);
      return indices;
    }, []);
  }

  /**
   * Removes all occurrences of a value from the queue.
   * Time complexity: O(n log n)
   *
   * @param value - The value to remove
   * @returns The queue instance for chaining
   */
  // @ts-expect-error - Intentional signature change from parent class
  override removeValue(value: T): this {
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

        const parent = this.container[this.getParentIdx(indexToRemove)];
        const hasLeft = this.getLeftIdx(indexToRemove) < this.size;

        if (hasLeft && !parent) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  private getParentIdx(i: number): number {
    return Math.ceil(i / 2 - 1);
  }

  private getLeftIdx(i: number): number {
    return 2 * i + 1;
  }

  /**
   * Checks if the queue contains a value.
   * Time complexity: O(n)
   *
   * @param value - The value to check for
   * @returns True if the value exists in the queue
   */
  // @ts-expect-error - Intentional signature change from parent class
  override has(value: T): boolean {
    return this.find(value).length > 0;
  }

  /**
   * Returns an array of all values in the queue (in heap order, not priority order).
   * Time complexity: O(n)
   *
   * @returns Array of all values
   */
  toValueArray(): T[] {
    return this.container.map((node) => node.value);
  }

  /**
   * Alias for offer. Adds an element with priority.
   */
  // @ts-expect-error - Intentional signature change from parent class
  override add(value: T, priority: number): this {
    return this.offer(value, priority);
  }

  /**
   * Alias for poll. Removes and returns highest priority element.
   */
  // @ts-expect-error - Intentional signature change from parent class
  override remove(): T | null {
    return this.poll();
  }
}
