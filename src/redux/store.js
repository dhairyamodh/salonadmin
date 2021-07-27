import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";

import axiosReduxMiddleware from "./axiosReduxMiddleware";
import thunk from "redux-thunk";

export default function initializeStore(initialState = {}) {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(axiosReduxMiddleware, thunk))
  );

  store.subscribe(() => {
    // const CurrentState = store.getState();
    // console.log("This is Current State", CurrentState);
  });

  return store;
}
