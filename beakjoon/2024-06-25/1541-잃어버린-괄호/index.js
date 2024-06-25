function solution(data) {
  let answer = 0;

  for(let i = 0; i < data.length; i++) {
    
    // 현재 인덱스 위치가 가리키는 원소를 '+' 기호를 기준으로 분리하고 분리된 두 값을 더해준다.
    // 또한, 현재 원소가 '+' 기호가 없다면 숫자(Number) 자료형으로만 수정된다.
    let current = data[i].split('+').map(Number).reduce((prev, curr) => prev + curr);

    if(i === 0) answer += current; // 첫 번째 값은 무조건 더해준다.
    else answer -= current; // 이후 모든 값은 빼주면 자연스럽게 최소값이 된다.
  }
  
  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

// 주어진 문자열을 '-' 기호를 기준으로 분리해준다.
console.log(solution(input.split('-')));