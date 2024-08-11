function solution(N) {
  const dp = new Array(N + 1).fill(0n); // DP 테이블 정의

  dp[1] = 1n;
  dp[2] = 3n;

  for(let i = 3; i < N + 1; i++) {
    dp[i] = (dp[i - 1] + (dp[i - 2] * 2n)) % 10007n;
  }

  return dp[N].toString();
}

const fs = require('fs');
const N = Number(fs.readFileSync('index.txt').toString().trim());

console.log(solution(N));