import { swap, type CompareFn } from '../../utils/utils';

/**
 * Quick Sort - A divide-and-conquer algorithm that picks a pivot element and
 * partitions the array around the pivot, then recursively sorts the subarrays.
 * Time complexity: O(n log n) average case, O(n²) worst case
 * Space complexity: O(log n) due to recursion stack
 *
 * @template T - The type of elements in the array
 * @param array - The array to sort (sorted in place)
 * @param compareFn - Optional comparison function (default: ascending numeric sort)
 * @param low - Starting index (used internally for recursion)
 * @param high - Ending index (used internally for recursion)
 * @returns The sorted array
 * @category Algorithms
 * @example
 * ```typescript
 * const arr = [5, 2, 8, 1, 9];
 * quickSort(arr);
 * console.log(arr); // [1, 2, 5, 8, 9]
 * ```
 */
export function quickSort<T>(
  array: T[],
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number),
  low: number = 0,
  high: number = array.length - 1
): T[] {
  if (low < high) {
    const pivotIndex = partition(array, compareFn, low, high);
    quickSort(array, compareFn, low, pivotIndex - 1);
    quickSort(array, compareFn, pivotIndex + 1, high);
  }

  return array;
}

/**
 * Partitions the array around a pivot element.
 * Elements smaller than pivot go to the left, larger go to the right.
 * Time complexity: O(n)
 *
 * @template T - The type of elements in the array
 * @param array - The array to partition
 * @param compareFn - Comparison function
 * @param low - Starting index
 * @param high - Ending index
 * @returns The final index of the pivot element
 */
function partition<T>(
  array: T[],
  compareFn: CompareFn<T>,
  low: number,
  high: number
): number {
  const pivot = array[high]!;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (compareFn(array[j]!, pivot) < 0) {
      i++;
      swap(array, i, j);
    }
  }

  swap(array, i + 1, high);
  return i + 1;
}
