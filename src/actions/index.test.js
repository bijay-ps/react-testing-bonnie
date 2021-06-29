import moxios from "moxios";
import { getSecretWord } from "./";
import { storeFactory } from "../../test/testUtils";

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should return the secret word", () => {
    const store = storeFactory();
    // expect.assertions(1);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    // update to test app in Redux / context sections
    return store.dispatch(getSecretWord()).then(() => {
      const secretWord = store.getState().secretWord;
      expect(secretWord).toBe("party");
    });
  });
});
