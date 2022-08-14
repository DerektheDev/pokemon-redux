import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pokemonReducer from "./pokemon";

const persistConfig = {
  key: "root",
  storage,
};

const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
});

const persistedReducer = persistReducer(persistConfig, entitiesReducer);

export default persistedReducer;
