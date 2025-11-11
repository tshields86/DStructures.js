import type { CompareFn } from '../../utils/utils';

/**
 * Insertion Sort - Builds the final sorted array one item at a time by inserting
 * each element into its proper position.
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
 * insertionSort(arr);
 * console.log(arr); // [1, 2, 5, 8, 9]
 * ```
 */
export function insertionSort<T>(
  array: T[],
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)
): T[] {
  for (let i = 1; i < array.length; i++) {
    const current = array[i]!;
    let j = i - 1;

    while (j >= 0 && compareFn(array[j]!, current) > 0) {
      array[j + 1] = array[j]!;
      j--;
    }

    array[j + 1] = current;
  }

  return array;
}
