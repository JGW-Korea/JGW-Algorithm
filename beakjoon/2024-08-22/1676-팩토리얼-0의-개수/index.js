function solution(N) {
  return Math.floor(N / 5) + Math.floor(N / 25) + Math.floor(N / 125);
}

const fs = require("fs");
const input = Number(fs.readFileSync("index.txt").toString().trim());

console.log(solution(input));
