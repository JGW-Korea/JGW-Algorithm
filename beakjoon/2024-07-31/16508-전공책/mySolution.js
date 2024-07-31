function solution(T, N, books) {
  const totalCount = new Array(26).fill(0); // T 문자열에서 사용된 알파벳 개수
  const count = new Array(26).fill(0); // 지금까지 사용된 문자열의 개수

  let answer = Number.MAX_SAFE_INTEGER; // 최소값을 저장한다.

  // 앞파벳의 개수를 아스키 코드 번호를 통해 index에 접근한다.
  for (let i = 0; i < T.length; i++) {
    totalCount[T[i].charCodeAt() - 65] += 1;
  }

  function recursion(prevIndex, currentLength, result, total) {
    let flag = false;

    if(result.length === T.length) {
      for(let i = 0; i < T.length; i++) {
        if(totalCount[T[i].charCodeAt() - 65] !== count[T[i].charCodeAt() - 65]) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
    }

    if(flag) {
      answer = Math.min(answer, total); // 최소값을 갱신한다.
      return;
    }
    
    for (let i = 0; i < N; i++) {
      const [price, book] = books[i];
      if (prevIndex !== i) total += price;

      for (let j = currentLength; j < book.length; j++) {
        if(totalCount[book[j].charCodeAt() - 65] !== count[book[j].charCodeAt() - 65]) {
          count[book[j].charCodeAt() - 65] += 1;
          recursion(i, currentLength + 1, result + book[j], total);
          count[book[j].charCodeAt() - 65] -= 1;
        }
      }

      if(prevIndex !== i) total -= price;
    }
  }

  recursion(-1, 0, "", 0);

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
}

const fs = require("fs");
const input = fs.readFileSync("index.txt").toString().trim().split("\n");

const T = input[0];
const N = Number(input[1]);
const books = [];

for (let i = 2; i < N + 2; i++) {
  const [price, book] = input[i].split(" ");

  books.push([Number(price), book.split("").sort().join("")]);
}

console.log(solution(T, N, books));
