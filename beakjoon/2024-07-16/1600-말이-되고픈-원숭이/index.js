function solution(K, W, H, graph) {

  function rangeCheck(x, y) {
    if(x < 0 || y < 0 || x >= H || y >= W) return true;
    return false;
  }
  
  const visited = Array.from({length: H}, () => Array.from({length: W}, () => [0, 0]));
  visited[0][0][0] = 1;
  
  const queue = [[0, 0, 0]];

  // 체스 나이트의 이동
  const knightMoves = [
    [-1, -2], // -1위, -2왼
    [-2, -1], // -2위, -1왼
    [-2, 1], // -2위, 1오
    [-1, 2], // -1위, 2오
    [1, -2], // 1아래, -2왼
    [2, -1], // 2아래, -1왼
    [1, 2], // 1아래 2오
    [2, 1] // 2아래, 1오
  ]; 
  
  // 인접한 방향 이동
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  while(queue.length) {
    const [currentX, currentY, horse] = queue.shift();

    if(currentX === H - 1 && currentY === W - 1) return visited[currentX][currentY][horse] - 1;

    for(let i = 0; i < 4; i++) {
      const [nextX, nextY] = [currentX + dx[i], currentY + dy[i]];
      if(rangeCheck(nextX, nextY)) continue;
      if(graph[nextX][nextY] === 0 && !visited[nextX][nextY][horse]) {
        visited[nextX][nextY][horse] = visited[currentX][currentY][horse] + 1;
        queue.push([nextX, nextY, horse]);
      }
    }

    // 나이트의 이동이 가능한가?
    if(horse < K) {
      for(let i = 0; i < knightMoves.length; i++) {
        const [nextX, nextY] = [currentX + knightMoves[i][0], currentY + knightMoves[i][1]];

        if(rangeCheck(nextX, nextY)) continue;
        if(graph[nextX][nextY] === 0 && !visited[nextX][nextY][horse + 1] ) {
          visited[nextX][nextY][horse + 1] = visited[currentX][currentY][horse] + 1;
          queue.push([nextX, nextY, horse + 1]);
        }
      }
    }
  }


  return -1;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const K = Number(input[0]);
const [W, H] = input[1].split(' ').map(Number);
const graph = input.slice(2).map(element => element.split(' ').map(Number));

console.log(solution(K, W, H, graph));