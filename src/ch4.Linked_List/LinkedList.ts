export class ListNode<T> {
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


// 양방향 Linked List
class DoublyLinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null = null;
  next: DoublyLinkedListNode<T> | null = null;
  item: T;

  constructor(data: T) {
    this.item = data;
  }
}

class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;

  append(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    return this;
  }


  prepend(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    return this;
  }

  delete(data: T): void {
    if (!this.head) {
      return;
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head;

    while (currentNode) {
      if (currentNode.item === data) {
        if (currentNode.prev) {
          currentNode.prev.next = currentNode.next;
        } else {
          this.head = currentNode.next;
          if (this.head) {
            this.head.prev = null;
          }
        }

        if (currentNode.next) {
          currentNode.next.prev = currentNode.prev;
        } else {
          this.tail = currentNode.prev;
        }

        break;
      }

      currentNode = currentNode.next;
    }
  }


  traverse(): T[] {
    let currentNode = this.head;
    const values: T[] = [];
    while (currentNode) {
      values.push(currentNode.item);
      currentNode = currentNode.next;
    }
    return values;
  }

  traverseBack(): T[] {
    let currentNode = this.tail;
    const values: T[] = [];
    while (currentNode) {
      values.push(currentNode.item);
      currentNode = currentNode.prev;
    }
    return values;
  }

  find(data: T): DoublyLinkedListNode<T> | null {
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

const a = new DoublyLinkedList();
a.append(1);
a.append(2);
a.append(3);
a.append(4);
a.append(5);
a.append(6);

a.delete(4);
a.prepend(-1);

console.log("DoublyLinkedList");
console.log(a.traverse());
console.log(a.traverseBack());
console.log(a.printList());
console.log(a.isEmpty());
console.log(a.find(3));

// Doubly Circular linked list
class DoublyCircularLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;

  append(value: T): DoublyCircularLinkedList<T> {
    const newNode = new DoublyLinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = this.tail = newNode;
      newNode.next = newNode.prev = newNode;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.tail.next = newNode;
      this.head.prev = newNode;
      this.tail = newNode;
    }
    return this;
  }

  prepend(value: T): DoublyCircularLinkedList<T> {
    const newNode = new DoublyLinkedListNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      newNode.next = newNode.prev = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.head.prev = newNode;
      this.tail!.next = newNode;
      this.head = newNode;
    }
    return this;
  }

  delete(data: T): void {
    if (!this.head) {
      return;
    }

    let currentNode = this.head;
    do {
      if (currentNode.item === data) {
        if (currentNode === this.head && currentNode.next === this.head) {
          this.head = this.tail = null;
        } else {
          currentNode.prev!.next = currentNode.next;
          currentNode.next!.prev = currentNode.prev;

          if (currentNode === this.head) {
            this.head = this.head.next;
            this.tail!.next = this.head;
            this.head!.prev = this.tail;
          } else if (currentNode === this.tail) {
            this.tail = this.tail.prev;
            this.tail!.next = this.head;
            this.head!.prev = this.tail;
          }
        }
        break;
      }
      currentNode = currentNode.next as DoublyLinkedListNode<T>;
    } while (currentNode !== this.head);
  }

  traverse(): T[] {
    const values: T[] = [];
    if (!this.head) {
      return values;
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head;
    do {
      values.push(currentNode!.item);
      currentNode = currentNode!.next;
    } while (currentNode !== this.head);

    return values;
  }

  traverseBack(): T[] {
    const values: T[] = [];
    if (!this.tail) {
      return values;
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.tail;
    do {
      values.push(currentNode!.item);
      currentNode = currentNode!.prev;
    } while (currentNode !== this.tail);

    return values;
  }

  find(data: T): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head;
    do {
      if (currentNode!.item === data) {
        return currentNode;
      }
      currentNode = currentNode!.next;
    } while (currentNode !== this.head);

    return null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  printList(): string {
    let output = '[';
    if (this.head) {
      let currentNode: DoublyLinkedListNode<T> | null = this.head;
      do {
        if (currentNode === null) {
          break;
        }
        output += `${currentNode.item}`;
        currentNode = currentNode.next;
        if (currentNode !== this.head) {
          output += ', ';
        }
      } while (currentNode !== this.head);
    }
    output += ']';
    return output;
  }
}


// Tests
// Instantiating the doubly circular linked list for testing
const doubleCircularLinkedList = new DoublyCircularLinkedList();

// Test 1: Initially, the list should be empty
console.assert(doubleCircularLinkedList.isEmpty() === true, "Test 1 Failed: The list should be empty initially.");

// Test 2: After appending an item, the list should not be empty
doubleCircularLinkedList.append(10);
console.assert(doubleCircularLinkedList.isEmpty() === false, "Test 2 Failed: The list should not be empty after an item is appended.");

// Test 3: The item appended should be retrievable
let values = doubleCircularLinkedList.traverse();
console.assert(values.length === 1 && values[0] === 10, "Test 3 Failed: The item appended should be retrievable.");

// Test 4: Appending another item should work correctly
doubleCircularLinkedList.append(20);
values = doubleCircularLinkedList.traverse();
console.assert(values.length === 2 && values[1] === 20, "Test 4 Failed: The second item should be 20.");

// Test 5: Prepending should add an item to the beginning
doubleCircularLinkedList.prepend(5);
values = doubleCircularLinkedList.traverse();
console.assert(values.length === 3 && values[0] === 5, "Test 5 Failed: Prepending should add an item to the beginning.");

// Test 6: Traversing backward should work correctly
values = doubleCircularLinkedList.traverseBack();
console.assert(values.length === 3 && values[0] === 20 && values[2] === 5, "Test 6 Failed: Traversing backward should work correctly.");

// Test 7: Deletion of a non-existent item should not alter the list
doubleCircularLinkedList.delete(100);
values = doubleCircularLinkedList.traverse();
console.assert(values.length === 3, "Test 7 Failed: Deletion of a non-existent item should not alter the list.");

// Test 8: Deletion of an existing item should remove it from the list
doubleCircularLinkedList.delete(10);
values = doubleCircularLinkedList.traverse();
console.assert(values.length === 2 && !values.includes(10), "Test 8 Failed: Deletion of an existing item should remove it from the list.");

// Outputting test completion message
console.log("All tests completed. Check for any failed assertions.");
