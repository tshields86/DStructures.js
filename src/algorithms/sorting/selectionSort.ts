import { swap, type CompareFn } from '../../utils/utils';

/**
 * Selection Sort - Divides the array into sorted and unsorted regions, repeatedly
 * selecting the minimum element from the unsorted region and moving it to the sorted region.
 * Time complexity: O(n²) for all cases
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
 * selectionSort(arr);
 * console.log(arr); // [1, 2, 5, 8, 9]
 * ```
 */
export function selectionSort<T>(
  array: T[],
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)
): T[] {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (compareFn(array[j]!, array[minIndex]!) < 0) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(array, i, minIndex);
    }
  }

  return array;
}
