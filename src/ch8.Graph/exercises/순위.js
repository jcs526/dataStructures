// https://school.programmers.co.kr/learn/courses/30/lessons/49191

function solution(n, edge) {
    const graph = Array.from({ length: n }, () => Array(n).fill(false));
    edge.map((val) => {
        const win = val[0] - 1;
        const lose = val[1] - 1;

        graph[win][lose] = 1;
        graph[lose][win] = -1;
        graph[win][win] = 0;
        graph[lose][lose] = 0;
    });

    const range = [...Array(n).keys()]
    // 플로이드 와샬 알고리즘 적용

    for (let mid of range) {
        for (let pre of range) {
            for (let post of range) {
                // pre가 mid에게 이기고 mid가 post에게 이기면 pre가 post에게 이긴 것과 같음
                if (graph[pre][mid] === 1 && graph[mid][post] === 1) graph[pre][post] = 1;
                // pre가 mid에게 지고 mid가 post에게 지면 pre가 post에게 진 것과 같음
                if (graph[pre][mid] === -1 && graph[mid][post] === -1) graph[pre][post] = -1;
            }
        }
    }

    // 모든 선수에 대한 기록이 있는 선수만이 순위를 확정지을수 있음
    let answer = 0;
    for (let pre of range) {
        let isFalse = false;
        for (let post of range) {
            if (graph[pre][post] === false) isFalse = true;
        }
        if (!isFalse) answer += 1;
    }

    return answer;
}