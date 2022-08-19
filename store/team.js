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
    pokemanRemoved: (team, action) => {
      console.log(parseInt(action.payload));

      team.list = team.list.filter(
        (pokemon) => pokemon.id !== parseInt(action.payload)
      );
    },
  },
});

export const { pokemanReceived, pokemanRemoved } = slice.actions;
export default slice.reducer;

export const addPokemanToTeam = (pokedexNumber) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `pokemon/${pokedexNumber}`,
      onSuccess: pokemanReceived.type,
    })
  );
};

export const removePokemanFromTeam = (pokedexNumber) => (dispatch, getState) =>
  dispatch({ type: "team/pokemanRemoved", payload: pokedexNumber });

// memoized team
export const getTeam = createSelector(
  (state) => state.entities.team,
  (team) => team.list
);
