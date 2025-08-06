// Red-Black Tree class implementation
// Self-balancing binary search tree with color properties
// Each node is either red or black, and the tree maintains balance through color rules

// Red-Black Node class
class RBNode<T> {
  data: T;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;
  color: 'RED' | 'BLACK';

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = 'RED'; // New nodes are always red initially
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

  // Check if node is red
  isRed(): boolean {
    return this.color === 'RED';
  }

  // Check if node is black
  isBlack(): boolean {
    return this.color === 'BLACK';
  }

  // Get uncle node
  getUncle(): RBNode<T> | null {
    if (!this.parent || !this.parent.parent) return null;
    
    const grandparent = this.parent.parent;
    if (this.parent === grandparent.left) {
      return grandparent.right;
    } else {
      return grandparent.left;
    }
  }

  // Get sibling node
  getSibling(): RBNode<T> | null {
    if (!this.parent) return null;
    
    if (this === this.parent.left) {
      return this.parent.right;
    } else {
      return this.parent.left;
    }
  }
}

// Red-Black Tree class implementation
export class MyRedBlackTree<T> {
  private root: RBNode<T> | null;
  private size: number;

  constructor() {
    this.root = null;
    this.size = 0;
  }

  // Insert a new value into the Red-Black tree
  insert(data: T): boolean {
    const newNode = new RBNode(data);
    
    if (this.root === null) {
      // First node becomes root and must be black
      this.root = newNode;
      this.root.color = 'BLACK';
      this.size = 1;
      return true;
    }

    // Find the position to insert
    let current: RBNode<T> | null = this.root;
    let parent: RBNode<T> | null = null;

    while (current !== null) {
      parent = current;
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        // Duplicate value - Red-Black tree doesn't allow duplicates
        return false;
      }
    }

    // Insert the new node
    newNode.parent = parent;
    if (data < parent!.data) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    this.size++;
    this.fixInsert(newNode);
    return true;
  }

  // Fix Red-Black tree properties after insertion
  private fixInsert(node: RBNode<T>): void {
    let current = node;

    while (current !== this.root && current.parent!.isRed()) {
      const parent = current.parent!;
      const grandparent = parent.parent!;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;

        if (uncle && uncle.isRed()) {
          // Case 1: Uncle is red
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          grandparent.color = 'RED';
          current = grandparent;
        } else {
          // Case 2: Uncle is black or null
          if (current === parent.right) {
            // Case 2a: Current is right child
            this.leftRotate(parent);
            current = parent;
          }
          // Case 2b: Current is left child
          current.parent!.color = 'BLACK';
          grandparent.color = 'RED';
          this.rightRotate(grandparent);
        }
      } else {
        // Mirror case: parent is right child
        const uncle = grandparent.left;

        if (uncle && uncle.isRed()) {
          // Case 1: Uncle is red
          parent.color = 'BLACK';
          uncle.color = 'BLACK';
          grandparent.color = 'RED';
          current = grandparent;
        } else {
          // Case 2: Uncle is black or null
          if (current === parent.left) {
            // Case 2a: Current is left child
            this.rightRotate(parent);
            current = parent;
          }
          // Case 2b: Current is right child
          current.parent!.color = 'BLACK';
          grandparent.color = 'RED';
          this.leftRotate(grandparent);
        }
      }
    }

    // Ensure root is black
    this.root!.color = 'BLACK';
  }

  // Left rotation
  private leftRotate(x: RBNode<T>): void {
    const y = x.right!;
    x.right = y.left;

    if (y.left !== null) {
      y.left.parent = x;
    }

    y.parent = x.parent;

    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  }

  // Right rotation
  private rightRotate(y: RBNode<T>): void {
    const x = y.left!;
    y.left = x.right;

    if (x.right !== null) {
      x.right.parent = y;
    }

    x.parent = y.parent;

    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }

    x.right = y;
    y.parent = x;
  }

  // Search for a value in the Red-Black tree
  search(data: T): boolean {
    return this.searchNode(this.root, data) !== null;
  }

  private searchNode(node: RBNode<T> | null, data: T): RBNode<T> | null {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  // Find the minimum value in the Red-Black tree
  findMin(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // Find the maximum value in the Red-Black tree
  findMax(): T | null {
    if (this.root === null) return null;
    
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // Remove a value from the Red-Black tree
  remove(data: T): boolean {
    const node = this.searchNode(this.root, data);
    if (!node) return false;

    this.deleteNode(node);
    this.size--;
    return true;
  }

  private deleteNode(node: RBNode<T>): void {
    let y = node;
    let yOriginalColor = y.color;
    let x: RBNode<T> | null = null;

    if (node.left === null) {
      x = node.right;
      this.transplant(node, node.right);
    } else if (node.right === null) {
      x = node.left;
      this.transplant(node, node.left);
    } else {
      y = this.findMinNode(node.right);
      yOriginalColor = y.color;
      x = y.right;

      if (y.parent === node) {
        if (x) x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right!.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left!.parent = y;
      y.color = node.color;
    }

    if (yOriginalColor === 'BLACK') {
      this.fixDelete(x);
    }
  }

  private transplant(u: RBNode<T>, v: RBNode<T> | null): void {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }

    if (v) {
      v.parent = u.parent;
    }
  }

  private findMinNode(node: RBNode<T>): RBNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Fix Red-Black tree properties after deletion
  private fixDelete(x: RBNode<T> | null): void {
    while (x !== this.root && (x === null || x.isBlack())) {
      if (x && x.parent && x === x.parent.left) {
        let w = x.parent.right!;

        if (w.isRed()) {
          // Case 1: Sibling is red
          w.color = 'BLACK';
          x.parent.color = 'RED';
          this.leftRotate(x.parent);
          w = x.parent.right!;
        }

        if ((w.left === null || w.left!.isBlack()) && 
            (w.right === null || w.right!.isBlack())) {
          // Case 2: Sibling's children are black
          w.color = 'RED';
          x = x.parent;
        } else {
          if (w.right === null || w.right!.isBlack()) {
            // Case 3: Sibling's right child is black
            if (w.left) w.left.color = 'BLACK';
            w.color = 'RED';
            this.rightRotate(w);
            w = x.parent!.right!;
          }

          // Case 4: Sibling's right child is red
          w.color = x.parent!.color;
          x.parent!.color = 'BLACK';
          if (w.right) w.right.color = 'BLACK';
          this.leftRotate(x.parent!);
          x = this.root;
        }
      } else if (x && x.parent) {
        // Mirror case: x is right child
        let w = x.parent.left!;

        if (w.isRed()) {
          // Case 1: Sibling is red
          w.color = 'BLACK';
          x.parent.color = 'RED';
          this.rightRotate(x.parent);
          w = x.parent.left!;
        }

        if ((w.right === null || w.right!.isBlack()) && 
            (w.left === null || w.left!.isBlack())) {
          // Case 2: Sibling's children are black
          w.color = 'RED';
          x = x.parent;
        } else {
          if (w.left === null || w.left!.isBlack()) {
            // Case 3: Sibling's left child is black
            if (w.right) w.right.color = 'BLACK';
            w.color = 'RED';
            this.leftRotate(w);
            w = x.parent!.left!;
          }

          // Case 4: Sibling's left child is red
          w.color = x.parent!.color;
          x.parent!.color = 'BLACK';
          if (w.left) w.left.color = 'BLACK';
          this.rightRotate(x.parent!);
          x = this.root;
        }
      }
    }

    if (x) x.color = 'BLACK';
  }

  // Get the size of the Red-Black tree
  getSize(): number {
    return this.size;
  }

  // Check if the Red-Black tree is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear all nodes from the Red-Black tree
  clear(): void {
    this.root = null;
    this.size = 0;
  }

  // Inorder traversal (Left -> Root -> Right) - gives sorted order
  inorder(): T[] {
    const result: T[] = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  private inorderTraversal(node: RBNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.data);
      this.inorderTraversal(node.right, result);
    }
  }

  // Preorder traversal (Root -> Left -> Right)
  preorder(): T[] {
    const result: T[] = [];
    this.preorderTraversal(this.root, result);
    return result;
  }

  private preorderTraversal(node: RBNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
  }

  // Postorder traversal (Left -> Right -> Root)
  postorder(): T[] {
    const result: T[] = [];
    this.postorderTraversal(this.root, result);
    return result;
  }

  private postorderTraversal(node: RBNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.data);
    }
  }

  // Level order traversal (Breadth-First Search)
  levelOrder(): T[] {
    const result: T[] = [];
    if (this.root === null) return result;

    const queue: RBNode<T>[] = [this.root];

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

  // Get the height of the Red-Black tree
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: RBNode<T> | null): number {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Get the depth of a node
  getDepth(data: T): number {
    return this.calculateDepth(this.root, data, 0);
  }

  private calculateDepth(node: RBNode<T> | null, data: T, depth: number): number {
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

  // Check if the Red-Black tree is balanced
  isBalanced(): boolean {
    return this.checkBalance(this.root) !== -1;
  }

  private checkBalance(node: RBNode<T> | null): number {
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

  // Check if the Red-Black tree is valid
  isValidRedBlack(): boolean {
    return this.validateRedBlack(this.root);
  }

  private validateRedBlack(node: RBNode<T> | null, min?: T, max?: T): boolean {
    if (node === null) {
      return true;
    }

    // Check BST property
    if ((min !== undefined && node.data <= min!) || (max !== undefined && node.data >= max!)) {
      return false;
    }

    // Check Red-Black properties
    if (node === this.root && node.isRed()) {
      return false; // Root must be black
    }

    if (node.isRed()) {
      // Red node cannot have red children
      if ((node.left && node.left.isRed()) || (node.right && node.right.isRed())) {
        return false;
      }
    }

    // Check that all paths from root to leaves have same number of black nodes
    const blackCount = this.countBlackNodes(node);
    if (blackCount === -1) {
      return false;
    }

    return this.validateRedBlack(node.left, min, node.data) && 
           this.validateRedBlack(node.right, node.data, max);
  }

  private countBlackNodes(node: RBNode<T> | null): number {
    if (node === null) {
      return 1; // Null nodes are considered black
    }

    const leftCount = this.countBlackNodes(node.left);
    const rightCount = this.countBlackNodes(node.right);

    if (leftCount === -1 || rightCount === -1 || leftCount !== rightCount) {
      return -1; // Invalid
    }

    return leftCount + (node.isBlack() ? 1 : 0);
  }

  // Get the successor of a given value
  getSuccessor(data: T): T | null {
    const node = this.searchNode(this.root, data);
    if (!node) return null;

    if (node.right !== null) {
      // Successor is the minimum value in the right subtree
      let current = node.right;
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    } else {
      // Successor is the lowest ancestor whose left child is also an ancestor
      let successor: T | null = null;
      let current = this.root;
      
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
    const node = this.searchNode(this.root, data);
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
      let current = this.root;
      
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

  // Print the Red-Black tree structure
  print(): void {
    if (this.isEmpty()) {
      console.log('Red-Black Tree: (empty)');
      return;
    }

    console.log('Red-Black Tree Structure:');
    this.printTree(this.root, '', true);
  }

  private printTree(node: RBNode<T> | null, prefix: string, isLast: boolean): void {
    if (node !== null) {
      const colorSymbol = node.isRed() ? '🔴' : '⚫';
      console.log(prefix + (isLast ? '└── ' : '├── ') + node.data + ` ${colorSymbol}`);
      
      if (node.left) {
        this.printTree(node.left, prefix + (isLast ? '    ' : '│   '), false);
      }
      if (node.right) {
        this.printTree(node.right, prefix + (isLast ? '    ' : '│   '), true);
      }
    }
  }

  // Convert Red-Black tree to sorted array
  toArray(): T[] {
    return this.inorder();
  }

  // Create a copy of the Red-Black tree
  clone(): MyRedBlackTree<T> {
    const newRB = new MyRedBlackTree<T>();
    if (this.root) {
      newRB.root = this.cloneNode(this.root);
      newRB.size = this.size;
    }
    return newRB;
  }

  private cloneNode(node: RBNode<T>): RBNode<T> {
    const clonedNode = new RBNode(node.data);
    clonedNode.color = node.color;
    if (node.left) {
      clonedNode.left = this.cloneNode(node.left);
      clonedNode.left!.parent = clonedNode;
    }
    if (node.right) {
      clonedNode.right = this.cloneNode(node.right);
      clonedNode.right!.parent = clonedNode;
    }
    return clonedNode;
  }

  // Get the number of leaves in the Red-Black tree
  getLeafCount(): number {
    return this.countLeaves(this.root);
  }

  private countLeaves(node: RBNode<T> | null): number {
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
    return this.size - this.getLeafCount();
  }

  // Get all nodes at a specific level
  getNodesAtLevel(level: number): T[] {
    const result: T[] = [];
    this.collectNodesAtLevel(this.root, 0, level, result);
    return result;
  }

  private collectNodesAtLevel(node: RBNode<T> | null, currentLevel: number, targetLevel: number, result: T[]): void {
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
    const node = this.searchNode(this.root, data);
    return node ? node.getChildCount() : -1;
  }

  // Check if a node is a leaf
  isLeaf(data: T): boolean {
    const node = this.searchNode(this.root, data);
    return node ? node.isLeaf() : false;
  }

  // Get all children of a specific node
  getChildren(data: T): T[] {
    const node = this.searchNode(this.root, data);
    if (!node) return [];
    
    const children: T[] = [];
    if (node.left) children.push(node.left.data);
    if (node.right) children.push(node.right.data);
    return children;
  }

  // Get the parent of a specific node
  getParent(data: T): T | undefined {
    const node = this.searchNode(this.root, data);
    return node?.parent?.data;
  }

  // Get color of a specific node
  getNodeColor(data: T): 'RED' | 'BLACK' | null {
    const node = this.searchNode(this.root, data);
    return node ? node.color : null;
  }

  // Check if a node is red
  isRed(data: T): boolean {
    const node = this.searchNode(this.root, data);
    return node ? node.isRed() : false;
  }

  // Check if a node is black
  isBlack(data: T): boolean {
    const node = this.searchNode(this.root, data);
    return node ? node.isBlack() : false;
  }

  // Get uncle of a specific node
  getUncle(data: T): T | null {
    const node = this.searchNode(this.root, data);
    if (!node) return null;
    
    const uncle = node.getUncle();
    return uncle ? uncle.data : null;
  }

  // Get sibling of a specific node
  getSibling(data: T): T | null {
    const node = this.searchNode(this.root, data);
    if (!node) return null;
    
    const sibling = node.getSibling();
    return sibling ? sibling.data : null;
  }
} 