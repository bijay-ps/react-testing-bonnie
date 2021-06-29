import { getLetterMatchCount } from "./index";

describe("getLetterMatchCount", () => {
  const secretWord = "party";

  it("should return the correct count when there are no matching letters", function () {
    const letterMatchCount = getLetterMatchCount("bones", secretWord);
    expect(letterMatchCount).toBe(0);
  });
  it("should return the correct count when there are three matching letters", function () {
    const letterMatchCount = getLetterMatchCount("train", secretWord);
    expect(letterMatchCount).toBe(3);
  });
  it("should return the correct count when there are duplicate letters in the guess", function () {
    const letterMatchCount = getLetterMatchCount("parka", secretWord);
    expect(letterMatchCount).toBe(3);
  });
});
