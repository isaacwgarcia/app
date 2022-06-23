import React from "react";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function Layout({ children }) {
  const router = useRouter();
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
              BetaPhase Data Analysis <br />
            </Box>
          </Box>
          <Box border={1} borderRadius={3} mt={2} width="90%">
            <Box padding={2} overflow="true" fontSize="0.6rem">
              USER ADDRESS
              <br />
              CONNECTED TO: NETWORK
            </Box>
          </Box>
          <Box mt={2} width="90%">
            <Box padding={2} overflow="true" fontSize="0.6rem">
              <a
                onClick={() => {
                  router.push("/pools");
                }}
              >
                <ClearAllIcon /> All Pools
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
