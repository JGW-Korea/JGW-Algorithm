// 메모리 초과 실패
function solution(N, board) {
  // 1. DP 테이블 정의
  //  - N * 3 크기의 테이블 각 위치에는 [0, 0] 값이 들어간다. (최대값, 최소값);
  const dp = Array.from({ length: n }, () =>
    Array.from(
      { length: 3 },
      () => new Array(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
    ),
  );

  // 2. DP 테이블 초기화
  dp[0][0][0] = dp[0][0][1] = board[0][0];
  dp[0][1][0] = dp[0][1][1] = board[0][1];
  dp[0][2][0] = dp[0][2][1] = board[0][2];

  const moves = [0, -1, 1];

  // 3. DP 테이블 점화식
  //    - 최대값 점화식 : dp[i][nextY][0] = Math.max(dp[i][nextY][0], maxValue);
  //    - 최소값 점화식 : dp[i][nextY][1] = Math.min(dp[i][nextY][1], minValue);
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < 3; j++) {
      for (const move of moves) {
        const nextY = j + move;

        if (i < 0 || nextY < 0 || i >= N || nextY >= 3) continue;

        let tempMaxValue = dp[i - 1][j][0] + board[i][nextY]; // 한 칸 내려가서 최대값
        let tempMinValue = dp[i - 1][j][1] + board[i][nextY]; // 한 칸 내려가서 최소값

        dp[i][nextY][0] = Math.max(dp[i][nextY][0], tempMaxValue);
        dp[i][nextY][1] = Math.min(dp[i][nextY][1], tempMinValue);
      }
    }
  }

  let maxValue = Number.MIN_SAFE_INTEGER;
  let minValue = Number.MAX_SAFE_INTEGER;

  for(let i = 0; i < 3; i++) {
    maxValue = Math.max(maxValue, ...dp[N - 1][i]);
    minValue = Math.min(minValue, ...dp[N - 1][i]);
  }

  return maxValue + " " + minValue;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const board = input.slice(1).map((element) => element.split(" ").map(Number));

console.log(solution(n, board));
