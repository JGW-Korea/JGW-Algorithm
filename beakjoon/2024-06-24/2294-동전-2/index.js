function solution(N, K, coins) {
  const dp = new Array(K + 1).fill(Infinity); // DP 테이블 정의

  // DP 테이블 초기값 지정
  dp[0] = 0;

  for(const coin of coins) {
    for(let i = coin; i <= K; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  
  return dp[K] === Infinity ? -1 : dp[K];
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);

console.log(solution(N, K, coins));