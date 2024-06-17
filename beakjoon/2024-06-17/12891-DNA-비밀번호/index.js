function solution(S, P, pwd, count) {
  const check = new Array(4).fill(0); // 민호가 임의로 만든 비밀번호의 DNA 문자열 포함 개수

  function checkCounting() {
    for(let i = 0; i < 4; i++) {
      if(check[i] < count[i]) return false;
    }
    
    return true;
  }
  
  for(let i = 0; i < P; i++) { // 첫 부분 문자열 개수
    switch(pwd[i]) {
      case 'A':
        check[0] += 1;
        break;
        
      case 'C':
        check[1] += 1;
        break;
        
      case 'G':
        check[2] += 1;
        break;
        
      case 'T':
        check[3] += 1;
        break;
    }
  }

  let answer = 0; // 민호가 만들 수 있는 비밀번호의 개수
  
  if(checkCounting()) answer += 1;

  let i;

  for(let j = P; j < S; j++) { // 부분 문자열 만들기
    i = j - P;

    switch(pwd[i]) { // 부분 문자열 첫 문자 제거하기
      case 'A':
        check[0] -= 1;
        break;

      case 'C':
        check[1] -= 1;
        break;

      case 'G':
        check[2] -= 1;
        break;

      case 'T':
        check[3] -= 1;
        break;
    }

    switch(pwd[j]) { // 부분 문자열 마지막 문자 추가하기
      case 'A':
        check[0] += 1;
        break;

      case 'C':
        check[1] += 1;
        break;

      case 'G':
        check[2] += 1;
        break;

      case 'T':
        check[3] += 1;
        break;
    }

    if(checkCounting()) answer += 1;
  }
  
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [S, P] = input[0].split(' ').map(Number);
const pwd = input[1];
const count = input[2].split(' ').map(Number);

console.log(solution(S, P, pwd, count));