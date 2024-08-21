function solution(N, K, sensors) {
  if(K >= N) return 0; // 집중국이 센서의 개수보다 클 경우에는 각 집중국이 각 센서를 담당하면 되기 때문에 각 집중국의 거리는 0이 된다.

  sensors.sort((a, b) => a - b); // 센서의 거리를 오름차순 정렬한다.

  // 각 센서 거리의 차이를 담은 배열을 만든다.
  const diff = [];
  for(let i = 1; i < N; i++) {
    diff.push(sensors[i] - sensors[i - 1]);
  }

  diff.sort((a, b) => b - a); // 각 센서 거리의 차이를 담은 배열을 내림차순 정렬한다.

  // 센서 거리의 차이를 담은 배열의 K - 1 ~ 마지막까지의 합을 반환한다.
  // 첫번째 예제 케이스 센서 배열을 오름차순 정렬을 하게 되면 [1, 3, 6, 6, 7, 9]이 된다.
  // 센서 배열의 각 센서 거리의 차이 배열을 만든 후 내림차순 정렬을 하게 되면 [2, 3, 0, 1, 2]이 된다.
  // 집중국(k)는 2 이므로, 센서와 센서 사이를 1회 뛰어넘을 수 있다. (즉, 센서 거리의 차이 배열의 원소 중 0을 뛰어넘는다)
  // 만약 집중국(k)가 3개라면, 센서와 센서 사이를 2회 뛰어넘을 수 있다.
  return diff.slice(K - 1).reduce((sum, prev) => sum += prev, 0);
}

const fs = require('fs');
const input = fs.readFileSync('index.txt').toString().trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);
const sensors = input[2].split(' ').map(Number);

console.log(solution(N, K, sensors));