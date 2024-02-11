interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  getQueue: () => (T | null)[];
  getSize: () => number;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  size = 0;
  length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    // if (this.length >= this.size) {
    //   throw new Error("Maximum length exceeded");
    // }

    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    // if (this.isEmpty()) {
    //   throw new Error("No elements in the queue");
    // }

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getQueue = () => this.container;
  getSize = () => this.size;
  isEmpty = () => this.length === 0;
}
