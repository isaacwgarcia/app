import React from "react";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { CHAINS } from "./chains";
import { hooks } from "./connectors/coinbaseWallet";
const { useChainId, useAccounts, useIsActive } = hooks;

export default function Layout({ children }) {
  const router = useRouter();
  const accounts = useAccounts();
  const isActive = useIsActive();
  const chainId = useChainId();

  return (
    <>
      <Navbar />
      <Grid container spacing={3} width="auto" padding="1vw">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box
            border={1}
            borderRadius={3}
            justifyContent="space-around"
            width="90%"
          >
            <Box padding={2} overflow="true" fontSize="0.6rem">
              <b>{accounts}</b>
              <br />
              {isActive ? CHAINS[chainId]!.name : ""}
            </Box>
          </Box>
          <Box border={1} borderRadius={3} mt={2} width="90%">
            <Box padding={2} overflow="true" fontSize="0.6rem">
              <Box display="flex" width="75%" justifyContent="center">
                Profile Picture
              </Box>
              <br />
              Name <br />
              Handle <br />
              <br />
            </Box>
          </Box>
          <Box mt={2} width="90%">
            <Box overflow="true" fontSize="0.6rem">
              <a
                onClick={() => {
                  router.push("/pools");
                }}
              >
                <ClearAllIcon /> All Pools
              </a>
            </Box>
            <Box overflow="true" fontSize="0.6rem">
              <a
                onClick={() => {
                  router.push("/address");
                }}
              >
                <ClearAllIcon />
                Search By Address
              </a>
            </Box>
            <Box overflow="true" fontSize="0.6rem">
              <a
                onClick={() => {
                  router.push("/asset");
                }}
              >
                <ClearAllIcon />
                Search By Asset
              </a>
            </Box>
          </Box>
        </Grid>

        <Grid height="85vh" item xs={12} sm={12} md={9} lg={9} xl={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
