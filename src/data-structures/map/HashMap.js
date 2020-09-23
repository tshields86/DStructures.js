const { TextEncoder } = require('util');
const LinkedList = require('../linked-list/LinkedList');
const { nextPrime } = require('../../utils/utils');

const DEFAULT_CAPACITY = 19;
const DEFAULT_LOAD_SIZE = 0.75;
const FNV_OFFSET_BASIS = 2166136261;
const FNV_PRIME = 16777619;

/**
 * HashMap
 */
class HashMap {
  /**
   * @param {number} [initialCapacity] - Initial capacity of the hash map.
   * @param {number} [loadFactor] - Load factor of the hash map.
   */
  constructor(initialCapacity = DEFAULT_CAPACITY, loadFactor = DEFAULT_LOAD_SIZE) {
    this.initialCapacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.encoder = new TextEncoder();
    this.reset();
  }

  /**
   * Reset or reinitialize all values on the hashmap.
   * Used for rehashing, clear and initializing the map.
   *
   * @param {array} [buckets]
   * @param {number} [size]
   * @param {number} [collisions]
   * @param {array} [keysTrackerArray]
   * @param {number} [keysTrackerIndex]
   */
  reset(
    buckets = new Array(this.initialCapacity),
    size = 0,
    collisions = 0,
    keysTrackerArray = [],
    keysTrackerIndex = 0,
  ) {
    this.buckets = buckets;
    this.size = size;
    this.collisions = collisions;
    this.keysTrackerArray = keysTrackerArray;
    this.keysTrackerIndex = keysTrackerIndex;
  }

  /**
   * Fowler–Noll–Vo FVN-1a non-cryptographic hash function.
   * @param {*} key
   * @return {number}
   */
  hash(key) {
    const bytes = this.encoder.encode(key);

    let hash = FNV_OFFSET_BASIS;

    for (const byte of bytes) {
      hash ^= byte;
      hash *= FNV_PRIME;
    }

    return (hash >>> 0) % this.buckets.length;
  }

  /**
   * @param {*} key
   * @return {HashMap}
   */
  getEntry(key) {
    const index = this.hash(key);
    this.buckets[index] = this.buckets[index] || new LinkedList();
    const bucket = this.buckets[index];

    const entry = bucket.find(node => {
      if (key !== node.key) return null;
      return node;
    });

    return { bucket, entry };
  }

  /**
   * @param {*} key
   * @param {*} value
   * @return {HashMap}
   */
  set(key, value) {
    const { bucket, entry } = this.getEntry(key);

    if (!entry) {
      bucket.push({ key, value, order: this.keysTrackerIndex });
      this.keysTrackerArray[this.keysTrackerIndex] = key;
      this.keysTrackerIndex += 1;
      this.size += 1;
      if (bucket.size > 1) this.collisions += 1;
      if (this.isBeyondloadFactor()) this.rehash();
    } else {
      entry.value = value;
    }
    return this;
  }

  /**
   * @param {*} key
   * @return {*}
   */
  get(key) {
    const { entry } = this.getEntry(key);
    return entry ? entry.value : undefined;
  }

  /**
   * @param {*} key
   * @return {boolean}
   */
  has(key) {
    const { entry } = this.getEntry(key);
    return entry !== undefined;
  }

  /**
   * @param {*} key
   * @return {boolean}
   */
  delete(key) {
    const { bucket, entry } = this.getEntry(key);
    if (!entry) return false;

    const index = bucket.indexOf(entry);
    bucket.remove(index);
    delete this.keysTrackerArray[entry.order];
    this.size -= 1;
    return true;
  }

  /**
   * Load factor - how full the has map is.
   * @returns {number}
   */
  getLoadFactor() {
    return this.size / this.buckets.length;
  }

  /**
   * Check if a rehash is due
   * @returns {boolean}
   */
  isBeyondloadFactor() {
    return this.getLoadFactor() > this.loadFactor;
  }

  /**
   * Creates a new hash map with a higher prime
   * capacity to avoid collisions.
   * @param {integer} newBucketSize
   */
  rehash(newBucketSize = Math.max(this.size, this.buckets.length) * 2) {
    const newCapacity = nextPrime(newBucketSize);
    const newMap = new HashMap(newCapacity);

    for (const key of this.keys()) {
      newMap.set(key, this.get(key));
    }

    const newArrayKeys = [...newMap.keys()];

    this.reset(
      newMap.buckets,
      newMap.size,
      newMap.collisions,
      newArrayKeys,
      newArrayKeys.length,
    );
  }

  /**
   * Keys for each element in the hash map in insertion order.
   * @returns {*}
   */
  * keys() {
    for (let index = 0; index < this.keysTrackerArray.length; index++) {
      const key = this.keysTrackerArray[index];
      if (key !== undefined) {
        yield key;
      }
    }
  }

  /**
   * Values for each element in the hash map in insertion order.
   * @returns {*}
   */
  * values() {
    for (const key of this.keys()) {
      yield this.get(key);
    }
  }

  /**
   * Contains the [key, value] pairs for each element in the hash map in insertion order.
   * @returns {array}
   */
  * entries() {
    for (const key of this.keys()) {
      yield [key, this.get(key)];
    }
  }

  * [Symbol.iterator]() {
    yield* this.entries();
  }

  /**
   * @returns {integer}
   */
  get length() {
    return this.size;
  }

  /**
   * Removes all entries from the hash map.
   */
  clear() {
    this.reset();
  }
}

module.exports = HashMap;
