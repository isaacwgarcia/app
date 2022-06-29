import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PricesBar from "./PricesBar";
import { auth } from "../components/lib/api";
import { LensToken } from "./lib/types";
import { loadToken } from "./state/reducer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/state/context";

const Navbar = () => {
  const { dispatch } = useContext(AppContext);
  const context = useContext(AppContext);
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  async function login() {
    const lens_token = (await auth()) as LensToken;
    if (lens_token) setLogged(true);
    dispatch(loadToken(lens_token));
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
};
export default Navbar;
