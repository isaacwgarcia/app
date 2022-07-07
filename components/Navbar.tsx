import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PricesBar from "./PricesBar";
import { LensToken } from "./lib/types";
import { loadToken } from "./state/reducer";
import { useContext, useState } from "react";
import { AppContext } from "../components/state/context";
import { coinbaseWallet, hooks } from "../components/connectors/coinbaseWallet";
import { generateChallenge, authenticate } from "../components/lib/api";

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
      const challenge = await generateChallenge(accounts);

      const signedMessage = await signer.signMessage(challenge.challenge.text);
      const response = await authenticate(accounts, signedMessage);
      const lens_token = response.authenticate as LensToken;
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
