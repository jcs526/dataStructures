// https://www.acmicpc.net/problem/2346
// Node.js로는 메모리문제때문에 안풀림

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname + '/dev/풍선_터트리기.txt')
// 백준 입력시는 input = 0 할당
const rows = fs.readFileSync(input, 'utf-8').trim().split('\n').map(v => v.split(' '));


class Node {
    prev = null;
    next = null;
    constructor(data) {
        this.item = data;
    }
}

class Queue {
    length = 0;
    constructor() {
        this.head = null;
        this.tail = null;
    }

    euqueue(newNode) {
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.length++;
    }

    dequeue() {
        const result = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            this.length--;
            return result;
        }

        this.head = this.head.next;
        this.head.prev = this.tail
        this.tail.next = this.head;

        this.length--;
        return result;
    }

    size() {
        return this.length;
    }

    toPrev() {
        if (this.head === null) {
            return;
        }
        this.head = this.head.prev;
        this.tail = this.head.prev;
    }
    toNext() {
        if (this.head === null) {
            return;
        }
        this.head = this.head.next;
        this.tail = this.head.prev;
    }
}


const [queueSize] = rows[0];
const balloons = rows[1];

const queue = new Queue();

for (let index = 0; index < +queueSize; index++) {
    queue.euqueue(new Node({ index: index + 1, move: +balloons[index] }))
}

let result = [];

while (queue.head) {
    const { item } = queue.dequeue();
    let { index, move } = item
    if (index === 1) {
        move--;
    }
    if (move > 0) {
        for (let i = 0; i < move; i++) {
            queue.toNext();
        }
    } else {
        for (let i = 0; i < move * (-1); i++) {
            queue.toPrev();
        }
    }
    result.push(index)
}

console.log(result.join(' '));