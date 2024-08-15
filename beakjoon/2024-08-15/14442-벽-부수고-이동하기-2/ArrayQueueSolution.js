function solution(N, M, K, map) {
  // 방문 처리를 위한 배열, [ 경로, 벽을 뿌순 횟수 ]
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [0, 0]));
  visited[0][0][0] = 1; // 시작하는 칸도 포함해서 세야된다.

  const queue = [ [0, 0, 0] ]; // 큐에는 [X, Y, 벽을 뿌순 횟수] 배열 값이 들어간다.

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  // BFS 로직
  while(queue.length) {
    const [currentX, currentY, count] = queue.shift();

    // (N, M) 위치에 도달했을 경우
    if(currentX === N - 1 && currentY === M - 1) return visited[currentX][currentY][0];

    for(let i = 0; i < 4; i++) {
      const [nextX, nextY] = [currentX + dx[i], currentY + dy[i]]; // 다음 이동 경로를 구한다.

      // 보드를 벗어날 경우
      if(nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) continue;

      // 다음 이동 경로에 벽이 없을 경우
      if(
        (!visited[nextX][nextY][0] || visited[currentX][currentY][0] + 1 <= visited[nextX][nextY][0]) && 
        map[nextX][nextY] === 1
      ) {
        if(count < K) { // 벽을 뿌술수 있는 경우
          queue.push([nextX, nextY, count + 1]);
          visited[nextX][nextY][0] = visited[currentX][currentY][0] + 1;
          visited[nextX][nextY][1] = visited[currentX][currentY][1] + 1;
        }
      }

      // 다음 이동 경로에 벽이 없을 경우
      if(
        (!visited[nextX][nextY][0] || visited[currentX][currentY][0] + 1 <= visited[nextX][nextY][0]) && 
        map[nextX][nextY] === 0
      ) {
        queue.push([nextX, nextY, count]);
        visited[nextX][nextY][0] = visited[currentX][currentY][0] + 1;
        visited[nextX][nextY][1] = visited[currentX][currentY][1];
      }
    }
  }

  return -1; // (N, M) 위치에 도달하지 못하는 경우
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const map = input.slice(1).map(element => element.split('').map(Number));

console.log(solution(N, M, K, map));