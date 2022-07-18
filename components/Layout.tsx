import React from "react";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { hooks } from "./connectors/coinbaseWallet";

import InfoCard from "./InfoCard";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Grid container spacing={3} width="auto" padding="1vw">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <InfoCard />
          <Box mt={2} width="90%">
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/dashboard");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                Dashboard
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/pools");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                All Pools
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/address");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
              >
                <ClearAllIcon />
                Search By Address
              </a>
            </Box>
            <Box overflow="true" fontSize="1rem">
              <a
                onClick={() => {
                  router.push("/asset");
                }}
                style={{ color: "#140035", cursor: "pointer" }}
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
