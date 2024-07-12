function solution(M, N, sticks) {
  let answer = 0; // 조카들에게 나눠준 과자의 최대길이

  // 이진 탐색을 위한 left와 right
  let left = 0;
  let right = Math.max(...sticks);

  // 이진 탐색(파라메트릭 서치) 로직
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;

    // 현재 mid 값과 각 과자에 대한 나눗셈 값을 이용하면 몇 명한테 나눠줄 수 있는지 파악한다.
    for (let i = 0; i < N; i++) {
      count += Math.floor(sticks[i] / mid);
    }

    // 즉, 나눠줄 수 있는 개수가 조카들의 수보다 많을 경우 참
    if (count >= M) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [M, N] = input[0].split(" ").map(Number);
const sticks = input[1].split(" ").map(Number);

console.log(solution(M, N, sticks));
