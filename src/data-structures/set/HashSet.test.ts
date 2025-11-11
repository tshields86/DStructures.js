import { describe, it, expect, beforeEach } from 'vitest';
import { HashSet } from './HashSet';

describe('HashSet', () => {
  let set: HashSet<string>;

  beforeEach(() => {
    set = new HashSet<string>();
  });

  it('should create empty set', () => {
    expect(set.size).toBe(0);
    expect(set.length).toBe(0);
  });

  it('should create set from iterable', () => {
    const set2 = new HashSet(['a', 'b', 'c']);
    expect(set2.size).toBe(3);
    expect(set2.has('a')).toBe(true);
    expect(set2.has('b')).toBe(true);
    expect(set2.has('c')).toBe(true);
  });

  describe('#add', () => {
    it('should add values', () => {
      set.add('one');
      expect(set.size).toBe(1);
      expect(set.has('one')).toBe(true);

      set.add('two').add('three');
      expect(set.size).toBe(3);
    });

    it('should not add duplicate values', () => {
      set.add('key');
      expect(set.size).toBe(1);

      set.add('key');
      expect(set.size).toBe(1); // Size unchanged
    });

    it('should handle many insertions', () => {
      for (let i = 0; i < 100; i++) {
        set.add(`value${i}`);
      }
      expect(set.size).toBe(100);
      expect(set.has('value50')).toBe(true);
    });
  });

  describe('#has', () => {
    beforeEach(() => {
      set.add('a').add('b').add('c');
    });

    it('should return true for existing values', () => {
      expect(set.has('a')).toBe(true);
      expect(set.has('b')).toBe(true);
      expect(set.has('c')).toBe(true);
    });

    it('should return false for non-existent values', () => {
      expect(set.has('d')).toBe(false);
      expect(set.has('notfound')).toBe(false);
    });
  });

  describe('#delete', () => {
    beforeEach(() => {
      set.add('a').add('b').add('c');
    });

    it('should delete existing values', () => {
      expect(set.delete('b')).toBe(true);
      expect(set.size).toBe(2);
      expect(set.has('b')).toBe(false);
    });

    it('should return false for non-existent values', () => {
      expect(set.delete('notfound')).toBe(false);
      expect(set.size).toBe(3); // Size unchanged
    });
  });

  describe('#clear', () => {
    it('should remove all values', () => {
      set.add('a').add('b').add('c');
      expect(set.size).toBe(3);

      set.clear();
      expect(set.size).toBe(0);
      expect(set.has('a')).toBe(false);
    });
  });

  describe('#values', () => {
    it('should return values in insertion order', () => {
      set.add('first').add('second').add('third');
      const values = Array.from(set.values());
      expect(values).toEqual(['first', 'second', 'third']);
    });

    it('should skip deleted values', () => {
      set.add('a').add('b').add('c');
      set.delete('b');
      const values = Array.from(set.values());
      expect(values).toEqual(['a', 'c']);
    });
  });

  describe('#keys', () => {
    it('should return values (alias for values)', () => {
      set.add('a').add('b').add('c');
      const keys = Array.from(set.keys());
      expect(keys).toEqual(['a', 'b', 'c']);
    });
  });

  describe('#entries', () => {
    it('should return [value, value] pairs in insertion order', () => {
      set.add('a').add('b').add('c');
      const entries = Array.from(set.entries());
      expect(entries).toEqual([
        ['a', 'a'],
        ['b', 'b'],
        ['c', 'c'],
      ]);
    });
  });

  describe('Iterator', () => {
    it('should be iterable with for...of', () => {
      set.add('a').add('b').add('c');
      const values: string[] = [];
      for (const value of set) {
        values.push(value);
      }
      expect(values).toEqual(['a', 'b', 'c']);
    });

    it('should work with spread operator', () => {
      set.add('a').add('b');
      expect([...set]).toEqual(['a', 'b']);
    });
  });

  describe('#forEach', () => {
    it('should call callback for each value', () => {
      set.add('a').add('b').add('c');
      const values: string[] = [];
      set.forEach((value) => {
        values.push(value);
      });
      expect(values).toEqual(['a', 'b', 'c']);
    });
  });

  describe('#toArray', () => {
    it('should return array of all values', () => {
      set.add('a').add('b').add('c');
      const array = set.toArray();
      expect(array).toEqual(['a', 'b', 'c']);
    });

    it('should return empty array for empty set', () => {
      expect(set.toArray()).toEqual([]);
    });
  });

  describe('#union', () => {
    it('should return union of two sets', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['c', 'd', 'e']);
      const result = set.union(other);

      expect(result.size).toBe(5);
      expect([...result].sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('should not modify original sets', () => {
      set.add('a').add('b');
      const other = new HashSet(['c', 'd']);
      const result = set.union(other);

      expect(set.size).toBe(2);
      expect(other.size).toBe(2);
      expect(result.size).toBe(4);
    });
  });

  describe('#intersection', () => {
    it('should return intersection of two sets', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['b', 'c', 'd']);
      const result = set.intersection(other);

      expect(result.size).toBe(2);
      expect([...result].sort()).toEqual(['b', 'c']);
    });

    it('should return empty set for disjoint sets', () => {
      set.add('a').add('b');
      const other = new HashSet(['c', 'd']);
      const result = set.intersection(other);

      expect(result.size).toBe(0);
    });

    it('should work when first set is smaller', () => {
      set.add('a').add('b');
      const other = new HashSet(['b', 'c', 'd', 'e']);
      const result = set.intersection(other);

      expect(result.size).toBe(1);
      expect([...result]).toEqual(['b']);
    });
  });

  describe('#difference', () => {
    it('should return difference of two sets', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['b', 'c', 'd']);
      const result = set.difference(other);

      expect(result.size).toBe(1);
      expect([...result]).toEqual(['a']);
    });

    it('should return all values if sets are disjoint', () => {
      set.add('a').add('b');
      const other = new HashSet(['c', 'd']);
      const result = set.difference(other);

      expect(result.size).toBe(2);
      expect([...result].sort()).toEqual(['a', 'b']);
    });

    it('should return empty set if first is subset of second', () => {
      set.add('a').add('b');
      const other = new HashSet(['a', 'b', 'c']);
      const result = set.difference(other);

      expect(result.size).toBe(0);
    });
  });

  describe('#symmetricDifference', () => {
    it('should return symmetric difference of two sets', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['b', 'c', 'd', 'e']);
      const result = set.symmetricDifference(other);

      expect(result.size).toBe(3);
      expect([...result].sort()).toEqual(['a', 'd', 'e']);
    });

    it('should return union if sets are disjoint', () => {
      set.add('a').add('b');
      const other = new HashSet(['c', 'd']);
      const result = set.symmetricDifference(other);

      expect(result.size).toBe(4);
      expect([...result].sort()).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should return empty set if sets are equal', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['a', 'b', 'c']);
      const result = set.symmetricDifference(other);

      expect(result.size).toBe(0);
    });
  });

  describe('#isSubsetOf', () => {
    it('should return true when set is subset', () => {
      set.add('a').add('b');
      const other = new HashSet(['a', 'b', 'c', 'd']);

      expect(set.isSubsetOf(other)).toBe(true);
    });

    it('should return false when set is not subset', () => {
      set.add('a').add('b').add('e');
      const other = new HashSet(['a', 'b', 'c', 'd']);

      expect(set.isSubsetOf(other)).toBe(false);
    });

    it('should return true for equal sets', () => {
      set.add('a').add('b');
      const other = new HashSet(['a', 'b']);

      expect(set.isSubsetOf(other)).toBe(true);
    });

    it('should return true for empty set', () => {
      const other = new HashSet(['a', 'b']);

      expect(set.isSubsetOf(other)).toBe(true);
    });

    it('should return false when set is larger', () => {
      set.add('a').add('b').add('c').add('d');
      const other = new HashSet(['a', 'b']);

      expect(set.isSubsetOf(other)).toBe(false);
    });
  });

  describe('#isSupersetOf', () => {
    it('should return true when set is superset', () => {
      set.add('a').add('b').add('c').add('d');
      const other = new HashSet(['a', 'b']);

      expect(set.isSupersetOf(other)).toBe(true);
    });

    it('should return false when set is not superset', () => {
      set.add('a').add('b');
      const other = new HashSet(['a', 'b', 'e']);

      expect(set.isSupersetOf(other)).toBe(false);
    });

    it('should return true for equal sets', () => {
      set.add('a').add('b');
      const other = new HashSet(['a', 'b']);

      expect(set.isSupersetOf(other)).toBe(true);
    });

    it('should return true when other set is empty', () => {
      set.add('a').add('b');
      const other = new HashSet<string>();

      expect(set.isSupersetOf(other)).toBe(true);
    });
  });

  describe('#isDisjointFrom', () => {
    it('should return true for disjoint sets', () => {
      set.add('a').add('b');
      const other = new HashSet(['c', 'd']);

      expect(set.isDisjointFrom(other)).toBe(true);
    });

    it('should return false when sets overlap', () => {
      set.add('a').add('b').add('c');
      const other = new HashSet(['c', 'd']);

      expect(set.isDisjointFrom(other)).toBe(false);
    });

    it('should return true for empty sets', () => {
      const other = new HashSet<string>();

      expect(set.isDisjointFrom(other)).toBe(true);
    });

    it('should check smaller set first', () => {
      set.add('a').add('b').add('c').add('d').add('e');
      const other = new HashSet(['x', 'y']);

      expect(set.isDisjointFrom(other)).toBe(true);
    });
  });

  describe('Type safety', () => {
    it('should work with number values', () => {
      const numSet = new HashSet<number>();
      numSet.add(1).add(2).add(3);
      expect(numSet.has(2)).toBe(true);
      expect(numSet.size).toBe(3);
    });

    it('should work with complex objects as values', () => {
      interface User {
        id: number;
        name: string;
      }

      const userSet = new HashSet<User>();
      const alice = { id: 1, name: 'Alice' };
      const bob = { id: 2, name: 'Bob' };

      userSet.add(alice).add(bob);

      expect(userSet.has(alice)).toBe(true);
      expect(userSet.has(bob)).toBe(true);
      expect(userSet.size).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string value', () => {
      set.add('');
      expect(set.has('')).toBe(true);
      expect(set.size).toBe(1);
    });

    it('should maintain insertion order after updates', () => {
      set.add('a').add('b').add('c');
      set.add('b'); // Re-add existing value
      const values = Array.from(set.values());
      expect(values).toEqual(['a', 'b', 'c']);
    });

    it('should handle repeated add/delete operations', () => {
      set.add('key');
      set.delete('key');
      set.add('key');
      expect(set.has('key')).toBe(true);
      expect(set.size).toBe(1);
    });

    it('should handle very long string values', () => {
      const longValue = 'x'.repeat(10000);
      set.add(longValue);
      expect(set.has(longValue)).toBe(true);
      expect(set.size).toBe(1);
    });

    it('should handle special character values', () => {
      const specialValues = ['@#$%', '!@#$%^&*()', '\n\t', '   ', '🔥💯✨'];
      specialValues.forEach((value) => set.add(value));
      expect(set.size).toBe(specialValues.length);
      specialValues.forEach((value) => {
        expect(set.has(value)).toBe(true);
      });
    });

    it('should work correctly after clearing and re-adding', () => {
      set.add('a').add('b').add('c');
      set.clear();
      expect(set.size).toBe(0);
      set.add('x').add('y');
      expect(set.size).toBe(2);
      expect(set.has('x')).toBe(true);
      expect(set.has('a')).toBe(false);
    });

    it('should handle numeric zero', () => {
      const numSet = new HashSet<number>();
      numSet.add(0);
      expect(numSet.has(0)).toBe(true);
      expect(numSet.size).toBe(1);
    });

    it('should handle false boolean value', () => {
      const boolSet = new HashSet<boolean>();
      boolSet.add(false);
      expect(boolSet.has(false)).toBe(true);
      expect(boolSet.size).toBe(1);
    });

    it('should handle union with empty set', () => {
      set.add('a').add('b');
      const empty = new HashSet<string>();
      const result = set.union(empty);
      expect([...result].sort()).toEqual(['a', 'b']);
    });

    it('should handle intersection with empty set', () => {
      set.add('a').add('b');
      const empty = new HashSet<string>();
      const result = set.intersection(empty);
      expect(result.size).toBe(0);
    });

    it('should handle difference with empty set', () => {
      set.add('a').add('b');
      const empty = new HashSet<string>();
      const result = set.difference(empty);
      expect([...result].sort()).toEqual(['a', 'b']);
    });

    it('should handle symmetric difference with empty set', () => {
      set.add('a').add('b');
      const empty = new HashSet<string>();
      const result = set.symmetricDifference(empty);
      expect([...result].sort()).toEqual(['a', 'b']);
    });

    it('should handle whitespace-only strings', () => {
      set.add('   ').add('\t\t').add('\n\n');
      expect(set.size).toBe(3);
      expect(set.has('   ')).toBe(true);
    });

    it('should handle large number of elements', () => {
      for (let i = 0; i < 1000; i++) {
        set.add(`item${i}`);
      }
      expect(set.size).toBe(1000);
      expect(set.has('item500')).toBe(true);
      expect(set.has('item999')).toBe(true);
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle unique tag collection', () => {
      const tags = new HashSet<string>();
      const articles = [
        { title: 'Article 1', tags: ['js', 'ts', 'web'] },
        { title: 'Article 2', tags: ['ts', 'node', 'api'] },
        { title: 'Article 3', tags: ['js', 'web', 'css'] },
      ];

      articles.forEach((article) => {
        article.tags.forEach((tag) => tags.add(tag));
      });

      expect(tags.size).toBe(6);
      expect(tags.has('js')).toBe(true);
      expect(tags.has('ts')).toBe(true);
      expect(tags.has('web')).toBe(true);
      expect(tags.has('node')).toBe(true);
      expect(tags.has('api')).toBe(true);
      expect(tags.has('css')).toBe(true);
    });

    it('should handle set operations for permissions', () => {
      const adminPerms = new HashSet(['read', 'write', 'delete', 'admin']);
      const userPerms = new HashSet(['read', 'write']);

      // Check if user has admin permissions
      expect(userPerms.isSubsetOf(adminPerms)).toBe(true);
      expect(adminPerms.isSupersetOf(userPerms)).toBe(true);

      // Get extra admin permissions
      const extraPerms = adminPerms.difference(userPerms);
      expect([...extraPerms].sort()).toEqual(['admin', 'delete']);

      // Combine permissions
      const combined = userPerms.union(new HashSet(['execute']));
      expect(combined.size).toBe(3);
    });

    it('should handle finding common elements', () => {
      const likes = new HashSet(['pizza', 'pasta', 'sushi', 'tacos']);
      const available = new HashSet(['burger', 'pizza', 'tacos', 'salad']);

      const canOrder = likes.intersection(available);
      expect([...canOrder].sort()).toEqual(['pizza', 'tacos']);
    });
  });
});
