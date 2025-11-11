# Stack

A Last-In-First-Out (LIFO) data structure that allows elements to be added and removed from only one end, called the top of the stack.

## Overview

A stack is a linear data structure that follows the LIFO (Last-In-First-Out) principle, meaning the last element added is the first one to be removed. Think of it like a stack of plates: you can only add or remove plates from the top. This implementation uses a LinkedList internally to provide efficient O(1) push and pop operations.

Stacks are fundamental in computer science and are used in function call management, expression parsing, backtracking algorithms, and undo/redo functionality.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(n) |
| isEmpty | O(1) | O(1) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { Stack } from 'dstructures.js';

// Create an empty stack
const stack = new Stack<number>();

// Create from an iterable
const stack2 = new Stack([1, 2, 3, 4, 5]);

// Add elements (push to top)
stack.push(1);        // Stack: [1]
stack.push(2);        // Stack: [2, 1]
stack.push(3);        // Stack: [3, 2, 1]

// Peek at top element without removing
const top = stack.peek();     // 3
console.log(stack.size);      // 3

// Remove elements (pop from top)
stack.pop();          // Returns 3, Stack: [2, 1]
stack.pop();          // Returns 2, Stack: [1]

// Query the stack
console.log(stack.isEmpty());  // false
console.log(stack.size);       // 1

// Clear all elements
stack.clear();
console.log(stack.isEmpty());  // true

// Convert to array
const arr = stack.toArray();   // [top, ..., bottom]
```

## Advanced Examples

### Depth-First Search (DFS) Traversal

```typescript
interface GraphNode {
  value: string;
  neighbors: GraphNode[];
}

function dfsIterative(start: GraphNode): string[] {
  const stack = new Stack<GraphNode>();
  const visited = new Set<GraphNode>();
  const result: string[] = [];

  stack.push(start);

  while (!stack.isEmpty()) {
    const node = stack.pop()!;

    if (!visited.has(node)) {
      visited.add(node);
      result.push(node.value);

      // Push neighbors in reverse order to process left-to-right
      for (let i = node.neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(node.neighbors[i])) {
          stack.push(node.neighbors[i]);
        }
      }
    }
  }

  return result;
}

// Example usage
const nodeA: GraphNode = { value: 'A', neighbors: [] };
const nodeB: GraphNode = { value: 'B', neighbors: [] };
const nodeC: GraphNode = { value: 'C', neighbors: [] };
const nodeD: GraphNode = { value: 'D', neighbors: [] };

nodeA.neighbors = [nodeB, nodeC];
nodeB.neighbors = [nodeD];
nodeC.neighbors = [nodeD];

console.log(dfsIterative(nodeA)); // ['A', 'B', 'D', 'C']
```

### Balanced Parentheses Checker

```typescript
function isBalanced(expression: string): boolean {
  const stack = new Stack<string>();
  const pairs: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of expression) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log(isBalanced('()')); // true
console.log(isBalanced('({[]})')); // true
console.log(isBalanced('({[})')); // false
console.log(isBalanced('(()')); // false
```

### Undo/Redo Mechanism

```typescript
interface Action {
  type: string;
  data: any;
}

class UndoRedoManager<T extends Action> {
  private undoStack = new Stack<T>();
  private redoStack = new Stack<T>();

  execute(action: T): void {
    this.undoStack.push(action);
    this.redoStack.clear(); // Clear redo stack on new action
  }

  undo(): T | null {
    const action = this.undoStack.pop();
    if (action) {
      this.redoStack.push(action);
    }
    return action;
  }

  redo(): T | null {
    const action = this.redoStack.pop();
    if (action) {
      this.undoStack.push(action);
    }
    return action;
  }

  canUndo(): boolean {
    return !this.undoStack.isEmpty();
  }

  canRedo(): boolean {
    return !this.redoStack.isEmpty();
  }
}

// Example usage
const manager = new UndoRedoManager<Action>();
manager.execute({ type: 'INSERT', data: 'Hello' });
manager.execute({ type: 'INSERT', data: ' World' });

console.log(manager.canUndo()); // true
const undone = manager.undo(); // { type: 'INSERT', data: ' World' }
console.log(manager.canRedo()); // true
const redone = manager.redo(); // { type: 'INSERT', data: ' World' }
```

### Postfix Expression Evaluation

```typescript
function evaluatePostfix(expression: string): number {
  const stack = new Stack<number>();
  const tokens = expression.split(' ');

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    }
  }

  return stack.pop()!;
}

console.log(evaluatePostfix('3 4 + 2 *')); // 14
console.log(evaluatePostfix('5 1 2 + 4 * + 3 -')); // 14
```

### Browser History Simulation

```typescript
class BrowserHistory {
  private backStack = new Stack<string>();
  private forwardStack = new Stack<string>();
  private currentPage: string;

  constructor(homepage: string) {
    this.currentPage = homepage;
  }

  visit(url: string): void {
    this.backStack.push(this.currentPage);
    this.currentPage = url;
    this.forwardStack.clear(); // Clear forward history on new visit
  }

  back(): string {
    if (!this.backStack.isEmpty()) {
      this.forwardStack.push(this.currentPage);
      this.currentPage = this.backStack.pop()!;
    }
    return this.currentPage;
  }

  forward(): string {
    if (!this.forwardStack.isEmpty()) {
      this.backStack.push(this.currentPage);
      this.currentPage = this.forwardStack.pop()!;
    }
    return this.currentPage;
  }

  getCurrentPage(): string {
    return this.currentPage;
  }
}

// Example usage
const browser = new BrowserHistory('google.com');
browser.visit('github.com');
browser.visit('stackoverflow.com');

console.log(browser.getCurrentPage()); // 'stackoverflow.com'
console.log(browser.back()); // 'github.com'
console.log(browser.back()); // 'google.com'
console.log(browser.forward()); // 'github.com'
```

### Function Call Stack Simulation

```typescript
interface CallFrame {
  functionName: string;
  arguments: any[];
  lineNumber: number;
}

class CallStack {
  private stack = new Stack<CallFrame>();

  pushFrame(functionName: string, args: any[], lineNumber: number): void {
    this.stack.push({ functionName, arguments: args, lineNumber });
  }

  popFrame(): CallFrame | null {
    return this.stack.pop();
  }

  getStackTrace(): string[] {
    return this.stack.toArray().map(
      frame => `at ${frame.functionName}(${frame.arguments.join(', ')}) line ${frame.lineNumber}`
    );
  }

  getDepth(): number {
    return this.stack.size;
  }
}

// Example usage
const callStack = new CallStack();
callStack.pushFrame('main', [], 1);
callStack.pushFrame('processData', [42], 15);
callStack.pushFrame('validateInput', ['test'], 22);

console.log(callStack.getStackTrace());
// [
//   "at validateInput(test) line 22",
//   "at processData(42) line 15",
//   "at main() line 1"
// ]

console.log(callStack.getDepth()); // 3
callStack.popFrame();
console.log(callStack.getDepth()); // 2
```

## API Reference

### Constructor

- **`new Stack<T>(iterable?)`** - Creates a new stack, optionally populated from an iterable

### Properties

- **`size`** - Number of elements in the stack. *O(1)*

### Stack Operations

- **`push(value)`** - Add element to the top of the stack. Returns the stack instance for chaining. *O(1)*
- **`pop()`** - Remove and return the top element. Returns null if empty. *O(1)*
- **`peek()`** - Get the top element without removing it. Returns null if empty. *O(1)*
- **`add(value)`** - Alias for `push()`. *O(1)*
- **`remove()`** - Alias for `pop()`. *O(1)*

### Query Methods

- **`isEmpty()`** - Check if the stack is empty. *O(1)*

### Utility Methods

- **`clear()`** - Remove all elements from the stack. *O(1)*
- **`toArray()`** - Convert stack to array (top to bottom order). *O(n)*
- **`fromArray(values)`** - Populate stack from array. *O(n)*

## When to Use

**Use Stack when:**
- You need LIFO (Last-In-First-Out) ordering
- Implementing depth-first search or backtracking algorithms
- Managing function calls, recursion simulation, or execution contexts
- Parsing expressions or checking syntax (parentheses matching)
- Implementing undo/redo functionality
- Reversing sequences
- Navigating hierarchical structures

**Consider alternatives when:**
- You need FIFO ordering → Use Queue
- You need random access → Use Array
- You need to access elements from both ends → Use Deque
- You need efficient search → Use Set or Map

## Implementation Notes

This implementation:
- Built on LinkedList for optimal O(1) push and pop operations
- Uses the head of the LinkedList as the top of the stack
- Implements the iterable protocol for modern JavaScript patterns
- Provides method chaining for push, clear, and fromArray operations
- Uses generic types for full TypeScript support
- All operations are performed at the head of the underlying LinkedList, ensuring constant time complexity
- The toArray() method returns elements in top-to-bottom order
