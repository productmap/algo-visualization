import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../utils/types/element-states";

it("Круг без буквы отрисовывается корректно", () => {
  const component = renderer.create(<Circle />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с буквой отрисовывается корректно", () => {
  const component = renderer.create(<Circle letter="A" />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с head отрисовывается корректно", () => {
  const component = renderer.create(<Circle head="head" />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с React в head отрисовывается корректно", () => {
  const component = renderer.create(<Circle head={<p>head</p>} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с tail отрисовывается корректно", () => {
  const component = renderer
    .create(<Circle tail="tail" tailType="string" />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с react в tail отрисовывается корректно", () => {
  const component = renderer
    .create(<Circle tail={<p>tail</p>} tailType="element" />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с index отрисовывается корректно", () => {
  const component = renderer.create(<Circle index={1} />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с пропом isSmall ===  true", () => {
  const component = renderer.create(<Circle isSmall />).toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с состоянием Default отрисовывается корректно", () => {
  const component = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с состоянием отрисовывается корректно", () => {
  const component = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it("Круг с состоянием Modified отрисовывается корректно", () => {
  const component = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
