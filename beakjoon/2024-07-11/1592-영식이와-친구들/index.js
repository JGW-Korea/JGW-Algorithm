function solution(N, M, L) {

  let ballCount = new Array(N + 1).fill(0); // N명의 사람이 볼을 받은 횟수
  let current = 1; // 볼을 가지고 있는 사람
  ballCount[current] = 1;

  let answer = 0;
  
  while(!ballCount.includes(M)) {
    if(ballCount[current] % 2 === 1) { // 현재 공을 받은 횟수가 홀수일 경우
      current += L;
      
      if(current > N) current -= N;
    } else {
      current = (current - L) + N;

      if(current > N) current -= N;
    }

    ballCount[current] += 1;
    answer += 1;
  }

  return answer;
}

const fs = require('fs');
const [N, M, L] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, M, L));