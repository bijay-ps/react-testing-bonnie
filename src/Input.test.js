import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps, storeFactory } from "../test/testUtils";
import { Provider } from "react-redux";
import Input from "./Input";

const mockSetCurrentGuess = jest.fn();

// mock entire module for destructing useState on import
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockSetCurrentGuess],
}));

const setup = (initialState = {}, secretWord = "party") => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input secretWord={secretWord} />
    </Provider>
  );
};

describe("render", () => {
  describe("success is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });
    it("should render Input component without error", function () {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });
    it("should not render the input box", function () {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });
    it("should not render the submit button", function () {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe("success is false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: false });
    });
    it("should render Input component without error", function () {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });
    it("should render the input box", function () {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });
    it("should render the submit button", function () {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});

it("should not throw warning with expected props", function () {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    wrapper = setup({ success: false });
  });
  it("should update state value of input box upon change", function () {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  it("should clear the input field when submit button is clicked", function () {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
