import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pokemonReducer from "./pokemon";
import teamReducer from "./team";
import searchValuesReducer from "./searchValues";

const persistConfig = {
  key: "root",
  storage,
};

const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
  team: teamReducer,
  searchValues: searchValuesReducer,
});

const persistedReducer = persistReducer(persistConfig, entitiesReducer);

export default persistedReducer;
