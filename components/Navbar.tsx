import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Pricing from "./Pricing";
import { auth } from "../components/lib/api";
import { LensToken } from "./lib/types";

const Navbar = () => {
  const router = useRouter();
  async function login() {
    const lens_token = (await auth()) as LensToken;
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
          <Pricing />
        </Box>

        <Box sx={{ padding: "1rem" }}>
          <button
            onClick={() => {
              login();
              router.push("/dashboard");
            }}
          >
            Connect Wallet
          </button>
        </Box>
      </Box>
    </>
  );
};
export default Navbar;
