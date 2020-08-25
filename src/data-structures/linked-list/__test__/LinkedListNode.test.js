const LinkedListNode = require('../LinkedListNode');

describe('LinkedListNode', () => {
  it('should create linked list node with value', () => {
    const node = new LinkedListNode('foo');

    expect(node.value).toBe('foo');
    expect(node.next).toBeNull();
  });

  it('should create linked list node with object as a value', () => {
    const nodeValue = { name: 'John', age: 20 };
    const node = new LinkedListNode(nodeValue);

    expect(node.value.name).toBe('John');
    expect(node.value.age).toBe(20);
    expect(node.next).toBeNull();
  });

  it('should link nodes together', () => {
    const node2 = new LinkedListNode(2);
    const node1 = new LinkedListNode(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect(node1.next.value).toBe(2);
  });

  describe('#toString', () => {
    it('should convert node to string', () => {
      const node = new LinkedListNode('foo');

      expect(node.toString()).toBe('foo');

      node.value = 'string value';
      expect(node.toString()).toBe('string value');
    });

    it('should convert node to string with custom stringifier', () => {
      const nodeValue = { name: 'John', age: 20 };
      const node = new LinkedListNode(nodeValue);
      const toStringCallback = value => `name: ${value.name}, age: ${value.age}`;

      expect(node.toString(toStringCallback)).toBe('name: John, age: 20');
    });
  });
});
