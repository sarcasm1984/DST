// Stack class implementation using array
export class MyStack<T> {
  private items: T[];
  private capacity: number;

  constructor(capacity: number = Infinity) {
    this.items = [];
    this.capacity = capacity;
  }

  // Push an element onto the top of the stack
  push(element: T): boolean {
    if (this.isFull()) {
      console.warn('Stack is full. Cannot push more elements.');
      return false;
    }
    this.items.push(element);
    return true;
  }

  // Remove and return the top element from the stack
  pop(): T | undefined {
    if (this.isEmpty()) {
      console.warn('Stack is empty. Cannot pop elements.');
      return undefined;
    }
    return this.items.pop();
  }

  // Return the top element without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Check if the stack is full
  isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  // Get the current size of the stack
  size(): number {
    return this.items.length;
  }

  // Get the maximum capacity of the stack
  getCapacity(): number {
    return this.capacity;
  }

  // Clear all elements from the stack
  clear(): void {
    this.items = [];
  }

  // Convert the stack to an array
  toArray(): T[] {
    return [...this.items];
  }

  // Print the stack
  print(): void {
    if (this.isEmpty()) {
      console.log('Stack: [] (empty)');
    } else {
      console.log('Stack:', this.items.join(' -> '));
    }
  }

  // Search for an element and return its position (1-based index from top)
  search(element: T): number {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i] === element) {
        return this.items.length - i; // 1-based index from top
      }
    }
    return -1; // Element not found
  }

  // Check if the stack contains a specific element
  contains(element: T): boolean {
    return this.items.includes(element);
  }

  // Get all elements as a string representation
  toString(): string {
    return this.items.join(', ');
  }

  // Create a copy of the stack
  clone(): MyStack<T> {
    const newStack = new MyStack<T>(this.capacity);
    newStack.items = [...this.items];
    return newStack;
  }

  // Reverse the stack
  reverse(): void {
    this.items.reverse();
  }

  // Get the minimum element in the stack (if comparable)
  min(): T | undefined {
    if (this.isEmpty()) return undefined;
    
    let minElement = this.items[0];
    for (const item of this.items) {
      if (item < minElement) {
        minElement = item;
      }
    }
    return minElement;
  }

  // Get the maximum element in the stack (if comparable)
  max(): T | undefined {
    if (this.isEmpty()) return undefined;
    
    let maxElement = this.items[0];
    for (const item of this.items) {
      if (item > maxElement) {
        maxElement = item;
      }
    }
    return maxElement;
  }

  // Remove all occurrences of a specific element
  removeAll(element: T): number {
    const initialSize = this.items.length;
    this.items = this.items.filter(item => item !== element);
    return initialSize - this.items.length;
  }

  // Get the element at a specific position (0-based index from bottom)
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items[index];
  }

  // Set the element at a specific position (0-based index from bottom)
  setAt(index: number, element: T): boolean {
    if (index < 0 || index >= this.items.length) {
      return false;
    }
    this.items[index] = element;
    return true;
  }
} 