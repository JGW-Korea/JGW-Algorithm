function solution(N, M, DNA) {
  let result = ''; // Hamming Distance 합이 가장 낮은 DNA
  let minValue = 0; // Hamming Distance 최소 길이

  for(let i = 0; i < M; i++) {
    // 각 위치에서 최대 빈도가 높은 DNA 문자
    const count = { 'A': 0, 'C': 0, 'G': 0, 'T': 0 }; 

    for(let j = 0; j < N; j++) {
      count[DNA[j][i]] += 1;
    }

    // 현재 위치에서 최대 빈도가 높은 DNA 문자를 구해준다.
    let maxCount = 0;
    let tempLetterChar = 'A';

    for(const char of ['A', 'C', 'G', 'T']) {
      if(maxCount < count[char]) {
        maxCount = count[char];
        tempLetterChar = char;
      }
    }

    // Hamming Distance DNA와 최소 길이를 갱신해준다.
    minValue += N - maxCount;
    result += tempLetterChar;
  }

  return result + "\n" + minValue;
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arrDNA = input.slice(1);

console.log(solution(N, M, arrDNA));