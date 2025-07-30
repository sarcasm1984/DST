import { MyStack } from '../DataStructures/MyStack';

describe('MyStack', () => {
  let stack: MyStack<number>;

  beforeEach(() => {
    stack = new MyStack<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty stack', () => {
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
      expect(stack.getCapacity()).toBe(Infinity);
    });

    test('should create stack with custom capacity', () => {
      const limitedStack = new MyStack<number>(3);
      expect(limitedStack.getCapacity()).toBe(3);
    });
  });

  describe('Push Operations', () => {
    test('should push single element', () => {
      expect(stack.push(1)).toBe(true);
      expect(stack.size()).toBe(1);
      expect(stack.peek()).toBe(1);
    });

    test('should push multiple elements', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.size()).toBe(3);
      expect(stack.peek()).toBe(3);
    });

    test('should handle push to full stack', () => {
      const limitedStack = new MyStack<number>(2);
      limitedStack.push(1);
      limitedStack.push(2);
      expect(limitedStack.push(3)).toBe(false);
      expect(limitedStack.size()).toBe(2);
    });
  });

  describe('Pop Operations', () => {
    test('should pop single element', () => {
      stack.push(1);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });

    test('should pop multiple elements in LIFO order', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });

    test('should return undefined for empty stack', () => {
      expect(stack.pop()).toBeUndefined();
    });
  });

  describe('Peek Operations', () => {
    test('should peek at top element without removing', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.peek()).toBe(2);
      expect(stack.size()).toBe(2);
    });

    test('should return undefined for empty stack', () => {
      expect(stack.peek()).toBeUndefined();
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(stack.size()).toBe(0);
      stack.push(1);
      expect(stack.size()).toBe(1);
      stack.push(2);
      expect(stack.size()).toBe(2);
    });

    test('should check if empty', () => {
      expect(stack.isEmpty()).toBe(true);
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });

    test('should check if full', () => {
      const limitedStack = new MyStack<number>(2);
      expect(limitedStack.isFull()).toBe(false);
      limitedStack.push(1);
      limitedStack.push(2);
      expect(limitedStack.isFull()).toBe(true);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all elements', () => {
      stack.push(1);
      stack.push(2);
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });

    test('should handle clear on empty stack', () => {
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.toArray()).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty stack', () => {
      expect(stack.toArray()).toEqual([]);
    });
  });

  describe('Search Operations', () => {
    test('should search for existing element', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.search(2)).toBe(2); // 2nd from top
      expect(stack.search(1)).toBe(3); // 3rd from top
    });

    test('should return -1 for non-existent element', () => {
      stack.push(1);
      expect(stack.search(2)).toBe(-1);
    });

    test('should handle search in empty stack', () => {
      expect(stack.search(1)).toBe(-1);
    });
  });

  describe('Contains Operations', () => {
    test('should check if element exists', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.contains(1)).toBe(true);
      expect(stack.contains(3)).toBe(false);
    });

    test('should handle contains on empty stack', () => {
      expect(stack.contains(1)).toBe(false);
    });
  });

  describe('Clone Operations', () => {
    test('should clone stack correctly', () => {
      stack.push(1);
      stack.push(2);
      const clonedStack = stack.clone();
      expect(clonedStack.size()).toBe(2);
      expect(clonedStack.toArray()).toEqual([1, 2]);
      expect(clonedStack).not.toBe(stack);
    });

    test('should clone empty stack', () => {
      const clonedStack = stack.clone();
      expect(clonedStack.isEmpty()).toBe(true);
    });
  });

  describe('Reverse Operations', () => {
    test('should reverse stack order', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.reverse();
      expect(stack.toArray()).toEqual([3, 2, 1]);
    });

    test('should handle reverse on empty stack', () => {
      stack.reverse();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('Min/Max Operations', () => {
    test('should find minimum element', () => {
      stack.push(3);
      stack.push(1);
      stack.push(2);
      expect(stack.min()).toBe(1);
    });

    test('should find maximum element', () => {
      stack.push(1);
      stack.push(3);
      stack.push(2);
      expect(stack.max()).toBe(3);
    });

    test('should return undefined for empty stack', () => {
      expect(stack.min()).toBeUndefined();
      expect(stack.max()).toBeUndefined();
    });
  });

  describe('Remove Operations', () => {
    test('should remove all occurrences of element', () => {
      stack.push(1);
      stack.push(2);
      stack.push(1);
      stack.push(3);
      expect(stack.removeAll(1)).toBe(2);
      expect(stack.toArray()).toEqual([2, 3]);
    });

    test('should return 0 for non-existent element', () => {
      stack.push(1);
      expect(stack.removeAll(2)).toBe(0);
    });
  });

  describe('Index Operations', () => {
    test('should get element at index', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.getAt(0)).toBe(1);
      expect(stack.getAt(1)).toBe(2);
      expect(stack.getAt(2)).toBe(3);
    });

    test('should set element at index', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.setAt(0, 5)).toBe(true);
      expect(stack.getAt(0)).toBe(5);
    });

    test('should return undefined for invalid index', () => {
      expect(stack.getAt(0)).toBeUndefined();
      expect(stack.setAt(0, 1)).toBe(false);
    });
  });

  describe('Print Operations', () => {
    test('should print stack correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      stack.push(1);
      stack.push(2);
      stack.print();
      expect(consoleSpy).toHaveBeenCalledWith('Stack:', '1 -> 2');
      consoleSpy.mockRestore();
    });

    test('should print empty stack', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      stack.print();
      expect(consoleSpy).toHaveBeenCalledWith('Stack: [] (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single element operations', () => {
      stack.push(1);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });

    test('should handle duplicate elements', () => {
      stack.push(1);
      stack.push(1);
      expect(stack.size()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(1);
    });

    test('should handle capacity limits', () => {
      const limitedStack = new MyStack<number>(1);
      limitedStack.push(1);
      expect(limitedStack.push(2)).toBe(false);
      expect(limitedStack.size()).toBe(1);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      stack.push(1);
      stack.push(2);
      stack.pop();
      stack.push(3);
      stack.push(4);
      stack.pop();
      expect(stack.toArray()).toEqual([1, 3]);
    });

    test('should handle large number of operations', () => {
      for (let i = 0; i < 100; i++) {
        stack.push(i);
      }
      expect(stack.size()).toBe(100);
      
      for (let i = 99; i >= 0; i--) {
        expect(stack.pop()).toBe(i);
      }
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        stack.push(i);
      }
      const endTime = Date.now();
      expect(stack.size()).toBe(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 