// Heap class implementation
export class MyHeap<T> {
  private heap: T[];
  private isMinHeap: boolean;
  private compare: (a: T, b: T) => number;

  constructor(isMinHeap: boolean = true, compare?: (a: T, b: T) => number) {
    this.heap = [];
    this.isMinHeap = isMinHeap;
    
    // Default comparison function for numbers
    if (compare) {
      this.compare = compare;
    } else {
      this.compare = (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };
    }
  }

  // Get the parent index of a given index
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // Get the left child index of a given index
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // Get the right child index of a given index
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  // Check if a node has a parent
  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  // Check if a node has a left child
  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  // Check if a node has a right child
  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  // Get the parent value
  private getParent(index: number): T {
    return this.heap[this.getParentIndex(index)];
  }

  // Get the left child value
  private getLeftChild(index: number): T {
    return this.heap[this.getLeftChildIndex(index)];
  }

  // Get the right child value
  private getRightChild(index: number): T {
    return this.heap[this.getRightChildIndex(index)];
  }

  // Swap two elements in the heap
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  // Check if the heap property is satisfied
  private shouldSwap(parent: T, child: T): boolean {
    const comparison = this.compare(parent, child);
    return this.isMinHeap ? comparison > 0 : comparison < 0;
  }

  // Heapify up (bubble up)
  private heapifyUp(): void {
    let index = this.heap.length - 1;
    
    while (this.hasParent(index) && this.shouldSwap(this.getParent(index), this.heap[index])) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Heapify down (bubble down)
  private heapifyDown(): void {
    let index = 0;
    
    while (this.hasLeftChild(index)) {
      let smallestChildIndex = this.getLeftChildIndex(index);
      
      if (this.hasRightChild(index) && this.shouldSwap(this.getLeftChild(index), this.getRightChild(index))) {
        smallestChildIndex = this.getRightChildIndex(index);
      }
      
      if (this.shouldSwap(this.heap[index], this.heap[smallestChildIndex])) {
        this.swap(index, smallestChildIndex);
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  // Insert a new element into the heap
  insert(element: T): void {
    this.heap.push(element);
    this.heapifyUp();
  }

  // Insert multiple elements into the heap
  insertMultiple(elements: T[]): void {
    for (const element of elements) {
      this.insert(element);
    }
  }

  // Remove and return the root element (min or max)
  extract(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.heap[0];
    const lastElement = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.heapifyDown();
    }

    return root;
  }

  // Peek at the root element without removing it
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  // Get the size of the heap
  size(): number {
    return this.heap.length;
  }

  // Check if the heap is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Clear all elements from the heap
  clear(): void {
    this.heap = [];
  }

  // Convert the heap to an array
  toArray(): T[] {
    return [...this.heap];
  }

  // Print the heap
  print(): void {
    if (this.isEmpty()) {
      console.log(`${this.isMinHeap ? 'Min' : 'Max'} Heap: (empty)`);
      return;
    }

    console.log(`${this.isMinHeap ? 'Min' : 'Max'} Heap:`, this.heap.join(', '));
  }

  // Get all elements as a string representation
  toString(): string {
    return this.heap.join(', ');
  }

  // Create a copy of the heap
  clone(): MyHeap<T> {
    const newHeap = new MyHeap<T>(this.isMinHeap, this.compare);
    newHeap.heap = [...this.heap];
    return newHeap;
  }

  // Check if the heap is valid (maintains heap property)
  isValid(): boolean {
    for (let i = 0; i < this.heap.length; i++) {
      const parent = this.heap[i];
      
      if (this.hasLeftChild(i)) {
        const leftChild = this.getLeftChild(i);
        if (this.shouldSwap(parent, leftChild)) {
          return false;
        }
      }
      
      if (this.hasRightChild(i)) {
        const rightChild = this.getRightChild(i);
        if (this.shouldSwap(parent, rightChild)) {
          return false;
        }
      }
    }
    
    return true;
  }

  // Get the kth smallest element (for min heap) or kth largest element (for max heap)
  getKthElement(k: number): T | undefined {
    if (k <= 0 || k > this.size()) {
      return undefined;
    }

    const tempHeap = this.clone();
    let result: T | undefined;

    for (let i = 0; i < k; i++) {
      result = tempHeap.extract();
    }

    return result;
  }

  // Get the minimum element (for min heap) or maximum element (for max heap)
  getMin(): T | undefined {
    return this.isMinHeap ? this.peek() : undefined;
  }

  // Get the maximum element (for max heap) or minimum element (for min heap)
  getMax(): T | undefined {
    return this.isMinHeap ? undefined : this.peek();
  }

  // Remove a specific element from the heap
  remove(element: T): boolean {
    const index = this.heap.indexOf(element);
    if (index === -1) {
      return false;
    }

    // Replace with the last element
    const lastElement = this.heap.pop()!;
    
    if (index < this.heap.length) {
      this.heap[index] = lastElement;
      
      // Heapify up or down as needed
      if (this.hasParent(index) && this.shouldSwap(this.getParent(index), this.heap[index])) {
        this.heapifyUpFromIndex(index);
      } else {
        this.heapifyDownFromIndex(index);
      }
    }

    return true;
  }

  // Heapify up from a specific index
  private heapifyUpFromIndex(index: number): void {
    while (this.hasParent(index) && this.shouldSwap(this.getParent(index), this.heap[index])) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // Heapify down from a specific index
  private heapifyDownFromIndex(index: number): void {
    while (this.hasLeftChild(index)) {
      let smallestChildIndex = this.getLeftChildIndex(index);
      
      if (this.hasRightChild(index) && this.shouldSwap(this.getLeftChild(index), this.getRightChild(index))) {
        smallestChildIndex = this.getRightChildIndex(index);
      }
      
      if (this.shouldSwap(this.heap[index], this.heap[smallestChildIndex])) {
        this.swap(index, smallestChildIndex);
        index = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  // Update the value of an element
  update(oldValue: T, newValue: T): boolean {
    const index = this.heap.indexOf(oldValue);
    if (index === -1) {
      return false;
    }

    this.heap[index] = newValue;
    
    // Heapify up or down as needed
    if (this.hasParent(index) && this.shouldSwap(this.getParent(index), this.heap[index])) {
      this.heapifyUpFromIndex(index);
    } else {
      this.heapifyDownFromIndex(index);
    }

    return true;
  }

  // Check if the heap contains a specific element
  contains(element: T): boolean {
    return this.heap.includes(element);
  }

  // Get the height of the heap
  getHeight(): number {
    if (this.isEmpty()) return -1;
    return Math.floor(Math.log2(this.heap.length));
  }

  // Get all elements at a specific level
  getElementsAtLevel(level: number): T[] {
    const elements: T[] = [];
    const startIndex = Math.pow(2, level) - 1;
    const endIndex = Math.min(Math.pow(2, level + 1) - 1, this.heap.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      elements.push(this.heap[i]);
    }
    
    return elements;
  }

  // Sort the heap (extract all elements in order)
  sort(): T[] {
    const sorted: T[] = [];
    const tempHeap = this.clone();
    
    while (!tempHeap.isEmpty()) {
      sorted.push(tempHeap.extract()!);
    }
    
    return sorted;
  }

  // Build heap from an array
  static fromArray<T>(array: T[], isMinHeap: boolean = true, compare?: (a: T, b: T) => number): MyHeap<T> {
    const heap = new MyHeap<T>(isMinHeap, compare);
    heap.heap = [...array];
    heap.buildHeap();
    return heap;
  }

  // Build heap property from the current array
  private buildHeap(): void {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDownFromIndex(i);
    }
  }

  // Merge two heaps
  merge(otherHeap: MyHeap<T>): MyHeap<T> {
    if (this.isMinHeap !== otherHeap.isMinHeap) {
      throw new Error('Cannot merge heaps of different types (min vs max)');
    }

    const mergedHeap = new MyHeap<T>(this.isMinHeap, this.compare);
    mergedHeap.heap = [...this.heap, ...otherHeap.heap];
    mergedHeap.buildHeap();
    
    return mergedHeap;
  }

  // Get the type of heap (min or max)
  getType(): string {
    return this.isMinHeap ? 'Min Heap' : 'Max Heap';
  }

  // Check if this is a min heap
  isMinHeapType(): boolean {
    return this.isMinHeap;
  }

  // Check if this is a max heap
  isMaxHeapType(): boolean {
    return !this.isMinHeap;
  }
} 