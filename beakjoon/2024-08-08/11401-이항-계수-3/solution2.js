function solution(N, K) {
  if(K === 1) return N;
  if(K === 0 || N === K) return 1;
  if(N - K === 1) return N;

  const DIV = 1000000007n; // 1,000,000,007로 나눈 나머지

  // 분할 정복을 이용한 큰 수의 거듭 제곱
  function power(a, m) {
    if(m === 0n) return 1n;

    let temp = power(a, m / 2n) % DIV;
    if(m % 2n === 1n) return temp * temp % DIV * a % DIV;
    return temp * temp % DIV;
  }

  let [A, B] = [1n, 1n];

  for(let i = N; i >= N - K + 1; i--) A = (A * BigInt(i)) % DIV;
  for(let i = 1; i <= K; i++) B = (B * BigInt(i)) % DIV;

  return (((A % DIV) * power(B, DIV - 2n) % DIV) % DIV).toString();
}

const fs = require('fs');
const [N, K] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, K));