function solution(R, C, map) {
  let visited = Array.from({length: R}, () => new Array(C).fill(0));
  let count = 0; // 빵집에 놓을 수 있는 파이프라인의 최대 개수

  // 이동 가능한 위치는 오른쪽, 오른쪽 대각선 위, 오른쪽 대각선 아래
  const moves = [ 
    [-1, 1], // 오른쪽 위 대각선
    [0, 1],  // 오른쪽
    [1, 1]  // 오른쪽 아래 대각선
  ]; 

  function dfs(x, y) {
    visited[x][y] = 1; // 해당 위치를 방문 처리를 한다.

    // 행의 위치가 끝점에 도달했을 경우에 true를 반환한다.
    if(y === C - 1) return true;

    // 총 3번의 이동을 할 수 있기 때문에 3번 반복 순회 시킨다. (DFS 알고리즘)
    for(let i = 0; i < 3; i++) {
      const [nextX, nextY] = [x + moves[i][0], y + moves[i][1]];

      if(nextX < 0 || nextY < 0 || nextX >= R || nextY >= C) continue;
      if(!visited[nextX][nextY] && map[nextX][nextY] !== 'x') {
        if(dfs(nextX, nextY)) return true;
      }
    }

    return false; // 반복문을 탈출하게 되면 해당 파이프는 빵집과 연결할 수 없다는 의미가 된다.
  }
  
  // DFS의 시작점은 항상 map[i][0]번째에 해당한다.
  for(let i = 0; i < R; i++) {
    if(dfs(i, 0)) { // DFS 알고리즘에서 true를 반환하면 끝점에 도달했다는 의미로 1증가
      count += 1;
    }
  }

  return count;
}

const fs = require('fs');
const { deflateSync } = require('zlib');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [R, C] = input[0].split(' ').map(Number);
const map = Array.from({length: R}, () => []);

for(let i = 1; i < R + 1; i++) {
  map[i - 1] = input[i].split('');
}

console.log(solution(R, C, map));