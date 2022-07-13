import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PricesBar from "./PricesBar";
import { LensToken } from "./lib/types";
import { loadToken } from "./state/reducer";
import { useContext, useState } from "react";
import { AppContext } from "../components/state/context";
import { coinbaseWallet, hooks } from "../components/connectors/coinbaseWallet";

const { useChainId, useAccounts, useError, useIsActivating, useProvider } =
  hooks;

export default function Navbar() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const provider = useProvider();
  const { dispatch } = useContext(AppContext);
  const context = useContext(AppContext);
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  async function login() {
    void (await coinbaseWallet.activate());

    if (provider) {
      const signer = provider.getSigner();

      const options = {
        method: `GET`,
      };
      const challenge = await fetch(`/api/auth/${accounts}`, options)
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      const signedMessage = await signer.signMessage(challenge.challenge.text);

      const authenticate = await fetch(
        `/api/auth/${accounts}?signedMessage=${signedMessage}`,
        {
          method: `POST`,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });

      const lens_token = authenticate.authenticate as LensToken;
      if (lens_token) setLogged(true);
      dispatch(loadToken(lens_token));
    } else {
      console.log("Please wait for Coinbase to connect...");
    }
  }

  return (
    <>
      <Box
        height="10vh"
        sx={{
          display: "flex",
          position: "block",
          width: "100%",
          top: 0,
          left: 0,
          color: "white",
          background: "black",
          zIndex: "10",
          justifyContent: "flex-end",
        }}
      >
        <Box padding="1rem">
          <PricesBar />
        </Box>

        {context?.state?.token.accessToken ? (
          <></>
        ) : (
          <Box sx={{ padding: "1rem" }}>
            <button
              onClick={() => {
                login();
              }}
            >
              Connect Wallet
            </button>
          </Box>
        )}
      </Box>
    </>
  );
}
