interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container.length > 0
      ? this.container[this.container.length - 1]
      : null;
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
}
