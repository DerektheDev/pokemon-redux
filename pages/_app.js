import "../styles/globals.css";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const store = configureStore();
let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
