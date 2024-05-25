// https://school.programmers.co.kr/learn/courses/30/lessons/49189

function solution(n, edge) {
    const graph = {};
    edge.forEach(([first, second]) => {
        if (!graph[first]) {
            graph[first] = [];
        }
        if (!graph[second]) {
            graph[second] = [];
        }
        graph[first].push(second);
        graph[second].push(first);
    })

    // BFS로 검색
    const visit = [{ value: 1, sequence: 1 }];
    const queue = [];
    let maxSequence = 2;
    queue.push(...graph[1].map(value => ({ value, sequence: maxSequence })))
    while (queue.length) {
        const node = queue.shift();
        if (visit.some(v => v.value === node.value)) continue;
        visit.push(node);
        queue.push(...graph[node.value].map(value => ({ value, sequence: node.sequence + 1 })));
        maxSequence = Math.max(maxSequence, node.sequence)
    }
    const answer = visit.filter(v => v.sequence === maxSequence).length;
    return answer;
}
