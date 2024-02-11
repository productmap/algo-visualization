import { FC, useState } from "react";
import { Button, Circle, Input, SolutionLayout } from "../../components/ui";
import { TItem } from "../../utils/types/misc";
import { ElementStates } from "../../utils/types/element-states";
import { TOP } from "../../utils/constants/element-captions";
import style from "./stack-page.module.scss";
import { delay } from "../../utils/utils";
import { Stack } from "../../utils/classes/stack";

const stack = new Stack<string>();

export const StackPage: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<TItem[]>([]);
  const [loader, setLoader] = useState({ add: false, del: false });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleAction = async (action: "add" | "delete") => {
    if (
      (action === "add" && !input) ||
      (action === "delete" && result.length === 0)
    )
      return;
    setDisabled(true);
    setLoader({ add: action === "add", del: action === "delete" });
    if (action === "add") {
      stack.push(input);
      setResult([...result, { value: input, state: ElementStates.Modified }]);
      setInput("");
      await delay(500);
      setResult([...result, { value: input, state: ElementStates.Default }]);
    } else {
      stack.pop();
      await delay(500);
      setResult(result.slice(0, -1));
    }
    setLoader({ add: false, del: false });
    setDisabled(false);
  };

  const handleClear = () => {
    setInput("");
    stack.clear();
    setResult([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={style.form}>
        <Input
          isLimitText={true}
          maxLength={4}
          minLength={1}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Введите текст"
          required
          type="text"
          disabled={disabled}
          value={input}
        />
        <Button
          text="Добавить"
          onClick={() => handleAction("add")}
          extraClass="ml-6"
          isLoader={loader.add}
          disabled={disabled}
        />
        <Button
          text="Удалить"
          extraClass="ml-6"
          onClick={() => handleAction("delete")}
          isLoader={loader.del}
          disabled={disabled}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          extraClass="ml-40"
          disabled={disabled}
        />
      </form>
      <div className={style.result}>
        {result.map((circle, index) => (
          <Circle
            key={index}
            letter={circle.value}
            state={circle.state}
            index={index}
            head={index === result.length - 1 ? TOP : null}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};