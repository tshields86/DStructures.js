# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DStructures.js is a modern TypeScript library providing type-safe data structures and algorithms. The library is built with ESM modules, comprehensive test coverage (555+ tests with 90% coverage thresholds), and follows strict TypeScript compilation settings.

**Key characteristics:**
- Zero dependencies runtime
- Full generic type support with strict null checks (`noUncheckedIndexedAccess`)
- ESM-only (no CommonJS)
- Published as npm package `dstructures.js` with three entry points: main, data-structures, and algorithms

## Development Commands

### Building & Development
```bash
npm run build          # Build for production using tsup
npm run dev           # Build in watch mode
npm run type-check    # TypeScript type checking (no emit)
```

### Testing
```bash
npm test              # Run all tests once with Vitest
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run coverage      # Generate coverage report (90% thresholds required)
```

### Code Quality
```bash
npm run lint          # Lint TypeScript files
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without changes
npm run ci            # Run full CI pipeline (lint + type-check + test)
```

### Other Commands
```bash
npm run docs          # Generate TypeDoc documentation
npm run bench         # Run benchmarks
npm run prepare       # Install husky hooks (runs automatically on npm install)
```

## Architecture

### Source Structure

```
src/
├── index.ts                    # Main entry point (re-exports everything)
├── data-structures/
│   ├── index.ts               # Data structures entry point
│   ├── linked-list/           # LinkedList + LinkedListNode
│   ├── doubly-linked-list/    # DoublyLinkedList + DoublyLinkedListNode
│   ├── stack/                 # LIFO Stack
│   ├── queue/                 # FIFO Queue
│   ├── tree/                  # BinarySearchTree, BinaryTreeNode, BinarySearchTreeNode
│   ├── heap/                  # Heap base class, MinHeap, MaxHeap
│   ├── priority-queue/        # PriorityQueue + PriorityQueueNode
│   ├── map/                   # HashMap (hash table with insertion order)
│   ├── set/                   # HashSet (with set operations)
│   └── graph/                 # Graph + GraphVertex + EdgeDirection enum
├── algorithms/
│   ├── index.ts               # Algorithms entry point
│   ├── sorting/               # bubbleSort, insertionSort, selectionSort, mergeSort, quickSort
│   ├── search/                # binarySearch, binarySearchRecursive
│   └── graph/                 # dijkstra + helper functions
└── utils/
    └── utils.ts               # swap, isOdd, isPrime, nextPrime, CompareFn type
```

### Build Output

The build creates three entry points via tsup:
1. `dist/index.js` - Main export (all data structures + algorithms)
2. `dist/data-structures/index.js` - Data structures only
3. `dist/algorithms/index.js` - Algorithms only

### Code Patterns

**Every data structure and algorithm includes:**
- Comprehensive JSDoc comments with `@template`, `@param`, `@returns`
- Time/space complexity documented in JSDoc (e.g., "Time complexity: O(n)")
- `@category` tags for documentation organization
- Usage examples in JSDoc `@example` blocks
- Full TypeScript generic type support
- Iterability where applicable (implements `Iterable<T>`)

**Class structure conventions:**
- Public properties for size, head, tail, etc.
- Constructor accepts optional `Iterable<T>` to initialize from arrays/other iterables
- Methods return `this` for chaining where appropriate
- Node classes are separate files (e.g., `LinkedListNode`, `GraphVertex`)

**Testing patterns:**
- Test files colocated with implementation (e.g., `LinkedList.ts` + `LinkedList.test.ts`)
- Tests use Vitest with globals enabled
- Each test file has comprehensive edge case coverage

## Development Workflow

### Pre-commit Hooks
The repository uses Husky to enforce quality gates before commits:
1. `npm run lint` - ESLint with Airbnb base config
2. `npm run type-check` - TypeScript strict type checking
3. `npm run test` - Full test suite must pass

All three must succeed for commits to proceed.

### Type Safety
TypeScript is configured with strict settings:
- `strict: true` (all strict checks enabled)
- `noUnusedLocals`, `noUnusedParameters` - No unused code
- `noImplicitReturns` - All code paths must return
- `noUncheckedIndexedAccess` - Array access returns `T | undefined`
- `noFallthroughCasesInSwitch` - Switch cases must break/return

Always handle `undefined` cases when accessing arrays or using optional chaining.

### ESLint Configuration
Based on Airbnb with modifications:
- Bitwise operators allowed
- Multi-assign allowed
- No param reassign on properties
- For-of loops allowed
- Underscore dangle allowed
- Arrow parens as needed

### Publishing Workflow
```bash
npm run prepublishOnly  # Automatically runs CI + build before publish
```

## Implementation Guidelines

### When Adding New Data Structures
1. Create directory under `src/data-structures/{name}/`
2. Implement main class with full generics: `class MyStructure<T>`
3. Create separate Node class if applicable (e.g., `MyStructureNode<T>`)
4. Implement `Iterable<T>` interface if the structure can be traversed
5. Add comprehensive tests in colocated `.test.ts` file
6. Document time/space complexity for every public method
7. Export from `src/data-structures/index.ts`
8. Export from main `src/index.ts`

### When Adding New Algorithms
1. Create file under `src/algorithms/{category}/{name}.ts`
2. Support generic types with `CompareFn<T>` parameter for custom comparison
3. Include both iterative and recursive variants where applicable
4. Document algorithm complexity in JSDoc (best, average, worst case)
5. Add comprehensive tests including edge cases
6. Export from `src/algorithms/index.ts`
7. Export from main `src/index.ts`

### Comparison Functions
Use the standard `CompareFn<T>` type from utils:
```typescript
type CompareFn<T> = (a: T, b: T) => number;
```
- Return negative if a < b
- Return positive if a > b
- Return 0 if equal

Default numeric comparator: `(a, b) => a - b`

## Testing Requirements

- Maintain 90% coverage thresholds (lines, functions, branches, statements)
- Test edge cases: empty structures, single element, null/undefined handling
- Test method chaining where applicable
- Test iterator protocol for iterable structures
- Test custom comparators for sorting/searching algorithms
- Test graph traversal (BFS/DFS) and shortest path algorithms

## Important Notes

- This is an ESM-only package; do not add CommonJS support
- All sorting algorithms operate in-place on arrays
- HashMap and HashSet maintain insertion order
- Graph supports both directed and undirected edges via `EdgeDirection` enum
- BinarySearchTree is self-balancing
- PriorityQueue is min-heap by default (lower priority = higher precedence)
