import { MyQueue } from '../DataStructures/MyQueue';

describe('MyQueue', () => {
  let queue: MyQueue<number>;

  beforeEach(() => {
    queue = new MyQueue<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty queue', () => {
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
      expect(queue.getCapacity()).toBe(Infinity);
    });

    test('should create queue with custom capacity', () => {
      const limitedQueue = new MyQueue<number>(3);
      expect(limitedQueue.getCapacity()).toBe(3);
    });
  });

  describe('Enqueue Operations', () => {
    test('should enqueue single element', () => {
      expect(queue.enqueue(1)).toBe(true);
      expect(queue.size()).toBe(1);
      expect(queue.front()).toBe(1);
    });

    test('should enqueue multiple elements', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.size()).toBe(3);
      expect(queue.front()).toBe(1);
    });

    test('should handle enqueue to full queue', () => {
      const limitedQueue = new MyQueue<number>(2);
      limitedQueue.enqueue(1);
      limitedQueue.enqueue(2);
      expect(limitedQueue.enqueue(3)).toBe(false);
      expect(limitedQueue.size()).toBe(2);
    });
  });

  describe('Dequeue Operations', () => {
    test('should dequeue single element', () => {
      queue.enqueue(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should dequeue multiple elements in FIFO order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should return undefined for empty queue', () => {
      expect(queue.dequeue()).toBeUndefined();
    });
  });

  describe('Front and Back Operations', () => {
    test('should get front element without removing', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.front()).toBe(1);
      expect(queue.size()).toBe(2);
    });

    test('should get back element without removing', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.back()).toBe(2);
      expect(queue.size()).toBe(2);
    });

    test('should return undefined for empty queue', () => {
      expect(queue.front()).toBeUndefined();
      expect(queue.back()).toBeUndefined();
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(queue.size()).toBe(0);
      queue.enqueue(1);
      expect(queue.size()).toBe(1);
      queue.enqueue(2);
      expect(queue.size()).toBe(2);
    });

    test('should check if empty', () => {
      expect(queue.isEmpty()).toBe(true);
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should check if full', () => {
      const limitedQueue = new MyQueue<number>(2);
      expect(limitedQueue.isFull()).toBe(false);
      limitedQueue.enqueue(1);
      limitedQueue.enqueue(2);
      expect(limitedQueue.isFull()).toBe(true);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all elements', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
    });

    test('should handle clear on empty queue', () => {
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.toArray()).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty queue', () => {
      expect(queue.toArray()).toEqual([]);
    });
  });

  describe('Search Operations', () => {
    test('should search for existing element', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.search(2)).toBe(2); // 2nd position
      expect(queue.search(1)).toBe(1); // 1st position
    });

    test('should return -1 for non-existent element', () => {
      queue.enqueue(1);
      expect(queue.search(2)).toBe(-1);
    });

    test('should handle search in empty queue', () => {
      expect(queue.search(1)).toBe(-1);
    });
  });

  describe('Contains Operations', () => {
    test('should check if element exists', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.contains(1)).toBe(true);
      expect(queue.contains(3)).toBe(false);
    });

    test('should handle contains on empty queue', () => {
      expect(queue.contains(1)).toBe(false);
    });
  });

  describe('Clone Operations', () => {
    test('should clone queue correctly', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      const clonedQueue = queue.clone();
      expect(clonedQueue.size()).toBe(2);
      expect(clonedQueue.toArray()).toEqual([1, 2]);
      expect(clonedQueue).not.toBe(queue);
    });

    test('should clone empty queue', () => {
      const clonedQueue = queue.clone();
      expect(clonedQueue.isEmpty()).toBe(true);
    });
  });

  describe('Reverse Operations', () => {
    test('should reverse queue order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.reverse();
      expect(queue.toArray()).toEqual([3, 2, 1]);
    });

    test('should handle reverse on empty queue', () => {
      queue.reverse();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Min/Max Operations', () => {
    test('should find minimum element', () => {
      queue.enqueue(3);
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.min()).toBe(1);
    });

    test('should find maximum element', () => {
      queue.enqueue(1);
      queue.enqueue(3);
      queue.enqueue(2);
      expect(queue.max()).toBe(3);
    });

    test('should return undefined for empty queue', () => {
      expect(queue.min()).toBeUndefined();
      expect(queue.max()).toBeUndefined();
    });
  });

  describe('Remove Operations', () => {
    test('should remove all occurrences of element', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(1);
      queue.enqueue(3);
      expect(queue.removeAll(1)).toBe(2);
      expect(queue.toArray()).toEqual([2, 3]);
    });

    test('should return 0 for non-existent element', () => {
      queue.enqueue(1);
      expect(queue.removeAll(2)).toBe(0);
    });
  });

  describe('Index Operations', () => {
    test('should get element at index', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.getAt(0)).toBe(1);
      expect(queue.getAt(1)).toBe(2);
      expect(queue.getAt(2)).toBe(3);
    });

    test('should set element at index', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.setAt(0, 5)).toBe(true);
      expect(queue.getAt(0)).toBe(5);
    });

    test('should return undefined for invalid index', () => {
      expect(queue.getAt(0)).toBeUndefined();
      expect(queue.setAt(0, 1)).toBe(false);
    });
  });

  describe('Multiple Operations', () => {
    test('should enqueue multiple elements', () => {
      expect(queue.enqueueMultiple([1, 2, 3])).toBe(3);
      expect(queue.size()).toBe(3);
      expect(queue.toArray()).toEqual([1, 2, 3]);
    });

    test('should dequeue multiple elements', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      const dequeued = queue.dequeueMultiple(2);
      expect(dequeued).toEqual([1, 2]);
      expect(queue.size()).toBe(2);
    });

    test('should handle partial dequeue', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      const dequeued = queue.dequeueMultiple(5);
      expect(dequeued).toEqual([1, 2]);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Slice Operations', () => {
    test('should slice queue correctly', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      expect(queue.slice(1, 3)).toEqual([2, 3]);
    });

    test('should handle empty slice', () => {
      expect(queue.slice()).toEqual([]);
    });
  });

  describe('Sort Operations', () => {
    test('should check if sorted', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.isSorted()).toBe(true);
    });

    test('should sort queue', () => {
      queue.enqueue(3);
      queue.enqueue(1);
      queue.enqueue(2);
      queue.sort();
      expect(queue.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('Unique Operations', () => {
    test('should get unique elements', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(1);
      queue.enqueue(3);
      expect(queue.unique()).toEqual([1, 2, 3]);
    });
  });

  describe('Count Operations', () => {
    test('should count occurrences', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(1);
      expect(queue.count(1)).toBe(2);
      expect(queue.count(2)).toBe(1);
      expect(queue.count(3)).toBe(0);
    });
  });

  describe('Index Of Operations', () => {
    test('should find first occurrence', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(1);
      expect(queue.indexOf(1)).toBe(0);
      expect(queue.indexOf(2)).toBe(1);
    });

    test('should find last occurrence', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(1);
      expect(queue.lastIndexOf(1)).toBe(2);
      expect(queue.lastIndexOf(2)).toBe(1);
    });
  });

  describe('Print Operations', () => {
    test('should print queue correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.print();
      expect(consoleSpy).toHaveBeenCalledWith('Queue:', '1 <- 2');
      consoleSpy.mockRestore();
    });

    test('should print empty queue', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      queue.print();
      expect(consoleSpy).toHaveBeenCalledWith('Queue: [] (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single element operations', () => {
      queue.enqueue(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should handle duplicate elements', () => {
      queue.enqueue(1);
      queue.enqueue(1);
      expect(queue.size()).toBe(2);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(1);
    });

    test('should handle capacity limits', () => {
      const limitedQueue = new MyQueue<number>(1);
      limitedQueue.enqueue(1);
      expect(limitedQueue.enqueue(2)).toBe(false);
      expect(limitedQueue.size()).toBe(1);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.enqueue(3);
      queue.enqueue(4);
      queue.dequeue();
      expect(queue.toArray()).toEqual([3, 4]);
    });

    test('should handle large number of operations', () => {
      for (let i = 0; i < 100; i++) {
        queue.enqueue(i);
      }
      expect(queue.size()).toBe(100);
      
      for (let i = 0; i < 100; i++) {
        expect(queue.dequeue()).toBe(i);
      }
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        queue.enqueue(i);
      }
      const endTime = Date.now();
      expect(queue.size()).toBe(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 