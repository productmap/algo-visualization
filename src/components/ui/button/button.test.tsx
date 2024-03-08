import renderer from "react-test-renderer";
import { Button } from "./button";
import { Direction } from "../../../utils/types/direction";
import { screen, fireEvent, render } from "@testing-library/react";

it("Кнопка с текстом отрисовывается корректно", () => {
  const component = renderer
    .create(<Button text="Кнопка с текстом" />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Кнопка без текста отрисовывается корректно", () => {
  const component = renderer.create(<Button />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Кнопка заблокированная отрисовывается корректно", () => {
  const component = renderer.create(<Button disabled={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Кнопка с загрузкой отрисовывается корректно", () => {
  const component = renderer.create(<Button isLoader={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Кнопка с сортировкой отрисовывается корректно", () => {
  const component = renderer
    .create(<Button sorting={Direction.Ascending} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Кнопка с сортировкой в обратном порядке отрисовывается корректно", () => {
  const component = renderer
    .create(<Button sorting={Direction.Descending} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Проверяем корректность вызова колбека при клике на кнопку", () => {
  const mockCallback = jest.fn();
  render(<Button text="Кнопка с текстом" onClick={mockCallback} />);
  fireEvent.click(screen.getByText("Кнопка с текстом"));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
