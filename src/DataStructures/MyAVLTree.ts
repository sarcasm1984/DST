// AVL Tree class implementation
// Self-balancing binary search tree that maintains balance by ensuring
// the height difference between left and right subtrees is at most 1

// AVL Node class for self-balancing tree
class AVLNode<T> {
  data: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1; // New node is initially added at leaf
  }

  // Check if this node is a leaf (no children)
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  // Get the number of children
  getChildCount(): number {
    let count = 0;
    if (this.left) count++;
    if (this.right) count++;
    return count;
  }
}

// AVL Tree class implementation
export class MyAVLTree<T> {
  private avlRoot: AVLNode<T> | null;
  private avlSize: number;

  constructor() {
    this.avlRoot = null;
    this.avlSize = 0;
  }

  // Get height of a node
  private getNodeHeightInternal(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  // Get balance factor of a node
  private getBalanceFactor(node: AVLNode<T> | null): number {
    if (!node) return 0;
    return this.getNodeHeightInternal(node.left) - this.getNodeHeightInternal(node.right);
  }

  // Update height of a node
  private updateHeight(node: AVLNode<T>): void {
    if (!node) return;
    node.height = Math.max(
      this.getNodeHeightInternal(node.left),
      this.getNodeHeightInternal(node.right)
    ) + 1;
  }

  // Right rotation
  private rightRotate(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  // Left rotation
  private leftRotate(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Insert a new value into the AVL tree
  insert(data: T): boolean {
    if (this.avlRoot === null) {
      this.avlRoot = new AVLNode(data);
      this.avlSize = 1;
      return true;
    }

    this.avlRoot = this.insertNode(this.avlRoot, data);
    return true;
  }

  private insertNode(node: AVLNode<T> | null, data: T): AVLNode<T> {
    if (node === null) {
      this.avlSize++;
      return new AVLNode(data);
    }

    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    } else {
      // Duplicate value - AVL tree doesn't allow duplicates
      return node;
    }

    // Update height of current node
    this.updateHeight(node);

    // Get balance factor to check if node became unbalanced
    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && data < node.left!.data) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && data > node.right!.data) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && data > node.left!.data) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && data < node.right!.data) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // Search for a value in the AVL tree
  search(data: T): boolean {
    return this.searchNode(this.avlRoot, data) !== null;
  }

  private searchNode(node: AVLNode<T> | null, data: T): AVLNode<T> | null {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  // Find the minimum value in the AVL tree
  findMin(): T | null {
    if (this.avlRoot === null) return null;
    
    let current = this.avlRoot;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // Find the maximum value in the AVL tree
  findMax(): T | null {
    if (this.avlRoot === null) return null;
    
    let current = this.avlRoot;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // Remove a value from the AVL tree
  remove(data: T): boolean {
    if (this.avlRoot === null) return false;
    
    this.avlRoot = this.removeNode(this.avlRoot, data);
    return true;
  }

  private removeNode(node: AVLNode<T> | null, data: T): AVLNode<T> | null {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      // Node to be deleted found
      this.avlSize--;

      // Case 1: Node is a leaf
      if (node.isLeaf()) {
        return null;
      }
      // Case 2: Node has only one child
      else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // Case 3: Node has two children
      else {
        // Find the inorder successor (smallest value in right subtree)
        const successor = this.findMinNode(node.right);
        node.data = successor!.data;
        node.right = this.removeNode(node.right, successor!.data);
        this.avlSize++; // Compensate for the decrease above
      }
    }

    // If the tree had only one node then return
    if (node === null) {
      return null;
    }

    // Update height of current node
    this.updateHeight(node);

    // Get balance factor to check if node became unbalanced
    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  private findMinNode(node: AVLNode<T>): AVLNode<T> | null {
    if (node === null) return null;
    
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Get the size of the AVL tree
  getSize(): number {
    return this.avlSize;
  }

  // Check if the AVL tree is empty
  isEmpty(): boolean {
    return this.avlSize === 0;
  }

  // Clear all nodes from the AVL tree
  clear(): void {
    this.avlRoot = null;
    this.avlSize = 0;
  }

  // Inorder traversal (Left -> Root -> Right) - gives sorted order
  inorder(): T[] {
    const result: T[] = [];
    this.inorderTraversal(this.avlRoot, result);
    return result;
  }

  private inorderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.data);
      this.inorderTraversal(node.right, result);
    }
  }

  // Preorder traversal (Root -> Left -> Right)
  preorder(): T[] {
    const result: T[] = [];
    this.preorderTraversal(this.avlRoot, result);
    return result;
  }

  private preorderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
  }

  // Postorder traversal (Left -> Right -> Root)
  postorder(): T[] {
    const result: T[] = [];
    this.postorderTraversal(this.avlRoot, result);
    return result;
  }

  private postorderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.data);
    }
  }

  // Level order traversal (Breadth-First Search)
  levelOrder(): T[] {
    const result: T[] = [];
    if (this.avlRoot === null) return result;

    const queue: AVLNode<T>[] = [this.avlRoot];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  // Get the height of the AVL tree
  getHeight(): number {
    return this.calculateHeight(this.avlRoot);
  }

  private calculateHeight(node: AVLNode<T> | null): number {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Get the depth of a node
  getDepth(data: T): number {
    return this.calculateDepth(this.avlRoot, data, 0);
  }

  private calculateDepth(node: AVLNode<T> | null, data: T, depth: number): number {
    if (node === null) {
      return -1;
    }

    if (node.data === data) {
      return depth;
    }

    if (data < node.data) {
      return this.calculateDepth(node.left, data, depth + 1);
    } else {
      return this.calculateDepth(node.right, data, depth + 1);
    }
  }

  // Check if the AVL tree is balanced (should always be true for AVL)
  isBalanced(): boolean {
    return this.checkBalance(this.avlRoot) !== -1;
  }

  private checkBalance(node: AVLNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.checkBalance(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = this.checkBalance(node.right);
    if (rightHeight === -1) return -1;

    const balanceFactor = Math.abs(leftHeight - rightHeight);
    if (balanceFactor > 1) {
      return -1; // Unbalanced
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Check if the AVL tree is a valid AVL tree
  isValidAVL(): boolean {
    return this.validateAVL(this.avlRoot);
  }

  private validateAVL(node: AVLNode<T> | null, min?: T, max?: T): boolean {
    if (node === null) {
      return true;
    }

    // Check BST property
    if ((min !== undefined && node.data <= min!) || (max !== undefined && node.data >= max!)) {
      return false;
    }

    // Check AVL balance property
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor > 1 || balanceFactor < -1) {
      return false;
    }

    return this.validateAVL(node.left, min, node.data) && 
           this.validateAVL(node.right, node.data, max);
  }

  // Get the successor of a given value
  getSuccessor(data: T): T | null {
    const node = this.searchNode(this.avlRoot, data);
    if (!node) return null;

    if (node.right !== null) {
      // Successor is the minimum value in the right subtree
      return this.findMinNode(node.right)?.data || null;
    } else {
      // Successor is the lowest ancestor whose left child is also an ancestor
      let successor: T | null = null;
      let current = this.avlRoot;
      
      while (current !== null) {
        if (data < current.data) {
          successor = current.data;
          current = current.left;
        } else if (data > current.data) {
          current = current.right;
        } else {
          break;
        }
      }
      
      return successor;
    }
  }

  // Get the predecessor of a given value
  getPredecessor(data: T): T | null {
    const node = this.searchNode(this.avlRoot, data);
    if (!node) return null;

    if (node.left !== null) {
      // Predecessor is the maximum value in the left subtree
      let current = node.left;
      while (current.right !== null) {
        current = current.right;
      }
      return current.data;
    } else {
      // Predecessor is the highest ancestor whose right child is also an ancestor
      let predecessor: T | null = null;
      let current = this.avlRoot;
      
      while (current !== null) {
        if (data > current.data) {
          predecessor = current.data;
          current = current.right;
        } else if (data < current.data) {
          current = current.left;
        } else {
          break;
        }
      }
      
      return predecessor;
    }
  }

  // Print the AVL tree structure
  print(): void {
    if (this.isEmpty()) {
      console.log('AVL Tree: (empty)');
      return;
    }

    console.log('AVL Tree Structure:');
    this.printTree(this.avlRoot, '', true);
  }

  private printTree(node: AVLNode<T> | null, prefix: string, isLast: boolean): void {
    if (node !== null) {
      console.log(prefix + (isLast ? '└── ' : '├── ') + node.data + ` (h:${node.height})`);
      
      if (node.left) {
        this.printTree(node.left, prefix + (isLast ? '    ' : '│   '), false);
      }
      if (node.right) {
        this.printTree(node.right, prefix + (isLast ? '    ' : '│   '), true);
      }
    }
  }

  // Convert AVL tree to sorted array
  toArray(): T[] {
    return this.inorder();
  }

  // Create a copy of the AVL tree
  clone(): MyAVLTree<T> {
    const newAVL = new MyAVLTree<T>();
    if (this.avlRoot) {
      newAVL.avlRoot = this.cloneNode(this.avlRoot);
      newAVL.avlSize = this.avlSize;
    }
    return newAVL;
  }

  private cloneNode(node: AVLNode<T>): AVLNode<T> {
    const clonedNode = new AVLNode(node.data);
    clonedNode.height = node.height;
    if (node.left) {
      clonedNode.left = this.cloneNode(node.left);
    }
    if (node.right) {
      clonedNode.right = this.cloneNode(node.right);
    }
    return clonedNode;
  }

  // Get the number of leaves in the AVL tree
  getLeafCount(): number {
    return this.countLeaves(this.avlRoot);
  }

  private countLeaves(node: AVLNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    if (node.isLeaf()) {
      return 1;
    }

    return this.countLeaves(node.left) + this.countLeaves(node.right);
  }

  // Get the number of internal nodes
  getInternalNodeCount(): number {
    return this.avlSize - this.getLeafCount();
  }

  // Get all nodes at a specific level
  getNodesAtLevel(level: number): T[] {
    const result: T[] = [];
    this.collectNodesAtLevel(this.avlRoot, 0, level, result);
    return result;
  }

  private collectNodesAtLevel(node: AVLNode<T> | null, currentLevel: number, targetLevel: number, result: T[]): void {
    if (node === null) return;
    
    if (currentLevel === targetLevel) {
      result.push(node.data);
      return;
    }

    this.collectNodesAtLevel(node.left, currentLevel + 1, targetLevel, result);
    this.collectNodesAtLevel(node.right, currentLevel + 1, targetLevel, result);
  }

  // Get the degree of a node (number of children)
  getNodeDegree(data: T): number {
    const node = this.searchNode(this.avlRoot, data);
    return node ? node.getChildCount() : -1;
  }

  // Check if a node is a leaf
  isLeaf(data: T): boolean {
    const node = this.searchNode(this.avlRoot, data);
    return node ? node.isLeaf() : false;
  }

  // Get all children of a specific node
  getChildren(data: T): T[] {
    const node = this.searchNode(this.avlRoot, data);
    if (!node) return [];
    
    const children: T[] = [];
    if (node.left) children.push(node.left.data);
    if (node.right) children.push(node.right.data);
    return children;
  }

  // Get the parent of a specific node
  getParent(data: T): T | undefined {
    if (!this.avlRoot || this.avlRoot.data === data) return undefined;
    return this.findParent(this.avlRoot, data);
  }

  private findParent(node: AVLNode<T>, targetData: T): T | undefined {
    if ((node.left && node.left.data === targetData) || 
        (node.right && node.right.data === targetData)) {
      return node.data;
    }

    if (targetData < node.data && node.left) {
      return this.findParent(node.left, targetData);
    } else if (targetData > node.data && node.right) {
      return this.findParent(node.right, targetData);
    }

    return undefined;
  }

  // Get balance factor of a specific node
  getNodeBalanceFactor(data: T): number {
    const node = this.searchNode(this.avlRoot, data);
    return node ? this.getBalanceFactor(node) : 0;
  }

  // Get height of a specific node
  getNodeHeight(data: T): number {
    const node = this.searchNode(this.avlRoot, data);
    return node ? node.height : 0;
  }
} 