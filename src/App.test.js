import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";

/**
 * Setup function for App component
 * @returns {Wrapper}
 */
const setup = () => {
  // use mount, because useEffect not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper;
  let originalUseReducer;
  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  it(`should render loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    // const AppComponent = findByTestAttr(wrapper, 'component-app');
    expect(spinnerComponent.exists()).toBe(loadingShows);
    // expect(AppComponent.exists()).toBe(appShows)
  });

  it(`should render App: ${appShows} `, () => {
    const AppComponent = findByTestAttr(wrapper, "component-app");
    // const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(AppComponent.exists()).toBe(appShows);
    // expect(spinnerComponent.exists()).toBe(loadingShows);
  });
});

describe("get secret word", () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  });
  test("getSecretWord on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
