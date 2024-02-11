import React, { FC, FormEvent, useState } from "react";
import { ElementStates } from "../../utils/types/element-states";
import { Button, Circle, Input, SolutionLayout } from "../../components/ui";
import style from "./string-page.module.scss";
import {TLettersArray} from "../../utils/types/misc";
import {DELAY_IN_MS} from "../../utils/constants/delays";

export const StringPage: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<TLettersArray[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const swap = (
    arr: TLettersArray[],
    left: number,
    right: number,
    changeType: ElementStates.Changing | ElementStates.Modified
  ): TLettersArray[] => {
    if (changeType === ElementStates.Changing) {
      arr[left] = { ...arr[left], state: ElementStates.Changing };
      arr[right] = { ...arr[right], state: ElementStates.Changing };
    } else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      [arr[left].state, arr[right].state] = [
        ElementStates.Modified,
        ElementStates.Modified,
      ];
    }
    return [...arr];
  };

  const step = (arr: TLettersArray[], left: number, right: number) => {
    arr = swap(arr, left, right, ElementStates.Modified);
    left++;
    right--;
    if (left < right) {
      arr = swap(arr, left, right, ElementStates.Changing);
      setResult(arr);
      setTimeout(() => step(arr, left, right), DELAY_IN_MS);
    } else {
      setLoader(false);
      if (left === right) {
        arr = swap(arr, left, right, ElementStates.Modified);
        setResult(arr);
      }
    }
  };

  const reverse = (arr: TLettersArray[], left = 0, right = arr.length - 1) => {
    arr = swap(arr, left, right, ElementStates.Changing);
    setResult(arr);
    setTimeout(() => step(arr, left, right), DELAY_IN_MS);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const string = Array.from(input).map((letter) => ({
      letter,
      state: ElementStates.Default,
    }));
    setResult(string);
    reverse(string);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          isLimitText={true}
          maxLength={11}
          minLength={1}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Введите текст"
          required
          type="text"
          value={input}
        />
        <Button
          type="submit"
          text="Развернуть"
          extraClass="ml-6"
          isLoader={loader}
        />
      </form>
      <div className={style.result}>
        {result.map((circle, index) => (
          <Circle key={index} letter={circle.letter} state={circle.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
