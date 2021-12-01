import { createStore,applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';

//create the store from the combined reducers

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromStorage();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk),
 
);

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
