// Set class implementation using array
export class MySet<T> {
  private items: T[];
  private capacity: number;

  constructor(capacity: number = Infinity) {
    this.items = [];
    this.capacity = capacity;
  }

  // Add an element to the set (if not already present)
  add(element: T): boolean {
    if (this.isFull()) {
      console.warn('Set is full. Cannot add more elements.');
      return false;
    }
    
    if (!this.has(element)) {
      this.items.push(element);
      return true;
    }
    return false; // Element already exists
  }

  // Remove an element from the set
  delete(element: T): boolean {
    const index = this.items.indexOf(element);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Check if an element exists in the set
  has(element: T): boolean {
    return this.items.includes(element);
  }

  // Get the size of the set
  size(): number {
    return this.items.length;
  }

  // Check if the set is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Check if the set is full
  isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  // Get the maximum capacity of the set
  getCapacity(): number {
    return this.capacity;
  }

  // Clear all elements from the set
  clear(): void {
    this.items = [];
  }

  // Convert the set to an array
  toArray(): T[] {
    return [...this.items];
  }

  // Print the set
  print(): void {
    if (this.isEmpty()) {
      console.log('Set: {} (empty)');
    } else {
      console.log('Set:', this.items.join(', '));
    }
  }

  // Get all elements as a string representation
  toString(): string {
    return this.items.join(', ');
  }

  // Create a copy of the set
  clone(): MySet<T> {
    const newSet = new MySet<T>(this.capacity);
    newSet.items = [...this.items];
    return newSet;
  }

  // Union of two sets (A ∪ B)
  union(otherSet: MySet<T>): MySet<T> {
    const unionSet = new MySet<T>();
    
    // Add all elements from this set
    for (const item of this.items) {
      unionSet.add(item);
    }
    
    // Add all elements from the other set
    for (const item of otherSet.items) {
      unionSet.add(item);
    }
    
    return unionSet;
  }

  // Intersection of two sets (A ∩ B)
  intersection(otherSet: MySet<T>): MySet<T> {
    const intersectionSet = new MySet<T>();
    
    for (const item of this.items) {
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    }
    
    return intersectionSet;
  }

  // Difference of two sets (A - B)
  difference(otherSet: MySet<T>): MySet<T> {
    const differenceSet = new MySet<T>();
    
    for (const item of this.items) {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    }
    
    return differenceSet;
  }

  // Symmetric difference of two sets (A △ B)
  symmetricDifference(otherSet: MySet<T>): MySet<T> {
    const symmetricDiffSet = new MySet<T>();
    
    // Add elements from this set that are not in otherSet
    for (const item of this.items) {
      if (!otherSet.has(item)) {
        symmetricDiffSet.add(item);
      }
    }
    
    // Add elements from otherSet that are not in this set
    for (const item of otherSet.items) {
      if (!this.has(item)) {
        symmetricDiffSet.add(item);
      }
    }
    
    return symmetricDiffSet;
  }

  // Check if this set is a subset of another set
  isSubset(otherSet: MySet<T>): boolean {
    for (const item of this.items) {
      if (!otherSet.has(item)) {
        return false;
      }
    }
    return true;
  }

  // Check if this set is a superset of another set
  isSuperset(otherSet: MySet<T>): boolean {
    return otherSet.isSubset(this);
  }

  // Check if two sets are equal
  equals(otherSet: MySet<T>): boolean {
    if (this.size() !== otherSet.size()) {
      return false;
    }
    return this.isSubset(otherSet);
  }

  // Check if two sets are disjoint (no common elements)
  isDisjoint(otherSet: MySet<T>): boolean {
    for (const item of this.items) {
      if (otherSet.has(item)) {
        return false;
      }
    }
    return true;
  }

  // Add multiple elements to the set
  addMultiple(elements: T[]): number {
    let addedCount = 0;
    for (const element of elements) {
      if (this.add(element)) {
        addedCount++;
      }
    }
    return addedCount;
  }

  // Remove multiple elements from the set
  deleteMultiple(elements: T[]): number {
    let removedCount = 0;
    for (const element of elements) {
      if (this.delete(element)) {
        removedCount++;
      }
    }
    return removedCount;
  }

  // Get a random element from the set
  random(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * this.items.length);
    return this.items[randomIndex];
  }

  // Get the first element from the set
  first(): T | undefined {
    return this.items[0];
  }

  // Get the last element from the set
  last(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Get the minimum element in the set (if comparable)
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

  // Get the maximum element in the set (if comparable)
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

  // Sort the set (modifies the original set)
  sort(): void {
    this.items.sort();
  }

  // Get a sorted copy of the set
  sorted(): T[] {
    return [...this.items].sort();
  }

  // Filter elements based on a predicate
  filter(predicate: (element: T) => boolean): MySet<T> {
    const filteredSet = new MySet<T>();
    for (const item of this.items) {
      if (predicate(item)) {
        filteredSet.add(item);
      }
    }
    return filteredSet;
  }

  // Map elements using a transformation function
  map<U>(transform: (element: T) => U): MySet<U> {
    const mappedSet = new MySet<U>();
    for (const item of this.items) {
      mappedSet.add(transform(item));
    }
    return mappedSet;
  }

  // Reduce the set to a single value
  reduce<U>(reducer: (accumulator: U, element: T) => U, initialValue: U): U {
    let accumulator = initialValue;
    for (const item of this.items) {
      accumulator = reducer(accumulator, item);
    }
    return accumulator;
  }

  // Check if all elements satisfy a predicate
  every(predicate: (element: T) => boolean): boolean {
    for (const item of this.items) {
      if (!predicate(item)) {
        return false;
      }
    }
    return true;
  }

  // Check if any element satisfies a predicate
  some(predicate: (element: T) => boolean): boolean {
    for (const item of this.items) {
      if (predicate(item)) {
        return true;
      }
    }
    return false;
  }

  // Get the element at a specific position (0-based index)
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items[index];
  }

  // Get all elements as an iterator
  [Symbol.iterator](): Iterator<T> {
    return this.items[Symbol.iterator]();
  }
} 