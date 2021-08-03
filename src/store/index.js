import { createStore } from "redux";

import rootReducer from "../reducers/rootReducer";

function configureStore() {
  const store = createStore(rootReducer);

  return store;
}

export default configureStore;
