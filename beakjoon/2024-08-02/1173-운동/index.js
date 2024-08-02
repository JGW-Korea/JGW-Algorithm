function solution(N, m, M, T, R) {
  if(m + T > M) return -1;
  
  let current = m; // 초기 맥박을 지정한다.
  let time = 0; // 운동을 한 시간
  let answer = 0;

  // 총 N분까지 운동하는데 필요한 시간의 최소값
  while(time !== N) {
    if(current + T <= M) { // 현재 맥박 상태에서 운동을 할 수 있는 경우
      current += T; // 피로도가 증가한다.
      time += 1;
    } else {
      current -= R; // 휴식을 취해서 피로도가 감소한다.

      // 현재 맥박이 초기 맥박보다 작을 경우 현재 맥박을 초기 맥박으로 재설정한다.
      if(current < m) {
        current = m;
      }
    }

    answer += 1; // 시간을 증가한다.
  }

  return answer;
}

const fs = require('fs');
const [N, m, M, T, R] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(N, m, M, T, R));