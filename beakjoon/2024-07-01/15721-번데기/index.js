function solution(A, T, flag) {
  let N = 0; // 게임 반복 횟차
  let count = 0; // 원하는 구호가 몇 번 나왔는지 체크
  let answer = 0; // 몇 번째 사람인지 판별

  // 원을 돌아도 다시 일구로 돌아오기 때문에 무한 반복으로 표현한다.
  while(true) {
    N += 1; // 게임 횟차 증가
    const slogans = [0, 1, 0, 1]; // 각 횟차마다 '뻔'-'데기'-'뻔'-'데기'는 무조건 되기 때문에 기본값으로 초기화

    for(let i = 1; i <= N + 1; i++) slogans.push(0); // '뻔' x N 번이 나오는 횟수
    for(let i = 1; i <= N + 1; i++) slogans.push(1); // '데기' x N 번이 나오는 횟수

    for(const slogan of slogans) {
      if(slogan === flag) count += 1;
      if(count === T) return answer;

      answer += 1;
      answer %= A; // 나머지로 인하여 계속 한 바퀴를 돌 수 있다.
    }
  }
}

const fs = require('fs');
const [A, T, flag] = fs.readFileSync('index.txt').toString().trim().split('\n').map(Number);

console.log(solution(A, T, flag));