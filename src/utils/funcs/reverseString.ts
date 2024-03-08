import { Dispatch, SetStateAction } from "react";
import { TLettersArray } from "../types/misc";
import { ElementStates } from "../types/element-states";
import { DELAY_IN_MS } from "../constants/delays";

export const reverseString = async (
  array: TLettersArray[],
  setLoader: Dispatch<SetStateAction<boolean>> = () => {},
  setResult: Dispatch<SetStateAction<TLettersArray[]>> = () => {}
) => {
  const delay = (time: number) => new Promise((res) => setTimeout(res, time));
  if (array.length === 0) return [];

  setLoader(true);

  let mid = Math.floor(array.length / 2);

  for (let i = 0; i < mid; i++) {
    let length = array.length - 1;

    if (i !== length - i) {
      array[i].state = ElementStates.Changing;
      array[length - i].state = ElementStates.Changing;
      setResult([...array]);
      await delay(DELAY_IN_MS);
    }

    let tmp1 = array[i];
    array[i] = array[length - i];
    array[i].state = ElementStates.Modified;
    array[length - i] = tmp1;
    array[length - i].state = ElementStates.Modified;
  }
  array[mid].state = ElementStates.Modified;
  setResult([...array]);
  setLoader(false);
};