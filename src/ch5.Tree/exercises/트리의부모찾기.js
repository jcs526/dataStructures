// https://www.acmicpc.net/problem/11725

// 시간초과로 안풀림

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname + '/dev/트리의부모찾기.txt')
// 백준 입력시는 input = 0 할당
const rows = fs.readFileSync(input, 'utf-8').trim().split('\n').map(v => v.split(' ').map(v2 => +v2));

const N = rows[0][0];
const result = [];
const used = { 1: true };

for (let index = 1; index < N; index++) {
    const [node1, node2] = rows[index]
    if (!used[node1]) {
        result[node1 - 2] = node2
        used[node1] = true
    }
    if (!used[node2]) {
        result[node2 - 2] = node1
        used[node2] = true
    }
}

console.log(result.join('\n'));