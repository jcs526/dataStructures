class Graph {
    private adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: string): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: string, vertex2: string): void {
        this.adjacencyList.get(vertex1)?.push(vertex2);
        this.adjacencyList.get(vertex2)?.push(vertex1);
    }

    removeEdge(vertex1: string, vertex2: string): void {
        this.adjacencyList.set(vertex1, this.adjacencyList.get(vertex1)?.filter(v => v !== vertex2)!);
        this.adjacencyList.set(vertex2, this.adjacencyList.get(vertex2)?.filter(v => v !== vertex1)!);
    }

    removeVertex(vertex: string): void {
        if (this.adjacencyList.has(vertex)) {
            for (let adjacentVertex of this.adjacencyList.get(vertex)!) {
                this.removeEdge(vertex, adjacentVertex);
            }
            this.adjacencyList.delete(vertex);
        }
    }

    dfs(start: string): void {
        const visited: Set<string> = new Set();
        const dfsHelper = (vertex: string) => {
            visited.add(vertex);
            console.log(vertex);
            for (let neighbor of this.adjacencyList.get(vertex) || []) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };
        dfsHelper(start);
    }

    bfs(start: string): void {
        const visited: Set<string> = new Set();
        const queue: string[] = [start];
        visited.add(start);

        while (queue.length) {
            const vertex = queue.shift();
            console.log(vertex);
            for (let neighbor of this.adjacencyList.get(vertex!)!) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
}

// 예제 사용:
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "F");
graph.addEdge("F", "E");

console.log("DFS 탐색:");
graph.dfs("A");

console.log("BFS 탐색:");
graph.bfs("A");
