import { HashMap } from '../map/HashMap';

/**
 * HashSet - A set implementation using HashMap internally.
 * Stores unique values with O(1) average time complexity for add/has/delete.
 *
 * @template T - The type of values stored in the set
 * @category Data Structures
 */
export class HashSet<T> implements Iterable<T> {
  private map: HashMap<T, boolean>;

  /**
   * Creates a new HashSet
   *
   * @param iterable - Optional iterable of values to initialize the set
   * @example
   * ```typescript
   * const set = new HashSet<string>();
   * set.add('apple').add('banana');
   *
   * const set2 = new HashSet(['a', 'b', 'c']);
   * ```
   */
  constructor(iterable?: Iterable<T> | null) {
    this.map = new HashMap<T, boolean>();
    if (iterable) {
      for (const value of iterable) {
        this.add(value);
      }
    }
  }

  /**
   * Adds a value to the set.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param value - The value to add
   * @returns The set instance for chaining
   */
  add(value: T): this {
    this.map.set(value, true);
    return this;
  }

  /**
   * Checks if a value exists in the set.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param value - The value to check for
   * @returns True if the value exists
   */
  has(value: T): boolean {
    return this.map.has(value);
  }

  /**
   * Deletes a value from the set.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param value - The value to delete
   * @returns True if the value was deleted, false if not found
   */
  delete(value: T): boolean {
    return this.map.delete(value);
  }

  /**
   * Removes all values from the set.
   * Time complexity: O(1)
   */
  clear(): void {
    this.map.clear();
  }

  /**
   * Returns an iterator of all values in insertion order.
   * Time complexity: O(n)
   *
   * @yields Values in insertion order
   */
  *values(): Generator<T, void, unknown> {
    yield* this.map.keys();
  }

  /**
   * Returns an iterator of all values (alias for values()).
   * Time complexity: O(n)
   *
   * @yields Values in insertion order
   */
  *keys(): Generator<T, void, unknown> {
    yield* this.values();
  }

  /**
   * Returns an iterator of [value, value] pairs for Set compatibility.
   * Time complexity: O(n)
   *
   * @yields [value, value] pairs in insertion order
   */
  *entries(): Generator<[T, T], void, unknown> {
    for (const value of this.values()) {
      yield [value, value];
    }
  }

  /**
   * Returns an iterator of all values.
   *
   * @yields Values in insertion order
   */
  *[Symbol.iterator](): Generator<T, void, unknown> {
    yield* this.values();
  }

  /**
   * Calls a function for each value in insertion order.
   * Time complexity: O(n)
   *
   * @param callback - Function to call for each value
   */
  forEach(callback: (value: T, value2: T, set: this) => void): void {
    for (const value of this.values()) {
      callback(value, value, this);
    }
  }

  /**
   * Gets the number of values in the set.
   * Time complexity: O(1)
   *
   * @returns The number of values
   */
  get size(): number {
    return this.map.size;
  }

  /**
   * Gets the number of values in the set (alias for size).
   * Time complexity: O(1)
   *
   * @returns The number of values
   */
  get length(): number {
    return this.size;
  }

  /**
   * Returns an array of all values.
   * Time complexity: O(n)
   *
   * @returns Array of all values
   */
  toArray(): T[] {
    return Array.from(this.values());
  }

  /**
   * Returns the union of this set with another set.
   * Time complexity: O(n + m) where n and m are the sizes of the sets
   *
   * @param other - The other set
   * @returns A new set containing all values from both sets
   */
  union(other: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>(this);
    for (const value of other) {
      result.add(value);
    }
    return result;
  }

  /**
   * Returns the intersection of this set with another set.
   * Time complexity: O(min(n, m)) where n and m are the sizes of the sets
   *
   * @param other - The other set
   * @returns A new set containing only values present in both sets
   */
  intersection(other: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();
    const smaller = this.size <= other.size ? this : other;
    const larger = this.size > other.size ? this : other;

    for (const value of smaller) {
      if (larger.has(value)) {
        result.add(value);
      }
    }
    return result;
  }

  /**
   * Returns the difference of this set with another set (values in this but not in other).
   * Time complexity: O(n) where n is the size of this set
   *
   * @param other - The other set
   * @returns A new set containing values in this set but not in other
   */
  difference(other: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();
    for (const value of this) {
      if (!other.has(value)) {
        result.add(value);
      }
    }
    return result;
  }

  /**
   * Returns the symmetric difference of this set with another set.
   * (values in either set but not in both)
   * Time complexity: O(n + m) where n and m are the sizes of the sets
   *
   * @param other - The other set
   * @returns A new set containing values in either set but not both
   */
  symmetricDifference(other: HashSet<T>): HashSet<T> {
    const result = new HashSet<T>();

    for (const value of this) {
      if (!other.has(value)) {
        result.add(value);
      }
    }

    for (const value of other) {
      if (!this.has(value)) {
        result.add(value);
      }
    }

    return result;
  }

  /**
   * Checks if this set is a subset of another set.
   * Time complexity: O(n) where n is the size of this set
   *
   * @param other - The other set
   * @returns True if all values in this set are in the other set
   */
  isSubsetOf(other: HashSet<T>): boolean {
    if (this.size > other.size) return false;

    for (const value of this) {
      if (!other.has(value)) return false;
    }

    return true;
  }

  /**
   * Checks if this set is a superset of another set.
   * Time complexity: O(m) where m is the size of the other set
   *
   * @param other - The other set
   * @returns True if all values in the other set are in this set
   */
  isSupersetOf(other: HashSet<T>): boolean {
    return other.isSubsetOf(this);
  }

  /**
   * Checks if this set is disjoint with another set (no common values).
   * Time complexity: O(min(n, m)) where n and m are the sizes of the sets
   *
   * @param other - The other set
   * @returns True if the sets have no values in common
   */
  isDisjointFrom(other: HashSet<T>): boolean {
    const smaller = this.size <= other.size ? this : other;
    const larger = this.size > other.size ? this : other;

    for (const value of smaller) {
      if (larger.has(value)) return false;
    }

    return true;
  }
}
