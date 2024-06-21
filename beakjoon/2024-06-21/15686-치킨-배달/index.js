function solution(N, M, map) {
  const housePos = []; // 집의 좌표를 담는 배열
  const shopPos = []; // 치킨집의 좌표를 담는 배열

  // 주어진 지도에서 모든 집과 치킨집의 좌표를 담는 로직
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      switch(map[i][j]) {
        case 1:
          housePos.push([i + 1, j + 1]);
          break;
          
        case 2:
          shopPos.push([i + 1, j + 1]);
          break;
      }
    }
  }

  const isSelected = Array.from({length: M}, () => []); // 사용되고 있는 치킨집의 좌표를 담는 배열
  const shopIsUsed = new Array(shopPos.length).fill(0); // 현재 가게를 사용하고 있는지 유무 파악

  let answer = Number.MAX_SAFE_INTEGER;

  function dfs(currentLength, currentIndex) {
    if(currentLength === M) {
      let sum = 0; // 도시의 치킨 거리

      // 각 집의 좌표를 순회하면서 선택된 M개의 치킨집 좌표와 치킨 거리를 구한다.
      for(let i = 0; i < housePos.length; i++) {
        
        let minValue = Number.MAX_SAFE_INTEGER;
        for(let j = 0; j < M; j++) {
          minValue = 
            Math.min(
              minValue,
              Math.abs(housePos[i][0] - isSelected[j][0]) + 
              Math.abs(housePos[i][1] - isSelected[j][1])
            );
        }

        sum += minValue;
      }
      
      answer = Math.min(answer, sum);
      return;
    }

    for(let i = currentIndex; i < shopPos.length; i++) {
      if(!shopIsUsed[i]) {
        isSelected[currentLength] = shopPos[i];
        shopIsUsed[i] = 1;
        dfs(currentLength + 1, i);
        shopIsUsed[i] = 0;
      }
    }
  }
  
  dfs(0, 0);

  return answer;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = Array.from({length: N}, () => []);

for(let i = 1; i < N + 1; i++) {
  map[i - 1] = input[i].split(' ').map(Number);
}

console.log(solution(N, M, map));