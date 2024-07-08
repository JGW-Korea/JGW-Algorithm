class Heap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    this.__heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.__heapifyDown();
    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  __heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);
      if (this.heap[currentIndex].cost >= this.heap[parentIndex].cost) break;
      this.__swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  __heapifyDown() {
    let currentIndex = 1;

    while (true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let smallIndex = leftIndex;

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].cost < this.heap[leftIndex]
      ) {
        smallIndex = rightIndex;
      }

      if (
        leftIndex >= this.heap.length ||
        this.heap[leftIndex].cost >= this.heap[currentIndex].cost
      ) {
        break;
      }

      this.__swap(currentIndex, smallIndex);
      currentIndex = smallIndex;
    }
  }

  __swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(N, M, graph, u, v) {
  function ShortPath(startNode) {
    const heap = new Heap(); // 다익스트라를 위한 우선순위 큐
    heap.enqueue({ node: startNode, cost: 0 });

    // 각 정점까지의 최소 거리를 담기 위한 1차원 배열
    const dist = new Array(N + 1).fill(Infinity);
    dist[startNode] = 0;

    while (!heap.isEmpty()) {
      const { node: currentNode, cost: currentCost } = heap.dequeue();

      for (const [nextNode, nextCost] of graph[currentNode]) {
        const shortPath = currentCost + nextCost;

        if (dist[nextNode] > shortPath) {
          heap.enqueue({ node: nextNode, cost: shortPath });
          dist[nextNode] = shortPath;
        }
      }
    }

    return dist;
  }

  const shortPathStart = ShortPath(1);
  const shortPathX = ShortPath(u);
  const shortPathY = ShortPath(v);

  const planA = shortPathStart[u] + shortPathX[v] + shortPathY[N];
  const planB = shortPathStart[v] + shortPathY[u] + shortPathX[N];

  if (planA === Infinity && planB === Infinity) return -1;
  else return planA > planB ? planB : planA;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const [u, v] = input[input.length - 1].split(" ").map(Number);

for (let i = 1; i < M + 1; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);
  graph[from].push([to, cost]);
  graph[to].push([from, cost]);
}

console.log(solution(N, M, graph, u, v));
