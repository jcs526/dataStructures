"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("./LinkedList");
class StackWithLinkedList {
    capacity;
    head = null;
    top = 0;
    constructor(capacity = Infinity) {
        this.capacity = capacity;
        if (capacity < 0) {
            throw new Error("Capacity must be a non-negative number");
        }
    }
    push(item) {
        if (this.isFull()) {
            throw new Error('Stack overflow');
        }
        const newNode = new LinkedList_1.ListNode(item);
        newNode.next = this.head;
        this.head = newNode;
        this.top++;
    }
    pop() {
        if (this.head === null) {
            return null;
        }
        const item = this.head.item;
        this.head = this.head.next;
        this.top--;
        return item;
    }
    peek() {
        return this.head?.item || null;
    }
    isEmpty() {
        return this.head === null;
    }
    isFull() {
        return this.top === this.capacity;
    }
    size() {
        return this.top;
    }
}
const testStackWithLinkedList = () => {
    const stack = new StackWithLinkedList(3);
    console.assert(stack.isEmpty() === true, 'Test 1 Failed: Stack should be empty initially.');
    // Test pushing elements
    stack.push(1);
    console.assert(stack.size() === 1, 'Test 2 Failed: Stack size should be 1 after pushing 1 element.');
    console.assert(stack.peek() === 1, 'Test 3 Failed: Top element should be 1.');
    stack.push(2);
    console.assert(stack.size() === 2, 'Test 4 Failed: Stack size should be 2 after pushing another element.');
    console.assert(stack.peek() === 2, 'Test 5 Failed: Top element should be 2.');
    stack.push(3);
    console.assert(stack.size() === 3, 'Test 6 Failed: Stack size should be 3 after pushing another element.');
    console.assert(stack.peek() === 3, 'Test 7 Failed: Top element should be 3.');
    // Test trying to push beyond capacity
    try {
        stack.push(4);
    }
    catch (error) {
        console.assert(error instanceof Error && error.message === 'Stack overflow', 'Test 8 Failed: Should throw stack overflow error.');
    }
    // Test popping elements
    console.assert(stack.pop() === 3, 'Test 9 Failed: Popped element should be 3.');
    console.assert(stack.size() === 2, 'Test 10 Failed: Stack size should be 2 after popping.');
    console.assert(stack.pop() === 2, 'Test 11 Failed: Popped element should be 2.');
    console.assert(stack.pop() === 1, 'Test 12 Failed: Popped element should be 1.');
    console.assert(stack.isEmpty(), 'Test 13 Failed: Stack should be empty after popping all elements.');
    // Test popping from an empty stack
    console.assert(stack.pop() === null, 'Test 14 Failed: Should return null when popping from an empty stack.');
    console.log('All tests passed!');
};
// Run the test function
testStackWithLinkedList();
