import { FC, useState } from "react";
import {
  ArrowIcon,
  Button,
  Circle,
  Input,
  SolutionLayout,
} from "../../components/ui";
import { delay } from "../../utils/utils";
import { TCircle } from "../../utils/types/misc";
import { ElementStates } from "../../utils/types/element-states";
import { LinkedList } from "../../utils/classes/list";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import style from "./list-page.module.scss";
import { useForm } from "../../utils/hooks/useForm";

const linkedList = new LinkedList<string>(["0", "34", "8", "1"]);

export const ListPage: FC = () => {
  const { formValues, setValues, handleChange } = useForm({
    input: "",
    index: 0,
  });
  const { input, index } = formValues;
  const [disabled, setDisabled] = useState(false);
  const currentState = linkedList
    .getCurrentState()
    .map((item) => ({ value: item, state: ElementStates.Default }));
  const [result, setResult] = useState<TCircle[]>(currentState);
  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    deleteFromTail: false,
    deleteFromHead: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  const addToHead = async () => {
    setLoader({ ...loader, addToHead: true });
    setDisabled(true);
    linkedList.prepend(input);
    result[0] = {
      ...result[0],
      add: true,
      smallCircle: {
        value: input,
      },
    };
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result[0] = {
      ...result[0],
      add: false,
      smallCircle: {
        value: null,
      },
    };
    result.unshift({
      value: input,
      state: ElementStates.Modified,
    });
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result[0].state = ElementStates.Default;
    setLoader({ ...loader, addToHead: false });
    setDisabled(false);
    setValues({ ...formValues, input: "" });
  };

  const deleteFromHead = async () => {
    setDisabled(true);
    setLoader({ ...loader, deleteFromHead: true });
    result[0] = {
      ...result[0],
      value: "",
      delete: true,
      smallCircle: {
        value: linkedList.deleteFromHead(),
      },
    };
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result.shift();
    setResult([...result]);
    setDisabled(false);
    setLoader({ ...loader, deleteFromHead: false });
  };

  const addToTail = async () => {
    setDisabled(true);
    setLoader({ ...loader, addToTail: true });
    linkedList.append(input);
    const { length } = result;
    result[length - 1] = {
      ...result[length - 1],
      add: true,
      smallCircle: {
        value: input,
      },
    };
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result[length - 1] = {
      ...result[length - 1],
      add: false,
      smallCircle: {
        value: null,
      },
    };
    result[length] = {
      ...result[length],
      add: false,
      state: ElementStates.Modified,
      value: input,
    };

    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result.map((item) => (item.state = ElementStates.Default));
    setDisabled(false);
    setLoader({ ...loader, addToTail: false });
    setValues({ ...formValues, input: "" });
  };

  const deleteFromTail = async () => {
    setLoader({ ...loader, deleteFromTail: true });
    setDisabled(true);
    const { length } = result;
    result[length - 1] = {
      ...result[length - 1],
      value: "",
      delete: true,
      smallCircle: {
        value: linkedList.deleteFromTail(),
      },
    };
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result.pop();
    setResult([...result]);
    setLoader({ ...loader, deleteFromTail: false });
    setDisabled(false);
  };

  const addByIndex = async () => {
    if (!index) return;
    setDisabled(true);
    setLoader({ ...loader, addByIndex: true });
    linkedList.addByIndex(input, index);
    for (let i = 0; i <= index; i++) {
      result[i] = {
        ...result[i],
        add: true,
        smallCircle: {
          value: input,
        },
      };
      if (i > 0) {
        result[i - 1] = {
          ...result[i - 1],
          add: false,
          smallCircle: {
            value: null,
          },
          state: ElementStates.Changing,
        };
      }
      setResult([...result]);
      await delay(SHORT_DELAY_IN_MS);
    }
    result[index] = {
      ...result[index],
      add: false,
      smallCircle: {
        value: null,
      },
    };
    result.splice(index, 0, {
      value: input,
      state: ElementStates.Modified,
    });
    result.map((item) => (item.state = ElementStates.Default));
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader({ ...loader, addByIndex: false });
    setDisabled(false);
  };

  const deleteByIndex = async () => {
    if (!index) return;
    setDisabled(true);
    setLoader({ ...loader, deleteByIndex: true });
    for (let i = 0; i <= index; i++) {
      result[i].state = ElementStates.Changing;
      setResult([...result]);
      await delay(SHORT_DELAY_IN_MS);
    }
    result[index] = {
      ...result[index],
      value: "",
      delete: true,
      smallCircle: {
        value: linkedList.deleteByIndex(index),
      },
    };
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result.splice(index, 1);
    setResult([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result.map((item) => (item.state = ElementStates.Default));
    setDisabled(false);
    setLoader({ ...loader, deleteByIndex: false });
  };

  return (
    <SolutionLayout title="Связный список">
      <form>
        <div className={style.row}>
          <Input
            type="text"
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            disabled={disabled}
            value={input}
            onChange={handleChange}
            required
            extraClass={style.input}
          />
          <Button
            text="Добавить в head"
            extraClass={"ml-6"}
            isLoader={loader.addToHead}
            disabled={disabled || input.length === 0}
            onClick={addToHead}
            linkedList="small"
          />
          <Button
            text="Добавить в tail»"
            extraClass={"ml-6"}
            isLoader={loader.addToTail}
            disabled={disabled || input.length === 0}
            onClick={addToTail}
            linkedList="small"
          />
          <Button
            text="Удалить из head"
            extraClass={"ml-6"}
            isLoader={loader.deleteFromHead}
            disabled={disabled || !result.length}
            onClick={deleteFromHead}
            linkedList="small"
          />
          <Button
            text="Удалить из tail"
            extraClass={"ml-6"}
            isLoader={loader.deleteFromTail}
            disabled={disabled || !result.length}
            onClick={deleteFromTail}
            linkedList="small"
          />
        </div>
        <div className={style.row}>
          <Input
            type="number"
            placeholder="Введите индекс"
            maxLength={10}
            onChange={handleChange}
            extraClass={style.input}
          />
          <Button
            text="Добавить по индексу"
            extraClass={"ml-6"}
            isLoader={loader.addByIndex}
            disabled={
              disabled ||
              !input ||
              !index ||
              index > result.length - 1 ||
              index < 0
            }
            onClick={addByIndex}
            linkedList="big"
          />
          <Button
            text="Удалить по индексу"
            extraClass={"ml-6"}
            isLoader={loader.deleteByIndex}
            disabled={
              disabled ||
              !input ||
              !index ||
              index > result.length - 1 ||
              index < 0
            }
            onClick={deleteByIndex}
            linkedList="big"
          />
        </div>
      </form>
      <ul className={style.result}>
        {result.map((item, index) => {
          return (
            <li key={index} className={style.item}>
              <Circle
                head={index === 0 && !item.add && !item.delete ? "head" : ""}
                tail={
                  index === result.length - 1 && !item.add && !item.delete
                    ? "tail"
                    : ""
                }
                letter={item.value as string}
                state={item.state}
                index={index}
              />
              {index !== result.length - 1 && <ArrowIcon key={index} />}
              {item.add && (
                <Circle
                  isSmall={true}
                  letter={item.smallCircle?.value as string}
                  state={ElementStates.Changing}
                  extraClass={style.add}
                />
              )}
              {item.delete && (
                <Circle
                  isSmall={true}
                  letter={item.smallCircle?.value as string}
                  state={ElementStates.Changing}
                  extraClass={style.del}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
