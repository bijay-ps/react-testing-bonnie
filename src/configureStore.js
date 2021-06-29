import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducers from "./reducers";

export const middlewares = [ReduxThunk];

export default createStore(rootReducers, {}, applyMiddleware(...middlewares));
