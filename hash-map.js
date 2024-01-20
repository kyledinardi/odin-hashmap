import LinkedList from './linked-list.js';

class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.loadFactor = 0.75;
  }

  hash(value) {
    let hashCode = 0;
    const primeNumber = 31;

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
    let returnValue = null;

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();

        while (tmp !== null && returnValue === null) {
          if (tmp.value.key === key) {
            returnValue = tmp.value.value;
          }

          tmp = tmp.nextNode;
        }
      }
    });

    return returnValue;
  }

  has(key) {
    let hasKey = false;

    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let tmp = bucket.getHead();

        while (tmp !== null && !hasKey) {
          if (tmp.value.key === key) {
            hasKey = true;
          }

          tmp = tmp.nextNode;
        }
      }
    });

    return hasKey;
  }

  remove(key) {
    let hasKey = false;

    if (this.has(key)) {
      this.buckets.forEach((bucket) => {
        if (bucket instanceof LinkedList) {
          let tmp = bucket.getHead();
          let i = 0;

          while (tmp !== null && !hasKey) {
            if (tmp.value.key === key) {
              bucket.removeAt(i);
              hasKey = true;
            }

            tmp = tmp.nextNode;
            i += 1;
          }
        }
      });
    }

    return hasKey;
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
example.remove('Sara');
example.remove('Carlos');
console.log(example.length());
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
