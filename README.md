# Data Structures and Algorithms in TypeScript

A comprehensive collection of data structures and algorithms implemented in TypeScript with full test coverage.

## 📚 Data Structures Implemented

### 1. **Linked List** (`MyLinkedList`)
- Singly linked list with generic type support
- Operations: append, prepend, remove, search, contains
- Methods: `getSize()`, `isEmpty()`, `toArray()`, `print()`, `clear()`

### 2. **Hash Map** (`MyHashMap`)
- Generic key-value storage with collision handling
- Dynamic resizing and load factor management
- Operations: put, get, remove, containsKey, containsValue
- Methods: `keys()`, `values()`, `entries()`, `getCapacity()`, `getLoadFactor()`

### 3. **Stack** (`MyStack`)
- LIFO (Last In, First Out) data structure
- Configurable capacity (default: infinite)
- Operations: push, pop, peek
- Methods: `isEmpty()`, `isFull()`, `size()`, `search()`, `contains()`

### 4. **Queue** (`MyQueue`)
- FIFO (First In, First Out) data structure
- Configurable capacity (default: infinite)
- Operations: enqueue, dequeue, front, back
- Methods: `isEmpty()`, `isFull()`, `size()`, `search()`, `contains()`

### 5. **Set** (`MySet`)
- Collection of unique elements
- Set theory operations: union, intersection, difference, symmetric difference
- Methods: `add()`, `delete()`, `has()`, `size()`, `isEmpty()`

### 6. **Tree** (`MyTree`)
- Multi-child tree with configurable minimum children (default: 2)
- Traversal: preorder, postorder, level order
- Methods: `addChild()`, `remove()`, `getHeight()`, `getDepth()`, `isBalanced()`

### 7. **Graph** (`MyGraph`)
- Directed and undirected graph support
- Weighted edges with customizable weights
- Algorithms: DFS, BFS, shortest path, cycle detection, topological sort
- Methods: `addVertex()`, `addEdge()`, `hasPath()`, `getConnectedComponents()`

### 8. **Heap** (`MyHeap`)
- Min/Max heap with priority queue functionality
- Configurable comparison functions
- Operations: insert, extract, peek
- Methods: `getMin()`, `getMax()`, `getKthElement()`, `isValid()`

### 9. **Trie** (`MyTrie`)
- Prefix tree for efficient string operations
- Pattern matching and autocomplete functionality
- Methods: `insert()`, `search()`, `startsWith()`, `getWordsWithPrefix()`

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd DST

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the project
npm run build
```

## 🧪 Testing

The project includes comprehensive test suites for all data structures:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage
- **9 Test Suites**: All data structures
- **394 Tests**: Comprehensive coverage
- **100% Pass Rate**: All tests passing

## 📁 Project Structure

```
DST/
├── src/
│   ├── DataStructures/
│   │   ├── MyLinkedList.ts
│   │   ├── MyHashMap.ts
│   │   ├── MyStack.ts
│   │   ├── MyQueue.ts
│   │   ├── MySet.ts
│   │   ├── MyTree.ts
│   │   ├── MyGraph.ts
│   │   ├── MyHeap.ts
│   │   └── MyTrie.ts
│   ├── Test/
│   │   ├── MyLinkedList.test.ts
│   │   ├── MyHashMap.test.ts
│   │   ├── MyStack.test.ts
│   │   ├── MyQueue.test.ts
│   │   ├── MySet.test.ts
│   │   ├── MyTree.test.ts
│   │   ├── MyGraph.test.ts
│   │   ├── MyHeap.test.ts
│   │   └── MyTrie.test.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 💻 Usage Examples

### Linked List
```typescript
import { MyLinkedList } from './src/DataStructures/MyLinkedList';

const list = new MyLinkedList<number>();
list.append(1);
list.append(2);
list.prepend(0);
console.log(list.toArray()); // [0, 1, 2]
```

### Hash Map
```typescript
import { MyHashMap } from './src/DataStructures/MyHashMap';

const map = new MyHashMap<string, number>();
map.put('key1', 1);
map.put('key2', 2);
console.log(map.get('key1')); // 1
```

### Stack
```typescript
import { MyStack } from './src/DataStructures/MyStack';

const stack = new MyStack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
```

### Queue
```typescript
import { MyQueue } from './src/DataStructures/MyQueue';

const queue = new MyQueue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

### Set
```typescript
import { MySet } from './src/DataStructures/MySet';

const set = new MySet<number>();
set.add(1);
set.add(2);
set.add(1); // Duplicate, won't be added
console.log(set.size()); // 2
```

### Tree
```typescript
import { MyTree } from './src/DataStructures/MyTree';

const tree = new MyTree<number>();
tree.addToRoot(1);
tree.addChild(1, 2);
tree.addChild(1, 3);
console.log(tree.preorder()); // [1, 2, 3]
```

### Graph
```typescript
import { MyGraph } from './src/DataStructures/MyGraph';

const graph = new MyGraph<string>();
graph.addVertex('A');
graph.addVertex('B');
graph.addEdge('A', 'B', 5);
console.log(graph.hasPath('A', 'B')); // true
```

### Heap
```typescript
import { MyHeap } from './src/DataStructures/MyHeap';

const heap = new MyHeap<number>(); // Min heap
heap.insert(3);
heap.insert(1);
heap.insert(2);
console.log(heap.peek()); // 1
```

### Trie
```typescript
import { MyTrie } from './src/DataStructures/MyTrie';

const trie = new MyTrie();
trie.insert('hello');
trie.insert('world');
console.log(trie.search('hello')); // true
console.log(trie.startsWith('hel')); // true
```

## 🔧 Development

### Adding New Data Structures
1. Create a new file in `src/DataStructures/`
2. Implement the data structure with TypeScript
3. Add comprehensive tests in `src/Test/`
4. Export the class from `src/index.ts`
5. Run tests to ensure everything works

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- MyLinkedList.test.ts

# Run tests with verbose output
npm test -- --verbose
```

## 📊 Performance

All data structures are optimized for:
- **Time Complexity**: Efficient algorithms implemented
- **Space Complexity**: Memory-efficient implementations
- **Type Safety**: Full TypeScript support with generics
- **Error Handling**: Comprehensive error checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript for type safety
- Tested with Jest for comprehensive coverage
- Inspired by classic data structures and algorithms

---

**Happy Coding! 🚀** 