import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import teamReducer from "./team";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['auth'], // only persist auth reducer
};

const entitiesReducer = combineReducers({
  team: teamReducer,
});

const persistedReducer = persistReducer(persistConfig, entitiesReducer);

export default persistedReducer;
