import Layout from "../components/Layout";
import "../styles/globals.css";
import { AppContext } from "../components/state/context";
import { appReducer } from "../components/state/reducer";
import { initialAppOwnerState } from "../components/state/state";
import { useReducer } from "react";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(appReducer, initialAppOwnerState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {Component.layout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AppContext.Provider>
  );
}

export default MyApp;
