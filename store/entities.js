import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pokemonReducer from "./pokemon";
import searchValuesReducer from "./searchValues";

const persistConfig = {
  key: "root",
  storage,
};

const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
  searchValues: searchValuesReducer,
});

const persistedReducer = persistReducer(persistConfig, entitiesReducer);

export default persistedReducer;
