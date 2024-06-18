function solution(n, flowers) {
  flowers.sort((a, b) => a[0] - b[0]); // 꽃이 피는 기간을 기준으로 오름차순 정렬

  let count = 0; // 선택된 꽃의 개수
  let end = 301; // 꽃이 지는 기간
  let idx = 0; // 현재 가리키고 있는 꽃의 정보

  // 선택된 꽃의 지는 기간이 11월 30일 이전이면서 모든 꽃들의 정보를 확인하지 않았을떄까지 반복
  while(end <= 1130 && idx < n) { 

    let maxEnd = 0; // 정원에 심을 수 있는 꽃들 중에서 지는 기간이 제일 긴 기간
    let selected = false; // 꽃을 선택할 수 있는지 판별

    while(idx < n && flowers[idx][0] <= end) { // 현재 꽃이 지는 기간보다 빨리 피는 꽃들만 선택
      selected = true;
      maxEnd = Math.max(maxEnd, flowers[idx][1]);
      idx += 1;
    }

    // 모든 꽃의 정보를 탐색할 때까지 꽃을 선택하지 못했을 경우 매일 한 가지 이상의 꽃을 심을 수 없음
    if(!selected) return 0;
    else {
      end = maxEnd; // 선택된 꽃들 중에서 가장 지는 기간이 긴 꽃을 선택
      count += 1; 
    }
  }

  return end > 1130 ? count : 0;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const n = Number(input[0]);
const flowers = [];

for(let i = 1; i < n + 1; i++) {
  const [a, b, c, d] = input[i].split(' ').map(Number);
  flowers.push([a * 100 + b, c * 100 + d]);
}

console.log(solution(n, flowers));