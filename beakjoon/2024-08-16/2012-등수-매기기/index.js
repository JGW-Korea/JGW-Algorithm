function solution(N, ranking) {
  ranking.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < N; i++) {
    answer += Math.abs(ranking[i] - (i + 1));
  }

  return answer;
}

const fs = require("fs");
const [N, ...ranking] = fs
  .readFileSync("index.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

console.log(solution(N, ranking));
