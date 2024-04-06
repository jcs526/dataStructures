class ListNode<T> {
  next: ListNode<T> | null = null;
  item: T;

  constructor(data: T) {
    this.item = data;
  }
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;

  append(data: T): void {
    const newNode = new ListNode<T>(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    tail.next = newNode;
  }

  prepend(data: T): void {
    const newNode = new ListNode<T>(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  deleteWithValue(data: T): ListNode<T> | null {
    if (this.head === null) {
      return null;
    }

    if (this.head.item === data) {
      const deletedNode = this.head;
      this.head = this.head.next;
      return deletedNode;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.item === data) {
        const deletedNode = current.next;
        current.next = current.next.next;
        return deletedNode;
      }
      current = current.next;
    }
    return null;
  }

  find(data: T): ListNode<T> | null {
    let current = this.head;
    while (current !== null) {
      if (current.item === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  printList(): string {
    let output = '[';
    let current = this.head;
    while (current !== null) {
      output += current.item;
      if (current.next !== null) {
        output += ', ';
      }
      current = current.next;
    }
    output += ']';
    return output;
  }
}

// 테스트
console.log("Test Append Operation:");
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
console.log(list.printList());  // Expected: [1, 2, 3]

console.log("\nTest Prepend Operation:");
list.prepend(0);
console.log(list.printList());  // Expected: [0, 1, 2, 3]

console.log("\nTest deleteWithValue Operation:");
console.log(list.deleteWithValue(2));  // Expected to return the node with value 2
console.log(list.printList());  // Expected: [0, 1, 3]
console.log(list.deleteWithValue(5));  // Expected to return null (not found)
console.log(list.printList());  // Expected: [0, 1, 3]

console.log("\nTest find Operation:");
console.log(list.find(1) ? "Found 1" : "1 Not Found");  // Expected: Found 1
console.log(list.find(4) ? "Found 4" : "4 Not Found");  // Expected: 4 Not Found

console.log("\nTest isEmpty Operation:");
console.log(list.isEmpty() ? "List is empty" : "List is not empty");  // Expected: List is not empty
const emptyList = new LinkedList<number>();
console.log(emptyList.isEmpty() ? "List is empty" : "List is not empty");  // Expected: List is empty

console.log("\nTest printList Operation:");
console.log(list.printList());  // Expected: [0, 1, 3]