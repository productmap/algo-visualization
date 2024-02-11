import { ElementStates } from "./element-states";

export type TLettersArray = {
  letter: string;
  state: ElementStates;
};

export type TColumn = {
  value: number;
  state: ElementStates;
};

export type TItem = {
  value: string;
  state: ElementStates;
};

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
}

export type TCircle = {
  state: ElementStates;
  value?: string | null;
  add?: boolean;
  delete?: boolean;
  smallCircle?: {
    value?: string | null;
  };
};