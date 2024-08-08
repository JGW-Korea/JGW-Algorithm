function solution(N, K) {
  // 1. 팩토리얼에 대한 DP 테이블을 정의한다.
  const factDP = new Array(N + 1).fill(0n);
  const num = 1000000007n;

  factDP[0] = factDP[1] = 1n;
  factDP[2] = 2n;


  for(let i = 3; i < N + 1; i++) {
    factDP[i] = (BigInt(i) * factDP[i - 1]) % num;
  }

  // // 2. 이항 계수에 대한 DP 테이블 정의
  const answerDP = new Array(N + 1).fill(0n);

  for(let i = 1; i < N + 1; i++) {
    answerDP[i] = (factDP[N] / (factDP[i - K < 0 ? 0 : i - K] * factDP[K])) % num;
  }

  return answerDP[N].toString();
}

const fs = require('fs');
const [N, K] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, K));