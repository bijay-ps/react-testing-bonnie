import { actionTypes } from "../actions";
import successReducer from "./successReducer";

it("should return false when previous state is undefined", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

it("should return previous state when unknown action type is passed", () => {
  const newState = successReducer(false, { type: "unknown" });
  expect(newState).toBe(false);
});

it("should return `true` for action type CORRECT_GUESS", () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
