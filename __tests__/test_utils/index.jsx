import React from "react";
import { render } from "@testing-library/react";
// import { configureStore } from "@reduxjs/toolkit";
import configureAppStore from "../../store/configureStore";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
// import userReducer from "../features/users/userSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureAppStore(),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
