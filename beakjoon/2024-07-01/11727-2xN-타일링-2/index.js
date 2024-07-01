function solution(N) {
  const dp = new Array(N + 1).fill(0n);

  dp[1] = 1n; // 2 x 1 크기의 직사각형은 2 x 1 타일 하나로 채울 수 있다.
  dp[2] = 3n; // 2 x 2 크기의 직사각형은 주어진 타일 3개를 사용해서 채울 수 있다.
  dp[3] = 5n; // 2 x 3 크기의 직사각형은 주어진 타일 5개를 사용해서 채울 수 있다.

  for(let i = 4; i < N + 1; i++) {
    dp[i] = (dp[i - 1] + (dp[i - 2] * 2n)) % 10007n;
  }

  return dp[N].toString();
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

console.log(solution(Number(input)));