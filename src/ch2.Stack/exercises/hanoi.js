const input = 5;

const source = []

const buffer = [];

const target = [];

for (let index = input; index > 0; index--) {
    source.push(index)
}

const move = (source, target, buffer, num, s) => {

    // 원판이 1개만 남았을 경우 최종 목표로 이동
    if (num === 1) {
        target.push(source.pop());
        return
    }

    // n-1 까지의 원판을 buffer에 옮기는 과정
    move(source, buffer, target, num - 1, "before");

    // n번 원판만 source에 남아있고 이걸 target으로 이동
    target.push(source.pop())

    // 남아있는 buffer의 n-1 ~ 1까지의 원판을 다시 target에 이동
    move(buffer, target, source, num - 1, "after");

}

move(source, target, buffer, input);

// n-1 문제
// 재귀호출 필요
// 3개일때 => 3 12 0 상태가 최종
// 4개일때 => 4 123 0 상태가 최종
// ...
// n개일때 n 1...(n-1) 0 상태가 최종

// n에서 n-1상태를 해결해야함
