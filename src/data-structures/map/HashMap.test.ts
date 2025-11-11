import { describe, it, expect, beforeEach } from 'vitest';
import { HashMap } from './HashMap';

describe('HashMap', () => {
  let map: HashMap<string, number>;

  beforeEach(() => {
    map = new HashMap<string, number>();
  });

  it('should create empty map', () => {
    expect(map.size).toBe(0);
    expect(map.length).toBe(0);
  });

  it('should create map from iterable', () => {
    const map2 = new HashMap([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(map2.size).toBe(3);
    expect(map2.get('a')).toBe(1);
  });

  describe('#set', () => {
    it('should add key-value pairs', () => {
      map.set('one', 1);
      expect(map.size).toBe(1);
      expect(map.get('one')).toBe(1);

      map.set('two', 2).set('three', 3);
      expect(map.size).toBe(3);
    });

    it('should update existing keys', () => {
      map.set('key', 1);
      expect(map.get('key')).toBe(1);

      map.set('key', 2);
      expect(map.get('key')).toBe(2);
      expect(map.size).toBe(1); // Size unchanged
    });

    it('should handle many insertions with rehashing', () => {
      for (let i = 0; i < 100; i++) {
        map.set(`key${i}`, i);
      }
      expect(map.size).toBe(100);
      expect(map.get('key50')).toBe(50);
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      map.set('a', 1).set('b', 2).set('c', 3);
    });

    it('should return value for existing keys', () => {
      expect(map.get('a')).toBe(1);
      expect(map.get('b')).toBe(2);
      expect(map.get('c')).toBe(3);
    });

    it('should return undefined for non-existent keys', () => {
      expect(map.get('d')).toBeUndefined();
      expect(map.get('notfound')).toBeUndefined();
    });
  });

  describe('#has', () => {
    beforeEach(() => {
      map.set('a', 1).set('b', 2);
    });

    it('should return true for existing keys', () => {
      expect(map.has('a')).toBe(true);
      expect(map.has('b')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(map.has('c')).toBe(false);
      expect(map.has('notfound')).toBe(false);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      map.set('a', 1).set('b', 2).set('c', 3);
    });

    it('should delete existing keys', () => {
      expect(map.delete('b')).toBe(true);
      expect(map.size).toBe(2);
      expect(map.has('b')).toBe(false);
      expect(map.get('b')).toBeUndefined();
    });

    it('should return false for non-existent keys', () => {
      expect(map.delete('notfound')).toBe(false);
      expect(map.size).toBe(3); // Size unchanged
    });
  });

  describe('#clear', () => {
    it('should remove all entries', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      expect(map.size).toBe(3);

      map.clear();
      expect(map.size).toBe(0);
      expect(map.has('a')).toBe(false);
    });
  });

  describe('#keys', () => {
    it('should return keys in insertion order', () => {
      map.set('first', 1).set('second', 2).set('third', 3);
      const keys = Array.from(map.keys());
      expect(keys).toEqual(['first', 'second', 'third']);
    });

    it('should skip deleted keys', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      map.delete('b');
      const keys = Array.from(map.keys());
      expect(keys).toEqual(['a', 'c']);
    });
  });

  describe('#values', () => {
    it('should return values in insertion order', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      const values = Array.from(map.values());
      expect(values).toEqual([1, 2, 3]);
    });
  });

  describe('#entries', () => {
    it('should return [key, value] pairs in insertion order', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      const entries = Array.from(map.entries());
      expect(entries).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });
  });

  describe('Iterator', () => {
    it('should be iterable with for...of', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      const entries: [string, number][] = [];
      for (const [key, value] of map) {
        entries.push([key, value]);
      }
      expect(entries).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('should work with spread operator', () => {
      map.set('a', 1).set('b', 2);
      expect([...map]).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });
  });

  describe('#forEach', () => {
    it('should call callback for each entry', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      const entries: [string, number][] = [];
      map.forEach((value, key) => {
        entries.push([key, value]);
      });
      expect(entries).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });
  });

  describe('#getLoadFactor', () => {
    it('should return current load factor', () => {
      expect(map.getLoadFactor()).toBe(0);

      map.set('a', 1);
      expect(map.getLoadFactor()).toBeGreaterThan(0);
      expect(map.getLoadFactor()).toBeLessThan(1);
    });
  });

  describe('Collision handling', () => {
    it('should handle hash collisions', () => {
      // Add enough items to cause collisions
      for (let i = 0; i < 50; i++) {
        map.set(`key${i}`, i);
      }

      // All values should be retrievable despite collisions
      for (let i = 0; i < 50; i++) {
        expect(map.get(`key${i}`)).toBe(i);
      }

      expect(map.collisions).toBeGreaterThan(0);
    });
  });

  describe('Rehashing', () => {
    it('should rehash when load factor is exceeded', () => {
      const initialLoadFactor = map.getLoadFactor();

      // Add many items to trigger rehash
      for (let i = 0; i < 100; i++) {
        map.set(`key${i}`, i);
      }

      // Should have rehashed to maintain reasonable load factor
      expect(map.getLoadFactor()).toBeLessThan(0.8);

      // All items should still be accessible
      expect(map.get('key50')).toBe(50);
      expect(map.size).toBe(100);
    });
  });

  describe('Type safety', () => {
    it('should work with number keys', () => {
      const numMap = new HashMap<number, string>();
      numMap.set(1, 'one').set(2, 'two').set(3, 'three');
      expect(numMap.get(2)).toBe('two');
    });

    it('should work with complex objects as values', () => {
      interface User {
        name: string;
        age: number;
      }

      const userMap = new HashMap<string, User>();
      userMap.set('alice', { name: 'Alice', age: 30 });
      userMap.set('bob', { name: 'Bob', age: 25 });

      expect(userMap.get('alice')?.name).toBe('Alice');
      expect(userMap.get('bob')?.age).toBe(25);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string key', () => {
      map.set('', 0);
      expect(map.get('')).toBe(0);
      expect(map.has('')).toBe(true);
    });

    it('should maintain insertion order after updates', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      map.set('b', 20); // Update existing key
      const keys = Array.from(map.keys());
      expect(keys).toEqual(['a', 'b', 'c']);
    });

    it('should handle repeated set/delete operations', () => {
      map.set('key', 1);
      map.delete('key');
      map.set('key', 2);
      expect(map.get('key')).toBe(2);
      expect(map.size).toBe(1);
    });

    it('should handle undefined values', () => {
      const undefinedMap = new HashMap<string, number | undefined>();
      undefinedMap.set('key', undefined);
      expect(undefinedMap.has('key')).toBe(true);
      expect(undefinedMap.get('key')).toBeUndefined();
      expect(undefinedMap.size).toBe(1);
    });

    it('should handle null values', () => {
      const nullMap = new HashMap<string, number | null>();
      nullMap.set('key', null);
      expect(nullMap.has('key')).toBe(true);
      expect(nullMap.get('key')).toBeNull();
      expect(nullMap.size).toBe(1);
    });

    it('should handle very long string keys', () => {
      const longKey = 'a'.repeat(10000);
      map.set(longKey, 999);
      expect(map.get(longKey)).toBe(999);
      expect(map.has(longKey)).toBe(true);
    });

    it('should handle special character keys', () => {
      const specialKeys = ['@#$%', '!@#$%^&*()', '\n\t', '   ', '🔥💯✨'];
      specialKeys.forEach((key, index) => {
        map.set(key, index);
      });
      specialKeys.forEach((key, index) => {
        expect(map.get(key)).toBe(index);
      });
    });

    it('should handle numeric string keys vs number keys', () => {
      const mixedMap = new HashMap<string | number, string>();
      mixedMap.set('1', 'string-one');
      mixedMap.set(1, 'number-one');
      expect(mixedMap.size).toBe(2);
      expect(mixedMap.get('1')).toBe('string-one');
      expect(mixedMap.get(1)).toBe('number-one');
    });

    it('should work correctly after clearing and re-adding', () => {
      map.set('a', 1).set('b', 2).set('c', 3);
      map.clear();
      expect(map.size).toBe(0);
      map.set('x', 10).set('y', 20);
      expect(map.size).toBe(2);
      expect(map.get('x')).toBe(10);
      expect(map.get('a')).toBeUndefined();
    });

    it('should handle zero as value', () => {
      map.set('zero', 0);
      expect(map.has('zero')).toBe(true);
      expect(map.get('zero')).toBe(0);
    });

    it('should handle false as value', () => {
      const boolMap = new HashMap<string, boolean>();
      boolMap.set('false', false);
      expect(boolMap.has('false')).toBe(true);
      expect(boolMap.get('false')).toBe(false);
    });
  });
});
