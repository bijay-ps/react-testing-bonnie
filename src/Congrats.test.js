import { shallow } from "enzyme";
import Congrats from "./Congrats";
import { checkProps, findByTestAttr } from "./test/testUtils";

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

xit("should render Congrats component without any error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

xit("should render no text when `success` prop is false", function () {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

xit("should render non-empty congrats message when `success` props is true", function () {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});

xit("should not throw warning with expected props", function () {
  const expectedProps = { success: true };
  checkProps(Congrats, expectedProps);
});
