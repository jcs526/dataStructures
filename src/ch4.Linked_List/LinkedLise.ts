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

  append(data) { }

  prepend(data) { }

  deleteWithValue(data) { }

  find(data) { }

  isEmpty() { }

  printList() { }
}