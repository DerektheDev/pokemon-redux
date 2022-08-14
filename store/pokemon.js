import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    pokemonRequested: (pokemon, action) => {
      pokemon.loading = true;
    },

    pokemonReceived: (pokemon, action) => {
      pokemon.list = action.payload.pokemon;
      pokemon.loading = false;
    },

    pokemonRequestFailed: (pokemon, action) => {
      pokemon.loading = false;
    },
  },
});

export const { pokemonRequested, pokemonReceived, pokemonRequestFailed } =
  slice.actions;
export default slice.reducer;

export const fetchPokemonBy = (key) => (value) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${key}/${value}`,
      onStart: pokemonRequested.type,
      onSuccess: pokemonReceived.type,
      onError: pokemonRequestFailed.type,
    })
  );
};

// memoized pokemon
export const getPokemon = createSelector(
  (state) => state.entities.pokemon,
  (pokemon) => pokemon.list
);
