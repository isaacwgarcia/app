import React from "react";
import { Box } from "@mui/material";
import { hooks } from "../components/connectors/coinbaseWallet";
import { getProfile } from "../components/lib/api";
import { User } from "../components/lib/types";
import { useContext } from "react";
import { AppContext } from "../components/state/context";
import { loadUser } from "../components/state/reducer";

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
  const { dispatch } = useContext(AppContext);

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
      dispatch(loadUser(user));
    }
  }

  loadData();
  return (
    <Box display="flex">
      <Box width="33%">
        <b>Twitter</b>{" "}
      </Box>
      <Box width="33%">
        <b>Lens Posts</b>{" "}
      </Box>
      <Box width="33%">
        <b>News Api</b>{" "}
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export const getStaticProps = async (context: any, locale: any) => {
  return {
    props: {},
  };
};
