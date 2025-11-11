# Queue

A Queue implementation that maintains first-in, first-out (FIFO) ordering, enabling efficient O(1) enqueue and dequeue operations at opposite ends.

## Overview

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the back (enqueue) and removed from the front (dequeue), similar to a line of people waiting for service. This implementation uses a LinkedList internally to provide efficient O(1) operations for both adding and removing elements.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Enqueue (add) | O(1) | O(1) |
| Dequeue (remove) | O(1) | O(1) |
| Peek (front) | O(1) | O(1) |
| Search | O(n) | O(n) |
| Size | O(1) | O(1) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { Queue } from 'dstructures.js';

// Create an empty queue
const queue = new Queue<number>();

// Create from an iterable
const queue2 = new Queue([1, 2, 3, 4, 5]);

// Add elements (enqueue)
queue.enqueue(1);        // Queue: [1]
queue.enqueue(2);        // Queue: [1, 2]
queue.enqueue(3);        // Queue: [1, 2, 3]

// Alternative method
queue.add(4);            // Queue: [1, 2, 3, 4]

// Remove elements (dequeue)
const first = queue.dequeue();    // Returns 1, Queue: [2, 3, 4]
const second = queue.dequeue();   // Returns 2, Queue: [3, 4]

// Alternative method
const third = queue.remove();     // Returns 3, Queue: [4]

// Peek at front element without removing
const front = queue.peek();       // Returns 4, Queue: [4]

// Query the queue
console.log(queue.size);          // 1
console.log(queue.isEmpty());     // false

// Clear the queue
queue.clear();
console.log(queue.isEmpty());     // true

// Convert to/from array
queue.fromArray([10, 20, 30]);
const arr = queue.toArray();      // [10, 20, 30]

// Iterate over queue
for (const value of queue) {
  console.log(value);             // 10, 20, 30
}
```

## Advanced Examples

### Breadth-First Search (BFS) Traversal

```typescript
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

function bfs(root: TreeNode | undefined): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue = new Queue<TreeNode>();
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;
    result.push(node.value);

    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }

  return result;
}

// Example tree:
//       1
//      / \
//     2   3
//    / \
//   4   5
const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: { value: 3 }
};

console.log(bfs(tree)); // [1, 2, 3, 4, 5]
```

### Task Processing Queue

```typescript
interface Task {
  id: number;
  name: string;
  priority: number;
  execute: () => void;
}

class TaskProcessor {
  private queue: Queue<Task>;

  constructor() {
    this.queue = new Queue<Task>();
  }

  addTask(task: Task): void {
    this.queue.enqueue(task);
    console.log(`Task ${task.id} added: ${task.name}`);
  }

  processNext(): void {
    const task = this.queue.dequeue();
    if (task) {
      console.log(`Processing task ${task.id}: ${task.name}`);
      task.execute();
    } else {
      console.log('No tasks to process');
    }
  }

  processAll(): void {
    while (!this.queue.isEmpty()) {
      this.processNext();
    }
  }

  getPendingCount(): number {
    return this.queue.size;
  }

  peekNext(): Task | null {
    return this.queue.peek();
  }
}

// Usage
const processor = new TaskProcessor();

processor.addTask({
  id: 1,
  name: 'Send email',
  priority: 1,
  execute: () => console.log('Email sent!')
});

processor.addTask({
  id: 2,
  name: 'Generate report',
  priority: 2,
  execute: () => console.log('Report generated!')
});

processor.addTask({
  id: 3,
  name: 'Backup database',
  priority: 3,
  execute: () => console.log('Database backed up!')
});

console.log(`Pending tasks: ${processor.getPendingCount()}`); // 3
processor.processAll();
// Output:
// Processing task 1: Send email
// Email sent!
// Processing task 2: Generate report
// Report generated!
// Processing task 3: Backup database
// Database backed up!
```

### Print Queue System

```typescript
interface PrintJob {
  id: string;
  document: string;
  pages: number;
  user: string;
  timestamp: Date;
}

class PrinterQueue {
  private queue: Queue<PrintJob>;
  private printing: boolean = false;

  constructor() {
    this.queue = new Queue<PrintJob>();
  }

  submitJob(job: PrintJob): void {
    this.queue.enqueue(job);
    console.log(`Job ${job.id} submitted by ${job.user}: ${job.document}`);

    if (!this.printing) {
      this.startPrinting();
    }
  }

  private async startPrinting(): Promise<void> {
    this.printing = true;

    while (!this.queue.isEmpty()) {
      const job = this.queue.dequeue()!;
      await this.printJob(job);
    }

    this.printing = false;
    console.log('All jobs completed');
  }

  private async printJob(job: PrintJob): Promise<void> {
    console.log(`Printing: ${job.document} (${job.pages} pages)`);
    // Simulate printing time
    await new Promise(resolve => setTimeout(resolve, job.pages * 1000));
    console.log(`Completed: ${job.document}`);
  }

  getQueueStatus(): string[] {
    return this.queue.toArray().map(job =>
      `${job.id}: ${job.document} (${job.pages} pages)`
    );
  }

  getQueueLength(): number {
    return this.queue.size;
  }
}

// Usage
const printer = new PrinterQueue();

printer.submitJob({
  id: 'J001',
  document: 'Report.pdf',
  pages: 5,
  user: 'Alice',
  timestamp: new Date()
});

printer.submitJob({
  id: 'J002',
  document: 'Invoice.pdf',
  pages: 2,
  user: 'Bob',
  timestamp: new Date()
});

console.log('Queue:', printer.getQueueStatus());
```

### Message Queue Pattern

```typescript
interface Message {
  id: string;
  type: string;
  payload: any;
  timestamp: Date;
  retries: number;
}

class MessageQueue {
  private queue: Queue<Message>;
  private maxRetries: number;
  private processing: boolean = false;

  constructor(maxRetries: number = 3) {
    this.queue = new Queue<Message>();
    this.maxRetries = maxRetries;
  }

  publish(type: string, payload: any): void {
    const message: Message = {
      id: this.generateId(),
      type,
      payload,
      timestamp: new Date(),
      retries: 0
    };

    this.queue.enqueue(message);
    console.log(`Message published: ${message.id} (${type})`);

    if (!this.processing) {
      this.processMessages();
    }
  }

  private async processMessages(): Promise<void> {
    this.processing = true;

    while (!this.queue.isEmpty()) {
      const message = this.queue.dequeue()!;
      const success = await this.handleMessage(message);

      if (!success && message.retries < this.maxRetries) {
        message.retries++;
        console.log(`Retrying message ${message.id} (attempt ${message.retries})`);
        this.queue.enqueue(message);
      }
    }

    this.processing = false;
  }

  private async handleMessage(message: Message): Promise<boolean> {
    try {
      console.log(`Processing message ${message.id}: ${message.type}`);

      // Simulate message processing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Simulate occasional failures
      if (Math.random() < 0.1) {
        throw new Error('Processing failed');
      }

      console.log(`Message ${message.id} processed successfully`);
      return true;
    } catch (error) {
      console.error(`Error processing message ${message.id}:`, error);
      return false;
    }
  }

  private generateId(): string {
    return `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getQueueSize(): number {
    return this.queue.size;
  }

  isProcessing(): boolean {
    return this.processing;
  }
}

// Usage
const messageQueue = new MessageQueue(3);

messageQueue.publish('user.created', { userId: 123, name: 'John' });
messageQueue.publish('order.placed', { orderId: 456, total: 99.99 });
messageQueue.publish('email.send', { to: 'user@example.com', subject: 'Welcome' });

console.log(`Queue size: ${messageQueue.getQueueSize()}`);
```

## API Reference

### Constructor

- **`new Queue<T>(iterable?)`** - Creates a new queue, optionally populated from an iterable

### Properties

- **`size`** - Number of elements in the queue. *O(1)*

### Core Methods

- **`enqueue(value)`** - Add element to the back of the queue. *O(1)*
- **`dequeue()`** - Remove and return the front element. Returns null if empty. *O(1)*
- **`peek()`** - Get front element without removing it. Returns null if empty. *O(1)*

### Alias Methods

- **`add(value)`** - Alias for `enqueue()`. *O(1)*
- **`remove()`** - Alias for `dequeue()`. *O(1)*

### Utility Methods

- **`isEmpty()`** - Check if queue is empty. *O(1)*
- **`clear()`** - Remove all elements. *O(1)*
- **`toArray()`** - Convert to array (front to back). *O(n)*
- **`fromArray(array)`** - Populate from array. *O(n)*

### Iteration

- **`[Symbol.iterator]()`** - Iterate over values from front to back. *O(n)*

## When to Use

**Use Queue when:**
- You need FIFO (First-In-First-Out) ordering
- Implementing breadth-first search algorithms
- Managing task scheduling and job processing
- Handling asynchronous operations in order
- Implementing buffering systems (print queues, message queues)
- Level-order tree traversal
- Request handling in web servers

**Consider alternatives when:**
- You need LIFO ordering → Use Stack
- You need priority ordering → Use PriorityQueue or Heap
- You need random access → Use Array
- You need both ends frequently → Use Deque (Double-ended queue)

## Implementation Notes

This implementation:
- Uses a LinkedList internally for efficient O(1) enqueue and dequeue operations
- Maintains FIFO ordering strictly
- Provides both standard names (enqueue/dequeue) and simplified aliases (add/remove)
- Supports generic types for full TypeScript support
- Implements the iterable protocol for modern JavaScript patterns
- All mutating operations return the queue instance for method chaining (except dequeue which returns the removed value)
- Returns null for peek() and dequeue() operations on empty queues
- Memory-efficient with no pre-allocation required
