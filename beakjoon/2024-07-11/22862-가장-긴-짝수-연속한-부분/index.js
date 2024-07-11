function solution(N, K, S) {
  let [p1, p2] = [0, 0];
  let count = S[p1] & 1 ? 1 : 0;
  let m = 0;

  while(true) {
    while(p2 < N - 1) {
      if(S[p2 + 1] & 1) {
        if(count < K) count++;
        else break;
      }

      p2 += 1;
    }

    if(p1 >= N || p2 >= N) break;
    m = Math.max(m, p2 - p1 + 1 - count);

    if(S[p1] & 1) count--;
    p1 += 1;
  }

  return m;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const S = input[1].split(' ').map(Number);

console.log(solution(N, K, S));