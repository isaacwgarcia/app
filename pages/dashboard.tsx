import React from "react";
import { Box, Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Grid container spacing={3} width="auto" height="85vh" padding="1vw">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box>
            <Box padding={2} overflow="true" fontSize="0.6rem">
              Dashboard
              <br />
              <br />
              <br />
              <br />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <br />
    </div>
  );
}

Dashboard.layout = true;

export const getStaticProps = async (context: any, locale: any) => {
  return {
    props: {},
  };
};
