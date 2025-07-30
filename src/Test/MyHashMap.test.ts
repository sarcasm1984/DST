import { MyHashMap } from '../DataStructures/MyHashMap';

describe('MyHashMap', () => {
  let map: MyHashMap<string, number>;

  beforeEach(() => {
    map = new MyHashMap<string, number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty hash map', () => {
      expect(map.isEmpty()).toBe(true);
      expect(map.getSize()).toBe(0);
      expect(map.getCapacity()).toBe(16);
      expect(map.getLoadFactor()).toBe(0.75);
    });

    test('should create hash map with custom capacity and load factor', () => {
      const customMap = new MyHashMap<string, number>(8, 0.5);
      expect(customMap.getCapacity()).toBe(8);
      expect(customMap.getLoadFactor()).toBe(0.5);
    });
  });

  describe('Put Operations', () => {
    test('should put single key-value pair', () => {
      map.put('key1', 1);
      expect(map.getSize()).toBe(1);
      expect(map.get('key1')).toBe(1);
    });

    test('should put multiple key-value pairs', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      map.put('key3', 3);
      expect(map.getSize()).toBe(3);
      expect(map.get('key1')).toBe(1);
      expect(map.get('key2')).toBe(2);
      expect(map.get('key3')).toBe(3);
    });

    test('should update existing key', () => {
      map.put('key1', 1);
      map.put('key1', 2);
      expect(map.getSize()).toBe(1);
      expect(map.get('key1')).toBe(2);
    });
  });

  describe('Get Operations', () => {
    test('should get existing value', () => {
      map.put('key1', 1);
      expect(map.get('key1')).toBe(1);
    });

    test('should return undefined for non-existent key', () => {
      expect(map.get('nonexistent')).toBeUndefined();
    });

    test('should handle get from empty map', () => {
      expect(map.get('key1')).toBeUndefined();
    });
  });

  describe('Remove Operations', () => {
    test('should remove existing key-value pair', () => {
      map.put('key1', 1);
      expect(map.remove('key1')).toBe(true);
      expect(map.getSize()).toBe(0);
      expect(map.get('key1')).toBeUndefined();
    });

    test('should return false for non-existent key', () => {
      expect(map.remove('nonexistent')).toBe(false);
    });

    test('should handle remove from empty map', () => {
      expect(map.remove('key1')).toBe(false);
    });
  });

  describe('Contains Operations', () => {
    test('should check if key exists', () => {
      map.put('key1', 1);
      expect(map.containsKey('key1')).toBe(true);
      expect(map.containsKey('key2')).toBe(false);
    });

    test('should check if value exists', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      expect(map.containsValue(1)).toBe(true);
      expect(map.containsValue(3)).toBe(false);
    });
  });

  describe('Collection Operations', () => {
    test('should get all keys', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      const keys = map.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys.length).toBe(2);
    });

    test('should get all values', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      const values = map.values();
      expect(values).toContain(1);
      expect(values).toContain(2);
      expect(values.length).toBe(2);
    });

    test('should get all entries', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      const entries = map.entries();
      expect(entries.length).toBe(2);
      expect(entries.some(entry => entry.key === 'key1' && entry.value === 1)).toBe(true);
      expect(entries.some(entry => entry.key === 'key2' && entry.value === 2)).toBe(true);
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(map.getSize()).toBe(0);
      map.put('key1', 1);
      expect(map.getSize()).toBe(1);
      map.put('key2', 2);
      expect(map.getSize()).toBe(2);
    });

    test('should check if empty', () => {
      expect(map.isEmpty()).toBe(true);
      map.put('key1', 1);
      expect(map.isEmpty()).toBe(false);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all entries', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      map.clear();
      expect(map.isEmpty()).toBe(true);
      expect(map.getSize()).toBe(0);
    });

    test('should handle clear on empty map', () => {
      map.clear();
      expect(map.isEmpty()).toBe(true);
    });
  });

  describe('Print Operations', () => {
    test('should print map correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      map.put('key1', 1);
      map.put('key2', 2);
      map.print();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should print empty map', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      map.print();
      expect(consoleSpy).toHaveBeenCalledWith('HashMap:');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle null and undefined values', () => {
      map.put('key1', null as any);
      map.put('key2', undefined as any);
      expect(map.get('key1')).toBeNull();
      expect(map.get('key2')).toBeUndefined();
    });

    test('should handle object keys', () => {
      const objKey1 = { id: 1 };
      const objKey2 = { id: 2 };
      map.put(objKey1 as any, 1);
      map.put(objKey2 as any, 2);
      expect(map.get(objKey1 as any)).toBe(1);
      expect(map.get(objKey2 as any)).toBe(2);
    });

    test('should handle collision scenarios', () => {
      // This test depends on the hash function implementation
      // In a real scenario, you might need to create keys that hash to the same bucket
      for (let i = 0; i < 20; i++) {
        map.put(`key${i}`, i);
      }
      expect(map.getSize()).toBe(20);
    });
  });

  describe('Resize Operations', () => {
    test('should resize when load factor is exceeded', () => {
      const smallMap = new MyHashMap<string, number>(4, 0.5);
      smallMap.put('key1', 1);
      smallMap.put('key2', 2);
      smallMap.put('key3', 3); // This should trigger resize
      expect(smallMap.getSize()).toBe(3);
      expect(smallMap.getCapacity()).toBeGreaterThan(4);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      map.put('key1', 1);
      map.put('key2', 2);
      map.remove('key1');
      map.put('key3', 3);
      map.put('key1', 4);
      expect(map.getSize()).toBe(3);
      expect(map.get('key1')).toBe(4);
      expect(map.get('key2')).toBe(2);
      expect(map.get('key3')).toBe(3);
    });

    test('should handle large number of operations', () => {
      for (let i = 0; i < 100; i++) {
        map.put(`key${i}`, i);
      }
      expect(map.getSize()).toBe(100);
      
      for (let i = 0; i < 50; i++) {
        map.remove(`key${i}`);
      }
      expect(map.getSize()).toBe(50);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        map.put(`key${i}`, i);
      }
      const endTime = Date.now();
      expect(map.getSize()).toBe(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 