import React, { FC, FormEvent, useEffect, useState } from "react";
import { Button, Circle, Input, SolutionLayout } from "../../components/ui";
import { Queue } from "../../utils/classes/queue";
import style from "./queue-page.module.scss";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { HEAD, TAIL } from "../../utils/constants/element-captions";
import {delay} from "../../utils/utils";
import { useForm } from "../../utils/hooks/useForm";

const queue = new Queue<string>(7);

export const QueuePage: FC = () => {
  // const [input, setInput] = useState<string>("");
  const { formValues, setValues, handleChange } = useForm({
    input: "",
  });
  const { input } = formValues;
  const [result, setResult] = useState<Array<string | number | null>>([]);
  const [loader, setLoader] = useState({ add: false, del: false });
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setResult([...queue.container.map(() => "")]);
  }, []);

  const handleQueueAction = async (e: FormEvent, action: "add" | "del") => {
    e.preventDefault();
    if (action === "add" && !input) return;
    setLoader({ ...loader, [action]: true });
    setDisabled(true);
    action === "add" ? queue.enqueue(input) : queue.dequeue();
    setResult([...queue.container]);
    setValues({ input: "" });
    await delay(SHORT_DELAY_IN_MS);
    setDisabled(false);
    setLoader({ add: false, del: false });
  };

  const handleClear = () => {
    queue.clear();
    setValues({ input: "" });
    setResult([...queue.container]);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={(e) => handleQueueAction(e, "add")}>
        <Input
          isLimitText={true}
          maxLength={4}
          minLength={1}
          onChange={handleChange}
          placeholder="Введите текст"
          required
          type="text"
          disabled={disabled}
          name="input"
          value={input}
        />
        <Button
          text="Добавить"
          onClick={(e) => handleQueueAction(e, "add")}
          extraClass="ml-6"
          isLoader={loader.add}
          disabled={disabled || input.length < 1}
        />
        <Button
          text="Удалить"
          extraClass="ml-6"
          onClick={(e) => handleQueueAction(e, "del")}
          isLoader={loader.del}
          disabled={disabled || queue.length < 1}
        />
        <Button
          text="Очистить"
          onClick={handleClear}
          extraClass="ml-40"
          disabled={disabled || queue.length < 1}
        />
      </form>
      <div className={style.result}>
        {result.map((circle, index) => (
          <Circle
            key={index}
            letter={circle as string}
            index={index}
            head={queue.head === index && queue.length > 0 ? HEAD : ""}
            tail={queue.tail === index && queue.length > 0 ? TAIL : ""}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
