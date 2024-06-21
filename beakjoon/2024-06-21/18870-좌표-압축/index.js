function solution(n, numbers) {
  // 입력으로 주어진 데이터들을 중 중복된 수를 제거하고 오름차순 정렬을 시킨다.
  const uniqeData = [...new Set(numbers)].sort((a, b) => a - b);
  const map = new Map(); // 좌표 개수를 저장을 Map을 사용한다.

  // 중복되지 않은 수들을 map에 Key-Value 쌍으로 저장한다.
  // 정렬을 했기 때문에 각 Key 값에 해당하는 좌표 개수는 i와 같다.
  for(let i = 0; i < n; i++) {
    map.set(uniqeData[i], i);
  }

  let result = "";

  // 주어진 numbers의 각 요소들이 map에 key로 저장되어 있기 때문에 접근이 가능하다.
  for(const num of numbers) {
    result += map.get(num) + " ";
  }

  return result;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

console.log(solution(n, numbers));