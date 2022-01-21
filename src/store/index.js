import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from "redux-persist";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDebugger from "redux-flipper";
import rootReducer from "./reducers";

const persistConfig = {
  key: "testDB",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1, // see "Merge Process" section for details.
  keyPrefix: "react",
  version: 1,
  timeout: 0, //can be removed when not debuging
  blacklist: ["metaData", "misc", "cart", "topic"], //not persisted
  whitelist: ["user", "order"], //persisted
};

const middlewares = [
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  thunk,
];

if (__DEV__) {
  middlewares.push(createDebugger());
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
