"use strict";
class PriorityQueue {
    queue;
    constructor() {
        this.queue = [];
    }
    enqueue(item, priority) {
        const obj = { item: item, priority: priority };
        this.queue.push(obj);
        this.bubbleUp();
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const minNode = this.queue[0];
        const endNode = this.queue.pop();
        if (this.queue.length > 0) {
            this.queue[0] = endNode;
            this.sinkDown();
        }
        return minNode.item;
    }
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.queue[0];
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    size() {
        return this.queue.length;
    }
    bubbleUp() {
        let index = this.queue.length - 1;
        const currentNode = this.queue[index];
        while (index > 0) {
            const parentIndex = Math.floor(index / 2);
            const parentNode = this.queue[parentIndex];
            if (currentNode.priority >= parentNode.priority) {
                break;
            }
            this.queue[parentIndex] = currentNode;
            this.queue[index] = parentNode;
            index = parentIndex;
        }
    }
    sinkDown() {
        // heap 상태 유지하는 while
        let index = 0;
        let length = this.size();
        const node = this.queue[0];
        while (index < this.size() - 1) {
            let leftChildIndex = index * 2 + 1;
            let leftChild;
            let rightChildIndex = index * 2 + 2;
            let rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.queue[leftChildIndex];
                if (leftChild.priority < node.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.queue[rightChildIndex];
                if ((swap === null && rightChild.priority < node.priority) ||
                    (swap !== null && leftChild && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.queue[index] = this.queue[swap];
            this.queue[swap] = node;
            index = swap;
        }
    }
}
function testPriorityQueue() {
    const queue = new PriorityQueue();
    // Test isEmpty() when queue is empty
    console.assert(queue.isEmpty() === true, "isEmpty() should return true for an empty queue");
    // Enqueue items with priorities
    queue.enqueue({ a: 4 }, 4);
    queue.enqueue({ a: 3 }, 3);
    queue.enqueue({ a: 10 }, 10);
    queue.enqueue({ a: 1 }, 1);
    queue.enqueue({ a: 2 }, 2);
    queue.enqueue({ a: 5 }, 5);
    // Test isEmpty() when queue is not empty
    console.assert(queue.isEmpty() === false, "isEmpty() should return false for a non-empty queue");
    // Test size()
    console.assert(queue.size() === 6, "size() should return the number of elements in the queue");
    // Test front()
    console.assert(queue.front()?.priority === 1, "front() should return the item with the highest priority");
    // Dequeue items and validate
    const dequeuedItems = [];
    dequeuedItems.push(queue.dequeue());
    dequeuedItems.push(queue.dequeue());
    dequeuedItems.push(queue.dequeue());
    dequeuedItems.push(queue.dequeue());
    dequeuedItems.push(queue.dequeue());
    dequeuedItems.push(queue.dequeue());
    // Test dequeue() on an empty queue
    console.assert(queue.dequeue() === undefined, "dequeue() should return undefined on an empty queue");
    // Test isEmpty() after dequeuing all items
    console.assert(queue.isEmpty() === true, "isEmpty() should return true after dequeuing all items");
    // Test size() after dequeuing all items
    console.assert(queue.size() === 0, "size() should return 0 after dequeuing all items");
    // Print dequeued items
    console.log("Dequeued items:", dequeuedItems);
    // Print the queue after dequeuing all items
    console.log("Queue after dequeue:");
    console.log(queue);
}
// Execute the test function
testPriorityQueue();
