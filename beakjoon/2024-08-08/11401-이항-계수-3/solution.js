function modInverse(a, p) {
  // 페르마의 소정리에 의한 a^(p-2) 계산
  let result = 1n;
  let exponent = p - 2n;

  while (exponent > 0n) {
      if (exponent % 2n === 1n) {
          result = (result * a) % p;
      }
      a = (a * a) % p;
      exponent = exponent / 2n;
  }

  return result;
}

function solution(N, K) {
  const num = 1000000007n;

  // 팩토리얼 계산
  const factDP = new Array(N + 1).fill(1n);

  for (let i = 2; i <= N; i++) {
      factDP[i] = (factDP[i - 1] * BigInt(i)) % num;
  }

  // N! / (K! * (N-K)!) % num
  const numerator = factDP[N];
  const denominator = (factDP[K] * factDP[N - K]) % num;

  // 페르마의 소정리에 의해 분모의 역원 구하기
  const answer = (numerator * modInverse(denominator, num)) % num;

  return answer.toString();
}

const fs = require('fs');
const [N, K] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, K));
