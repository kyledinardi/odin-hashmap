// eslint-disable-next-line import/extensions
import Node from './node.js';

class LinkedList {
  #head;

  constructor() {
    this.#head = null;
  }

  append(value) {
    if (this.#head === null) {
      this.prepend(value);
    } else {
      let tmp = this.#head;

      while (tmp.nextNode !== null) {
        tmp = tmp.nextNode;
      }

      tmp.nextNode = new Node(value, null);
    }
  }

  prepend(value) {
    this.#head = new Node(value, this.#head);
  }

  size() {
    let count = 0;
    let tmp = this.#head;

    while (tmp !== null) {
      count += 1;
      tmp = tmp.nextNode;
    }

    return count;
  }

  getHead() {
    return this.#head;
  }

  getTail() {
    let tmp = this.#head;

    while (tmp.nextNode !== null) {
      tmp = tmp.nextNode;
    }

    return tmp;
  }

  at(index) {
    let i = 0;
    let tmp = this.#head;

    while (tmp.nextNode !== null && i < index) {
      tmp = tmp.nextNode;
      i += 1;
    }

    if (tmp.nextNode === null) {
      throw new Error('Index not in list');
    }

    return tmp;
  }

  pop() {
    if (this.size() === 0) {
      throw new Error('Cannot delete from empty list');
    }
    if (this.size === 1) {
      this.#head = null;
      return;
    }

    let cur = this.#head;
    let prev = null;

    while (cur.nextNode !== null) {
      prev = cur;
      cur = cur.nextNode;
    }

    prev.nextNode = null;
  }

  contains(value) {
    let tmp = this.#head;

    while (tmp !== null && tmp.value !== value) {
      tmp = tmp.nextNode;
    }

    return tmp !== null;
  }

  find(value) {
    let i = 0;
    let tmp = this.#head;

    while (tmp !== null && tmp.value !== value) {
      tmp = tmp.nextNode;
      i += 1;
    }

    return tmp === null ? null : i;
  }

  toString() {
    let listString = '';
    let tmp = this.#head;

    while (tmp !== null) {
      listString = `${listString}( ${tmp.value} ) -> `;
      tmp = tmp.nextNode;
    }

    listString += 'null';
    return listString;
  }

  insertAt(value, index) {
    let i = 0;
    let tmp = this.#head;

    if (index === 0) {
      this.#head = new Node(value, tmp);
      return;
    }

    while (tmp.nextNode !== null && i < index - 1) {
      tmp = tmp.nextNode;
      i += 1;
    }

    if (tmp !== null) {
      tmp.nextNode = new Node(value, tmp.nextNode);
    } else {
      throw new Error('Index not in list');
    }
  }

  removeAt(index) {
    if (this.#head === null) {
      throw new Error('Cannot delete from empty list');
    }
    if (index === 0) {
      this.#head = this.#head.nextNode;
      return;
    }

    let i = 0;
    let cur = this.#head;
    let prev = null;

    while (cur !== null && i < index) {
      prev = cur;
      cur = cur.nextNode;
      i += 1;
    }

    if (cur === null) {
      throw new Error('Index not in list');
    }

    prev.nextNode = cur.nextNode;
  }
}

export default LinkedList;
