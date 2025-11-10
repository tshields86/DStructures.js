/**
 * Node with reference to next and previous elements in a doubly linked list.
 *
 * @template T - The type of value stored in the node
 * @category Data Structures
 */
export class DoublyLinkedListNode<T> {
  /**
   * The value stored in this node
   */
  public value: T;

  /**
   * Reference to the next node in the list
   */
  public next: DoublyLinkedListNode<T> | null;

  /**
   * Reference to the previous node in the list
   */
  public prev: DoublyLinkedListNode<T> | null;

  /**
   * Creates a new DoublyLinkedListNode
   *
   * @param value - The value to store in the node
   * @param next - Optional reference to the next node
   * @param prev - Optional reference to the previous node
   */
  constructor(
    value: T,
    next: DoublyLinkedListNode<T> | null = null,
    prev: DoublyLinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
