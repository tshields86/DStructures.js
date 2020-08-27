const PriorityQueueNode = require('../PriorityQueueNode');

describe('PriorityQueueNode', () => {
  it('should create priority queue node with value', () => {
    const node = new PriorityQueueNode('foo', 1);

    expect(node.value).toBe('foo');
  });

  it('should create priority queue node with object as a value', () => {
    const nodeValue = { name: 'John', age: 20 };
    const node = new PriorityQueueNode(nodeValue, 1);

    expect(node.value.name).toBe('John');
    expect(node.value.age).toBe(20);
  });

  it('should link nodes together', () => {
    const node = new PriorityQueueNode('foo', 1);

    expect(node.priority).toBe(1);
  });
});
