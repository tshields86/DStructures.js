# PriorityQueue

A priority queue implementation where elements are dequeued based on their priority rather than insertion order. Built on top of a Heap data structure for efficient O(log n) insertion and removal operations.

## Overview

A priority queue is an abstract data type similar to a regular queue, but where each element has an associated priority. Elements with higher priority are dequeued before elements with lower priority, regardless of their insertion order. This implementation uses a heap-based approach to maintain efficient operations while supporting priority changes and custom priority comparators.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| offer (insert) | O(log n) | O(log n) |
| poll (remove highest) | O(log n) | O(log n) |
| peek | O(1) | O(1) |
| changePriority | O(n log n) | O(n log n) |
| removeValue | O(n log n) | O(n log n) |
| find | O(n) | O(n) |
| has | O(n) | O(n) |

**Space Complexity:** O(n)

## Basic Usage

```typescript
import { PriorityQueue } from 'dstructures.js';

// Create an empty priority queue (lower priority numbers = higher priority)
const pq = new PriorityQueue<string>();

// Add elements with priorities
pq.offer('Low priority task', 5);
pq.offer('High priority task', 1);
pq.offer('Medium priority task', 3);

// Remove elements (highest priority first)
console.log(pq.poll()); // 'High priority task' (priority 1)
console.log(pq.poll()); // 'Medium priority task' (priority 3)
console.log(pq.poll()); // 'Low priority task' (priority 5)

// Peek at highest priority element without removing
pq.offer('Task A', 2);
pq.offer('Task B', 1);
console.log(pq.peek()); // 'Task B' (priority 1)
console.log(pq.peek()); // Still 'Task B' (not removed)

// Query the queue
console.log(pq.size);           // Number of elements
console.log(pq.isEmpty());      // Check if empty
console.log(pq.has('Task A'));  // Check if value exists

// Method chaining
pq.offer('Task 1', 1)
  .offer('Task 2', 2)
  .offer('Task 3', 3);
```

## Advanced Examples

### Task Scheduling by Priority

```typescript
interface Task {
  id: string;
  name: string;
  description: string;
}

const taskQueue = new PriorityQueue<Task>();

// Add tasks with different priorities
taskQueue.offer(
  { id: '1', name: 'Fix critical bug', description: 'App crashes on login' },
  1 // Critical priority
);

taskQueue.offer(
  { id: '2', name: 'Write documentation', description: 'Update API docs' },
  3 // Low priority
);

taskQueue.offer(
  { id: '3', name: 'Review pull request', description: 'Review security PR' },
  2 // Medium priority
);

// Process tasks by priority
while (!taskQueue.isEmpty()) {
  const task = taskQueue.poll();
  console.log(`Processing: ${task?.name}`);
  // Output:
  // Processing: Fix critical bug
  // Processing: Review pull request
  // Processing: Write documentation
}
```

### Event Processing System

```typescript
interface Event {
  type: string;
  timestamp: number;
  handler: () => void;
}

// Custom comparator: earlier timestamps have higher priority
const eventQueue = new PriorityQueue<Event>(
  (a, b) => a - b // Lower timestamp = higher priority
);

eventQueue.offer(
  { type: 'CLICK', timestamp: 1000, handler: () => console.log('Click') },
  1000
);

eventQueue.offer(
  { type: 'SCROLL', timestamp: 500, handler: () => console.log('Scroll') },
  500
);

eventQueue.offer(
  { type: 'KEYPRESS', timestamp: 750, handler: () => console.log('Keypress') },
  750
);

// Process events in chronological order
while (!eventQueue.isEmpty()) {
  const event = eventQueue.poll();
  event?.handler();
  // Output:
  // Scroll (timestamp 500)
  // Keypress (timestamp 750)
  // Click (timestamp 1000)
}
```

### Changing Element Priorities

```typescript
interface Job {
  id: string;
  name: string;
}

const jobQueue = new PriorityQueue<Job>();

const job1 = { id: '1', name: 'Backup database' };
const job2 = { id: '2', name: 'Send emails' };
const job3 = { id: '3', name: 'Generate report' };

jobQueue.offer(job1, 3); // Low priority
jobQueue.offer(job2, 2); // Medium priority
jobQueue.offer(job3, 1); // High priority

// Urgent: backup needs to happen now!
jobQueue.changePriority(job1, 0); // Now highest priority

console.log(jobQueue.poll()?.name); // 'Backup database'
console.log(jobQueue.poll()?.name); // 'Generate report'
console.log(jobQueue.poll()?.name); // 'Send emails'
```

### Custom Priority Comparators

```typescript
interface Patient {
  name: string;
  age: number;
  condition: string;
}

// Higher priority numbers = more urgent (reverse default behavior)
const emergencyRoom = new PriorityQueue<Patient>(
  (a, b) => b - a // Higher number = higher priority
);

emergencyRoom.offer(
  { name: 'John', age: 45, condition: 'Broken arm' },
  5
);

emergencyRoom.offer(
  { name: 'Sarah', age: 67, condition: 'Heart attack' },
  10
);

emergencyRoom.offer(
  { name: 'Mike', age: 23, condition: 'Minor cut' },
  2
);

// Patients treated by urgency (higher priority first)
while (!emergencyRoom.isEmpty()) {
  const patient = emergencyRoom.poll();
  console.log(`Treating: ${patient?.name} - ${patient?.condition}`);
  // Output:
  // Treating: Sarah - Heart attack (priority 10)
  // Treating: John - Broken arm (priority 5)
  // Treating: Mike - Minor cut (priority 2)
}
```

### Hospital Emergency Room Simulation

```typescript
interface EmergencyCase {
  patientId: string;
  arrivalTime: Date;
  severity: 'critical' | 'urgent' | 'standard' | 'non-urgent';
  symptoms: string;
}

// Map severity levels to numeric priorities
const severityToPriority = {
  'critical': 1,
  'urgent': 2,
  'standard': 3,
  'non-urgent': 4
};

const emergencyQueue = new PriorityQueue<EmergencyCase>();

// Patients arrive throughout the day
const patients: EmergencyCase[] = [
  {
    patientId: 'P001',
    arrivalTime: new Date('2024-01-15T08:00:00'),
    severity: 'standard',
    symptoms: 'Flu-like symptoms'
  },
  {
    patientId: 'P002',
    arrivalTime: new Date('2024-01-15T08:05:00'),
    severity: 'critical',
    symptoms: 'Chest pain, difficulty breathing'
  },
  {
    patientId: 'P003',
    arrivalTime: new Date('2024-01-15T08:10:00'),
    severity: 'urgent',
    symptoms: 'Deep laceration'
  },
  {
    patientId: 'P004',
    arrivalTime: new Date('2024-01-15T08:15:00'),
    severity: 'non-urgent',
    symptoms: 'Minor rash'
  }
];

// Add all patients to the queue
patients.forEach(patient => {
  emergencyQueue.offer(patient, severityToPriority[patient.severity]);
});

// New critical patient arrives - bump their priority
const criticalPatient = {
  patientId: 'P005',
  arrivalTime: new Date('2024-01-15T08:20:00'),
  severity: 'critical' as const,
  symptoms: 'Severe bleeding'
};

emergencyQueue.offer(criticalPatient, severityToPriority[criticalPatient.severity]);

// Simulate patient condition worsening
const patientToUpdate = patients[0]; // P001
if (emergencyQueue.has(patientToUpdate)) {
  // Condition worsened - change from standard to urgent
  emergencyQueue.changePriority(patientToUpdate, severityToPriority['urgent']);
}

// Process patients in order of severity
console.log('Emergency Room Processing Order:');
let position = 1;
while (!emergencyQueue.isEmpty()) {
  const patient = emergencyQueue.poll();
  if (patient) {
    console.log(`${position}. ${patient.patientId} - ${patient.severity}`);
    console.log(`   Symptoms: ${patient.symptoms}`);
    console.log(`   Arrival: ${patient.arrivalTime.toLocaleTimeString()}\n`);
    position++;
  }
}
// Output:
// Emergency Room Processing Order:
// 1. P002 - critical
//    Symptoms: Chest pain, difficulty breathing
//    Arrival: 8:05:00 AM
//
// 2. P005 - critical
//    Symptoms: Severe bleeding
//    Arrival: 8:20:00 AM
//
// 3. P001 - urgent (updated from standard)
//    Symptoms: Flu-like symptoms
//    Arrival: 8:00:00 AM
//
// 4. P003 - urgent
//    Symptoms: Deep laceration
//    Arrival: 8:10:00 AM
//
// 5. P004 - non-urgent
//    Symptoms: Minor rash
//    Arrival: 8:15:00 AM
```

### Dijkstra's Algorithm (Shortest Path)

```typescript
interface GraphNode {
  id: string;
  distance: number;
}

function dijkstra(
  graph: Map<string, Map<string, number>>,
  start: string
): Map<string, number> {
  const distances = new Map<string, number>();
  const pq = new PriorityQueue<GraphNode>();
  const visited = new Set<string>();

  // Initialize distances
  for (const node of graph.keys()) {
    distances.set(node, node === start ? 0 : Infinity);
  }

  pq.offer({ id: start, distance: 0 }, 0);

  while (!pq.isEmpty()) {
    const current = pq.poll();
    if (!current || visited.has(current.id)) continue;

    visited.add(current.id);
    const neighbors = graph.get(current.id);

    if (neighbors) {
      for (const [neighbor, weight] of neighbors) {
        if (visited.has(neighbor)) continue;

        const newDistance = current.distance + weight;
        const oldDistance = distances.get(neighbor) ?? Infinity;

        if (newDistance < oldDistance) {
          distances.set(neighbor, newDistance);
          pq.offer({ id: neighbor, distance: newDistance }, newDistance);
        }
      }
    }
  }

  return distances;
}

// Example usage
const graph = new Map([
  ['A', new Map([['B', 4], ['C', 2]])],
  ['B', new Map([['C', 1], ['D', 5]])],
  ['C', new Map([['D', 8], ['E', 10]])],
  ['D', new Map([['E', 2]])],
  ['E', new Map()]
]);

const distances = dijkstra(graph, 'A');
console.log('Shortest distances from A:');
for (const [node, distance] of distances) {
  console.log(`${node}: ${distance}`);
}
// Output:
// A: 0
// B: 4
// C: 2
// D: 9
// E: 11
```

## API Reference

### Constructor

- **`new PriorityQueue<T>(compareFn?)`** - Creates a new priority queue with an optional custom comparator
  - `compareFn`: Optional comparison function for priorities. Default: `(a, b) => a - b` (lower numbers = higher priority)

### Properties

- **`size`** - Number of elements in the queue
- **`container`** - Internal heap array (read-only access)

### Insertion Methods

- **`offer(value, priority)`** - Add element with priority. *O(log n)*
  - Returns: The queue instance for chaining
- **`add(value, priority)`** - Alias for `offer()`. *O(log n)*

### Removal Methods

- **`poll()`** - Remove and return highest priority element. *O(log n)*
  - Returns: The value with highest priority, or `null` if empty
- **`remove()`** - Alias for `poll()`. *O(log n)*
- **`removeValue(value)`** - Remove all occurrences of a specific value. *O(n log n)*
- **`clear()`** - Remove all elements. *O(1)*

### Access Methods

- **`peek()`** - Get highest priority element without removing it. *O(1)*
  - Returns: The value with highest priority, or `null` if empty

### Query Methods

- **`has(value)`** - Check if value exists in queue. *O(n)*
- **`find(value)`** - Find all indices where value exists. *O(n)*
- **`isEmpty()`** - Check if queue is empty. *O(1)*

### Priority Management

- **`changePriority(value, newPriority)`** - Change priority of an element. *O(n log n)*
  - Removes old entry and re-adds with new priority
  - Returns: The queue instance for chaining

### Transformation Methods

- **`toValueArray()`** - Convert to array of values (in heap order). *O(n)*

## When to Use

**Use PriorityQueue when:**
- You need to process elements in priority order rather than insertion order
- Implementing scheduling algorithms (task schedulers, job queues)
- Building graph algorithms (Dijkstra's, Prim's, A* pathfinding)
- Managing event systems where events have different urgencies
- Implementing resource allocation systems
- Building simulation systems with prioritized events

**Consider alternatives when:**
- You need FIFO ordering → Use Queue or Array
- All priorities are equal → Use Queue or Stack
- You need fast random access → Use Array or HashMap
- Priorities never change → Consider sorted array for better space efficiency

## Implementation Notes

This implementation:
- Built on top of Heap data structure for efficient operations
- Uses generic types for full TypeScript support
- Default behavior: lower priority numbers = higher priority (configurable with custom comparator)
- Supports changing priorities dynamically with `changePriority()`
- Supports method chaining for fluent API style
- Allows duplicate values with different priorities
- Uses `PriorityQueueNode` internally to pair values with priorities
- Provides both standard names (`offer`/`poll`) and aliases (`add`/`remove`)
