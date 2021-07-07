import { useEffect, useReducer, useState } from "react";
import "./App.css";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      console.log("Default state reached");
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { secretWord: "" });

  // TODO: get props from shared state
  const success = false;
  const guessedWords = [];

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };
  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
          <p>Loading secret word...</p>
        </div>
      </div>
    );
  }
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={state.secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
