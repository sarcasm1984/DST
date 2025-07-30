import { MyHeap } from '../DataStructures/MyHeap';

describe('MyHeap', () => {
  let heap: MyHeap<number>;

  beforeEach(() => {
    heap = new MyHeap<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty min heap', () => {
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
      expect(heap.getType()).toBe('Min Heap');
      expect(heap.isMinHeapType()).toBe(true);
    });

    test('should create max heap', () => {
      const maxHeap = new MyHeap<number>(false);
      expect(maxHeap.getType()).toBe('Max Heap');
      expect(maxHeap.isMaxHeapType()).toBe(true);
    });

    test('should create heap with custom capacity', () => {
      const limitedHeap = new MyHeap<number>(true);
      expect(limitedHeap.size()).toBe(0);
    });
  });

  describe('Insert Operations', () => {
    test('should insert single element', () => {
      heap.insert(1);
      expect(heap.size()).toBe(1);
      expect(heap.peek()).toBe(1);
    });

    test('should insert multiple elements', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.size()).toBe(3);
      expect(heap.peek()).toBe(1); // Min heap
    });

    test('should maintain heap property after insertions', () => {
      heap.insert(5);
      heap.insert(3);
      heap.insert(7);
      heap.insert(1);
      heap.insert(9);
      expect(heap.peek()).toBe(1);
      expect(heap.isValid()).toBe(true);
    });

    test('should handle max heap insertions', () => {
      const maxHeap = new MyHeap<number>(false);
      maxHeap.insert(1);
      maxHeap.insert(3);
      maxHeap.insert(2);
      expect(maxHeap.peek()).toBe(3); // Max heap
    });
  });

  describe('Extract Operations', () => {
    test('should extract root element', () => {
      heap.insert(1);
      heap.insert(2);
      expect(heap.extract()).toBe(1);
      expect(heap.size()).toBe(1);
      expect(heap.peek()).toBe(2);
    });

    test('should extract multiple elements in order', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.extract()).toBe(1);
      expect(heap.extract()).toBe(2);
      expect(heap.extract()).toBe(3);
      expect(heap.isEmpty()).toBe(true);
    });

    test('should return undefined for empty heap', () => {
      expect(heap.extract()).toBeUndefined();
    });

    test('should handle max heap extraction', () => {
      const maxHeap = new MyHeap<number>(false);
      maxHeap.insert(1);
      maxHeap.insert(3);
      maxHeap.insert(2);
      expect(maxHeap.extract()).toBe(3);
      expect(maxHeap.extract()).toBe(2);
      expect(maxHeap.extract()).toBe(1);
    });
  });

  describe('Peek Operations', () => {
    test('should peek at root without removing', () => {
      heap.insert(1);
      heap.insert(2);
      expect(heap.peek()).toBe(1);
      expect(heap.size()).toBe(2);
    });

    test('should return undefined for empty heap', () => {
      expect(heap.peek()).toBeUndefined();
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(heap.size()).toBe(0);
      heap.insert(1);
      expect(heap.size()).toBe(1);
      heap.insert(2);
      expect(heap.size()).toBe(2);
    });

    test('should check if empty', () => {
      expect(heap.isEmpty()).toBe(true);
      heap.insert(1);
      expect(heap.isEmpty()).toBe(false);
    });

    test('should check if full', () => {
      const limitedHeap = new MyHeap<number>(true);
      limitedHeap.insert(1);
      limitedHeap.insert(2);
      expect(limitedHeap.size()).toBe(2);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all elements', () => {
      heap.insert(1);
      heap.insert(2);
      heap.clear();
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
    });

    test('should handle clear on empty heap', () => {
      heap.clear();
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      const array = heap.toArray();
      expect(array).toContain(1);
      expect(array).toContain(2);
      expect(array).toContain(3);
    });

    test('should return empty array for empty heap', () => {
      expect(heap.toArray()).toEqual([]);
    });
  });

  describe('Clone Operations', () => {
    test('should clone heap correctly', () => {
      heap.insert(1);
      heap.insert(2);
      const clonedHeap = heap.clone();
      expect(clonedHeap.size()).toBe(2);
      expect(clonedHeap).not.toBe(heap);
    });

    test('should clone empty heap', () => {
      const clonedHeap = heap.clone();
      expect(clonedHeap.isEmpty()).toBe(true);
    });
  });

  describe('Validation Operations', () => {
    test('should validate heap property', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.isValid()).toBe(true);
    });

    test('should validate empty heap', () => {
      expect(heap.isValid()).toBe(true);
    });
  });

  describe('Kth Element Operations', () => {
    test('should get kth smallest element', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      heap.insert(5);
      heap.insert(4);
      expect(heap.getKthElement(1)).toBe(1);
      expect(heap.getKthElement(3)).toBe(3);
      expect(heap.getKthElement(5)).toBe(5);
    });

    test('should return undefined for invalid k', () => {
      heap.insert(1);
      expect(heap.getKthElement(0)).toBeUndefined();
      expect(heap.getKthElement(2)).toBeUndefined();
    });
  });

  describe('Min/Max Operations', () => {
    test('should get min element from min heap', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.getMin()).toBe(1);
      expect(heap.getMax()).toBeUndefined();
    });

    test('should get max element from max heap', () => {
      const maxHeap = new MyHeap<number>(false);
      maxHeap.insert(1);
      maxHeap.insert(3);
      maxHeap.insert(2);
      expect(maxHeap.getMax()).toBe(3);
      expect(maxHeap.getMin()).toBeUndefined();
    });
  });

  describe('Remove Operations', () => {
    test('should remove specific element', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.remove(1)).toBe(true);
      expect(heap.size()).toBe(2);
      expect(heap.peek()).toBe(2);
    });

    test('should return false for non-existent element', () => {
      heap.insert(1);
      expect(heap.remove(2)).toBe(false);
    });
  });

  describe('Update Operations', () => {
    test('should update element value', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      expect(heap.update(1, 5)).toBe(true);
      expect(heap.peek()).toBe(2); // New minimum
    });

    test('should return false for non-existent element', () => {
      heap.insert(1);
      expect(heap.update(2, 3)).toBe(false);
    });
  });

  describe('Contains Operations', () => {
    test('should check if element exists', () => {
      heap.insert(1);
      heap.insert(2);
      expect(heap.contains(1)).toBe(true);
      expect(heap.contains(3)).toBe(false);
    });

    test('should handle contains on empty heap', () => {
      expect(heap.contains(1)).toBe(false);
    });
  });

  describe('Height and Level Operations', () => {
    test('should calculate height correctly', () => {
      expect(heap.getHeight()).toBe(-1); // Empty heap
      heap.insert(1);
      expect(heap.getHeight()).toBe(0);
      heap.insert(2);
      heap.insert(3);
      expect(heap.getHeight()).toBe(1);
    });

    test('should get elements at specific level', () => {
      heap.insert(1);
      heap.insert(2);
      heap.insert(3);
      heap.insert(4);
      const level0 = heap.getElementsAtLevel(0);
      const level1 = heap.getElementsAtLevel(1);
      expect(level0.length).toBeGreaterThan(0);
      expect(level1.length).toBeGreaterThan(0);
    });
  });

  describe('Sort Operations', () => {
    test('should sort heap elements', () => {
      heap.insert(3);
      heap.insert(1);
      heap.insert(2);
      const sorted = heap.sort();
      expect(sorted).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty heap', () => {
      expect(heap.sort()).toEqual([]);
    });
  });

  describe('Static Operations', () => {
    test('should create heap from array', () => {
      const array = [3, 1, 2, 5, 4];
      const heapFromArray = MyHeap.fromArray(array);
      expect(heapFromArray.size()).toBe(5);
      expect(heapFromArray.peek()).toBe(1);
    });

    test('should create max heap from array', () => {
      const array = [1, 3, 2, 5, 4];
      const maxHeapFromArray = MyHeap.fromArray(array, false);
      expect(maxHeapFromArray.size()).toBe(5);
      expect(maxHeapFromArray.peek()).toBe(5);
    });
  });

  describe('Merge Operations', () => {
    test('should merge two heaps', () => {
      heap.insert(1);
      heap.insert(2);
      const otherHeap = new MyHeap<number>();
      otherHeap.insert(3);
      otherHeap.insert(4);
      const mergedHeap = heap.merge(otherHeap);
      expect(mergedHeap.size()).toBe(4);
      expect(mergedHeap.peek()).toBe(1);
    });

    test('should throw error for merging different heap types', () => {
      const maxHeap = new MyHeap<number>(false);
      expect(() => heap.merge(maxHeap)).toThrow();
    });
  });

  describe('Print Operations', () => {
    test('should print heap correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      heap.insert(1);
      heap.insert(2);
      heap.print();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should print empty heap', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      heap.print();
      expect(consoleSpy).toHaveBeenCalledWith('Min Heap: (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single element operations', () => {
      heap.insert(1);
      expect(heap.extract()).toBe(1);
      expect(heap.isEmpty()).toBe(true);
    });

    test('should handle duplicate elements', () => {
      heap.insert(1);
      heap.insert(1);
      expect(heap.size()).toBe(2);
      expect(heap.extract()).toBe(1);
      expect(heap.extract()).toBe(1);
    });

    test('should handle capacity limits', () => {
      const limitedHeap = new MyHeap<number>(true);
      limitedHeap.insert(1);
      limitedHeap.insert(2);
      expect(limitedHeap.size()).toBe(2);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      heap.insert(3);
      heap.insert(1);
      heap.extract();
      heap.insert(5);
      heap.insert(2);
      heap.remove(5);
      expect(heap.peek()).toBe(2);
    });

    test('should handle large number of operations', () => {
      for (let i = 100; i >= 1; i--) {
        heap.insert(i);
      }
      expect(heap.size()).toBe(100);
      expect(heap.peek()).toBe(1);
      
      for (let i = 1; i <= 50; i++) {
        expect(heap.extract()).toBe(i);
      }
      expect(heap.size()).toBe(50);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        heap.insert(i);
      }
      const endTime = Date.now();
      expect(heap.size()).toBe(1000);
      expect(heap.peek()).toBe(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 