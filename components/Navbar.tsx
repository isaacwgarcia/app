import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Pricing from "./Pricing";

const Navbar = () => {
  const router = useRouter();

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
