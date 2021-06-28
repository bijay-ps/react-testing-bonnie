import moxios from "moxios";
import { getSecretWord, correctGuess, actionTypes } from "./";

fdescribe("correctGuess", () => {
  it("should return an action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
});

xdescribe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should return the secret word", () => {
    expect.assertions(1);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    // update to test app in Redux / context sections
    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe("party");
    });
  });
});
