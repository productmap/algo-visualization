import { bubbleSort } from "../../utils/funcs/bubbleSort";
import { selectionSort } from "../../utils/funcs/selectionSort";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  const arrEmpty = [];
  const arrOne = ["1"];
  const arr = ["6", "3", "9", "1", "2", "5", "4", "7", "8"];
  const arrSortedAsc = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const arrSortedDesc = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];

  it("пустой массив", () => {
    expect(bubbleSort(arrEmpty, "asc")).toEqual(arrEmpty);
    expect(bubbleSort(arrEmpty, "desc")).toEqual(arrEmpty);
    expect(selectionSort(arrEmpty, "asc")).toEqual(arrEmpty);
    expect(selectionSort(arrEmpty, "desc")).toEqual(arrEmpty);
  });

  it("массив из одного элемента", () => {
    expect(bubbleSort(arrOne, "asc")).toEqual(arrOne);
    expect(bubbleSort(arrOne, "desc")).toEqual(arrOne);
    expect(selectionSort(arrOne, "asc")).toEqual(arrOne);
    expect(selectionSort(arrOne, "desc")).toEqual(arrOne);
  });

  it("массив из нескольких элементов", () => {
    expect(bubbleSort(arr, "asc")).toEqual(arrSortedAsc);
    expect(bubbleSort(arr, "desc")).toEqual(arrSortedDesc);
    expect(selectionSort(arr, "asc")).toEqual(arrSortedAsc);
    expect(selectionSort(arr, "desc")).toEqual(arrSortedDesc);
  });
});
