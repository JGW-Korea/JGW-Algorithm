// 현재 윈도우의 카운트가 주어진 조건을 만족하는지 확인하는 함수
function checkPassword(currentCount, requiredCount) {
  for (let i = 0; i < 4; i++) {
    if (currentCount[i] < requiredCount[i]) {
      return false;
    }
  }
  return true;
}

function solution(s, p, pwd, count) {
  const dnaStr = ['A', 'C', 'G', 'T'];

  let answer = 0; // 비밀번호 종류의 수

  let currentCount = new Array(4).fill(0); // 현재 윈도우 내 각 DNA 문자 개수
  let start = 0; // 슬라이딩 윈도우 시작점

  // 초기 윈도우 설정
  for (let i = 0; i < p; i++) {
    const index = dnaStr.indexOf(pwd[i]);
    if (index !== -1) {
      currentCount[index] += 1;
    }
  }

  // 초기 윈도우가 조건을 만족하는지 확인
  if (checkPassword(currentCount, count)) {
    answer += 1;
  }

  // 슬라이딩 윈도우를 오른쪽으로 이동
  for (let end = p; end < s; end++) {
    const newIndex = dnaStr.indexOf(pwd[end]);
    const oldIndex = dnaStr.indexOf(pwd[start]);

    if (newIndex !== -1) {
      currentCount[newIndex] += 1;
    }
    if (oldIndex !== -1) {
      currentCount[oldIndex] -= 1;
    }

    start += 1;

    if (checkPassword(currentCount, count)) {
      answer += 1;
    }
  }

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [s, p] = input[0].split(' ').map(Number);
const pwd = input[1];
const count = input[2].split(' ').map(Number);

console.log(solution(s, p, pwd, count));
