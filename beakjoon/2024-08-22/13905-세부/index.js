class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.heapifyDown();
    return returnValue;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);

      if (this.heap[parentIndex].cost >= this.heap[currentIndex].cost) break;

      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 1;

    while (true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let largeIndex = leftIndex;

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].cost > this.heap[leftIndex].cost
      ) {
        largeIndex = rightIndex;
      }

      if (
        leftIndex >= this.heap.length ||
        this.heap[currentIndex].cost >= this.heap[largeIndex].cost
      ) {
        break;
      }

      this.swap(currentIndex, largeIndex);
      currentIndex = largeIndex;
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.heap.length === 1;
  }
}

function solution(N, M, start, end, graph) {
  const heap = new MaxHeap();
  heap.enqueue({ node: start, cost: Infinity });

  const dist = new Array(N + 1).fill(0);
  dist[start] = Infinity;

  while (!heap.isEmpty()) {
    const { node: currentNode, cost: currentCost } = heap.dequeue();

    if (currentNode === end) return currentCost;

    for (const [nextNode, nextCost] of graph[currentNode]) {
      const minCost = Math.min(currentCost, nextCost);

      if (dist[nextNode] < minCost) {
        dist[nextNode] = minCost;
        heap.enqueue({ node: nextNode, cost: minCost });
      }
    }
  }

  return 0; // 경로가 없는 경우 0을 출력합니다.
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [start, end] = input[1].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 2; i < M + 2; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);

  graph[from].push([to, cost]);
  graph[to].push([from, cost]);
}

console.log(solution(N, M, start, end, graph));
