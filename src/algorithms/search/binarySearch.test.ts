import { describe, it, expect } from 'vitest';
import { binarySearch, binarySearchRecursive } from './binarySearch';

const searchAlgorithms = [
  { name: 'binarySearch', fn: binarySearch },
  { name: 'binarySearchRecursive', fn: binarySearchRecursive },
];

searchAlgorithms.forEach(({ name, fn }) => {
  describe(name, () => {
    it('should find element in sorted array', () => {
      const array = [1, 3, 5, 7, 9, 11, 13];
      expect(fn(array, 7)).toBe(3);
      expect(fn(array, 1)).toBe(0);
      expect(fn(array, 13)).toBe(6);
    });

    it('should return -1 for element not in array', () => {
      const array = [1, 3, 5, 7, 9, 11, 13];
      expect(fn(array, 6)).toBe(-1);
      expect(fn(array, 0)).toBe(-1);
      expect(fn(array, 15)).toBe(-1);
    });

    it('should handle single element array', () => {
      expect(fn([42], 42)).toBe(0);
      expect(fn([42], 0)).toBe(-1);
    });

    it('should handle empty array', () => {
      expect(fn([], 5)).toBe(-1);
    });

    it('should handle two element array', () => {
      expect(fn([1, 3], 1)).toBe(0);
      expect(fn([1, 3], 3)).toBe(1);
      expect(fn([1, 3], 2)).toBe(-1);
    });

    it('should find element at beginning', () => {
      const array = [1, 2, 3, 4, 5];
      expect(fn(array, 1)).toBe(0);
    });

    it('should find element at end', () => {
      const array = [1, 2, 3, 4, 5];
      expect(fn(array, 5)).toBe(4);
    });

    it('should find element in middle', () => {
      const array = [1, 2, 3, 4, 5];
      expect(fn(array, 3)).toBe(2);
    });

    it('should handle negative numbers', () => {
      const array = [-10, -5, 0, 5, 10];
      expect(fn(array, -5)).toBe(1);
      expect(fn(array, 0)).toBe(2);
      expect(fn(array, 10)).toBe(4);
    });

    it('should work with custom comparator for strings', () => {
      const array = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      const compareFn = (a: string, b: string) => a.localeCompare(b);

      expect(fn(array, 'cherry', compareFn)).toBe(2);
      expect(fn(array, 'apple', compareFn)).toBe(0);
      expect(fn(array, 'fig', compareFn)).toBe(-1);
    });

    it('should work with custom comparator for objects', () => {
      interface Person {
        name: string;
        age: number;
      }

      const array: Person[] = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 },
        { name: 'David', age: 40 },
      ];

      const target = { name: 'Charlie', age: 35 };
      const compareFn = (a: Person, b: Person) => a.age - b.age;

      expect(fn(array, target, compareFn)).toBe(2);
    });

    it('should handle array with duplicates (finds one occurrence)', () => {
      const array = [1, 2, 2, 2, 3, 4, 5];
      const index = fn(array, 2);
      expect(index).toBeGreaterThanOrEqual(1);
      expect(index).toBeLessThanOrEqual(3);
      expect(array[index]).toBe(2);
    });

    it('should handle large arrays', () => {
      const array = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(fn(array, 500)).toBe(250);
      expect(fn(array, 1998)).toBe(999);
      expect(fn(array, 999)).toBe(-1);
    });

    it('should handle floating point numbers', () => {
      const array = [1.1, 2.2, 3.3, 4.4, 5.5];
      expect(fn(array, 3.3)).toBe(2);
      expect(fn(array, 1.1)).toBe(0);
      expect(fn(array, 5.5)).toBe(4);
      expect(fn(array, 2.0)).toBe(-1);
    });
  });
});

describe('Binary search algorithms comparison', () => {
  it('both algorithms should produce the same result', () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const targets = [1, 5, 9, 13, 17, 2, 6, 10, 20];

    targets.forEach((target) => {
      const result1 = binarySearch(array, target);
      const result2 = binarySearchRecursive(array, target);
      expect(result1).toBe(result2);
    });
  });
});
