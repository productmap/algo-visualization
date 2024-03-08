import { reverseString } from "../../utils/funcs/reverseString";
import { ElementStates } from "../../utils/types/element-states";

describe("Тестирование алгоритма разворота строки", () => {
  it("с чётным количеством символов.", async () => {
    const lettersArray = [
      { letter: "a", state: ElementStates.Default },
      { letter: "b", state: ElementStates.Default },
      { letter: "c", state: ElementStates.Default },
      { letter: "d", state: ElementStates.Default },
    ];
    await reverseString(lettersArray);
    expect(lettersArray).toEqual([
      { letter: "d", state: ElementStates.Modified },
      { letter: "c", state: ElementStates.Modified },
      { letter: "b", state: ElementStates.Modified },
      { letter: "a", state: ElementStates.Modified },
    ]);
  });

  it("с нечетным количеством символов.", async () => {
    const lettersArray = [
      { letter: "a", state: ElementStates.Default },
      { letter: "b", state: ElementStates.Default },
      { letter: "c", state: ElementStates.Default },
    ];
    await reverseString(lettersArray);
    expect(lettersArray).toEqual([
      { letter: "c", state: ElementStates.Modified },
      { letter: "b", state: ElementStates.Modified },
      { letter: "a", state: ElementStates.Modified },
    ]);
  });

  it("с одним символом", async () => {
    const singleArray = [{ letter: "a", state: ElementStates.Default }];
    await reverseString(singleArray);
    expect(singleArray).toEqual([
      { letter: "a", state: ElementStates.Modified },
    ]);
  });

  it("пустую строку", async () => {
    const emptyArray = [];
    await reverseString(emptyArray);
    expect(emptyArray).toEqual([]);
  });
});