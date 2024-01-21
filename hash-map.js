import LinkedList from './linked-list.js';

class HashMap {
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

  set(key, value) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (!(this.buckets[index] instanceof LinkedList)) {
      this.buckets[index] = new LinkedList();
    }
    if (this.has(key)) {
      let tmp = this.buckets[index].getHead();

      while (tmp !== null) {
        if (tmp.value.key === key) {
          tmp.value.value = value;
          break;
        }

        tmp = tmp.nextNode;
      }
    } else {
      this.buckets[index].prepend({ key: `${key}`, value: `${value}` });
      this.upgrade();
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (this.buckets[index] instanceof LinkedList) {
      let tmp = this.buckets[index].getHead();

      while (tmp !== null) {
        if (tmp.value.key === key) {
          return tmp.value.value;
        }

        tmp = tmp.nextNode;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    this.checkOutOfBounds(index);

    if (this.buckets[index] instanceof LinkedList) {
      let tmp = this.buckets[index].getHead();

      while (tmp !== null) {
        if (tmp.value.key === key) {
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
        if (tmp.value.key === key) {
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
          keyArray.push(tmp.value.key);
          tmp = tmp.nextNode;
        }
      }
    });

    return keyArray;
  }

  values() {
    const valueArray = [];

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();

        while (tmp !== null) {
          valueArray.push(tmp.value.value);
          tmp = tmp.nextNode;
        }
      }
    });

    return valueArray;
  }

  entries() {
    const keyValueArray = [];

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();

        while (tmp !== null) {
          keyValueArray.push([tmp.value.key, tmp.value.value]);
          tmp = tmp.nextNode;
        }
      }
    });

    return keyValueArray;
  }

  upgrade() {
    let nonEmptyBuckets = 0;

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        nonEmptyBuckets += 1;
      }
    });

    if (nonEmptyBuckets / this.buckets.length >= this.loadFactor) {
      const currentEntries = this.entries();
      this.buckets = new Array(this.buckets.length * 2);

      currentEntries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }
}

const example = new HashMap();

console.log(example.hash('Sara'));
example.set('Sara', '301');
console.log(example.get('Sara'));
console.log(example.get('Carlos'));
console.log(example.has('Sara'));
console.log(example.has('Carlos'));
console.log(example.remove('Sara'));
console.log(example.remove('Carlos'));
console.log(example.has('Sara'));
example.set('Sara', '301');
console.log(example.keys());
console.log(example.values());
console.log(example.entries());
example.clear();

for (let i = 0; i < 11; i += 1) {
  example.set(String.fromCharCode(i), null);
}

console.log(example.buckets);
example.set(String.fromCharCode(11), null);
console.log(example.buckets);
console.log(example.length());
