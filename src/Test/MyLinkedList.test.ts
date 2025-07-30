import { MyLinkedList } from '../DataStructures/MyLinkedList';

describe('MyLinkedList', () => {
  let list: MyLinkedList<number>;

  beforeEach(() => {
    list = new MyLinkedList<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty linked list', () => {
      expect(list.isEmpty()).toBe(true);
      expect(list.getSize()).toBe(0);
    });
  });

  describe('Append Operations', () => {
    test('should append single element', () => {
      list.append(1);
      expect(list.getSize()).toBe(1);
      expect(list.contains(1)).toBe(true);
    });

    test('should append multiple elements', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.getSize()).toBe(3);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    test('should handle empty append', () => {
      list.append(1);
      expect(list.getSize()).toBe(1);
    });
  });

  describe('Prepend Operations', () => {
    test('should prepend single element', () => {
      list.prepend(1);
      expect(list.getSize()).toBe(1);
      expect(list.contains(1)).toBe(true);
    });

    test('should prepend multiple elements', () => {
      list.prepend(1);
      list.prepend(2);
      list.prepend(3);
      expect(list.getSize()).toBe(3);
      expect(list.toArray()).toEqual([3, 2, 1]);
    });

    test('should prepend to existing list', () => {
      list.append(1);
      list.append(2);
      list.prepend(0);
      expect(list.toArray()).toEqual([0, 1, 2]);
    });
  });

  describe('Remove Operations', () => {
    test('should remove existing element', () => {
      list.append(1);
      list.append(2);
      expect(list.remove(1)).toBe(true);
      expect(list.getSize()).toBe(1);
      expect(list.contains(1)).toBe(false);
    });

    test('should remove first occurrence only', () => {
      list.append(1);
      list.append(2);
      list.append(1);
      expect(list.remove(1)).toBe(true);
      expect(list.toArray()).toEqual([2, 1]);
    });

    test('should return false for non-existent element', () => {
      list.append(1);
      expect(list.remove(2)).toBe(false);
      expect(list.getSize()).toBe(1);
    });

    test('should handle remove from empty list', () => {
      expect(list.remove(1)).toBe(false);
    });
  });

  describe('Search Operations', () => {
    test('should find existing element', () => {
      list.append(1);
      list.append(2);
      expect(list.contains(1)).toBe(true);
      expect(list.contains(2)).toBe(true);
    });

    test('should not find non-existent element', () => {
      list.append(1);
      expect(list.contains(2)).toBe(false);
    });

    test('should handle search in empty list', () => {
      expect(list.contains(1)).toBe(false);
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(list.getSize()).toBe(0);
      list.append(1);
      expect(list.getSize()).toBe(1);
      list.append(2);
      expect(list.getSize()).toBe(2);
    });

    test('should check if empty', () => {
      expect(list.isEmpty()).toBe(true);
      list.append(1);
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty list', () => {
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all elements', () => {
      list.append(1);
      list.append(2);
      list.clear();
      expect(list.isEmpty()).toBe(true);
      expect(list.getSize()).toBe(0);
    });

    test('should handle clear on empty list', () => {
      list.clear();
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('Print Operations', () => {
    test('should print list correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      list.append(1);
      list.append(2);
      list.print();
      expect(consoleSpy).toHaveBeenCalledWith('LinkedList:', '1 -> 2');
      consoleSpy.mockRestore();
    });

    test('should print empty list', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      list.print();
      expect(consoleSpy).toHaveBeenCalledWith('LinkedList:', '');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single element operations', () => {
      list.append(1);
      expect(list.remove(1)).toBe(true);
      expect(list.isEmpty()).toBe(true);
    });

    test('should handle duplicate elements', () => {
      list.append(1);
      list.append(1);
      expect(list.getSize()).toBe(2);
      expect(list.remove(1)).toBe(true);
      expect(list.getSize()).toBe(1);
    });

    test('should handle remove from single element list', () => {
      list.append(1);
      expect(list.remove(1)).toBe(true);
      expect(list.isEmpty()).toBe(true);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      list.append(1);
      list.prepend(0);
      list.append(2);
      list.remove(1);
      list.prepend(-1);
      expect(list.toArray()).toEqual([-1, 0, 2]);
    });

    test('should handle large number of operations', () => {
      for (let i = 0; i < 100; i++) {
        list.append(i);
      }
      expect(list.getSize()).toBe(100);
      
      for (let i = 0; i < 50; i++) {
        list.remove(i);
      }
      expect(list.getSize()).toBe(50);
    });
  });
}); 