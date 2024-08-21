function solution(N, M, map) {
  const dp = Array.from({ length: N }, () => Array(M).fill(0));

  dp[0][0] = map[0][0]; // 시작 위치에 있는 사탕 개수를 저장시킨다.

  // 첫 번째 행에 대한 사탕 개수를 저장시킨다.
  for(let i = 1; i < M; i++) {
    dp[0][i] = dp[0][i - 1] + map[0][i];
  }

  // 첫 번째 열에 대한 사탕 개수를 저장시킨다.
  for(let i = 1; i < N; i++) {
    dp[i][0] = dp[i - 1][0] + map[i][0];
  }

  // 나머지 행과 열의 사탕 개수를 저장시킨다.
  for(let i = 1; i < N; i++) {
    for(let j = 1; j < M; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + map[i][j];
    }
  }

  return dp[N - 1][M - 1];
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(N, M, map));