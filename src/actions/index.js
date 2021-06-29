import axios from "axios";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
};

export function guessWord(guessedWord) {
  return function (dispatch, getState) {};
}

export const getSecretWord = () => {
  return axios.get("http://localhost: 3030").then((response) => response.data);
};
