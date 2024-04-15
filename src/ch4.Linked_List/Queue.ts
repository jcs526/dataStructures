import { DoublyLinkedListNode } from "./LinkedList";

class QueueWithLinkedList<T> {

    private head: DoublyLinkedListNode<T> | null = null;
    private tail: DoublyLinkedListNode<T> | null = null;

    constructor() {

    }

    enqueue(item: T): void {
        const newNode = new DoublyLinkedListNode<T>(item);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.head!.item;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
        }
        return result;
    }

    front(): T | undefined {
        return this.head?.item;
    }

    isEmpty(): boolean {
        return this.head === null;
    }

    size(): number {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            current = current.next;
            count++;
        }
        return count;
    }
}