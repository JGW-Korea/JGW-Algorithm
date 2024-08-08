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

  function recursion(coin1, coin2, count, currentBoard) {
    console.log('coin1: ' + coin1);
    console.log('coin2: ' + coin2);

    if(
        (coin1[0] < 0 || coin1[1] < 0 || coin1[0] >= N || coin1[1] >= M) &&
        (coin2[0] < 0 || coin2[1] < 0 || coin2[0] >= N || coin2[1] >= M)
      ) {
      return;
      }

    // 버튼을 10번 이상 누른 경우 또는 벽일 경우 또는 두 동전이 동시에 보드에서 떨어질 경우
    if (
      count >= 10 ||
      board[coin1[0]][coin1[1]] === "#" ||
      board[coin2[0]][coin2[1]] === "#"
    ) {
      return; // 아무것도 하지 않고 이전 함수로 되돌아간다.
    }

    // 한 개의 동전만 떨어지는 경우
    if(
      (coin1[0] < 0 || coin1[1] < 0 || coin1[0] >= N || coin1[1] >= M) ||
      (coin2[0] < 0 || coin2[1] < 0 || coin2[0] >= N || coin2[1] >= M)
    ) {
      answer = Math.min(answer, count);
      return;
    }

    // 동전의 위치를 상하좌우로 이동
    for(let i = 0; i < 4; i++) {
      const [nextFirstCoinX, nextFirstCoinY] = [coin1[0] + dx[i], coin1[1] + dy[i]];
      const [nextLastCoinX, nextLastCoitY] = [coin2[0] + dx[i], coin2[1] + dy[i]];

      // 이동 할 수 있는 경우
      if(
        (nextFirstCoinX >= 0 && nextFirstCoinY >= 0 && nextFirstCoinX < N && nextFirstCoinY < M) &&
        (nextLastCoinX >= 0 && nextLastCoitY >= 0 && nextLastCoinX < N && nextLastCoitY < M)
      ) {
        currentBoard[coin1[0]][coin1[1]] = '.';
        currentBoard[coin2[0]][coin2[1]] = '.';
        currentBoard[nextFirstCoinX][nextFirstCoinY] = 'o';
        currentBoard[nextLastCoinX][nextLastCoitY] = 'o';
      }

      // 재귀 호출
      recursion([nextFirstCoinX, nextFirstCoinY], [nextLastCoinX, nextLastCoinX], count + 1);
      console.log('count: ' + count + ', nextFirstX : ' + nextFirstCoinX + ', nextFirstY : ' + nextFirstCoinY);
      currentBoard[coin1[0]][coin1[1]] = 'o';
      currentBoard[coin2[0]][coin2[1]] = 'o';
      currentBoard[nextFirstCoinX][nextFirstCoinY] = '.';
      currentBoard[nextLastCoinX][nextLastCoitY] = '.';
    }
  }

  // 재귀 인수 종류 : 동전1, 동전2, 버튼을 누른 횟수
  recursion(coinPos[0], coinPos[1], 0, board);
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((element) => element.split(""));

console.log(solution(N, M, board));
