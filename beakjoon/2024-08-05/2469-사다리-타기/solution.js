function solution(K, N, final, board) {
  // 입력으로 주어진 K 만큼의 출발 순서 알파벳을 가지는 1차원 배열을 생성한다.
  const alpha = Array.from({ length: K }, (_, idx) => String.fromCharCode(idx + 65));

  let result = ""; // 숨겨진 가로 줄 ?의 '*', '-'를 나타내는 변수

  // 숨겨진 ? 가로 줄이 나타나기 이전까지 각 알파벳이 '-'를 만나 움직이는 경우를 구한다.
  // 즉, 출발 순서를 ?를 만나기 전까지의 이동 순서를 찾는 경우
  for(let row = 0; row < N; row++) {
    if(board[row][0] === '?') break;

    for(let col = 0; col < K - 1; col++) {
      if(board[row][col] === '-') [alpha[col], alpha[col + 1]] = [alpha[col + 1], alpha[col]];
    }
  }

  // 숨겨진 ? 가로 줄을 만나기 전까지 각 도착 순서 알파벳이 '-'를 만나 움직이는 경우를 구한다.
  for(let row = N - 1; row >= 0; row--) {
    if(board[row][0] === '?') break;

    for(let col = K - 2; col >= 0; col--) {
      if(board[row][col] === '-') [final[col], final[col + 1]] = [final[col + 1], final[col]];
    }
  }

  for(let i = 0; i < alpha.length - 1; i++) {
    if(alpha[i] === final[i + 1] && alpha[i + 1] === final[i]) result += '-';
    else result += '*';
  }

  for(let i = 0; i < alpha.length - 1; i++) {
    if(result[i] === '-') [alpha[i], alpha[i + 1]] = [alpha[i + 1], alpha[i]];
  }

  if(alpha.join('') === final.join('')) return result;
  else return 'x'.repeat(K - 1);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [K, N] = [Number(input[0]), Number(input[1])]; // 입력으로 주어진 K와 N을 각 변수에 저장한다.
const final = input[2].split(''); // 입력으로 주어진 도착 순서를 문자 배열로 변환시킨다.
const board = input.slice(3).map(element => element.split('')); // 사다리를 2차원 배열로 표현한다.

console.log(solution(K, N, final, board));