import App from "./App";
import { mount } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import { getSecretWord as mockGetSecretWord } from "./actions";
import { Provider } from "react-redux";

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock("./actions");

const setup = () => {
  const store = storeFactory();
  // use mount, because useEffect not called on 'shallow'
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

it("should render App component without any error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});

describe("get secret word", () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });
  it("should getSecretWord on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  it("should not run getSecretWord on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    // https://github.com/enzymejs/enzy,e/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
