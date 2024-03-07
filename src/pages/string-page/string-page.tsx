import React, { FC, FormEvent, useState } from "react";
import { ElementStates } from "../../utils/types/element-states";
import { Button, Circle, Input, SolutionLayout } from "../../components/ui";
import style from "./string-page.module.scss";
import { TLettersArray } from "../../utils/types/misc";
import { useForm } from "../../utils/hooks/useForm";
import { reverseString } from "../../utils/funcs/reverseString";

export const StringPage: FC = () => {
  const { formValues, setValues, handleChange } = useForm({ value: "" });
  const { value } = formValues;
  const [result, setResult] = useState<TLettersArray[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const stringArr = Array.from(String(value)).map((letter) => ({
      letter,
      state: ElementStates.Default,
    }));
    setValues({ value: "" });

    setResult(stringArr);
    await reverseString(stringArr, setLoader, setResult);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          disabled={loader}
          isLimitText={true}
          maxLength={11}
          minLength={1}
          name="value"
          onChange={handleChange}
          placeholder="Введите текст"
          required
          type="text"
          value={value}
        />
        <Button
          disabled={value.length < 1}
          extraClass="ml-6"
          isLoader={loader}
          text="Развернуть"
          type="submit"
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
