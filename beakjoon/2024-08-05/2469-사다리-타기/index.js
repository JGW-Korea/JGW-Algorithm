function solution(K, N, final, board) {
  // 입력으로 주어진 K 개의 알파벳 출발 순서를 1차원 배열로 표현한다.
  const alpha = Array.from({ length: K }, (_, idx) => String.fromCharCode(idx + 65));

  let answer = ''; // ? 줄의 사다리 구성을 저장하는 변수

  // 1. 출발 순서의 알파벳들을 ?를 만나기 이전까지의 이동 경로를 구한다.
  for(let row = 0; row < N; row++) {
    if(board[row][0] === "?") break; // 이동 경로를 구하던 중 ?를 만날경우 반복문을 중단한다.

    for(let col = 0; col < K - 1; col++) {
      if(board[row][col] === '-') [alpha[col], alpha[col + 1]] = [alpha[col + 1], alpha[col]];
    }
  }

  // 2. 입력으로 주어진 도착 순서 알파벳들을 N - 1 ~ 0 까지 올라가면서 ?를 만나기 이전까지의 이동 경로를 구한다.
  for(let row = N - 1; row >= 0; row--) {
    if(board[row][0] === '?') break;

    for(let col = K - 2; col >= 0; col--) {
      if(board[row][col] === '-') [final[col], final[col + 1]] = [final[col + 1], final[col]];
    }
  }

  // 3. 출발 순서에서 ?의 사다리 구성이 어떻게 되어 있어야 도착 순서 알파벳들과 같은지 구한다.
  for(let i = 0; i < alpha.length - 1; i++) {
    if(alpha[i] === final[i + 1] && alpha[i + 1] === final[i]) {
      answer += '-';
      [alpha[i], alpha[i + 1]] = [alpha[i + 1], alpha[i]];
    } else {
      answer += '*';
    }
  }

  // 4. 출발 순서와 도착 순서 알파벳들의 이동 순서를 모두 구하고 이동 순서가 같은지 판별한다. (아닐 경우 x * K - 1를 반환)
  if(alpha.join('') === final.join('')) return answer;
  return 'x'.repeat(K - 1);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [K, N] = [Number(input[0]), Number(input[1])]; // 입력으로 주어진 K와 N을 저장한다.
const final = input[2].split(''); // 입력으로 주어진 도착 순서를 문자 배열로 변환한다.
const board = input.slice(3).map(element => element.split('')); // 입력으로 주어진 사다리를 2차원 배열로 표현한다.

console.log(solution(K, N, final, board));