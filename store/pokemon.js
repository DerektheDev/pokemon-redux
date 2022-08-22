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
      const { payload } = action;

      if (payload.hasOwnProperty("pokemon")) {
        // searching by type or ability
        pokemon.list = payload.pokemon.map((p) => p.pokemon);
      } else if (payload.hasOwnProperty("pokemon_species")) {
        // searching by generation
        pokemon.list = payload.pokemon_species;
      } else if (payload.hasOwnProperty("learned_by_pokemon")) {
        // searching by move
        pokemon.list = payload.learned_by_pokemon;
      }

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
