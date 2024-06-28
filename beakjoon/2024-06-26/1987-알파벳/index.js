function solution(R, C, graph) {
  const visited = new Array(26).fill(false); // 알파벳을 사용하고 있는지 표시

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  function charCodeReturn(x, y) {
    return graph[x][y].charCodeAt() - 65;
  }
  
  function dfs(currentX, currentY, count) {
    let maxCount = count;

    // 현재 위치에 적힌 알파벳을 사용하고 있다고 표시
    visited[charCodeReturn(currentX, currentY)] = true;

    for(let i = 0; i < 4; i++) {
      const [nextX, nextY] = [currentX + dx[i], currentY + dy[i]];

      if(nextX < 0 || nextY < 0 || nextX >= R || nextY >= C) continue
      if(!visited[charCodeReturn(nextX, nextY)]) {
        maxCount = Math.max(maxCount, dfs(nextX, nextY, count + 1));
      }
    }

    visited[charCodeReturn(currentX, currentY)] = false;
    return maxCount;
  }

  return dfs(0, 0, 1);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [R, C] = input[0].split(' ').map(Number);
const graph = Array.from({ length: R }, () => []);

for(let i = 1; i < R + 1; i++) {
  graph[i - 1] = input[i].split('');
}

console.log(solution(R, C, graph));