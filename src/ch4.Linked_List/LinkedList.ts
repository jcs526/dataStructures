class node<T> {
  next: node<T> | null;
  item: T

  constructor(data: T) {
    this.next = null;
    this.item = data;
  }
}

class LinkedList<T> {
  head: node<T> | null;

  constructor() {
    this.head = null;
  }

  append(data: T) {
    const item = new node<T>(data);

    if (this.head === null) {
      this.head = item
      return;
    }

    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    tail.next = item;
  }

  prepend(data: T) {
    const item = new node<T>(data);

    if (this.head !== null) {
      item.next = this.head;
    }

    this.head = item;

  }

  // deleteWithValue(data) { }

  find(data: T): null | node<T> {
    if (this.head === null) {
      return null;
    }

    let current = this.head;
    while (true) {

      if (current.next === null) {
        return null;
      }
      if (current.item === data) {
        return current;
      }

      current = current.next;
    }
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  printList(): string {
    let str = '[';
    if (this.head === null) {
      return str;
    }

    let current = this.head;
    while (true) {
      str += current.item
      if (current.next === null) {
        break;
      }
      str += ', '
      current = current.next;
    }
    str += ']'
    return str;
  }
}

const arr = new LinkedList();

arr.append(1);
console.log(arr.printList());

arr.append(2);
console.log(arr.printList());

arr.append(3);
console.log(arr.printList());

arr.append(4);
console.log(arr.printList());

arr.prepend(5);
console.log(arr.printList());
console.log(arr.find(3));


