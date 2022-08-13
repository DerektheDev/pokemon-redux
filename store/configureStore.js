import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

const configureAppStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api],
  });

export default configureAppStore;
