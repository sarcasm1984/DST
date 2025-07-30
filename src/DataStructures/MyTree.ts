// TreeNode class for the multi-child tree
class TreeNode<T> {
  data: T;
  children: TreeNode<T>[];

  constructor(data: T) {
    this.data = data;
    this.children = [];
  }

  // Add a child to this node
  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }

  // Remove a child from this node
  removeChild(child: TreeNode<T>): boolean {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get the number of children
  getChildCount(): number {
    return this.children.length;
  }

  // Check if this node is a leaf (no children)
  isLeaf(): boolean {
    return this.children.length === 0;
  }
}

// Multi-Child Tree class implementation
export class MyTree<T> {
  private root: TreeNode<T> | null;
  private size: number;
  private minChildren: number;

  constructor(minChildren: number = 2) {
    this.root = null;
    this.size = 0;
    this.minChildren = Math.max(2, minChildren); // Ensure minimum of 2 children
  }

  // Create a new node and add it as a child to the specified parent
  addChild(parentData: T, childData: T): boolean {
    const newNode = new TreeNode(childData);
    
    if (!this.root) {
      // If no root exists, create the first node as root
      this.root = new TreeNode(parentData);
      this.root.addChild(newNode);
      this.size = 2;
      return true;
    }

    const parentNode = this.findNode(this.root, parentData);
    if (parentNode) {
      parentNode.addChild(newNode);
      this.size++;
      return true;
    }
    
    return false; // Parent not found
  }

  // Add a node directly to the root
  addToRoot(data: T): boolean {
    const newNode = new TreeNode(data);
    
    if (!this.root) {
      this.root = newNode;
      this.size = 1;
      return true;
    }

    this.root.addChild(newNode);
    this.size++;
    return true;
  }

  // Find a node with the given data
  private findNode(node: TreeNode<T>, data: T): TreeNode<T> | null {
    if (node.data === data) {
      return node;
    }

    for (const child of node.children) {
      const found = this.findNode(child, data);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // Search for a value in the tree
  search(data: T): boolean {
    if (!this.root) return false;
    return this.findNode(this.root, data) !== null;
  }

  // Remove a node from the tree
  remove(data: T): boolean {
    if (!this.root) return false;
    
    if (this.root.data === data) {
      // Cannot remove root if it has children
      if (this.root.children.length > 0) {
        return false;
      }
      this.root = null;
      this.size = 0;
      return true;
    }

    return this.removeNode(this.root, data);
  }

  // Helper method to remove a node recursively
  private removeNode(node: TreeNode<T>, data: T): boolean {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].data === data) {
        // Check if the node to be removed has children
        if (node.children[i].children.length > 0) {
          return false; // Cannot remove node with children
        }
        
        node.children.splice(i, 1);
        this.size--;
        return true;
      }
      
      if (this.removeNode(node.children[i], data)) {
        return true;
      }
    }
    
    return false;
  }

  // Get the size of the tree
  getSize(): number {
    return this.size;
  }

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear all nodes from the tree
  clear(): void {
    this.root = null;
    this.size = 0;
  }

  // Preorder traversal (Root -> Children)
  preorder(): T[] {
    const result: T[] = [];
    this.preorderTraversal(this.root, result);
    return result;
  }

  private preorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      for (const child of node.children) {
        this.preorderTraversal(child, result);
      }
    }
  }

  // Postorder traversal (Children -> Root)
  postorder(): T[] {
    const result: T[] = [];
    this.postorderTraversal(this.root, result);
    return result;
  }

  private postorderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      for (const child of node.children) {
        this.postorderTraversal(child, result);
      }
      result.push(node.data);
    }
  }

  // Level order traversal (Breadth-First Search)
  levelOrder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue: TreeNode<T>[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);

      for (const child of node.children) {
        queue.push(child);
      }
    }

    return result;
  }

  // Get the height of the tree
  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) {
      return -1;
    }

    let maxChildHeight = -1;
    for (const child of node.children) {
      const childHeight = this.calculateHeight(child);
      maxChildHeight = Math.max(maxChildHeight, childHeight);
    }

    return maxChildHeight + 1;
  }

  // Get the depth of a node
  getDepth(data: T): number {
    return this.calculateDepth(this.root, data, 0);
  }

  private calculateDepth(node: TreeNode<T> | null, data: T, depth: number): number {
    if (node === null) {
      return -1;
    }

    if (node.data === data) {
      return depth;
    }

    for (const child of node.children) {
      const childDepth = this.calculateDepth(child, data, depth + 1);
      if (childDepth !== -1) {
        return childDepth;
      }
    }

    return -1;
  }

  // Get the number of leaves in the tree
  getLeafCount(): number {
    return this.countLeaves(this.root);
  }

  private countLeaves(node: TreeNode<T> | null): number {
    if (node === null) {
      return 0;
    }

    if (node.isLeaf()) {
      return 1;
    }

    let leafCount = 0;
    for (const child of node.children) {
      leafCount += this.countLeaves(child);
    }

    return leafCount;
  }

  // Get the number of internal nodes
  getInternalNodeCount(): number {
    return this.size - this.getLeafCount();
  }

  // Check if the tree is balanced (all leaves at same level)
  isBalanced(): boolean {
    if (!this.root) return true;
    
    const leafDepths: number[] = [];
    this.collectLeafDepths(this.root, 0, leafDepths);
    
    if (leafDepths.length === 0) return true;
    
    const firstDepth = leafDepths[0];
    return leafDepths.every(depth => depth === firstDepth);
  }

  private collectLeafDepths(node: TreeNode<T>, depth: number, depths: number[]): void {
    if (node.isLeaf()) {
      depths.push(depth);
    } else {
      for (const child of node.children) {
        this.collectLeafDepths(child, depth + 1, depths);
      }
    }
  }

  // Check if the tree is complete (all levels filled except last)
  isComplete(): boolean {
    if (!this.root) return true;
    
    const height = this.getHeight();
    return this.isCompleteAtLevel(this.root, 0, height);
  }

  private isCompleteAtLevel(node: TreeNode<T>, level: number, height: number): boolean {
    if (level === height) {
      return node.isLeaf();
    }

    if (node.children.length < this.minChildren) {
      return false;
    }

    for (const child of node.children) {
      if (!this.isCompleteAtLevel(child, level + 1, height)) {
        return false;
      }
    }

    return true;
  }

  // Print the tree structure
  print(): void {
    if (this.isEmpty()) {
      console.log('Tree: (empty)');
      return;
    }

    console.log('Tree Structure:');
    this.printTree(this.root, '', true);
  }

  private printTree(node: TreeNode<T> | null, prefix: string, isLast: boolean): void {
    if (node !== null) {
      console.log(prefix + (isLast ? '└── ' : '├── ') + node.data);
      
      for (let i = 0; i < node.children.length; i++) {
        const isLastChild = i === node.children.length - 1;
        this.printTree(node.children[i], prefix + (isLast ? '    ' : '│   '), isLastChild);
      }
    }
  }

  // Convert tree to array representation
  toArray(): T[] {
    return this.preorder();
  }

  // Create a copy of the tree
  clone(): MyTree<T> {
    const newTree = new MyTree<T>(this.minChildren);
    if (this.root) {
      newTree.root = this.cloneNode(this.root);
      newTree.size = this.size;
    }
    return newTree;
  }

  private cloneNode(node: TreeNode<T>): TreeNode<T> {
    const clonedNode = new TreeNode(node.data);
    for (const child of node.children) {
      clonedNode.addChild(this.cloneNode(child));
    }
    return clonedNode;
  }

  // Get the minimum number of children required
  getMinChildren(): number {
    return this.minChildren;
  }

  // Get all nodes at a specific level
  getNodesAtLevel(level: number): T[] {
    const result: T[] = [];
    this.collectNodesAtLevel(this.root, 0, level, result);
    return result;
  }

  private collectNodesAtLevel(node: TreeNode<T> | null, currentLevel: number, targetLevel: number, result: T[]): void {
    if (node === null) return;
    
    if (currentLevel === targetLevel) {
      result.push(node.data);
      return;
    }

    for (const child of node.children) {
      this.collectNodesAtLevel(child, currentLevel + 1, targetLevel, result);
    }
  }

  // Get the degree of a node (number of children)
  getNodeDegree(data: T): number {
    const node = this.findNode(this.root!, data);
    return node ? node.getChildCount() : -1;
  }

  // Check if a node is a leaf
  isLeaf(data: T): boolean {
    const node = this.findNode(this.root!, data);
    return node ? node.isLeaf() : false;
  }

  // Get all children of a specific node
  getChildren(data: T): T[] {
    const node = this.findNode(this.root!, data);
    if (!node) return [];
    
    return node.children.map(child => child.data);
  }

  // Get the parent of a specific node
  getParent(data: T): T | undefined {
    if (!this.root || this.root.data === data) return undefined;
    return this.findParent(this.root, data);
  }

  private findParent(node: TreeNode<T>, targetData: T): T | undefined {
    for (const child of node.children) {
      if (child.data === targetData) {
        return node.data;
      }
      
      const parent = this.findParent(child, targetData);
      if (parent !== undefined) {
        return parent;
      }
    }
    
    return undefined;
  }
} 