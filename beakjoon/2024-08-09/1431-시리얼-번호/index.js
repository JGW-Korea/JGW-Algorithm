function solution(serial) {
  serial.sort((a, b) => {
    if(a.length !== b.length) return a.length - b.length; // 기준 1. 길이가 짧은 시리얼 번호로 오름차순
    else { // 길이가 같을 경우

      const sumDigits = (str) => {
        return str.split('').reduce((sum, char) => {
          return Number.isNaN(Number(char)) ? sum : sum + Number(char);
        }, 0);
      }

      // 시리얼 번호의 숫자의 합계를 구한다.
      const sumA = sumDigits(a); 
      const sumB = sumDigits(b);

      if(sumA !== sumB) return sumA - sumB; // 기준 2. 합계가 다른 경우 오름차순 정렬
      else return a.localeCompare(b); // 기준 3. 1, 2번 모두 아닐 경우 사전순으로 정렬
    }
  });

  return serial.join("\n");
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const N = Number(input[0]);
const serialNumbers = input.slice(1);

console.log(solution(serialNumbers));
