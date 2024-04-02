"use strict";
//https://school.programmers.co.kr/learn/courses/30/lessons/42583
//https://school.programmers.co.kr/learn/courses/30/lessons/42587
class Queue {
    items;
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
const q = new Queue();
