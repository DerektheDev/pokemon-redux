import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "team",
  initialState: {
    list: [],
  },
  reducers: {
    pokemanReceived: (team, action) => {
      if (team.list.length < 6) {
        team.list.push(action.payload);
      }
    },
  },
});

export const { pokemanReceived } = slice.actions;
export default slice.reducer;

export const addPokemanToTeam = (pokedexNumber) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `pokemon/${pokedexNumber}`,
      onSuccess: pokemanReceived.type,
    })
  );
};

// memoized team
export const getTeam = createSelector(
  (state) => state.entities.team,
  (team) => team.list
);
