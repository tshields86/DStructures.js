const LinkedList = require('../LinkedList');

const ITERABLE = [1, 2, 3];

describe('LinkedList', () => {
  let linkedList;

  it('should create empty linked list', () => {
    linkedList = new LinkedList();
    expect(linkedList.toString()).toBe('');
  });

  it('should create linked list from iterable', () => {
    linkedList = new LinkedList(ITERABLE);
    expect(linkedList.toString()).toBe('1,2,3');
  });

  describe('#addFirst', () => {
    it('should add element to the beginning of the linked list', () => {
      linkedList = new LinkedList();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.addFirst(1);
      expect(linkedList.head.toString()).toBe('1');
      expect(linkedList.tail.toString()).toBe('1');

      linkedList
        .addFirst(2)
        .addFirst(3);

      expect(linkedList.toString()).toBe('3,2,1');
    });

    it('should add element to the beginning of the linked list (alias unshift)', () => {
      linkedList = new LinkedList();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.unshift(1);
      expect(linkedList.head.toString()).toBe('1');
      expect(linkedList.tail.toString()).toBe('1');

      linkedList
        .unshift(2)
        .unshift(3);

      expect(linkedList.toString()).toBe('3,2,1');
    });
  });

  describe('#addLast', () => {
    it('should add element to the end of the linked list', () => {
      linkedList = new LinkedList();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.addLast(1);
      expect(linkedList.head.toString()).toBe('1');
      expect(linkedList.tail.toString()).toBe('1');

      linkedList
        .addLast(2)
        .addLast(3);

      expect(linkedList.toString()).toBe('1,2,3');
    });

    it('should add element to the end of the linked list (alias push)', () => {
      linkedList = new LinkedList();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      linkedList.push(1);
      expect(linkedList.head.toString()).toBe('1');
      expect(linkedList.tail.toString()).toBe('1');

      linkedList
        .push(2)
        .push(3);

      expect(linkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#add', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should add element to the beginning when index is 0', () => {
      linkedList.add(0, 4);
      expect(linkedList.toString()).toBe('4,1,2,3');
    });

    it('should add element to the end when index is the size of linked list', () => {
      linkedList.add(3, 4);
      expect(linkedList.toString()).toBe('1,2,3,4');
    });

    it('should add element to the correct index postion', () => {
      linkedList.add(1, 4);
      expect(linkedList.toString()).toBe('1,4,2,3');
    });

    it('should not add element when index is out of bounds', () => {
      expect(linkedList.add(-1, 2)).toBeNull();
      expect(linkedList.add(4, 2)).toBeNull();
      expect(linkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#clear', () => {
    it('should all nodes from the list', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.toString()).toBe('1,2,3');

      linkedList.clear();
      expect(linkedList.toString()).toBe('');
    });
  });

  describe('#contains', () => {
    it('should check whether linked list contains value', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.contains(1)).toBeTruthy();
      expect(linkedList.contains(0)).toBeFalsy();
    });
  });

  describe('#getNode', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return node when index is in bounds', () => {
      expect(linkedList.getNode(1).value).toBe(2);
    });

    it('should return null when index is out of bounds', () => {
      expect(linkedList.getNode(-1)).toBeNull();
      expect(linkedList.getNode(3)).toBeNull();
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return value of node when index is in bounds', () => {
      expect(linkedList.get(1)).toBe(2);
    });

    it('should return null when index is out of bounds', () => {
      expect(linkedList.get(-1)).toBeNull();
      expect(linkedList.get(3)).toBeNull();
    });
  });

  describe('#getFirst', () => {
    it('should return value of first node', () => {
      linkedList = new LinkedList();
      expect(linkedList.getFirst()).toBeNull();

      linkedList.addFirst(1);
      expect(linkedList.getFirst()).toBe(1);

      linkedList.addFirst(2);
      expect(linkedList.getFirst()).toBe(2);

      linkedList.clear();
      expect(linkedList.getFirst()).toBeNull();
    });
  });

  describe('#getLast', () => {
    it('should return value of last node', () => {
      linkedList = new LinkedList();
      expect(linkedList.getLast()).toBeNull();

      linkedList.addLast(1);
      expect(linkedList.getLast()).toBe(1);

      linkedList.addLast(2);
      expect(linkedList.getLast()).toBe(2);

      linkedList.clear();
      expect(linkedList.getLast()).toBeNull();
    });
  });

  describe('#indexOf', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should return index if value is present', () => {
      expect(linkedList.indexOf(2)).toBe(1);
    });

    it('should return -1 if value is absent', () => {
      expect(linkedList.indexOf(4)).toBe(-1);
    });
  });

  describe('#isEmpty', () => {
    it('should check whether linked list is empty', () => {
      linkedList = new LinkedList();
      expect(linkedList.isEmpty()).toBeTruthy();

      linkedList.addFirst(1);
      expect(linkedList.isEmpty()).toBeFalsy();

      linkedList.clear();
      expect(linkedList.isEmpty()).toBeTruthy();
    });
  });

  describe('#size', () => {
    it('should return the number of nodes in linked list', () => {
      linkedList = new LinkedList();
      expect(linkedList.size).toBe(0);

      linkedList.addFirst(1);
      expect(linkedList.size).toBe(1);

      linkedList.addLast(2);
      expect(linkedList.size).toBe(2);

      linkedList.clear();
      expect(linkedList.size).toBe(0);
    });
  });

  describe('#removeFirst', () => {
    it('should remove node from the beginning of linked list', () => {
      linkedList = new LinkedList();
      linkedList
        .addFirst(1)
        .addLast(2);

      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.removeFirst()).toBe(1);
      expect(linkedList.getFirst()).toBe(2);
    });

    it('should remove node from the beginning of linked list (alias shift)', () => {
      linkedList = new LinkedList();
      linkedList
        .addFirst(1)
        .addLast(2);

      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.shift()).toBe(1);
      expect(linkedList.getFirst()).toBe(2);
    });
  });

  describe('#removeLast', () => {
    it('should remove node from the end of linked list', () => {
      linkedList = new LinkedList();
      linkedList
        .addFirst(1)
        .addLast(2);

      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.removeLast()).toBe(2);
      expect(linkedList.getLast()).toBe(1);
      expect(linkedList.tail.next).toBeNull();
    });

    it('should remove node from the end of linked list (alias pop)', () => {
      linkedList = new LinkedList();
      linkedList
        .addFirst(1)
        .addLast(2);

      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.pop()).toBe(2);
      expect(linkedList.getLast()).toBe(1);
      expect(linkedList.tail.next).toBeNull();
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should remove node from the beginning when index is 0', () => {
      expect(linkedList.remove(0)).toBe(1);
      expect(linkedList.toString()).toBe('2,3');
    });

    it('should remove node from the end when index is the size of linked list', () => {
      expect(linkedList.remove(2)).toBe(3);
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.tail.next).toBeNull();
    });

    it('should remove node from the correct index postion', () => {
      expect(linkedList.remove(1)).toBe(2);
      expect(linkedList.toString()).toBe('1,3');
    });

    it('should not remove node when index is out of bounds', () => {
      expect(linkedList.remove(-1)).toBeNull();
      expect(linkedList.remove(-3)).toBeNull();
      expect(linkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#set', () => {
    beforeEach(() => {
      linkedList = new LinkedList(ITERABLE);
    });

    it('should set first node value when index is 0', () => {
      expect(linkedList.set(0, 4)).toBe(1);
      expect(linkedList.toString()).toBe('4,2,3');
    });

    it('should set last node value when index is the size of linked list', () => {
      expect(linkedList.set(2, 4)).toBe(3);
      expect(linkedList.toString()).toBe('1,2,4');
    });

    it('should set node value for the correct index postion', () => {
      expect(linkedList.set(1, 4)).toBe(2);
      expect(linkedList.toString()).toBe('1,4,3');
    });

    it('should not set node value when index is out of bounds', () => {
      expect(linkedList.set(-1, 4)).toBeNull();
      expect(linkedList.set(-3, 4)).toBeNull();
      expect(linkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#fromArray', () => {
    it('should add nodes to linked list from array', () => {
      linkedList = new LinkedList();
      linkedList.fromArray(ITERABLE);
      expect(linkedList.toString()).toBe('1,2,3');
    });
  });

  describe('#toArray', () => {
    it('should add node values from linked list to array', () => {
      linkedList = new LinkedList();
      linkedList.fromArray(ITERABLE);
      expect(linkedList.toArray()).toEqual(ITERABLE);
    });
  });

  describe('#toArrayNodes', () => {
    it('should add nodes from linked list to array', () => {
      linkedList = new LinkedList();
      linkedList.fromArray(ITERABLE);
      expect(linkedList.toArrayNodes()).toHaveLength(linkedList.size);
    });
  });

  describe('#toString', () => {
    it('should stringify linked list values', () => {
      linkedList = new LinkedList();
      linkedList.fromArray(ITERABLE);
      expect(linkedList.toString()).toBe('1,2,3');
    });

    it('should handle a custom nodeStringifier for object values', () => {
      linkedList = new LinkedList();

      const nodeValue1 = { name: 'John', age: 20 };
      const nodeValue2 = { name: 'Smith', age: 30 };

      linkedList
        .addFirst(nodeValue1)
        .addLast(nodeValue2);

      const nodeStringifier = value => `${value.name}: ${value.age}`;

      expect(linkedList.toString(nodeStringifier)).toBe('John: 20,Smith: 30');
    });
  });

  describe('#reverse', () => {
    it('should reverse linked list', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.toString()).toBe('1,2,3');

      linkedList.reverse();
      expect(linkedList.toString()).toBe('3,2,1');
    });
  });

  describe('#forEach', () => {
    it('should invoke callback function for each node value', () => {
      linkedList = new LinkedList(ITERABLE);

      const fxn = jest.fn();
      linkedList.forEach(fxn);

      expect(fxn).toHaveBeenCalledTimes(linkedList.size);
    });
  });

  describe('#[Symbol.iterator]', () => {
    it('should iterate through list and yeild each node value', () => {
      linkedList = new LinkedList(ITERABLE);
      expect(linkedList.toString()).toBe('1,2,3');

      let i = 0;
      for (const value of linkedList) {
        expect(value).toBe(++i);
      }
    });
  });
});
