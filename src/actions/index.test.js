import moxios from "moxios";
import { getSecretWord } from "./";

describe("getSecretWord", () => {
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
