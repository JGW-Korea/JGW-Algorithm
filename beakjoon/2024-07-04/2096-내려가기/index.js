function solution(N, board) {
  // 최대, 최소 값을 담을 DP 테이블 정의
  const maxDP = new Array(3).fill(0);
  const minDP = new Array(3).fill(0);

  // 최대, 최소 임시값을 담을 DP 테이블 정의 (임시 배열보다는 아래줄 값 저장하는 배열)
  // 각 인덱스가 가리키는 의미 [Max(위, 오른쪽), Max(왼쪽, 위, 오른쪽), Max(왼쪽, 위)]
  const tempMaxDP = new Array(3).fill(0);
  const tempMinDP = new Array(3).fill(0);

  // DP 테이블 초기값 지정
  maxDP[0] = minDP[0] = board[0][0];
  maxDP[1] = minDP[1] = board[0][1];
  maxDP[2] = minDP[2] = board[0][2];

  for(let i = 1; i < N; i++) {
    const [left, mid ,right] = board[i];

    tempMaxDP[0] = Math.max(maxDP[0], maxDP[1]) + left;
    tempMaxDP[1] = Math.max(maxDP[0], maxDP[1], maxDP[2]) + mid;
    tempMaxDP[2] = Math.max(maxDP[1], maxDP[2]) + right;

    tempMinDP[0] = Math.min(minDP[0], minDP[1]) + left;
    tempMinDP[1] = Math.min(minDP[0], minDP[1], minDP[2]) + mid;
    tempMinDP[2] = Math.min(minDP[1], minDP[2]) + right;

    // 아래줄에 대한 값을 결과 DP 테이블에 값을 저장한다.
    [maxDP[0], maxDP[1], maxDP[2]] = [tempMaxDP[0], tempMaxDP[1], tempMaxDP[2]];
    [minDP[0], minDP[1], minDP[2]] = [tempMinDP[0], tempMinDP[1], tempMinDP[2]];
  }

  return Math.max(...maxDP) + " " + Math.min(...minDP);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const board = input.slice(1).map(element => element.split(' ').map(Number));

console.log(solution(N, board));