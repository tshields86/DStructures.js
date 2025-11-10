import { Heap } from './Heap';

/**
 * MinHeap - A heap where the smallest element is always at the top.
 * Provides O(1) access to minimum element and O(log n) insertion/removal.
 *
 * @template T - The type of elements stored in the heap (must be comparable)
 * @category Data Structures
 */
export class MinHeap<T> extends Heap<T> {
  /**
   * Creates a new MinHeap
   *
   * @example
   * ```typescript
   * const minHeap = new MinHeap<number>();
   * minHeap.offer(5).offer(3).offer(7);
   * console.log(minHeap.peek()); // 3
   * ```
   */
  constructor() {
    super((a, b) => (a as number) - (b as number));
  }
}
