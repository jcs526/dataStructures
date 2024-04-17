// https://www.acmicpc.net/problem/1021

const fs = require('fs');
const path = require('path');
const input = path.join(__dirname + '/dev/회전하는_큐.txt')
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

const outNumbers = rows[1];

let moveCount = 0;
for (let i = 0; i < +count; i++) {
    const target = outNumbers[i];
    // 절반씩만 회전해서 확인
    const maxMove = Math.ceil(queue.size());
    if (queue.head.item === +target) {
        // 일치할 경우 탐색 필요 x
        queue.dequeue();
        continue;
    } else {

        let direction = null;
        let move = queue.size();
        // prev 탐색
        let current = queue.head;
        for (let j = 0; j < maxMove; j++) {
            if (current.item === +target) {
                // 일치할 경우 탐색 필요 x
                move = j;
                break;
            }
            current = current.prev;
        }
        // next 탐색
        current = queue.head;
        for (let k = 0; k < maxMove; k++) {
            if (current.item === +target) {
                // 일치할 경우 탐색 필요 x
                if (move > (k)) {
                    move = k;
                    direction = "next";
                } else {
                    direction = "prev";
                }
                break;
            }
            current = current.next;
        }

        if (direction === "prev") {
            for (let index = 0; index < move; index++) {
                queue.head = queue.head.prev;
            }
            queue.tail = queue.head.prev;
        } else {
            for (let index = 0; index < move; index++) {
                queue.head = queue.head.next;
            }
            queue.tail = queue.head.prev;
        }

        queue.dequeue();
        moveCount += move
    }

}

console.log(moveCount);