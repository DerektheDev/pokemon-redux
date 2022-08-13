import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "team",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    pokemonRequested: (team, action) => {
      team.loading = true;
    },

    pokemonReceived: (team, action) => {
      team.list = action.payload;
      team.loading = false;
    },

    pokemonRequestFailed: (team, action) => {
      team.loading = false;
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

// memoized team
export const getTeam = createSelector(
  (state) => state.entities.team,
  (team) => team.list
);
