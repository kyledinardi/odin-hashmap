import LinkedList from './linked-list.js';

class HashSet {
  constructor() {
    this.buckets = new Array(16);
    this.loadFactor = 0.75;
  }

  hash(value) {
    let hashCode = 0;
    const primeNumber = 97;

    for (let i = 0; i < value.length; i += 1) {
      hashCode = primeNumber * hashCode + value.charCodeAt(i);
    }

    return hashCode % this.buckets.length;
  }

  checkOutOfBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }

  set(key) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (!(this.buckets[index] instanceof LinkedList)) {
      this.buckets[index] = new LinkedList();
    }
    if (!this.has(key)) {
      this.buckets[index].prepend(key);
      this.upgrade();
    }
  }

  has(key) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (this.buckets[index] instanceof LinkedList) {
      let tmp = this.buckets[index].getHead();

      while (tmp !== null) {
        if (tmp.value === key) {
          return true;
        }

        tmp = tmp.nextNode;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (this.buckets[index] instanceof LinkedList) {
      let tmp = this.buckets[index].getHead();
      let i = 0;

      while (tmp !== null) {
        if (tmp.value === key) {
          this.buckets[index].removeAt(i);
          return true;
        }

        tmp = tmp.nextNode;
        i += 1;
      }
    }

    return false;
  }

  length() {
    let lengthCount = 0;

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();

        while (tmp !== null) {
          lengthCount += 1;
          tmp = tmp.nextNode;
        }
      }
    });

    return lengthCount;
  }

  clear() {
    this.buckets = new Array(16);
  }

  keys() {
    const keyArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();
        while (tmp !== null) {
          keyArray.push(tmp.value);
          tmp = tmp.nextNode;
        }
      }
    });
    return keyArray;
  }

  upgrade() {
    let nonEmptyBuckets = 0;
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        nonEmptyBuckets += 1;
      }
    });
    if (nonEmptyBuckets / this.buckets.length >= this.loadFactor) {
      const currentKeys = this.keys();
      this.buckets = new Array(this.buckets.length * 2);
      currentKeys.forEach((key) => {
        this.set(key[0], key[1]);
      });
    }
  }
}

const example = new HashSet();

console.log(example.hash('Sara'));
example.set('Sara');
console.log(example.has('Sara'));
console.log(example.has('Carlos'));
console.log(example.remove('Sara'));
console.log(example.remove('Carlos'));
console.log(example.has('Sara'));
example.set('Sara');
console.log(example.keys());
example.clear();

for (let i = 0; i < 11; i += 1) {
  example.set(String.fromCharCode(i));
}

console.log(example.buckets);
example.set(String.fromCharCode(11));
console.log(example.buckets);
console.log(example.length());
