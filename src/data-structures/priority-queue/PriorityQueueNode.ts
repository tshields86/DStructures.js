/**
 * Node with value and priority for use in PriorityQueue.
 *
 * @template T - The type of value stored in the node
 * @category Data Structures
 */
export class PriorityQueueNode<T> {
  /**
   * The value stored in this node
   */
  public value: T;

  /**
   * The priority of this node (lower number = higher priority by default)
   */
  public priority: number;

  /**
   * Creates a new PriorityQueueNode
   *
   * @param value - The value to store
   * @param priority - The priority of the value
   */
  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}
