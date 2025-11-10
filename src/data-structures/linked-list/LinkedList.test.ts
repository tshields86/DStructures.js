import { describe, it, expect, beforeEach } from 'vitest';
import { LinkedList } from './LinkedList';
import { LinkedListNode } from './LinkedListNode';

const ITERABLE = [1, 2, 3];

describe('LinkedList', () => {
  let linkedList: LinkedList<number>;

  it('should create empty linked list', () => {
    linkedList = new LinkedList<number>();
    expect([...linkedList]).toEqual([]);
    expect(linkedList.size).toBe(0);
    expect(linkedList.isEmpty()).toBe(true);
  });

  it('should create linked list from iterable', () => {
    linkedList = new LinkedList(ITERABLE);
    expect([...linkedList]).toEqual([1, 2, 3]);
    expect(linkedList.size).toBe(3);
  });

  describe('#addFirst', () => {
    it('should add element to the beginning of the linked list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.addFirst(1);
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(1);
      expect(linkedList.size).toBe(1);

      linkedList.addFirst(2).addFirst(3);

      expect([...linkedList]).toEqual([3, 2, 1]);
      expect(linkedList.size).toBe(3);
    });

    it('should add element to the beginning of the linked list (alias unshift)', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.unshift(1);
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(1);

      linkedList.unshift(2).unshift(3);

      expect([...linkedList]).toEqual([3, 2, 1]);
    });
  });

  describe('#addLast', () => {
    it('should add element to the end of the linked list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.addLast(1);
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(1);
      expect(linkedList.size).toBe(1);

      linkedList.addLast(2).addLast(3);

      expect([...linkedList]).toEqual([1, 2, 3]);
      expect(linkedList.size).toBe(3);
    });

    it('should add element to the end of the linked list (alias push)', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.push(1);
      expect(linkedList.head?.value).toBe(1);
      expect(linkedList.tail?.value).toBe(1);

      linkedList.push(2).push(3);

      expect([...linkedList]).toEqual([1, 2, 3]);
    });
  });

  describe('#add', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should add element to the beginning when index is 0', () => {
      linkedList.add(0, 4);
      expect([...linkedList]).toEqual([4, 1, 2, 3]);
      expect(linkedList.size).toBe(4);
    });

    it('should add element to the end when index is the size of linked list', () => {
      linkedList.add(3, 4);
      expect([...linkedList]).toEqual([1, 2, 3, 4]);
      expect(linkedList.size).toBe(4);
    });

    it('should add element in the middle of the linked list', () => {
      linkedList.add(1, 4);
      expect([...linkedList]).toEqual([1, 4, 2, 3]);
      expect(linkedList.size).toBe(4);
    });

    it('should return null when index is negative', () => {
      const result = linkedList.add(-1, 4);
      expect(result).toBeNull();
      expect([...linkedList]).toEqual([1, 2, 3]);
    });

    it('should return null when index is greater than size', () => {
      const result = linkedList.add(4, 4);
      expect(result).toBeNull();
      expect([...linkedList]).toEqual([1, 2, 3]);
    });
  });

  describe('#clear', () => {
    it('should remove all nodes from the linked list', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.size).toBe(3);

      linkedList.clear();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.size).toBe(0);
      expect([...linkedList]).toEqual([]);
    });
  });

  describe('#contains', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return true when the list contains the element', () => {
      expect(linkedList.contains(1)).toBe(true);
      expect(linkedList.contains(2)).toBe(true);
      expect(linkedList.contains(3)).toBe(true);
    });

    it('should return false when the list does not contain the element', () => {
      expect(linkedList.contains(4)).toBe(false);
      expect(linkedList.contains(0)).toBe(false);
    });

    it('should return false for empty list', () => {
      linkedList.clear();
      expect(linkedList.contains(1)).toBe(false);
    });
  });

  describe('#indexOf', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return the index of the element', () => {
      expect(linkedList.indexOf(1)).toBe(0);
      expect(linkedList.indexOf(2)).toBe(1);
      expect(linkedList.indexOf(3)).toBe(2);
    });

    it('should return -1 when element not found', () => {
      expect(linkedList.indexOf(4)).toBe(-1);
      expect(linkedList.indexOf(0)).toBe(-1);
    });

    it('should return -1 for empty list', () => {
      linkedList.clear();
      expect(linkedList.indexOf(1)).toBe(-1);
    });
  });

  describe('#isEmpty', () => {
    it('should return true for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.isEmpty()).toBe(true);
    });

    it('should return false for non-empty list', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.isEmpty()).toBe(false);
    });
  });

  describe('#removeFirst', () => {
    it('should remove and return the first element', () => {
      linkedList = new LinkedList(ITERABLE);
      const value = linkedList.removeFirst();
      expect(value).toBe(1);
      expect([...linkedList]).toEqual([2, 3]);
      expect(linkedList.size).toBe(2);
    });

    it('should handle removing from single element list', () => {
      linkedList = new LinkedList([1]);
      const value = linkedList.removeFirst();
      expect(value).toBe(1);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.size).toBe(0);
    });

    it('should return null for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.removeFirst()).toBeNull();
    });

    it('should work with alias shift', () => {
      linkedList = new LinkedList(ITERABLE);
      const value = linkedList.shift();
      expect(value).toBe(1);
      expect([...linkedList]).toEqual([2, 3]);
    });
  });

  describe('#removeLast', () => {
    it('should remove and return the last element', () => {
      linkedList = new LinkedList(ITERABLE);
      const value = linkedList.removeLast();
      expect(value).toBe(3);
      expect([...linkedList]).toEqual([1, 2]);
      expect(linkedList.size).toBe(2);
    });

    it('should handle removing from single element list', () => {
      linkedList = new LinkedList([1]);
      const value = linkedList.removeLast();
      expect(value).toBe(1);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.size).toBe(0);
    });

    it('should return null for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.removeLast()).toBeNull();
    });

    it('should work with alias pop', () => {
      linkedList = new LinkedList(ITERABLE);
      const value = linkedList.pop();
      expect(value).toBe(3);
      expect([...linkedList]).toEqual([1, 2]);
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should remove element at index 0', () => {
      const value = linkedList.remove(0);
      expect(value).toBe(1);
      expect([...linkedList]).toEqual([2, 3]);
      expect(linkedList.size).toBe(2);
    });

    it('should remove element at last index', () => {
      const value = linkedList.remove(2);
      expect(value).toBe(3);
      expect([...linkedList]).toEqual([1, 2]);
      expect(linkedList.size).toBe(2);
    });

    it('should remove element in the middle', () => {
      const value = linkedList.remove(1);
      expect(value).toBe(2);
      expect([...linkedList]).toEqual([1, 3]);
      expect(linkedList.size).toBe(2);
    });

    it('should return null for invalid index', () => {
      expect(linkedList.remove(-1)).toBeNull();
      expect(linkedList.remove(3)).toBeNull();
      expect([...linkedList]).toEqual([1, 2, 3]);
    });
  });

  describe('#set', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should replace element at index and return old value', () => {
      const oldValue = linkedList.set(1, 5);
      expect(oldValue).toBe(2);
      expect([...linkedList]).toEqual([1, 5, 3]);
    });

    it('should work for first element', () => {
      const oldValue = linkedList.set(0, 5);
      expect(oldValue).toBe(1);
      expect([...linkedList]).toEqual([5, 2, 3]);
    });

    it('should work for last element', () => {
      const oldValue = linkedList.set(2, 5);
      expect(oldValue).toBe(3);
      expect([...linkedList]).toEqual([1, 2, 5]);
    });

    it('should return null for invalid index', () => {
      expect(linkedList.set(-1, 5)).toBeNull();
      expect(linkedList.set(3, 5)).toBeNull();
      expect([...linkedList]).toEqual([1, 2, 3]);
    });
  });

  describe('#getNode', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return node at valid index', () => {
      const node = linkedList.getNode(1);
      expect(node).toBeInstanceOf(LinkedListNode);
      expect(node?.value).toBe(2);
    });

    it('should return null for invalid index', () => {
      expect(linkedList.getNode(-1)).toBeNull();
      expect(linkedList.getNode(3)).toBeNull();
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return value at valid index', () => {
      expect(linkedList.get(0)).toBe(1);
      expect(linkedList.get(1)).toBe(2);
      expect(linkedList.get(2)).toBe(3);
    });

    it('should return null for invalid index', () => {
      expect(linkedList.get(-1)).toBeNull();
      expect(linkedList.get(3)).toBeNull();
    });
  });

  describe('#getFirst', () => {
    it('should return first element', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.getFirst()).toBe(1);
    });

    it('should return null for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.getFirst()).toBeNull();
    });
  });

  describe('#getLast', () => {
    it('should return last element', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.getLast()).toBe(3);
    });

    it('should return null for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.getLast()).toBeNull();
    });
  });

  describe('#fromArray', () => {
    it('should add all elements from array', () => {
      linkedList = new LinkedList<number>();
      linkedList.fromArray([1, 2, 3, 4]);
      expect([...linkedList]).toEqual([1, 2, 3, 4]);
      expect(linkedList.size).toBe(4);
    });

    it('should append to existing list', () => {
      linkedList = new LinkedList([1, 2]);
      linkedList.fromArray([3, 4]);
      expect([...linkedList]).toEqual([1, 2, 3, 4]);
    });
  });

  describe('#toArray', () => {
    it('should return array of all values', () => {
      linkedList = new LinkedList(ITERABLE);
      const array = linkedList.toArray();
      expect(array).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.toArray()).toEqual([]);
    });
  });

  describe('#toArrayNodes', () => {
    it('should return array of all nodes', () => {
      linkedList = new LinkedList(ITERABLE);
      const nodes = linkedList.toArrayNodes();
      expect(nodes).toHaveLength(3);
      expect(nodes[0]).toBeInstanceOf(LinkedListNode);
      expect(nodes.map((n) => n.value)).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty list', () => {
      linkedList = new LinkedList<number>();
      expect(linkedList.toArrayNodes()).toEqual([]);
    });
  });

  describe('#reverse', () => {
    it('should reverse the list', () => {
      linkedList = new LinkedList(ITERABLE);
      linkedList.reverse();
      expect([...linkedList]).toEqual([3, 2, 1]);
      expect(linkedList.head?.value).toBe(3);
      expect(linkedList.tail?.value).toBe(1);
    });

    it('should handle single element list', () => {
      linkedList = new LinkedList([1]);
      linkedList.reverse();
      expect([...linkedList]).toEqual([1]);
    });

    it('should handle empty list', () => {
      linkedList = new LinkedList<number>();
      linkedList.reverse();
      expect([...linkedList]).toEqual([]);
    });

    it('should handle two element list', () => {
      linkedList = new LinkedList([1, 2]);
      linkedList.reverse();
      expect([...linkedList]).toEqual([2, 1]);
    });
  });

  describe('#forEach', () => {
    it('should call callback for each element', () => {
      linkedList = new LinkedList(ITERABLE);
      const values: number[] = [];
      const indices: number[] = [];
      linkedList.forEach((value, index) => {
        values.push(value);
        indices.push(index);
      });
      expect(values).toEqual([1, 2, 3]);
      expect(indices).toEqual([0, 1, 2]);
    });

    it('should not call callback for empty list', () => {
      linkedList = new LinkedList<number>();
      let called = false;
      linkedList.forEach(() => {
        called = true;
      });
      expect(called).toBe(false);
    });
  });

  describe('#find', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return first element matching predicate', () => {
      const result = linkedList.find((value) => value > 1);
      expect(result).toBe(2);
    });

    it('should return undefined when no match', () => {
      const result = linkedList.find((value) => value > 10);
      expect(result).toBeUndefined();
    });

    it('should return undefined for empty list', () => {
      linkedList.clear();
      const result = linkedList.find((value) => value === 1);
      expect(result).toBeUndefined();
    });
  });

  describe('Iterator', () => {
    it('should be iterable with for...of', () => {
      linkedList = new LinkedList(ITERABLE);
      const values: number[] = [];
      for (const value of linkedList) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      linkedList = new LinkedList(ITERABLE);
      expect([...linkedList]).toEqual([1, 2, 3]);
    });

    it('should work with Array.from', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(Array.from(linkedList)).toEqual([1, 2, 3]);
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety with strings', () => {
      const stringList = new LinkedList<string>(['a', 'b', 'c']);
      expect([...stringList]).toEqual(['a', 'b', 'c']);
      stringList.addFirst('z');
      expect(stringList.getFirst()).toBe('z');
    });

    it('should maintain type safety with objects', () => {
      interface Person {
        name: string;
        age: number;
      }
      const personList = new LinkedList<Person>([
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]);
      expect(personList.size).toBe(2);
      const first = personList.getFirst();
      expect(first?.name).toBe('Alice');
    });
  });
});
