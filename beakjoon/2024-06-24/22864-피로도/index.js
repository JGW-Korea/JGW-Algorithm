function solution(a, b, c, m) {
  // 피로도 A가 애초에 최대 피로도 M보다 높을 경우 0을 반환한다.
  if(a > m) return 0; 
  
  let currentStamina = 0; // 현재의 피로도 (기본값 : 0)
  let result = 0; // 하루에 처리한 업무량
  
  // 00:00 ~ 23:00 까지 반복
  for(let hours = 0; hours < 24; hours++) {
    
    if(currentStamina + a <= m) { // 현재의 피로도가 최대 피로도를 넘기지 않았을 경우
      currentStamina += a;
      result += b;
    } else { // 현재의 피로도가 최대 피로도와 같을 경우
      currentStamina -= c;
      
      if(currentStamina < 0) currentStamina = 0; // 현재 피로도가 음수일 경우
    }
    
  }

  return result;
}

const fs = require('fs');
const [a, b, c, m] = fs.readFileSync('index.txt').toString().trim().split(' ').map(Number);

console.log(solution(a, b, c, m));