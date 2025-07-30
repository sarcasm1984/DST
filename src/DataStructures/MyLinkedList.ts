// Node class for the linked list
class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

// LinkedList class implementation
export class MyLinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a new node at the end of the list
  append(data: T): void {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Add a new node at the beginning of the list
  prepend(data: T): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Remove the first occurrence of a node with the given data
  remove(data: T): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Check if the list contains a node with the given data
  contains(data: T): boolean {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Get the size of the list
  getSize(): number {
    return this.size;
  }

  // Check if the list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Convert the list to an array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Print the list
  print(): void {
    let current = this.head;
    const elements: T[] = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log('LinkedList:', elements.join(' -> '));
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.size = 0;
  }
} 