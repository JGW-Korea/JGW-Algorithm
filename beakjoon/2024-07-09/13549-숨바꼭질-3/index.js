function solution(N, K) {
  const visited = new Array(100001).fill(0);
  visited[N] = 1;

  const queue = [N];

  while(queue.length) {
    const current = queue.shift();

    if(current === K) return visited[current] - 1;

    for(const [next, cost] of [[current + 1, visited[current] + 1], [current - 1, visited[current] + 1], [current * 2, visited[current] + 0]]) {

    
      
      if(next < 0 || next >= 100001) continue;
      if(!visited[next] || cost < visited[next]) {
        if(next === current * 2) visited[next] = cost;
        else {
          visited[next] = cost;
        }

        queue.push(next);
      }

    }
  }
}

const fs = require('fs');
const [N, K] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, K));