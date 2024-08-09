function solution(serial) {
  serial.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length; // 1. 두 배열의 길이가 다를 경우 길이 순으로 정렬
    else { // 두 배열의 길이가 같을 경우
      
      // 입력으로 주어진 문자열을 숫자만 계산해서 합계를 반환한다.
      function sumDigits(str) {
        return str.split("").reduce((sum, char) => {
          return Number.isNaN(Number(char)) ? sum : sum + Number(char); // NaN이 아닐 경우 합계 계산
        }, 0);
      };

      // 두 문자열에서 숫자만 구성해서 합계를 계산한다.
      const sumA = sumDigits(a); 
      const sumB = sumDigits(b);

      if (sumA !== sumB) return sumA - sumB; // 2. 두 숫자의 값이 다를 경우 합계를 기준으로 오름차순
      else return  a.localeCompare(b); // 3. 1번, 2번 모두 아닐 경우 사전순으로 오름차순
    }
  });

  return serial.join("\n");
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const N = Number(input[0]);
const serialNumbers = input.slice(1);

console.log(solution(serialNumbers));
