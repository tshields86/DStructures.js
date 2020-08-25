const DoublyLinkedList = require('../DoublyLinkedList');

const ITERABLE = [1, 2, 3];

describe('DoublyLinkedList', () => {
  let doublyLinkedList;

  it('should create empty linked list', () => {
    doublyLinkedList = new DoublyLinkedList();
    expect(doublyLinkedList.toString()).toBe('');
  });

  it('should create linked list from iterable', () => {
    doublyLinkedList = new DoublyLinkedList(ITERABLE);
    expect(doublyLinkedList.toString()).toBe('1,2,3');
  });

  describe('#addFirst', () => {
    it('should add element to the beginning of the list', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();

      doublyLinkedList.addFirst(1);
      expect(doublyLinkedList.head.toString()).toBe('1');
      expect(doublyLinkedList.tail.toString()).toBe('1');

      doublyLinkedList
        .addFirst(2)
        .addFirst(3);

      expect(doublyLinkedList.toString()).toBe('3,2,1');
    });

    it('should add element to the beginning of the linked list (alias unshift)', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();

      doublyLinkedList.unshift(1);
      expect(doublyLinkedList.head.toString()).toBe('1');
      expect(doublyLinkedList.tail.toString()).toBe('1');

      doublyLinkedList
        .unshift(2)
        .unshift(3);

      expect(doublyLinkedList.toString()).toBe('3,2,1');
    });
  });

  describe('#addLast', () => {
    it('should add element to the end of the linked list', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();

      doublyLinkedList.addLast(1);
      expect(doublyLinkedList.head.toString()).toBe('1');
      expect(doublyLinkedList.tail.toString()).toBe('1');

      doublyLinkedList
        .addLast(2)
        .addLast(3);

      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });

    it('should add element to the end of the linked list (alias push)', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();

      doublyLinkedList.push(1);
      expect(doublyLinkedList.head.toString()).toBe('1');
      expect(doublyLinkedList.tail.toString()).toBe('1');

      doublyLinkedList
        .push(2)
        .push(3);

      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#add', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should add element to the beginning when index is 0', () => {
      doublyLinkedList.add(0, 4);
      expect(doublyLinkedList.toString()).toBe('4,1,2,3');
    });

    it('should add element to the end when index is the size of linked list', () => {
      doublyLinkedList.add(3, 4);
      expect(doublyLinkedList.toString()).toBe('1,2,3,4');
    });

    it('should add element to the correct index postion', () => {
      doublyLinkedList.add(1, 4);
      expect(doublyLinkedList.toString()).toBe('1,4,2,3');
    });

    it('should not add element when index is out of bounds', () => {
      expect(doublyLinkedList.add(-1, 2)).toBeNull();
      expect(doublyLinkedList.add(4, 2)).toBeNull();
      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#clear', () => {
    it('should all nodes from the list', () => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
      expect(doublyLinkedList.toString()).toBe('1,2,3');

      doublyLinkedList.clear();
      expect(doublyLinkedList.toString()).toBe('');
    });
  });

  describe('#contains', () => {
    it('should check whether linked list contains value', () => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
      expect(doublyLinkedList.contains(1)).toBeTruthy();
      expect(doublyLinkedList.contains(0)).toBeFalsy();
    });
  });

  describe('#getNode', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should return node when index is in bounds', () => {
      expect(doublyLinkedList.getNode(1).value).toBe(2);
    });

    it('should return null when index is out of bounds', () => {
      expect(doublyLinkedList.getNode(-1)).toBeNull();
      expect(doublyLinkedList.getNode(3)).toBeNull();
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should return value of node when index is in bounds', () => {
      expect(doublyLinkedList.get(1)).toBe(2);
    });

    it('should return null when index is out of bounds', () => {
      expect(doublyLinkedList.get(-1)).toBeNull();
      expect(doublyLinkedList.get(3)).toBeNull();
    });
  });

  describe('#getFirst', () => {
    it('should return value of first node', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.getFirst()).toBeNull();

      doublyLinkedList.addFirst(1);
      expect(doublyLinkedList.getFirst()).toBe(1);

      doublyLinkedList.addFirst(2);
      expect(doublyLinkedList.getFirst()).toBe(2);

      doublyLinkedList.clear();
      expect(doublyLinkedList.getFirst()).toBeNull();
    });
  });

  describe('#getLast', () => {
    it('should return value of last node', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.getLast()).toBeNull();

      doublyLinkedList.addLast(1);
      expect(doublyLinkedList.getLast()).toBe(1);

      doublyLinkedList.addLast(2);
      expect(doublyLinkedList.getLast()).toBe(2);

      doublyLinkedList.clear();
      expect(doublyLinkedList.getLast()).toBeNull();
    });
  });

  describe('#indexOf', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should return index if value is present', () => {
      expect(doublyLinkedList.indexOf(2)).toBe(1);
    });

    it('should return -1 if value is absent', () => {
      expect(doublyLinkedList.indexOf(4)).toBe(-1);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether linked list is empty', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.isEmpty()).toBeTruthy();

      doublyLinkedList.addFirst(1);
      expect(doublyLinkedList.isEmpty()).toBeFalsy();

      doublyLinkedList.clear();
      expect(doublyLinkedList.isEmpty()).toBeTruthy();
    });
  });

  describe('#size', () => {
    it('should return the number of nodes in linked list', () => {
      doublyLinkedList = new DoublyLinkedList();
      expect(doublyLinkedList.size).toBe(0);

      doublyLinkedList.addFirst(1);
      expect(doublyLinkedList.size).toBe(1);

      doublyLinkedList.addLast(2);
      expect(doublyLinkedList.size).toBe(2);

      doublyLinkedList.clear();
      expect(doublyLinkedList.size).toBe(0);
    });
  });

  describe('#removeFirst', () => {
    it('should remove node from the beginning of linked list', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList
        .addFirst(1)
        .addLast(2);

      expect(doublyLinkedList.toString()).toBe('1,2');
      expect(doublyLinkedList.removeFirst()).toBe(1);
      expect(doublyLinkedList.getFirst()).toBe(2);
    });

    it('should remove node from the beginning of linked list (alias shift)', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList
        .addFirst(1)
        .addLast(2);

      expect(doublyLinkedList.toString()).toBe('1,2');
      expect(doublyLinkedList.shift()).toBe(1);
      expect(doublyLinkedList.getFirst()).toBe(2);
    });
  });

  describe('#removeLast', () => {
    it('should remove node from the end of linked list', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList
        .addFirst(1)
        .addLast(2);

      expect(doublyLinkedList.toString()).toBe('1,2');
      expect(doublyLinkedList.removeLast()).toBe(2);
      expect(doublyLinkedList.getLast()).toBe(1);
      expect(doublyLinkedList.tail.next).toBeNull();
    });

    it('should remove node from the end of linked list (alias pop)', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList
        .addFirst(1)
        .addLast(2);

      expect(doublyLinkedList.toString()).toBe('1,2');
      expect(doublyLinkedList.pop()).toBe(2);
      expect(doublyLinkedList.getLast()).toBe(1);
      expect(doublyLinkedList.tail.next).toBeNull();
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should remove node from the beginning when index is 0', () => {
      expect(doublyLinkedList.remove(0)).toBe(1);
      expect(doublyLinkedList.toString()).toBe('2,3');
    });

    it('should remove node from the end when index is the size of linked list', () => {
      expect(doublyLinkedList.remove(2)).toBe(3);
      expect(doublyLinkedList.toString()).toBe('1,2');
      expect(doublyLinkedList.tail.next).toBeNull();
    });

    it('should remove node from the correct index postion', () => {
      expect(doublyLinkedList.remove(1)).toBe(2);
      expect(doublyLinkedList.toString()).toBe('1,3');
    });

    it('should not remove node when index is out of bounds', () => {
      expect(doublyLinkedList.remove(-1)).toBeNull();
      expect(doublyLinkedList.remove(-3)).toBeNull();
      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#set', () => {
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
    });

    it('should set first node value when index is 0', () => {
      expect(doublyLinkedList.set(0, 4)).toBe(1);
      expect(doublyLinkedList.toString()).toBe('4,2,3');
    });

    it('should set last node value when index is the size of linked list', () => {
      expect(doublyLinkedList.set(2, 4)).toBe(3);
      expect(doublyLinkedList.toString()).toBe('1,2,4');
    });

    it('should set node value for the correct index postion', () => {
      expect(doublyLinkedList.set(1, 4)).toBe(2);
      expect(doublyLinkedList.toString()).toBe('1,4,3');
    });

    it('should not set node value when index is out of bounds', () => {
      expect(doublyLinkedList.set(-1, 4)).toBeNull();
      expect(doublyLinkedList.set(-3, 4)).toBeNull();
      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to linked list from array', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList.fromArray(ITERABLE);
      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#toArray', () => {
    it('should add node values from linked list to array', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList.fromArray(ITERABLE);
      expect(doublyLinkedList.toArray()).toEqual(ITERABLE);
    });
  });

  describe('#toArrayNodes', () => {
    it('should add nodes from linked list to array', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList.fromArray(ITERABLE);
      expect(doublyLinkedList.toArrayNodes()).toHaveLength(doublyLinkedList.size);
    });
  });

  describe('#toString', () => {
    it('should stringify linked list values', () => {
      doublyLinkedList = new DoublyLinkedList();
      doublyLinkedList.fromArray(ITERABLE);
      expect(doublyLinkedList.toString()).toBe('1,2,3');
    });

    it('should handle a custom nodeStringifier for object values', () => {
      doublyLinkedList = new DoublyLinkedList();

      const nodeValue1 = { name: 'John', age: 20 };
      const nodeValue2 = { name: 'Smith', age: 30 };

      doublyLinkedList
        .addFirst(nodeValue1)
        .addLast(nodeValue2);

      const nodeStringifier = value => `${value.name}: ${value.age}`;

      expect(doublyLinkedList.toString(nodeStringifier)).toBe('John: 20,Smith: 30');
    });
  });

  describe('#reverse', () => {
    it('should reverse linked list', () => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
      expect(doublyLinkedList.toString()).toBe('1,2,3');

      doublyLinkedList.reverse();
      expect(doublyLinkedList.toString()).toBe('3,2,1');
    });
  });

  describe('#forEach', () => {
    it('should invoke callback function for each node value', () => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);

      const fxn = jest.fn();
      doublyLinkedList.forEach(fxn);

      expect(fxn).toHaveBeenCalledTimes(doublyLinkedList.size);
    });
  });

  describe('#[Symbol.iterator]', () => {
    it('should iterate through list and yeild each node value', () => {
      doublyLinkedList = new DoublyLinkedList(ITERABLE);
      expect(doublyLinkedList.toString()).toBe('1,2,3');

      let i = 0;
      for (const value of doublyLinkedList) {
        expect(value).toBe(++i);
      }
    });
  });
});
