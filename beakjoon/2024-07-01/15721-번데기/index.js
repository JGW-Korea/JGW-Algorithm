function solution(A, T, C) {
  let students = 0; // 학생 번호
  let loop = 2;
  let count = [0, 0]; // '뻔', '데기'를 외친 회수

  while(true) {
    // 뻔, 데기, 뻔, 데기, 뻔(* n), 데기(* n)
    for(let i = 0; i < 4; i++) {
      if(i % 2) count[1] += 1;
      else count[0] += 1;
      
      if(count[C] === T) return students;

      students += 1;

      if(students === A) students = 0;
    }

    for(let i = 0; i < 1 * loop; i++) {
      count[0] += 1;

      if(count[C] === T) return students;
      students += 1;
      if(students === A) students = 0;
    }


    for(let i = 0; i < 1 * loop; i++) {
      count[1] += 1;

      if(count[C] === T) return students;
      students += 1;
      if(students === A) students = 0;
    }

    loop += 1;
  }
}

const fs = require('fs');
const [A, T, C] = fs.readFileSync('index.txt').toString().trim().split('\n').map(Number);

console.log(solution(A, T, C));