function solution(n, numbers, inputOperatorCount) {

  const currentOperatorCount = new Array(4).fill(0); // 현재 사용 중인 연산자 카운트
  const characterOperator = ['+', '-', '*', '/']; // 연산자 문자가 저장된 배열

  let maxValue = Number.MIN_SAFE_INTEGER; // N개의 수와 연산자를 통해 만들 수 있는 최대값
  let minValue = Number.MAX_SAFE_INTEGER; // N개의 수와 연산자를 통해 만들 수 있는 최소값

  function dfs(currentValue, currentLength) {
    if(currentLength === n) {

      // 최대값, 최소값 갱신
      maxValue = Math.max(maxValue, currentValue);
      minValue = Math.min(minValue, currentValue);

      return;
    }

    for(let i = 0; i < 4; i++) { // 연산자 수만큼 반복
      if(currentOperatorCount[i] < inputOperatorCount[i]) {
        let result; // 연산값 저장

        switch(characterOperator[i]) { // 현재 사용 중인 연산자 카운트 및 결과 구하는 조건문
          case '+':
            currentOperatorCount[i] += 1;
            result = currentValue + numbers[currentLength];
            break;
            
          case '-':
            currentOperatorCount[i] += 1;
            result = currentValue - numbers[currentLength];
            break;
            
          case '*':
            currentOperatorCount[i] += 1;
            result = currentValue * numbers[currentLength];
            break;
            
          case '/':
            currentOperatorCount[i] += 1;
            result = Math.trunc(currentValue / numbers[currentLength]);
            break;
        }

        dfs(result, currentLength + 1);
        
        switch(characterOperator[i]) { // 재귀 탈출 후 사용 된 연산자 카운트 감소
          case '+':
            currentOperatorCount[i] -= 1;
            break;

          case '-':
            currentOperatorCount[i] -= 1;
            break;

          case '*':
            currentOperatorCount[i] -= 1;
            break;

          case '/':
            currentOperatorCount[i] -= 1;
            break;
        }
      }
    }
  }
  
  dfs(numbers[0], 1);

  return maxValue + "\n" + minValue;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const numbers = input[1].split(' ').map(Number);
const inputOperatorCount = input[2].split(' ').map(Number);

console.log(solution(n, numbers, inputOperatorCount));