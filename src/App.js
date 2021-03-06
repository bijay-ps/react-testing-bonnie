import React, { useEffect } from "react";
import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { getSecretWord } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  // TODO: get props from shared state
  const success = useSelector((state) => state.success);
  // const secretWord = "party";
  const secretWord = useSelector((state) => state.secretWord);
  const guessedWords = useSelector((state) => state.guessedWords);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
