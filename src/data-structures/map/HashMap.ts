import { LinkedList } from '../linked-list/LinkedList';
import { nextPrime } from '../../utils/utils';

const DEFAULT_CAPACITY = 19;
const DEFAULT_LOAD_FACTOR = 0.75;
const FNV_OFFSET_BASIS = 2166136261;
const FNV_PRIME = 16777619;

/**
 * Entry stored in the hash map bucket
 */
interface HashMapEntry<K, V> {
  key: K;
  value: V;
  order: number;
}

/**
 * HashMap - A hash table implementation with separate chaining for collision resolution.
 * Maintains insertion order and automatically rehashes when load factor is exceeded.
 * Uses FNV-1a hash function for string keys.
 *
 * @template K - The type of keys (must be convertible to string)
 * @template V - The type of values
 * @category Data Structures
 */
export class HashMap<K, V> implements Iterable<[K, V]> {
  private buckets: (LinkedList<HashMapEntry<K, V>> | undefined)[];
  private initialCapacity: number;
  private loadFactor: number;
  private keysTrackerArray: (K | undefined)[];
  private keysTrackerIndex: number;

  /**
   * The number of key-value pairs in the map
   */
  public size: number;

  /**
   * The number of hash collisions
   */
  public collisions: number;

  /**
   * Creates a new HashMap
   *
   * @param iterable - Optional iterable of [key, value] pairs
   * @param initialCapacity - Initial capacity (default: 19, a prime number)
   * @param loadFactor - Load factor threshold for rehashing (default: 0.75)
   * @example
   * ```typescript
   * const map = new HashMap<string, number>();
   * map.set('one', 1).set('two', 2);
   *
   * const map2 = new HashMap([['a', 1], ['b', 2]]);
   * ```
   */
  constructor(
    iterable?: Iterable<[K, V]> | null,
    initialCapacity: number = DEFAULT_CAPACITY,
    loadFactor: number = DEFAULT_LOAD_FACTOR
  ) {
    this.initialCapacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(initialCapacity);
    this.size = 0;
    this.collisions = 0;
    this.keysTrackerArray = [];
    this.keysTrackerIndex = 0;

    if (iterable) {
      for (const [key, value] of iterable) {
        this.set(key, value);
      }
    }
  }

  /**
   * FNV-1a hash function for generating hash codes.
   * Time complexity: O(k) where k is key length
   *
   * @param key - The key to hash
   * @returns Hash code as an index into the buckets array
   */
  private hash(key: K): number {
    const str = String(key);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);

    let hash = FNV_OFFSET_BASIS;

    for (const byte of bytes) {
      hash ^= byte;
      hash = Math.imul(hash, FNV_PRIME);
    }

    return (hash >>> 0) % this.buckets.length;
  }

  /**
   * Gets the bucket and entry for a given key.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param key - The key to look up
   * @returns Object containing the bucket and entry (if found)
   */
  private getEntry(key: K): {
    bucket: LinkedList<HashMapEntry<K, V>>;
    entry?: HashMapEntry<K, V>;
  } {
    const index = this.hash(key);
    this.buckets[index] = this.buckets[index] || new LinkedList<HashMapEntry<K, V>>();
    const bucket = this.buckets[index]!;

    const entry = bucket.find((node) => node.key === key);

    return { bucket, entry };
  }

  /**
   * Sets a key-value pair in the map.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The map instance for chaining
   */
  set(key: K, value: V): this {
    const { bucket, entry } = this.getEntry(key);

    if (!entry) {
      bucket.push({ key, value, order: this.keysTrackerIndex });
      this.keysTrackerArray[this.keysTrackerIndex] = key;
      this.keysTrackerIndex++;
      this.size++;
      if (bucket.size > 1) this.collisions++;
      if (this.isBeyondLoadFactor()) this.rehash();
    } else {
      entry.value = value;
    }

    return this;
  }

  /**
   * Gets the value associated with a key.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param key - The key to look up
   * @returns The value, or undefined if not found
   */
  get(key: K): V | undefined {
    const { entry } = this.getEntry(key);
    return entry ? entry.value : undefined;
  }

  /**
   * Checks if a key exists in the map.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param key - The key to check
   * @returns True if the key exists
   */
  has(key: K): boolean {
    const { entry } = this.getEntry(key);
    return entry !== undefined;
  }

  /**
   * Deletes a key-value pair from the map.
   * Time complexity: O(1) average, O(n) worst case
   *
   * @param key - The key to delete
   * @returns True if the key was deleted, false if not found
   */
  delete(key: K): boolean {
    const { bucket, entry } = this.getEntry(key);
    if (!entry) return false;

    const index = bucket.indexOf(entry);
    bucket.remove(index);
    this.keysTrackerArray[entry.order] = undefined;
    this.size--;
    return true;
  }

  /**
   * Gets the current load factor (size / capacity).
   * Time complexity: O(1)
   *
   * @returns The load factor
   */
  getLoadFactor(): number {
    return this.size / this.buckets.length;
  }

  /**
   * Checks if the map needs rehashing.
   * Time complexity: O(1)
   *
   * @returns True if load factor exceeds threshold
   */
  private isBeyondLoadFactor(): boolean {
    return this.getLoadFactor() > this.loadFactor;
  }

  /**
   * Rehashes the map to a larger capacity to reduce collisions.
   * Time complexity: O(n)
   *
   * @param newBucketSize - Optional new bucket size (default: 2x current)
   */
  private rehash(newBucketSize?: number): void {
    const targetSize = newBucketSize || Math.max(this.size, this.buckets.length) * 2;
    const newCapacity = nextPrime(targetSize);
    const newMap = new HashMap<K, V>(this, newCapacity, this.loadFactor);

    const newArrayKeys = Array.from(newMap.keys());

    this.buckets = newMap.buckets;
    this.size = newMap.size;
    this.collisions = newMap.collisions;
    this.keysTrackerArray = newArrayKeys.map((key) => key);
    this.keysTrackerIndex = newArrayKeys.length;
  }

  /**
   * Returns an iterator of all keys in insertion order.
   * Time complexity: O(n)
   *
   * @yields Keys in insertion order
   */
  *keys(): Generator<K, void, unknown> {
    for (let index = 0; index < this.keysTrackerArray.length; index++) {
      const key = this.keysTrackerArray[index];
      if (key !== undefined) {
        yield key;
      }
    }
  }

  /**
   * Returns an iterator of all values in insertion order.
   * Time complexity: O(n)
   *
   * @yields Values in insertion order
   */
  *values(): Generator<V, void, unknown> {
    for (const key of this.keys()) {
      const value = this.get(key);
      if (value !== undefined) {
        yield value;
      }
    }
  }

  /**
   * Returns an iterator of [key, value] pairs in insertion order.
   * Time complexity: O(n)
   *
   * @yields [key, value] pairs in insertion order
   */
  *entries(): Generator<[K, V], void, unknown> {
    for (const key of this.keys()) {
      const value = this.get(key);
      if (value !== undefined) {
        yield [key, value];
      }
    }
  }

  /**
   * Returns an iterator of [key, value] pairs.
   *
   * @yields [key, value] pairs
   */
  *[Symbol.iterator](): Generator<[K, V], void, unknown> {
    yield* this.entries();
  }

  /**
   * Calls a function for each key-value pair in insertion order.
   * Time complexity: O(n)
   *
   * @param callback - Function to call for each entry
   */
  forEach(callback: (value: V, key: K, map: this) => void): void {
    for (const [key, value] of this.entries()) {
      callback(value, key, this);
    }
  }

  /**
   * Removes all entries from the map.
   * Time complexity: O(1)
   */
  clear(): void {
    this.buckets = new Array(this.initialCapacity);
    this.size = 0;
    this.collisions = 0;
    this.keysTrackerArray = [];
    this.keysTrackerIndex = 0;
  }

  /**
   * Gets the number of key-value pairs in the map.
   * Alias for size property.
   * Time complexity: O(1)
   *
   * @returns The number of entries
   */
  get length(): number {
    return this.size;
  }
}
