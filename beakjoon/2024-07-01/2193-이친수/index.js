function solution(N) {
  const dp = new Array(N + 1).fill(0n);

  dp[1] = 1n;
  dp[2] = 1n;

  for(let i = 3; i < N + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[N].toString();
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

console.log(solution(Number(input)));