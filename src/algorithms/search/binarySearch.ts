import type { CompareFn } from '../../utils/utils';

/**
 * Binary Search - Searches for a target value in a sorted array using binary search algorithm.
 * Time complexity: O(log n)
 * Space complexity: O(1)
 *
 * @template T - The type of elements in the array
 * @param array - The sorted array to search in
 * @param target - The value to search for
 * @param compareFn - Optional comparison function (default: numeric comparison)
 * @returns The index of the target if found, -1 otherwise
 * @category Algorithms
 * @example
 * ```typescript
 * const arr = [1, 3, 5, 7, 9, 11, 13];
 * const index = binarySearch(arr, 7);
 * console.log(index); // 3
 *
 * const notFound = binarySearch(arr, 6);
 * console.log(notFound); // -1
 * ```
 */
export function binarySearch<T>(
  array: T[],
  target: T,
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)
): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(array[mid]!, target);

    if (comparison === 0) {
      return mid;
    } else if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/**
 * Recursive Binary Search - Searches for a target value using recursion.
 * Time complexity: O(log n)
 * Space complexity: O(log n) due to recursion stack
 *
 * @template T - The type of elements in the array
 * @param array - The sorted array to search in
 * @param target - The value to search for
 * @param compareFn - Optional comparison function (default: numeric comparison)
 * @param left - Starting index (used internally for recursion)
 * @param right - Ending index (used internally for recursion)
 * @returns The index of the target if found, -1 otherwise
 * @category Algorithms
 */
export function binarySearchRecursive<T>(
  array: T[],
  target: T,
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number),
  left: number = 0,
  right: number = array.length - 1
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);
  const comparison = compareFn(array[mid]!, target);

  if (comparison === 0) {
    return mid;
  } else if (comparison < 0) {
    return binarySearchRecursive(array, target, compareFn, mid + 1, right);
  } else {
    return binarySearchRecursive(array, target, compareFn, left, mid - 1);
  }
}
