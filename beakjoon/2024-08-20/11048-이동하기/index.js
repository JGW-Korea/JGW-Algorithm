// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class LinkedQueue {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }

//   enqueue(value) {
//     const newNode = new Node(value);
    
//     if(this.head === null) {
//       this.head = newNode;
//     } else {
//       this.tail.next = newNode;
//     }
    
//     this.tail = newNode;
//     this.length += 1;
//   }

//   dequeue() {
//     if(this.isEmpty()) return;

//     const returnValue = this.head.value;
//     this.head = this.head.next;
//     this.length -= 1;
//     return returnValue;
//   }

//   isEmpty() {
//     return this.length === 0;
//   }
// }

function solution(N, M, board) {
  const visited = Array.from({ length: N }, () => Array(M).fill(0));
  const queue = [[0, 0]];
  // const queue = new LinkedQueue();
  
  visited[0][0] = board[0][0];
  // queue.enqueue([0, 0]);

  // (r + 1, c) / (r, c + 1) / (r + 1, c + 1)로 이동할 수 있다.
  const moves = [
    [1, 0],
    [0, 1],
    [1, 1],
  ];

  let front = 0;
  
  // BFS 탐색 로직
  while(front < queue.length) {
    const [currentX, currentY] = queue[front++];

    // 총 3번의 이동을 할 수 있음
    for(let i = 0; i < 3; i++) {
      const [nextX, nextY] = [currentX + moves[i][0], currentY + moves[i][1]];

      // 미로 밖을 탈출할 수 없다.
      if(nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) continue;
      
      // 방문하지 않았거나, 사탕의 개수가 지금 이동보다 적을 경우
      if(!visited[nextX][nextY] || visited[nextX][nextY] < visited[currentX][currentY] + board[nextX][nextY]) {
        visited[nextX][nextY] = visited[currentX][currentY] + board[nextX][nextY];
        queue.push([nextX, nextY, visited[currentX][currentY] + board[nextX][nextY]]);
      }
    }
  }

  return visited[N - 1][M - 1];
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
const board = input.map(element => element.split(' ').map(Number));

console.log(solution(N, M, board));