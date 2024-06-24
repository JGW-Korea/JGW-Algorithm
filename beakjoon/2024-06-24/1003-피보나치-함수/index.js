function solution(N) {
  if(N === 0) return '1 0';
  if(N === 1) return '0 1';

  // DP 테이블 정의
  const dp = Array.from({length: N + 1}, () => [0, 0]);

  // DP 테이블 초기값 정의
  dp[0][0] = 1;
  dp[1][1] = 1;
  dp[2][0] = dp[2][1] = 1;

  // DP 테이블 점화식
  //   - dp[i][0] = dp[i - 1][0] + dp[i - 2][0]
  //   - dp[i][1] = dp[i - 1][1] + dp[i - 2][1]
  for(let i = 3; i < N + 1; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
    dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
  }

  return dp[N].join(' ');
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const numbers = input.slice(1).map(Number);

let result = '';

for(const num of numbers) {
  result += solution(num) + '\n';
}

console.log(result);