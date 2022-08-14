import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "searchValues",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    searchValuesRequested: (searchValues, action) => {
      searchValues.loading = true;
    },

    searchValuesReceived: (searchValues, action) => {
      searchValues.list = action.payload.results;
      searchValues.loading = false;
    },

    searchValuesRequestFailed: (searchValues, action) => {
      searchValues.loading = false;
    },
  },
});

export const {
  searchValuesRequested,
  searchValuesReceived,
  searchValuesRequestFailed,
} = slice.actions;
export default slice.reducer;

export const fetchSearchValuesBy = (key) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${key}`,
      onStart: searchValuesRequested.type,
      onSuccess: searchValuesReceived.type,
      onError: searchValuesRequestFailed.type,
    })
  );
};

// memoized searchValues
export const getSearchValues = createSelector(
  (state) => state.entities.searchValues,
  (searchValues) => searchValues.list
);
