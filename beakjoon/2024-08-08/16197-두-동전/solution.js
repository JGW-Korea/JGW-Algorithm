function solution(N, M, board) {
  let answer = Number.MAX_SAFE_INTEGER; // 두 동전 중 하나만 떨어지기 위한 최소 횟수

  const coinPos = []; // 두 동전의 위치
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  // 두 동전의 좌표를 구한다.
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (coinPos.length < 2 && board[i][j] === "o") {
        coinPos.push([i, j]);
      }
    }

    if (coinPos.length >= 2) break;
  }

  function recursion(coin1, coin2, count) {
    if(count <= 10) {

      for(let dir = 0; dir < 4 ; dir++) {
        let firstCoinMove = [coin1[0] + dx[dir], coin1[1] + dy[dir]];
        let lastCoinMove = [coin2[0] + dx[dir], coin2[1] + dy[dir]];

        let firstState = false;
        let lastState = false;

        if(firstCoinMove[0] >= 0 && firstCoinMove[1] >= 0 && firstCoinMove[0] < N && firstCoinMove[1] < M) firstState = true;
        if(lastCoinMove[0] >= 0 && lastCoinMove[1] >= 0 && lastCoinMove[0] < N && lastCoinMove[1] < M) lastState = true;

        if(firstState ^ lastState) {
          if(count < 10) {
            answer = Math.min(answer, count);
            return;
          }
        }

        else if(firstState && lastState) {
          if(board[firstCoinMove[0]][firstCoinMove[1]] === '#') {
            firstCoinMove = coin1;
          }

          if(board[lastCoinMove[0]][lastCoinMove[1]] === '#') {
            lastCoinMove = coin2;
          }

          if(!(firstCoinMove[0] === lastCoinMove[0] && firstCoinMove[1] === lastCoinMove[1])) {
            recursion(firstCoinMove, lastCoinMove, count + 1);
          }
        }


      }
    }
  }

  // 재귀 인수 종류 : 동전1, 동전2, 버튼을 누른 횟수
  recursion(coinPos[0], coinPos[1], 1);

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((element) => element.split(""));

console.log(solution(N, M, board));