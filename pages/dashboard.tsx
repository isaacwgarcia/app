import React from "react";
import { Box } from "@mui/material";
import { hooks } from "../components/connectors/coinbaseWallet";
import { User } from "../components/lib/types";
import { useContext, useEffect } from "react";
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
    const options = {
      method: `GET`,
    };
    fetch(`/api/user/${accounts}`, options)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            let handle = data?.profiles?.items[0]?.handle.split(".");
            user.bio = data.profiles.items[0].bio;
            user.id = data.profiles.items[0].id;
            user.handle = handle[0];
            user.name = data.profiles.items[0].name;
            user.cover_picture =
              data.profiles.items[0].coverPicture.original.url;
            user.picture = data.profiles.items[0].picture.original.url;
            dispatch(loadUser(user));
          });
        }
        throw new Error("Api is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

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
