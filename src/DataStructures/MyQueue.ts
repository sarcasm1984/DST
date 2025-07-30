// Queue class implementation using array
export class MyQueue<T> {
  private items: T[];
  private capacity: number;

  constructor(capacity: number = Infinity) {
    this.items = [];
    this.capacity = capacity;
  }

  // Add an element to the end of the queue (enqueue)
  enqueue(element: T): boolean {
    if (this.isFull()) {
      console.warn('Queue is full. Cannot enqueue more elements.');
      return false;
    }
    this.items.push(element);
    return true;
  }

  // Remove and return the first element from the queue (dequeue)
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      console.warn('Queue is empty. Cannot dequeue elements.');
      return undefined;
    }
    return this.items.shift();
  }

  // Return the first element without removing it (front/peek)
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // Return the last element without removing it (back/rear)
  back(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Check if the queue is full
  isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  // Get the current size of the queue
  size(): number {
    return this.items.length;
  }

  // Get the maximum capacity of the queue
  getCapacity(): number {
    return this.capacity;
  }

  // Clear all elements from the queue
  clear(): void {
    this.items = [];
  }

  // Convert the queue to an array
  toArray(): T[] {
    return [...this.items];
  }

  // Print the queue
  print(): void {
    if (this.isEmpty()) {
      console.log('Queue: [] (empty)');
    } else {
      console.log('Queue:', this.items.join(' <- '));
    }
  }

  // Search for an element and return its position (1-based index from front)
  search(element: T): number {
    const index = this.items.indexOf(element);
    return index !== -1 ? index + 1 : -1; // 1-based index
  }

  // Check if the queue contains a specific element
  contains(element: T): boolean {
    return this.items.includes(element);
  }

  // Get all elements as a string representation
  toString(): string {
    return this.items.join(', ');
  }

  // Create a copy of the queue
  clone(): MyQueue<T> {
    const newQueue = new MyQueue<T>(this.capacity);
    newQueue.items = [...this.items];
    return newQueue;
  }

  // Reverse the queue
  reverse(): void {
    this.items.reverse();
  }

  // Get the minimum element in the queue (if comparable)
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

  // Get the maximum element in the queue (if comparable)
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

  // Get the element at a specific position (0-based index)
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items[index];
  }

  // Set the element at a specific position (0-based index)
  setAt(index: number, element: T): boolean {
    if (index < 0 || index >= this.items.length) {
      return false;
    }
    this.items[index] = element;
    return true;
  }

  // Add multiple elements to the queue
  enqueueMultiple(elements: T[]): number {
    let addedCount = 0;
    for (const element of elements) {
      if (this.enqueue(element)) {
        addedCount++;
      } else {
        break; // Stop if queue becomes full
      }
    }
    return addedCount;
  }

  // Remove multiple elements from the queue
  dequeueMultiple(count: number): T[] {
    const removedElements: T[] = [];
    const actualCount = Math.min(count, this.size());
    
    for (let i = 0; i < actualCount; i++) {
      const element = this.dequeue();
      if (element !== undefined) {
        removedElements.push(element);
      }
    }
    return removedElements;
  }

  // Get a slice of the queue (similar to array slice)
  slice(start?: number, end?: number): T[] {
    return this.items.slice(start, end);
  }

  // Check if the queue is sorted (ascending)
  isSorted(): boolean {
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i] < this.items[i - 1]) {
        return false;
      }
    }
    return true;
  }

  // Sort the queue (modifies the original queue)
  sort(): void {
    this.items.sort();
  }

  // Get unique elements from the queue
  unique(): T[] {
    return [...new Set(this.items)];
  }

  // Count occurrences of a specific element
  count(element: T): number {
    return this.items.filter(item => item === element).length;
  }

  // Get the first occurrence of an element
  indexOf(element: T): number {
    return this.items.indexOf(element);
  }

  // Get the last occurrence of an element
  lastIndexOf(element: T): number {
    return this.items.lastIndexOf(element);
  }
} 