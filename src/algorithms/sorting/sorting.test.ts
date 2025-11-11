import { describe, it, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';

const sortingAlgorithms = [
  { name: 'bubbleSort', fn: bubbleSort },
  { name: 'insertionSort', fn: insertionSort },
  { name: 'selectionSort', fn: selectionSort },
  { name: 'mergeSort', fn: mergeSort },
  { name: 'quickSort', fn: quickSort },
];

sortingAlgorithms.forEach(({ name, fn }) => {
  describe(name, () => {
    it('should sort an unsorted array', () => {
      const array = [5, 2, 8, 1, 9, 3];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([1, 2, 3, 5, 8, 9]);
    });

    it('should handle already sorted array', () => {
      const array = [1, 2, 3, 4, 5];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle reverse sorted array', () => {
      const array = [5, 4, 3, 2, 1];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle array with duplicates', () => {
      const array = [5, 2, 8, 2, 9, 5];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([2, 2, 5, 5, 8, 9]);
    });

    it('should handle single element array', () => {
      const array = [42];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([42]);
    });

    it('should handle empty array', () => {
      const array: number[] = [];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([]);
    });

    it('should handle array with negative numbers', () => {
      const array = [3, -1, 5, -9, 0, 2];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([-9, -1, 0, 2, 3, 5]);
    });

    it('should handle array with all same elements', () => {
      const array = [5, 5, 5, 5, 5];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([5, 5, 5, 5, 5]);
    });

    it('should work with custom comparator for descending order', () => {
      const array = [5, 2, 8, 1, 9];
      const sorted = fn(array.slice(), (a, b) => b - a);
      expect(sorted).toEqual([9, 8, 5, 2, 1]);
    });

    it('should sort strings alphabetically', () => {
      const array = ['banana', 'apple', 'cherry', 'date'];
      const sorted = fn(array.slice(), (a, b) => a.localeCompare(b));
      expect(sorted).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    it('should sort objects by property', () => {
      interface Person {
        name: string;
        age: number;
      }

      const array: Person[] = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 },
      ];

      const sorted = fn(array.slice(), (a, b) => a.age - b.age);

      expect(sorted[0]!.name).toBe('Bob');
      expect(sorted[1]!.name).toBe('Alice');
      expect(sorted[2]!.name).toBe('Charlie');
    });

    it('should handle large arrays', () => {
      const array = Array.from({ length: 100 }, () =>
        Math.floor(Math.random() * 100)
      );
      const sorted = fn(array.slice());

      // Check if sorted
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i]).toBeLessThanOrEqual(sorted[i + 1]!);
      }
    });

    it('should maintain stability for equal elements', () => {
      interface Item {
        value: number;
        id: number;
      }

      const array: Item[] = [
        { value: 3, id: 1 },
        { value: 1, id: 2 },
        { value: 3, id: 3 },
        { value: 2, id: 4 },
        { value: 1, id: 5 },
      ];

      const sorted = fn(array.slice(), (a, b) => a.value - b.value);

      expect(sorted[0]!.value).toBe(1);
      expect(sorted[1]!.value).toBe(1);
      expect(sorted[2]!.value).toBe(2);
      expect(sorted[3]!.value).toBe(3);
      expect(sorted[4]!.value).toBe(3);
    });

    it('should handle array with two elements', () => {
      const array = [2, 1];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([1, 2]);
    });

    it('should handle array with floating point numbers', () => {
      const array = [3.5, 1.2, 5.8, 2.1, 4.9];
      const sorted = fn(array.slice());
      expect(sorted).toEqual([1.2, 2.1, 3.5, 4.9, 5.8]);
    });
  });
});

describe('Sorting algorithms comparison', () => {
  it('all algorithms should produce the same result', () => {
    const array = [5, 2, 8, 1, 9, 3, 7, 4, 6];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    sortingAlgorithms.forEach(({ name, fn }) => {
      const sorted = fn(array.slice());
      expect(sorted).toEqual(expected);
    });
  });

  it('all algorithms should handle complex data the same way', () => {
    interface Student {
      name: string;
      grade: number;
    }

    const students: Student[] = [
      { name: 'Alice', grade: 85 },
      { name: 'Bob', grade: 92 },
      { name: 'Charlie', grade: 78 },
      { name: 'David', grade: 88 },
    ];

    const compareFn = (a: Student, b: Student) => a.grade - b.grade;

    const results = sortingAlgorithms.map(({ fn }) => {
      const sorted = fn(students.slice(), compareFn);
      return sorted.map((s) => s.name);
    });

    const expected = ['Charlie', 'Alice', 'David', 'Bob'];

    results.forEach((result) => {
      expect(result).toEqual(expected);
    });
  });
});
