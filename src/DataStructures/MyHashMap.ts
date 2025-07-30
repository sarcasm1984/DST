// Entry class for key-value pairs
class Entry<K, V> {
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

// HashMap class implementation
export class MyHashMap<K, V> {
  private buckets: Entry<K, V>[][];
  private size: number;
  private capacity: number;
  private loadFactor: number;

  constructor(initialCapacity: number = 16, loadFactor: number = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Hash function
  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.capacity;
  }

  // Put a key-value pair into the hash map
  put(key: K, value: V): void {
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (const entry of bucket) {
      if (this.isEqual(entry.key, key)) {
        entry.value = value;
        return;
      }
    }

    // Add new entry
    bucket.push(new Entry(key, value));
    this.size++;
  }

  // Get value by key
  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (this.isEqual(entry.key, key)) {
        return entry.value;
      }
    }
    return undefined;
  }

  // Remove a key-value pair
  remove(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (this.isEqual(bucket[i].key, key)) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  // Check if key exists
  containsKey(key: K): boolean {
    return this.get(key) !== undefined;
  }

  // Check if value exists
  containsValue(value: V): boolean {
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        if (this.isEqual(entry.value, value)) {
          return true;
        }
      }
    }
    return false;
  }

  // Get all keys
  keys(): K[] {
    const keys: K[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    return keys;
  }

  // Get all values
  values(): V[] {
    const values: V[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    return values;
  }

  // Get all entries
  entries(): Entry<K, V>[] {
    const entries: Entry<K, V>[] = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry);
      }
    }
    return entries;
  }

  // Get the size of the hash map
  getSize(): number {
    return this.size;
  }

  // Check if the hash map is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear all entries
  clear(): void {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Resize the hash map when load factor is exceeded
  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    // Rehash all entries
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.put(entry.key, entry.value);
      }
    }
  }

  // Helper method to compare keys and values
  private isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a === 'object' && typeof b === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return false;
  }

  // Print the hash map
  print(): void {
    console.log('HashMap:');
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket.length > 0) {
        console.log(`Bucket ${i}:`, bucket.map(entry => `${entry.key}:${entry.value}`).join(', '));
      }
    }
  }

  // Get the current capacity
  getCapacity(): number {
    return this.capacity;
  }

  // Get the load factor
  getLoadFactor(): number {
    return this.loadFactor;
  }
} 