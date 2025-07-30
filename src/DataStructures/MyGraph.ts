// Edge class for graph edges
class Edge<T> {
  from: T;
  to: T;
  weight: number;

  constructor(from: T, to: T, weight: number = 1) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

// Vertex class for graph vertices
class Vertex<T> {
  data: T;
  edges: Edge<T>[];

  constructor(data: T) {
    this.data = data;
    this.edges = [];
  }

  // Add an edge from this vertex
  addEdge(to: T, weight: number = 1): void {
    this.edges.push(new Edge(this.data, to, weight));
  }

  // Remove an edge from this vertex
  removeEdge(to: T): boolean {
    const index = this.edges.findIndex(edge => edge.to === to);
    if (index !== -1) {
      this.edges.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get the degree of this vertex
  getDegree(): number {
    return this.edges.length;
  }

  // Check if this vertex has an edge to the given vertex
  hasEdge(to: T): boolean {
    return this.edges.some(edge => edge.to === to);
  }

  // Get the weight of edge to the given vertex
  getEdgeWeight(to: T): number | undefined {
    const edge = this.edges.find(edge => edge.to === to);
    return edge ? edge.weight : undefined;
  }
}

// Graph class implementation
export class MyGraph<T> {
  private vertices: Map<T, Vertex<T>>;
  private isDirected: boolean;
  private size: number;

  constructor(isDirected: boolean = false) {
    this.vertices = new Map();
    this.isDirected = isDirected;
    this.size = 0;
  }

  // Add a vertex to the graph
  addVertex(data: T): boolean {
    if (this.vertices.has(data)) {
      return false; // Vertex already exists
    }
    
    this.vertices.set(data, new Vertex(data));
    this.size++;
    return true;
  }

  // Remove a vertex from the graph
  removeVertex(data: T): boolean {
    if (!this.vertices.has(data)) {
      return false;
    }

    // Remove all edges to this vertex
    for (const vertex of this.vertices.values()) {
      vertex.removeEdge(data);
    }

    // Remove the vertex
    this.vertices.delete(data);
    this.size--;
    return true;
  }

  // Add an edge between two vertices
  addEdge(from: T, to: T, weight: number = 1): boolean {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return false; // One or both vertices don't exist
    }

    const fromVertex = this.vertices.get(from)!;
    const toVertex = this.vertices.get(to)!;

    // Add edge from 'from' to 'to'
    fromVertex.addEdge(to, weight);

    // If undirected, add edge from 'to' to 'from'
    if (!this.isDirected && from !== to) {
      toVertex.addEdge(from, weight);
    }

    return true;
  }

  // Remove an edge between two vertices
  removeEdge(from: T, to: T): boolean {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return false;
    }

    const fromVertex = this.vertices.get(from)!;
    const toVertex = this.vertices.get(to)!;

    let removed = fromVertex.removeEdge(to);

    // If undirected, also remove the reverse edge
    if (!this.isDirected && from !== to) {
      removed = toVertex.removeEdge(from) || removed;
    }

    return removed;
  }

  // Check if an edge exists between two vertices
  hasEdge(from: T, to: T): boolean {
    if (!this.vertices.has(from)) {
      return false;
    }
    return this.vertices.get(from)!.hasEdge(to);
  }

  // Get the weight of an edge
  getEdgeWeight(from: T, to: T): number | undefined {
    if (!this.vertices.has(from)) {
      return undefined;
    }
    return this.vertices.get(from)!.getEdgeWeight(to);
  }

  // Get all vertices in the graph
  getVertices(): T[] {
    return Array.from(this.vertices.keys());
  }

  // Get all edges in the graph
  getEdges(): Edge<T>[] {
    const edges: Edge<T>[] = [];
    for (const vertex of this.vertices.values()) {
      edges.push(...vertex.edges);
    }
    return edges;
  }

  // Get the size of the graph (number of vertices)
  getSize(): number {
    return this.size;
  }

  // Get the number of edges in the graph
  getEdgeCount(): number {
    let count = 0;
    for (const vertex of this.vertices.values()) {
      count += vertex.edges.length;
    }
    return this.isDirected ? count : count / 2;
  }

  // Check if the graph is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Check if the graph is directed
  isDirectedGraph(): boolean {
    return this.isDirected;
  }

  // Clear all vertices and edges from the graph
  clear(): void {
    this.vertices.clear();
    this.size = 0;
  }

  // Get the degree of a vertex
  getVertexDegree(vertex: T): number {
    if (!this.vertices.has(vertex)) {
      return -1;
    }
    return this.vertices.get(vertex)!.getDegree();
  }

  // Get the neighbors of a vertex
  getNeighbors(vertex: T): T[] {
    if (!this.vertices.has(vertex)) {
      return [];
    }
    return this.vertices.get(vertex)!.edges.map(edge => edge.to);
  }

  // Get all edges from a vertex
  getEdgesFrom(vertex: T): Edge<T>[] {
    if (!this.vertices.has(vertex)) {
      return [];
    }
    return [...this.vertices.get(vertex)!.edges];
  }

  // Search for a vertex in the graph
  search(vertex: T): boolean {
    return this.vertices.has(vertex);
  }

  // Depth-First Search traversal
  dfs(startVertex: T): T[] {
    if (!this.vertices.has(startVertex)) {
      return [];
    }

    const visited = new Set<T>();
    const result: T[] = [];

    this.dfsTraversal(startVertex, visited, result);
    return result;
  }

  private dfsTraversal(vertex: T, visited: Set<T>, result: T[]): void {
    visited.add(vertex);
    result.push(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        this.dfsTraversal(neighbor, visited, result);
      }
    }
  }

  // Breadth-First Search traversal
  bfs(startVertex: T): T[] {
    if (!this.vertices.has(startVertex)) {
      return [];
    }

    const visited = new Set<T>();
    const result: T[] = [];
    const queue: T[] = [startVertex];

    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift()!;
      result.push(vertex);

      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // Check if the graph is connected (for undirected graphs)
  isConnected(): boolean {
    if (this.isEmpty()) return true;
    if (this.isDirected) return false; // Only for undirected graphs

    const vertices = this.getVertices();
    if (vertices.length === 0) return true;

    const visited = new Set<T>();
    this.dfsTraversal(vertices[0], visited, []);

    return visited.size === vertices.length;
  }

  // Find all connected components (for undirected graphs)
  getConnectedComponents(): T[][] {
    if (this.isDirected) return []; // Only for undirected graphs

    const visited = new Set<T>();
    const components: T[][] = [];

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        const component: T[] = [];
        this.dfsTraversal(vertex, visited, component);
        components.push(component);
      }
    }

    return components;
  }

  // Check if there's a path between two vertices
  hasPath(from: T, to: T): boolean {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return false;
    }

    const visited = new Set<T>();
    return this.hasPathDFS(from, to, visited);
  }

  private hasPathDFS(current: T, target: T, visited: Set<T>): boolean {
    if (current === target) {
      return true;
    }

    visited.add(current);

    for (const neighbor of this.getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        if (this.hasPathDFS(neighbor, target, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  // Find the shortest path between two vertices (unweighted)
  shortestPath(from: T, to: T): T[] {
    if (!this.vertices.has(from) || !this.vertices.has(to)) {
      return [];
    }

    const queue: T[] = [from];
    const visited = new Set<T>();
    const parent = new Map<T, T>();

    visited.add(from);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current === to) {
        // Reconstruct path
        const path: T[] = [];
        let node: T | undefined = to;
        while (node !== undefined) {
          path.unshift(node);
          node = parent.get(node);
        }
        return path;
      }

      for (const neighbor of this.getNeighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return []; // No path found
  }

  // Check if the graph has cycles
  hasCycle(): boolean {
    const visited = new Set<T>();
    const recStack = new Set<T>();

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        if (this.hasCycleDFS(vertex, visited, recStack)) {
          return true;
        }
      }
    }

    return false;
  }

  private hasCycleDFS(vertex: T, visited: Set<T>, recStack: Set<T>): boolean {
    visited.add(vertex);
    recStack.add(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleDFS(neighbor, visited, recStack)) {
          return true;
        }
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(vertex);
    return false;
  }

  // Topological Sort (for directed acyclic graphs)
  topologicalSort(): T[] {
    if (!this.isDirected || this.hasCycle()) {
      return [];
    }

    const visited = new Set<T>();
    const result: T[] = [];

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        this.topologicalSortDFS(vertex, visited, result);
      }
    }

    return result.reverse();
  }

  private topologicalSortDFS(vertex: T, visited: Set<T>, result: T[]): void {
    visited.add(vertex);

    for (const neighbor of this.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        this.topologicalSortDFS(neighbor, visited, result);
      }
    }

    result.push(vertex);
  }

  // Print the graph structure
  print(): void {
    if (this.isEmpty()) {
      console.log('Graph: (empty)');
      return;
    }

    console.log(`Graph (${this.isDirected ? 'Directed' : 'Undirected'}):`);
    for (const [vertex, vertexObj] of this.vertices) {
      const edges = vertexObj.edges.map(edge => 
        `${edge.to}${edge.weight !== 1 ? `(${edge.weight})` : ''}`
      ).join(', ');
      console.log(`${vertex} -> [${edges}]`);
    }
  }

  // Convert graph to adjacency matrix
  toAdjacencyMatrix(): (number | undefined)[][] {
    const vertices = this.getVertices();
    const matrix: (number | undefined)[][] = [];

    for (let i = 0; i < vertices.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < vertices.length; j++) {
        const weight = this.getEdgeWeight(vertices[i], vertices[j]);
        matrix[i][j] = weight;
      }
    }

    return matrix;
  }

  // Create a copy of the graph
  clone(): MyGraph<T> {
    const newGraph = new MyGraph<T>(this.isDirected);
    
    // Add all vertices
    for (const vertex of this.getVertices()) {
      newGraph.addVertex(vertex);
    }
    
    // Add all edges
    for (const edge of this.getEdges()) {
      newGraph.addEdge(edge.from, edge.to, edge.weight);
    }
    
    return newGraph;
  }

  // Get the minimum spanning tree (for undirected graphs)
  getMinimumSpanningTree(): MyGraph<T> {
    if (this.isDirected || this.isEmpty()) {
      return new MyGraph<T>(false);
    }

    const mst = new MyGraph<T>(false);
    const vertices = this.getVertices();
    
    if (vertices.length === 0) return mst;

    // Add all vertices to MST
    for (const vertex of vertices) {
      mst.addVertex(vertex);
    }

    // Kruskal's algorithm
    const edges = this.getEdges().sort((a, b) => a.weight - b.weight);
    const parent = new Map<T, T>();
    
    // Initialize disjoint sets
    for (const vertex of vertices) {
      parent.set(vertex, vertex);
    }

    const find = (vertex: T): T => {
      if (parent.get(vertex) !== vertex) {
        parent.set(vertex, find(parent.get(vertex)!));
      }
      return parent.get(vertex)!;
    };

    const union = (x: T, y: T): void => {
      const rootX = find(x);
      const rootY = find(y);
      if (rootX !== rootY) {
        parent.set(rootY, rootX);
      }
    };

    for (const edge of edges) {
      if (find(edge.from) !== find(edge.to)) {
        mst.addEdge(edge.from, edge.to, edge.weight);
        union(edge.from, edge.to);
      }
    }

    return mst;
  }
} 