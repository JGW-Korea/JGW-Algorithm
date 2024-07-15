function solution(N, times) {
  times.sort((a, b) => {
    if(a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
  });

  let currentRooms = 0; // 현재 강의실의 개수
  let answer = 0; // 최대 강의실의 개수

  for(const [a, b] of times) {
    currentRooms += b;
    answer = Math.max(answer, currentRooms);
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const times = [];

for(let i = 1; i < N + 1; i++) {
  const [start, end] = input[i].split(' ').map(Number);

  times.push([start, 1]);
  times.push([end, -1]);
}

console.log(solution(N, times));