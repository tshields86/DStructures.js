import { swap, type CompareFn } from '../../utils/utils';

/**
 * Bubble Sort - A simple sorting algorithm that repeatedly steps through the array,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * Time complexity: O(n²) average and worst case, O(n) best case
 * Space complexity: O(1)
 *
 * @template T - The type of elements in the array
 * @param array - The array to sort (sorted in place)
 * @param compareFn - Optional comparison function (default: ascending numeric sort)
 * @returns The sorted array
 * @category Algorithms
 * @example
 * ```typescript
 * const arr = [5, 2, 8, 1, 9];
 * bubbleSort(arr);
 * console.log(arr); // [1, 2, 5, 8, 9]
 *
 * // With custom comparator for descending order
 * bubbleSort(arr, (a, b) => b - a);
 * console.log(arr); // [9, 8, 5, 2, 1]
 * ```
 */
export function bubbleSort<T>(
  array: T[],
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)
): T[] {
  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < array.length - 1 - i; j++) {
      if (compareFn(array[j]!, array[j + 1]!) > 0) {
        swap(array, j, j + 1);
        swapped = true;
      }
    }

    // Optimization: if no swaps occurred, array is sorted
    if (!swapped) break;
  }

  return array;
}
