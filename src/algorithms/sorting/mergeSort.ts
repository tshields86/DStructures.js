import type { CompareFn } from '../../utils/utils';

/**
 * Merge Sort - A divide-and-conquer algorithm that divides the array into halves,
 * recursively sorts them, and then merges the sorted halves.
 * Time complexity: O(n log n) for all cases
 * Space complexity: O(n)
 *
 * @template T - The type of elements in the array
 * @param array - The array to sort (sorted in place)
 * @param compareFn - Optional comparison function (default: ascending numeric sort)
 * @returns The sorted array
 * @category Algorithms
 * @example
 * ```typescript
 * const arr = [5, 2, 8, 1, 9];
 * mergeSort(arr);
 * console.log(arr); // [1, 2, 5, 8, 9]
 * ```
 */
export function mergeSort<T>(
  array: T[],
  compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)
): T[] {
  if (array.length <= 1) return array;

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const sortedLeft = mergeSort(left, compareFn);
  const sortedRight = mergeSort(right, compareFn);

  return merge(sortedLeft, sortedRight, compareFn);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * Time complexity: O(n + m) where n and m are the lengths of the arrays
 *
 * @template T - The type of elements in the arrays
 * @param left - The first sorted array
 * @param right - The second sorted array
 * @param compareFn - Comparison function
 * @returns The merged sorted array
 */
function merge<T>(left: T[], right: T[], compareFn: CompareFn<T>): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex]!, right[rightIndex]!) <= 0) {
      result.push(left[leftIndex]!);
      leftIndex++;
    } else {
      result.push(right[rightIndex]!);
      rightIndex++;
    }
  }

  // Add remaining elements from left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex]!);
    leftIndex++;
  }

  // Add remaining elements from right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex]!);
    rightIndex++;
  }

  return result;
}
