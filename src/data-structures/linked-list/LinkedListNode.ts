/**
 * Node with reference to next element in a singly linked list.
 *
 * @template T - The type of value stored in the node
 * @category Data Structures
 */
export class LinkedListNode<T> {
  /**
   * The value stored in this node
   */
  public value: T;

  /**
   * Reference to the next node in the list
   */
  public next: LinkedListNode<T> | null;

  /**
   * Creates a new LinkedListNode
   *
   * @param value - The value to store in the node
   * @param next - Optional reference to the next node
   */
  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
