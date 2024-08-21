function solution(X, Y) {
  const visited = Array(Y + 1).fill(0);
  const queue = [[X, 1]]; // 큐에 현재 위치와 키를 얼만큼 늘렸는지에 대한 정보를 담는다.

  const plus = [-1, 0, 1];
  visited[X] = 1;
  
  // BFS 탐색 로직
  while(queue.length) {
    const [current, height] = queue.shift();

    for(let i = 0; i < 3; i++) {
      const next = current + (height + plus[i]);

      // 배열의 범위를 벗어났거나, 키를 조절한 값이 양수일 경우에는 넘어간다.
      if(height + plus[i] < 0 || next < 0 || next > Y) continue;
      if(!visited[next]) {
        visited[next] = visited[current] + 1;
        queue.push([next, height + plus[i]]);
      }
    }
  }

  return visited[Y];
}

const fs = require('fs');
const [X, Y] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(X, Y));