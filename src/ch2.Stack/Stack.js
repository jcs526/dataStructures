"use strict";
class Stack {
    capacity;
    data = [];
    top = -1;
    constructor(capacity = Infinity) {
        this.capacity = capacity;
    }
    push(...items) {
        items.forEach(item => {
            if (this.size() === this.capacity) {
                throw new Error("Stack is full");
            }
            this.data[++this.top] = item;
        });
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        const item = this.data[this.top];
        this.data[this.top] = undefined; // 명시적으로 undefined 설정
        this.top--;
        return item;
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.data[this.top];
    }
    isEmpty() {
        return this.top === -1;
    }
    size() {
        return this.top + 1;
    }
}
const st = new Stack();
st.push(1, 2, 3);
console.log(st);
st.pop();
console.log(st);
st.peek();
console.log(st);
st.size();
console.log(st);
st.pop();
st.pop();
console.log(st);
console.log(st.size(), st.isEmpty());
