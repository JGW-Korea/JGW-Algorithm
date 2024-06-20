function getPrime(n) {
  const prime = new Array(n + 1).fill(true);
  prime[0] = prime[1] = false;

  // 에리스토테네스의 체 로직
  for(let i = 2; i * i <= n; i++) {
    if(prime[i]) { // 소수가 맞은 수의 모든 배수는 소수가 아니기 때문에 제외시킨다.
      for(let j = i * i; j <= n; j += i) {
        prime[j] = false;
      }
    }
  }

  const result = []; // 모든 소수의 값을 담는다.
  prime.forEach((number, idx) => {
    if(number) result.push(idx);
  });
  
  return result;
}

function solution(n) {
  const prime = getPrime(n); // 2 ~ N의 모든 소수를 가져온다.

  let partialSum = 0;
  let [p1, p2] = [0, 0]; // 두 개의 포인터
  let count = 0;

  while(p1 <= p2) {
    if(partialSum === n) { // 소수의 연속합이 N과 같을 경우
      count += 1;
      partialSum += prime[p2];
      p2 += 1;
    }

    if(partialSum < n) {
      partialSum += prime[p2];
      p2 += 1;
    } else {
      partialSum -= prime[p1];
      p1 += 1;
    }
  }

  return count;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim();

console.log(solution(Number(input)));