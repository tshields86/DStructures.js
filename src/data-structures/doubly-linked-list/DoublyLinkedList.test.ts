import { describe, it, expect, beforeEach } from 'vitest';
import { DoublyLinkedList } from './DoublyLinkedList';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

const ITERABLE = [1, 2, 3];

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  it('should create empty doubly linked list', () => {
    list = new DoublyLinkedList<number>();
    expect([...list]).toEqual([]);
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);
  });

  it('should create doubly linked list from iterable', () => {
    list = new DoublyLinkedList(ITERABLE);
    expect([...list]).toEqual([1, 2, 3]);
    expect(list.size).toBe(3);
  });

  describe('#addFirst', () => {
    it('should add element to the beginning of the list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();

      list.addFirst(1);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(1);
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next).toBeNull();
      expect(list.size).toBe(1);

      list.addFirst(2).addFirst(3);

      expect([...list]).toEqual([3, 2, 1]);
      expect(list.head?.value).toBe(3);
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next?.value).toBe(2);
      expect(list.size).toBe(3);
    });

    it('should properly link prev pointers', () => {
      list = new DoublyLinkedList([1, 2, 3]);
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next?.prev?.value).toBe(1);
      expect(list.tail?.prev?.value).toBe(2);
    });

    it('should work with alias unshift', () => {
      list = new DoublyLinkedList<number>();
      list.unshift(1).unshift(2).unshift(3);
      expect([...list]).toEqual([3, 2, 1]);
    });
  });

  describe('#addLast', () => {
    it('should add element to the end of the list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();

      list.addLast(1);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(1);
      expect(list.size).toBe(1);

      list.addLast(2).addLast(3);

      expect([...list]).toEqual([1, 2, 3]);
      expect(list.tail?.value).toBe(3);
      expect(list.tail?.next).toBeNull();
      expect(list.tail?.prev?.value).toBe(2);
      expect(list.size).toBe(3);
    });

    it('should work with alias push', () => {
      list = new DoublyLinkedList<number>();
      list.push(1).push(2).push(3);
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('#add', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should add element at beginning when index is 0', () => {
      list.add(0, 4);
      expect([...list]).toEqual([4, 1, 2, 3]);
      expect(list.size).toBe(4);
      expect(list.head?.prev).toBeNull();
    });

    it('should add element at end when index equals size', () => {
      list.add(3, 4);
      expect([...list]).toEqual([1, 2, 3, 4]);
      expect(list.size).toBe(4);
      expect(list.tail?.next).toBeNull();
    });

    it('should add element in the middle', () => {
      list.add(1, 4);
      expect([...list]).toEqual([1, 4, 2, 3]);
      expect(list.size).toBe(4);

      // Verify bidirectional links
      const secondNode = list.getNode(1);
      expect(secondNode?.value).toBe(4);
      expect(secondNode?.prev?.value).toBe(1);
      expect(secondNode?.next?.value).toBe(2);
    });

    it('should return null for invalid index', () => {
      expect(list.add(-1, 4)).toBeNull();
      expect(list.add(4, 4)).toBeNull();
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('#clear', () => {
    it('should remove all nodes from the list', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect(list.size).toBe(3);

      list.clear();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.size).toBe(0);
      expect([...list]).toEqual([]);
    });
  });

  describe('#contains', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should return true when list contains element', () => {
      expect(list.contains(1)).toBe(true);
      expect(list.contains(2)).toBe(true);
      expect(list.contains(3)).toBe(true);
    });

    it('should return false when list does not contain element', () => {
      expect(list.contains(4)).toBe(false);
      expect(list.contains(0)).toBe(false);
    });

    it('should return false for empty list', () => {
      list.clear();
      expect(list.contains(1)).toBe(false);
    });
  });

  describe('#indexOf', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should return the index of the element', () => {
      expect(list.indexOf(1)).toBe(0);
      expect(list.indexOf(2)).toBe(1);
      expect(list.indexOf(3)).toBe(2);
    });

    it('should return -1 when element not found', () => {
      expect(list.indexOf(4)).toBe(-1);
      expect(list.indexOf(0)).toBe(-1);
    });

    it('should return -1 for empty list', () => {
      list.clear();
      expect(list.indexOf(1)).toBe(-1);
    });
  });

  describe('#isEmpty', () => {
    it('should return true for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.isEmpty()).toBe(true);
    });

    it('should return false for non-empty list', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('#removeFirst', () => {
    it('should remove and return the first element', () => {
      list = new DoublyLinkedList(ITERABLE);
      const value = list.removeFirst();
      expect(value).toBe(1);
      expect([...list]).toEqual([2, 3]);
      expect(list.size).toBe(2);
      expect(list.head?.prev).toBeNull();
    });

    it('should handle single element list', () => {
      list = new DoublyLinkedList([1]);
      const value = list.removeFirst();
      expect(value).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.size).toBe(0);
    });

    it('should return null for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.removeFirst()).toBeNull();
    });

    it('should work with alias shift', () => {
      list = new DoublyLinkedList(ITERABLE);
      const value = list.shift();
      expect(value).toBe(1);
      expect([...list]).toEqual([2, 3]);
    });
  });

  describe('#removeLast', () => {
    it('should remove and return the last element', () => {
      list = new DoublyLinkedList(ITERABLE);
      const value = list.removeLast();
      expect(value).toBe(3);
      expect([...list]).toEqual([1, 2]);
      expect(list.size).toBe(2);
      expect(list.tail?.next).toBeNull();
    });

    it('should handle single element list', () => {
      list = new DoublyLinkedList([1]);
      const value = list.removeLast();
      expect(value).toBe(1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.size).toBe(0);
    });

    it('should return null for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.removeLast()).toBeNull();
    });

    it('should work with alias pop', () => {
      list = new DoublyLinkedList(ITERABLE);
      const value = list.pop();
      expect(value).toBe(3);
      expect([...list]).toEqual([1, 2]);
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should remove element at index 0', () => {
      const value = list.remove(0);
      expect(value).toBe(1);
      expect([...list]).toEqual([2, 3]);
      expect(list.size).toBe(2);
    });

    it('should remove element at last index', () => {
      const value = list.remove(2);
      expect(value).toBe(3);
      expect([...list]).toEqual([1, 2]);
      expect(list.size).toBe(2);
    });

    it('should remove element in the middle', () => {
      const value = list.remove(1);
      expect(value).toBe(2);
      expect([...list]).toEqual([1, 3]);
      expect(list.size).toBe(2);

      // Verify bidirectional links
      expect(list.head?.next?.value).toBe(3);
      expect(list.tail?.prev?.value).toBe(1);
    });

    it('should return null for invalid index', () => {
      expect(list.remove(-1)).toBeNull();
      expect(list.remove(3)).toBeNull();
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('#set', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should replace element at index and return old value', () => {
      const oldValue = list.set(1, 5);
      expect(oldValue).toBe(2);
      expect([...list]).toEqual([1, 5, 3]);
    });

    it('should work for first element', () => {
      const oldValue = list.set(0, 5);
      expect(oldValue).toBe(1);
      expect([...list]).toEqual([5, 2, 3]);
    });

    it('should work for last element', () => {
      const oldValue = list.set(2, 5);
      expect(oldValue).toBe(3);
      expect([...list]).toEqual([1, 2, 5]);
    });

    it('should return null for invalid index', () => {
      expect(list.set(-1, 5)).toBeNull();
      expect(list.set(3, 5)).toBeNull();
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe('#getNode', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should return node at valid index', () => {
      const node = list.getNode(1);
      expect(node).toBeInstanceOf(DoublyLinkedListNode);
      expect(node?.value).toBe(2);
      expect(node?.prev?.value).toBe(1);
      expect(node?.next?.value).toBe(3);
    });

    it('should optimize traversal from head for first half', () => {
      list = new DoublyLinkedList([1, 2, 3, 4, 5]);
      const node = list.getNode(1);
      expect(node?.value).toBe(2);
    });

    it('should optimize traversal from tail for second half', () => {
      list = new DoublyLinkedList([1, 2, 3, 4, 5]);
      const node = list.getNode(4);
      expect(node?.value).toBe(5);
    });

    it('should return null for invalid index', () => {
      expect(list.getNode(-1)).toBeNull();
      expect(list.getNode(3)).toBeNull();
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should return value at valid index', () => {
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
    });

    it('should return null for invalid index', () => {
      expect(list.get(-1)).toBeNull();
      expect(list.get(3)).toBeNull();
    });
  });

  describe('#getFirst', () => {
    it('should return first element', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect(list.getFirst()).toBe(1);
    });

    it('should return null for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.getFirst()).toBeNull();
    });
  });

  describe('#getLast', () => {
    it('should return last element', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect(list.getLast()).toBe(3);
    });

    it('should return null for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.getLast()).toBeNull();
    });
  });

  describe('#fromArray', () => {
    it('should add all elements from array', () => {
      list = new DoublyLinkedList<number>();
      list.fromArray([1, 2, 3, 4]);
      expect([...list]).toEqual([1, 2, 3, 4]);
      expect(list.size).toBe(4);
    });

    it('should append to existing list', () => {
      list = new DoublyLinkedList([1, 2]);
      list.fromArray([3, 4]);
      expect([...list]).toEqual([1, 2, 3, 4]);
    });
  });

  describe('#toArray', () => {
    it('should return array of all values', () => {
      list = new DoublyLinkedList(ITERABLE);
      const array = list.toArray();
      expect(array).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('#toArrayNodes', () => {
    it('should return array of all nodes', () => {
      list = new DoublyLinkedList(ITERABLE);
      const nodes = list.toArrayNodes();
      expect(nodes).toHaveLength(3);
      expect(nodes[0]).toBeInstanceOf(DoublyLinkedListNode);
      expect(nodes.map((n) => n.value)).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty list', () => {
      list = new DoublyLinkedList<number>();
      expect(list.toArrayNodes()).toEqual([]);
    });
  });

  describe('#reverse', () => {
    it('should reverse the list', () => {
      list = new DoublyLinkedList(ITERABLE);
      list.reverse();
      expect([...list]).toEqual([3, 2, 1]);
      expect(list.head?.value).toBe(3);
      expect(list.tail?.value).toBe(1);

      // Verify bidirectional links are correct
      expect(list.head?.prev).toBeNull();
      expect(list.head?.next?.value).toBe(2);
      expect(list.tail?.next).toBeNull();
      expect(list.tail?.prev?.value).toBe(2);
    });

    it('should handle single element list', () => {
      list = new DoublyLinkedList([1]);
      list.reverse();
      expect([...list]).toEqual([1]);
    });

    it('should handle empty list', () => {
      list = new DoublyLinkedList<number>();
      list.reverse();
      expect([...list]).toEqual([]);
    });

    it('should handle two element list', () => {
      list = new DoublyLinkedList([1, 2]);
      list.reverse();
      expect([...list]).toEqual([2, 1]);
      expect(list.head?.value).toBe(2);
      expect(list.tail?.value).toBe(1);
    });
  });

  describe('#forEach', () => {
    it('should call callback for each element', () => {
      list = new DoublyLinkedList(ITERABLE);
      const values: number[] = [];
      const indices: number[] = [];
      list.forEach((value, index) => {
        values.push(value);
        indices.push(index);
      });
      expect(values).toEqual([1, 2, 3]);
      expect(indices).toEqual([0, 1, 2]);
    });

    it('should not call callback for empty list', () => {
      list = new DoublyLinkedList<number>();
      let called = false;
      list.forEach(() => {
        called = true;
      });
      expect(called).toBe(false);
    });
  });

  describe('#find', () => {
    beforeEach(() => {
      list = new DoublyLinkedList(ITERABLE);
    });

    it('should return first element matching predicate', () => {
      const result = list.find((value) => value > 1);
      expect(result).toBe(2);
    });

    it('should return undefined when no match', () => {
      const result = list.find((value) => value > 10);
      expect(result).toBeUndefined();
    });

    it('should return undefined for empty list', () => {
      list.clear();
      const result = list.find((value) => value === 1);
      expect(result).toBeUndefined();
    });
  });

  describe('Iterator', () => {
    it('should be iterable with for...of', () => {
      list = new DoublyLinkedList(ITERABLE);
      const values: number[] = [];
      for (const value of list) {
        values.push(value);
      }
      expect(values).toEqual([1, 2, 3]);
    });

    it('should work with spread operator', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect([...list]).toEqual([1, 2, 3]);
    });

    it('should work with Array.from', () => {
      list = new DoublyLinkedList(ITERABLE);
      expect(Array.from(list)).toEqual([1, 2, 3]);
    });
  });

  describe('Bidirectional links', () => {
    it('should maintain correct prev pointers throughout operations', () => {
      list = new DoublyLinkedList<number>();
      list.push(1).push(2).push(3);

      // Check forward and backward traversal
      let node = list.head;
      expect(node?.value).toBe(1);
      expect(node?.prev).toBeNull();

      node = node?.next ?? null;
      expect(node?.value).toBe(2);
      expect(node?.prev?.value).toBe(1);

      node = node?.next ?? null;
      expect(node?.value).toBe(3);
      expect(node?.prev?.value).toBe(2);
      expect(node?.next).toBeNull();
    });

    it('should maintain links after removals', () => {
      list = new DoublyLinkedList([1, 2, 3, 4, 5]);
      list.remove(2); // Remove 3

      const secondNode = list.getNode(1);
      const thirdNode = list.getNode(2);

      expect(secondNode?.value).toBe(2);
      expect(thirdNode?.value).toBe(4);
      expect(secondNode?.next?.value).toBe(4);
      expect(thirdNode?.prev?.value).toBe(2);
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety with strings', () => {
      const stringList = new DoublyLinkedList<string>(['a', 'b', 'c']);
      expect([...stringList]).toEqual(['a', 'b', 'c']);
      stringList.addFirst('z');
      expect(stringList.getFirst()).toBe('z');
    });

    it('should maintain type safety with objects', () => {
      interface Person {
        name: string;
        age: number;
      }
      const personList = new DoublyLinkedList<Person>([
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]);
      expect(personList.size).toBe(2);
      const first = personList.getFirst();
      expect(first?.name).toBe('Alice');
    });
  });
});
