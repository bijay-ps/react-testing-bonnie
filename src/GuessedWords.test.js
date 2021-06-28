import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "./test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

xit("should not throw warning with expected props", function () {
  checkProps(GuessedWords, defaultProps);
});

xdescribe("If there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  it("should render without error", function () {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  it("should renders instruction to guess a word", function () {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

xdescribe("If there are words guessed", () => {
  let guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  it("should render without error", function () {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  it('should renders "guessed words" section', function () {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  it("should render correct number of guessed words", function () {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});
