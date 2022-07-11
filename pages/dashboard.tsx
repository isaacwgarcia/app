import React from "react";
import { Box, Grid } from "@mui/material";
import { hooks } from "../components/connectors/coinbaseWallet";
import { getProfile } from "../components/lib/api";
import { User } from "../components/lib/types";

const { useAccounts } = hooks;

export default function Dashboard() {
  let user: User = {
    id: "",
    handle: "",
    bio: "",
    name: "",
    picture: "",
    cover_picture: "",
  };

  const accounts = useAccounts();
  async function loadData() {
    const profile = await getProfile(accounts);
    if (profile) {
      let handle = profile?.profiles?.items[0]?.handle.split(".");
      user.bio = profile.profiles.items[0].bio;
      user.id = profile.profiles.items[0].id;
      user.handle = handle[0];
      user.name = profile.profiles.items[0].name;
      user.cover_picture = profile.profiles.items[0].coverPicture.original.url;
      user.picture = profile.profiles.items[0].picture.original.url;
    }
  }

  loadData();
  return (
    <div>
      <Grid container spacing={1} width="auto" height="85vh" padding="1vw">
        <Grid item xs={3} sm={3} md={6} lg={12} xl={12}>
          <Box>Twitter</Box>
        </Grid>
        <Grid item xs={3} sm={3} md={6} lg={12} xl={12}>
          <Box>Lens Posts</Box>
        </Grid>
        <Grid item xs={3} sm={3} md={6} lg={12} xl={12}>
          Spotify Profile
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
