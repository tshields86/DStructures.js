import { Heap } from './Heap';

/**
 * MaxHeap - A heap where the largest element is always at the top.
 * Provides O(1) access to maximum element and O(log n) insertion/removal.
 *
 * @template T - The type of elements stored in the heap (must be comparable)
 * @category Data Structures
 */
export class MaxHeap<T> extends Heap<T> {
  /**
   * Creates a new MaxHeap
   *
   * @example
   * ```typescript
   * const maxHeap = new MaxHeap<number>();
   * maxHeap.offer(5).offer(3).offer(7);
   * console.log(maxHeap.peek()); // 7
   * ```
   */
  constructor() {
    super((a, b) => (b as number) - (a as number));
  }
}
