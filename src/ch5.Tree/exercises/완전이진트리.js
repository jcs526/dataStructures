// https://www.acmicpc.net/problem/9934

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname + '/dev/완전이진트리.txt')
// 백준 입력시는 input = 0 할당
const rows = fs.readFileSync(input, 'utf-8').trim().split('\n').map(v => v.split(' '));

const maxDepth = rows[0][0];
const result = [];

for (let i = 0; i < maxDepth; i++) {
    result.push([]);
}

// 전위순회
// root => left => right 순으로 확인
const search = (arr, depth) => {
    // leaf에 도달하면 결과에 입력
    if (arr.length === 1) {
        result[depth].push(...arr)
        return;
    }

    // 중앙값이 해당 tree의 root
    const centerIndex = Math.floor(arr.length / 2)
    const root = arr[centerIndex]
    result[depth].push(root);

    // root를 기준으로 left, right 분리
    const left = arr.slice(0, centerIndex)
    const right = arr.slice(centerIndex + 1, arr.length)

    search(left, depth + 1)
    search(right, depth + 1)
}

search(rows[1], 0)

for (let index = 0; index < result.length; index++) {
    const element = result[index];
    console.log(element.join(' '));
}