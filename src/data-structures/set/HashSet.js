const HashMap = require('../map/HashMap');

/**
 * HashSet
 */
class HashSet {
  /**
   * @param {*} [iterable] - Iterable to populate the list.
   */
  constructor(iterable = null) {
    this.hashMap = new HashMap();

    if (iterable) Array.from(iterable, value => this.add(value));
  }

  /**
   * @param {*} value
   */
  add(value) {
    this.hashMap.set(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  has(value) {
    return this.hashMap.has(value);
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  delete(value) {
    return this.hashMap.delete(value);
  }

  * [Symbol.iterator]() {
    yield* this.hashMap.keys();
  }

  /**
   * Values for each element in the hash set in insertion order.
   * @returns {*}
   */
  * values() {
    yield* this;
  }

  /**
   * Contains [key, key] pairs for each element in the hash set in insertion order.
   * @returns {array}
   */
  * entries() {
    for (const value of this) {
      yield [value, value];
    }
  }

  /**
   * @returns {integer}
   */
  get size() {
    return this.hashMap.size;
  }

  /**
   * Removes all values from the hash set.
   */
  clear() {
    this.hashMap.clear();
  }
}

module.exports = HashSet;
