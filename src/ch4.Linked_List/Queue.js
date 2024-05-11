"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("./LinkedList");
class QueueWithLinkedList {
    head = null;
    tail = null;
    constructor() {
    }
    enqueue(item) {
        const newNode = new LinkedList_1.DoublyLinkedListNode(item);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.head.item;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        return result;
    }
    front() {
        return this.head?.item;
    }
    isEmpty() {
        return this.head === null;
    }
    size() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            current = current.next;
            count++;
        }
        return count;
    }
}
