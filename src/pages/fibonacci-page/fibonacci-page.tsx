import React, { FC, FormEvent, useState } from "react";
import { Button, Circle, Input, SolutionLayout } from "../../components/ui";
import style from "../string-page/string-page.module.scss";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/utils";

export const FibonacciPage: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const getFibonacciNumbers = (n: number) => {
    let arr = [0, 1];
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setInput("");
    if (input !== "0") {
      const fibArray: number[] = getFibonacciNumbers(Number(input));
      for (let i = 0; i < fibArray.length; i++) {
        setResult(fibArray.slice(0, i + 1));
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          isLimitText={true}
          max={19}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Введите текст"
          required
          type="number"
          value={input}
        />
        <Button
          type="submit"
          text="Рассчитать"
          extraClass="ml-6"
          isLoader={loader}
          disabled={
            0 === input.length || Number(input) <= 0 || 19 < Number(input)
          }
        />
      </form>
      <div className={style.result}>
        {result.map((fib, index) => (
          <Circle key={index} letter={String(fib)} index={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
