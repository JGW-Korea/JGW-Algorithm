class MinHeap {
  constructor() {
    this.heap = [0n];
  }

  enqueue(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  dequeue() {
    if (this.isEmpty()) return;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    this._heapifyDown();
    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  total() {
    return this.heap.reduce((prev, curr) => prev + curr, 0n);
  }

  _heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 1) {
      let parentIndex = Math.floor(currentIndex / 2);

      if (this.heap[currentIndex] > this.heap[parentIndex]) break;
      this._swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  _heapifyDown() {
    let currentIndex = 1;

    while (true) {
      let leftIndex = currentIndex * 2;
      let rightIndex = currentIndex * 2 + 1;
      let smallIndex = leftIndex;

      if (rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[leftIndex]) {
        smallIndex = rightIndex;
      }

      if (leftIndex >= this.heap.length || this.heap[currentIndex] <= this.heap[smallIndex]) {
        break;
      }

      this._swap(currentIndex, smallIndex);
      currentIndex = smallIndex;
    }
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(N, M, cards) {
  const heap = new MinHeap(); // 계속 작은 카드를 고르기 위해 최소힙 정렬을 사용한다.

  // 주어진 카드를 힙 자료구조에 담는다.
  cards.forEach((element) => heap.enqueue(element));

  // 총 M번 동안 카드들을 합체한다.
  while (M--) {
    let first = heap.dequeue();
    let second = heap.dequeue();
    let sum = first + second;

    heap.enqueue(sum);
    heap.enqueue(sum);
  }

  return heap.total().toString(); // 결과를 문자열로 변환하여 반환
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(BigInt);

console.log(solution(N, M, cards));
