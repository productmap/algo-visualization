import { FC, useEffect, useState } from "react";
import {
  Button,
  Column,
  RadioInput,
  SolutionLayout,
} from "../../components/ui";
import style from "./sorting-page.module.scss";
import { Direction } from "../../utils/types/direction";
import { TColumn } from "../../utils/types/misc";
import { ElementStates } from "../../utils/types/element-states";
import {SHORT_DELAY_IN_MS} from "../../utils/constants/delays";

export const SortingPage: FC = () => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loader, setLoader] = useState({ asc: false, desc: false });
  const [sorting, setSorting] = useState("selection" || "bubble");

  useEffect(() => {
    randomArr();
  }, []);

  const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;
    const arrLen = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen);
    const arr = Array.from({ length: arrLen }, () => ({
      value: Math.floor(Math.random() * 100),
      state: ElementStates.Default,
    }));
    setColumns(arr);
  };

  const resetState = () => {
    setColumns(() =>
      columns.map((column) => ({ ...column, state: ElementStates.Default }))
    );
  };

  const delay = (time: number) => {
    return new Promise((res) => setTimeout(res, time));
  };

  const swap = (arr: TColumn[], firstIndex: number, secondIndex: number) => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
  };

  const selectionSort = async (arr: TColumn[], direction: Direction) => {
    setDisabled(true);
    setLoader(
      direction === Direction.Ascending
        ? { asc: true, desc: false }
        : { asc: false, desc: true }
    );
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;
      setColumns([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      for (let j = i + 1; j < length; j++) {
        if (
          direction === Direction.Ascending
            ? arr[j].value < arr[maxInd].value
            : arr[j].value > arr[maxInd].value
        ) {
          arr[maxInd].state = ElementStates.Default;
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          setColumns([...arr]);
          await delay(SHORT_DELAY_IN_MS);
        }
      }
      if (maxInd !== i) {
        [arr[maxInd], arr[i]] = [arr[i], arr[maxInd]];
        arr[i].state = ElementStates.Modified;
      }
      arr[maxInd].state = ElementStates.Default;
      // arr[i].state = ElementStates.Modified;
      setColumns([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoader({ asc: false, desc: false });
    setDisabled(false);
  };

  const bubbleSort = async (arr: TColumn[], direction: Direction) => {
    setDisabled(true);
    setLoader(
      direction === Direction.Ascending
        ? { asc: true, desc: false }
        : { asc: false, desc: true }
    );
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        [arr[j].state, arr[j + 1].state] = [
          ElementStates.Changing,
          ElementStates.Changing,
        ];

        setColumns([...arr]);
        await delay(SHORT_DELAY_IN_MS);

        if (
          direction === Direction.Ascending
            ? arr[j].value > arr[j + 1].value
            : arr[j].value < arr[j + 1].value
        ) {
          swap(arr, j, j + 1);
          [arr[j].state, arr[j + 1].state] = [
            ElementStates.Modified,
            ElementStates.Modified,
          ];

          setColumns([...arr]);
          await delay(SHORT_DELAY_IN_MS);
        }
      }
    }
    setLoader({ asc: false, desc: false });
    setDisabled(false);
  };

  const sort = async (direction: Direction) => {
    if (sorting === "selection") {
      resetState();
      await selectionSort(columns, direction);
    }
    if (sorting === "bubble") {
      resetState();
      await bubbleSort(columns, direction);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form}>
        <RadioInput
          name="sorting"
          label="Выбор"
          value="selection"
          onClick={() => setSorting("selection")}
          disabled={disabled}
          defaultChecked
        />
        <RadioInput
          name="sorting"
          label="Пузырёк"
          value="bubble"
          onClick={() => setSorting("bubble")}
          disabled={disabled}
          extraClass="ml-10"
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          isLoader={loader.asc}
          disabled={disabled}
          onClick={() => sort(Direction.Ascending)}
          extraClass="ml-16"
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          isLoader={loader.desc}
          disabled={disabled}
          onClick={() => sort(Direction.Descending)}
          extraClass="ml-6"
        />
        <Button
          type="button"
          text="Новый массив"
          disabled={disabled}
          onClick={randomArr}
          extraClass="ml-40"
        />
      </form>
      <div className={style.result}>
        {columns.map((column, index) => (
          <Column key={index} index={column.value} state={column.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
