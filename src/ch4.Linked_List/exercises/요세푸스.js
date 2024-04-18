// https://www.acmicpc.net/problem/1158

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname + '/dev/요세푸스.txt')
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
}


const [queueSize, count] = rows[0];

const queue = new Queue();

for (let index = 0; index < +queueSize; index++) {
    queue.euqueue(new Node(index + 1))
}

let result = [];

while (queue.head) {
    for (let index = 0; index < count - 1; index++) {
        let node = queue.dequeue();
        queue.euqueue(node);
    }
    const { item } = queue.dequeue();
    result.push(item)
}

console.log("<" + result.join(', ') + ">");