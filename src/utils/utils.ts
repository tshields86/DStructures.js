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
  const temp = array[i]!;
  array[i] = array[j]!;
  array[j] = temp;
}

/**
 * Checks if a number is odd.
 * Time complexity: O(1)
 *
 * @param number - The number to check
 * @returns True if the number is odd
 */
export function isOdd(number: number): boolean {
  return number % 2 !== 0;
}

/**
 * Checks if a number is prime.
 * Time complexity: O(√n)
 *
 * @param number - The number to check
 * @returns True if the number is prime
 */
export function isPrime(number: number): boolean {
  if (number < 2) return false;

  const max = Math.sqrt(number);
  for (let divisor = 2; divisor <= max; divisor++) {
    if (number % divisor === 0) return false;
  }

  return true;
}

/**
 * Finds the next prime number greater than the given number.
 * Time complexity: O(n √n) in worst case
 *
 * @param number - The number to start from
 * @returns The next prime number
 */
export function nextPrime(number: number): number {
  if (number < 2) return 2;

  let possiblePrime = isOdd(number) ? number + 2 : number + 1;

  while (!isPrime(possiblePrime)) {
    possiblePrime += 2;
  }

  return possiblePrime;
}

/**
 * Type for comparison functions.
 * Returns negative if a < b, positive if a > b, zero if equal.
 */
export type CompareFn<T> = (a: T, b: T) => number;
