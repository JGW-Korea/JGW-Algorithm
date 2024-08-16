function solution(N, M, startX, startY, endX, endY, map) {
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [0, 0]));
  visited[startX][startY][0] = 1;

  // 큐에 [시작 위치 X, 시작 위치 Y, 벽을 뿌순 횟수]의 값을 담는다.
  const queue = [[startX, startY, 0]];

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  // BFS 로직
  while (queue.length) {
    const [currentX, currentY, count] = queue.shift();

    if(currentX === endX && currentY === endY) return visited[currentX][currentY][count] - 1;
    
    for (let i = 0; i < 4; i++) {
      const [nextX, nextY] = [currentX + dx[i], currentY + dy[i]];

      if (nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) continue;

      // 다음 경로에 벽이 있을 경우
      if (map[nextX][nextY] === 1 && count === 0  && !visited[nextX][nextY][1]) {
        // 벽을 부술 수 있는 경우
        visited[nextX][nextY][1] = visited[currentX][currentY][0] + 1;
        queue.push([nextX, nextY, 1]);
      }

      // 다음 경로가 벽이 아닐 경우
      if (map[nextX][nextY] === 0 && !visited[nextX][nextY][count]) {
        visited[nextX][nextY][count] = visited[currentX][currentY][count] + 1;
        queue.push([nextX, nextY, count]);
      }
    }
  }

  return -1;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [hX, hY] = input[1].split(" ").map(Number);
const [eX, eY] = input[2].split(" ").map(Number);
const map = input.slice(3).map((element) => element.split(" ").map(Number));

console.log(solution(N, M, hX - 1, hY - 1, eX - 1, eY - 1, map));
