import { MyTree } from '../DataStructures/MyTree';

describe('MyTree', () => {
  let tree: MyTree<number>;

  beforeEach(() => {
    tree = new MyTree<number>();
  });

  describe('Constructor and Basic Properties', () => {
    test('should create an empty tree', () => {
      expect(tree.isEmpty()).toBe(true);
      expect(tree.getSize()).toBe(0);
      expect(tree.getMinChildren()).toBe(2);
    });

    test('should create tree with custom minimum children', () => {
      const customTree = new MyTree<number>(3);
      expect(customTree.getMinChildren()).toBe(3);
    });
  });

  describe('Add Child Operations', () => {
    test('should add child to root', () => {
      expect(tree.addToRoot(1)).toBe(true);
      expect(tree.getSize()).toBe(1);
    });

    test('should add child to existing parent', () => {
      tree.addToRoot(1);
      expect(tree.addChild(1, 2)).toBe(true);
      expect(tree.getSize()).toBe(2);
    });

    test('should create root and child when no root exists', () => {
      expect(tree.addChild(1, 2)).toBe(true);
      expect(tree.getSize()).toBe(2);
    });

    test('should return false for non-existent parent', () => {
      tree.addToRoot(1);
      expect(tree.addChild(999, 2)).toBe(false);
      expect(tree.getSize()).toBe(1);
    });
  });

  describe('Search Operations', () => {
    test('should find existing element', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      expect(tree.search(1)).toBe(true);
      expect(tree.search(2)).toBe(true);
    });

    test('should not find non-existent element', () => {
      tree.addToRoot(1);
      expect(tree.search(999)).toBe(false);
    });

    test('should handle search in empty tree', () => {
      expect(tree.search(1)).toBe(false);
    });
  });

  describe('Remove Operations', () => {
    test('should remove leaf node', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      expect(tree.remove(2)).toBe(true);
      expect(tree.getSize()).toBe(1);
    });

    test('should not remove node with children', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(2, 3);
      expect(tree.remove(2)).toBe(false);
      expect(tree.getSize()).toBe(3);
    });

    test('should remove root if no children', () => {
      tree.addToRoot(1);
      expect(tree.remove(1)).toBe(true);
      expect(tree.isEmpty()).toBe(true);
    });

    test('should return false for non-existent element', () => {
      expect(tree.remove(999)).toBe(false);
    });
  });

  describe('Size and Empty Operations', () => {
    test('should return correct size', () => {
      expect(tree.getSize()).toBe(0);
      tree.addToRoot(1);
      expect(tree.getSize()).toBe(1);
      tree.addChild(1, 2);
      expect(tree.getSize()).toBe(2);
    });

    test('should check if empty', () => {
      expect(tree.isEmpty()).toBe(true);
      tree.addToRoot(1);
      expect(tree.isEmpty()).toBe(false);
    });
  });

  describe('Clear Operations', () => {
    test('should clear all nodes', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.clear();
      expect(tree.isEmpty()).toBe(true);
      expect(tree.getSize()).toBe(0);
    });

    test('should handle clear on empty tree', () => {
      tree.clear();
      expect(tree.isEmpty()).toBe(true);
    });
  });

  describe('Traversal Operations', () => {
    beforeEach(() => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      tree.addChild(2, 4);
      tree.addChild(2, 5);
    });

    test('should perform preorder traversal', () => {
      const preorder = tree.preorder();
      expect(preorder).toContain(1);
      expect(preorder).toContain(2);
      expect(preorder).toContain(3);
      expect(preorder).toContain(4);
      expect(preorder).toContain(5);
    });

    test('should perform postorder traversal', () => {
      const postorder = tree.postorder();
      expect(postorder).toContain(1);
      expect(postorder).toContain(2);
      expect(postorder).toContain(3);
      expect(postorder).toContain(4);
      expect(postorder).toContain(5);
    });

    test('should perform level order traversal', () => {
      const levelOrder = tree.levelOrder();
      expect(levelOrder).toContain(1);
      expect(levelOrder).toContain(2);
      expect(levelOrder).toContain(3);
      expect(levelOrder).toContain(4);
      expect(levelOrder).toContain(5);
    });
  });

  describe('Height and Depth Operations', () => {
    test('should calculate height correctly', () => {
      tree.addToRoot(1);
      expect(tree.getHeight()).toBe(0);
      tree.addChild(1, 2);
      expect(tree.getHeight()).toBe(1);
      tree.addChild(2, 3);
      expect(tree.getHeight()).toBe(2);
    });

    test('should calculate depth correctly', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(2, 3);
      expect(tree.getDepth(1)).toBe(0);
      expect(tree.getDepth(2)).toBe(1);
      expect(tree.getDepth(3)).toBe(2);
    });

    test('should return -1 for non-existent element depth', () => {
      expect(tree.getDepth(999)).toBe(-1);
    });
  });

  describe('Tree Analysis Operations', () => {
    test('should count leaf nodes', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      tree.addChild(2, 4);
      expect(tree.getLeafCount()).toBe(2); // 3 and 4 are leaves
    });

    test('should count internal nodes', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      expect(tree.getInternalNodeCount()).toBe(1); // Only root is internal
    });

    test('should check if tree is balanced', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      expect(tree.isBalanced()).toBe(true);
    });

    test('should check if tree is complete', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      expect(tree.isComplete()).toBe(true);
    });
  });

  describe('Node Analysis Operations', () => {
    test('should get node degree', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      expect(tree.getNodeDegree(1)).toBe(2);
      expect(tree.getNodeDegree(2)).toBe(0);
    });

    test('should check if node is leaf', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      expect(tree.isLeaf(2)).toBe(true);
      expect(tree.isLeaf(1)).toBe(false);
    });

    test('should get children of node', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      const children = tree.getChildren(1);
      expect(children).toContain(2);
      expect(children).toContain(3);
    });

    test('should get parent of node', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      expect(tree.getParent(2)).toBe(1);
      expect(tree.getParent(1)).toBeUndefined();
    });
  });

  describe('Level Operations', () => {
    test('should get nodes at specific level', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      tree.addChild(2, 4);
      const level0 = tree.getNodesAtLevel(0);
      const level1 = tree.getNodesAtLevel(1);
      expect(level0).toContain(1);
      expect(level1).toContain(2);
      expect(level1).toContain(3);
    });
  });

  describe('Clone Operations', () => {
    test('should clone tree correctly', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      const clonedTree = tree.clone();
      expect(clonedTree.getSize()).toBe(3);
      expect(clonedTree).not.toBe(tree);
    });

    test('should clone empty tree', () => {
      const clonedTree = tree.clone();
      expect(clonedTree.isEmpty()).toBe(true);
    });
  });

  describe('Array Conversion', () => {
    test('should convert to array', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      const array = tree.toArray();
      expect(array).toContain(1);
      expect(array).toContain(2);
      expect(array).toContain(3);
    });

    test('should return empty array for empty tree', () => {
      expect(tree.toArray()).toEqual([]);
    });
  });

  describe('Print Operations', () => {
    test('should print tree correctly', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.print();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should print empty tree', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      tree.print();
      expect(consoleSpy).toHaveBeenCalledWith('Tree: (empty)');
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('should handle single node operations', () => {
      tree.addToRoot(1);
      expect(tree.remove(1)).toBe(true);
      expect(tree.isEmpty()).toBe(true);
    });

    test('should handle complex tree structure', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.addChild(1, 3);
      tree.addChild(2, 4);
      tree.addChild(2, 5);
      tree.addChild(3, 6);
      expect(tree.getSize()).toBe(6);
      expect(tree.getHeight()).toBe(2);
    });

    test('should handle minimum children requirement', () => {
      const customTree = new MyTree<number>(3);
      customTree.addToRoot(1);
      customTree.addChild(1, 2);
      customTree.addChild(1, 3);
      customTree.addChild(1, 4);
      expect(customTree.isComplete()).toBe(true);
    });
  });

  describe('Complex Operations', () => {
    test('should handle mixed operations', () => {
      tree.addToRoot(1);
      tree.addChild(1, 2);
      tree.remove(2);
      tree.addChild(1, 3);
      tree.addChild(1, 4);
      expect(tree.getSize()).toBe(3);
    });

    test('should handle large tree operations', () => {
      tree.addToRoot(1);
      for (let i = 2; i <= 10; i++) {
        tree.addChild(1, i);
      }
      expect(tree.getSize()).toBe(10);
      expect(tree.getNodeDegree(1)).toBe(9);
    });
  });

  describe('Performance Tests', () => {
    test('should handle many operations efficiently', () => {
      const startTime = Date.now();
      tree.addToRoot(1);
      for (let i = 2; i <= 100; i++) {
        tree.addChild(1, i);
      }
      const endTime = Date.now();
      expect(tree.getSize()).toBe(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 