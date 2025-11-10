const DoublyLinkedListNode = require('../DoublyLinkedListNode');

describe('DoublyLinkedListNode', () => {
  it('should create linked list node with value', () => {
    const node = new DoublyLinkedListNode('foo');

    expect(node.value).toBe('foo');
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should create linked list node with object as a value', () => {
    const nodeValue = { name: 'John', age: 20 };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.value.name).toBe('John');
    expect(node.value.age).toBe(20);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should link nodes together', () => {
    const node2 = new DoublyLinkedListNode(2);
    const node1 = new DoublyLinkedListNode(1, node2);
    const node3 = new DoublyLinkedListNode(3, node1, node2);

    expect(node1.next).toBeDefined();
    expect(node1.prev).toBeNull();
    expect(node2.next).toBeNull();
    expect(node2.prev).toBeNull();
    expect(node3.next).toBeDefined();
    expect(node3.prev).toBeDefined();
    expect(node1.value).toBe(1);
    expect(node1.next.value).toBe(2);
    expect(node3.next.value).toBe(1);
    expect(node3.prev.value).toBe(2);
  });
});
