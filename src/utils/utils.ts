/**
 * Swaps two elements in an array.
 * Time complexity: O(1)
 *
 * @template T - The type of elements in the array
 * @param array - The array containing elements to swap
 * @param i - Index of first element
 * @param j - Index of second element
 */
export function swap<T>(array: T[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

/**
 * Type for comparison functions.
 * Returns negative if a < b, positive if a > b, zero if equal.
 */
export type CompareFn<T> = (a: T, b: T) => number;
