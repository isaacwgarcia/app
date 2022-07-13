import React from "react";
import { Box } from "@mui/material";
import { hooks } from "../components/connectors/coinbaseWallet";
import { User } from "../components/lib/types";
import { useContext, useEffect } from "react";
import { AppContext } from "../components/state/context";
import { loadUser } from "../components/state/reducer";
import {
  exploreLensPublications,
  getHeadlinesNewsApi,
} from "../components/lib/api";
import { useRouter } from "next/router";
import ItemCard from "../components/ItemCard";
import Divider from "@mui/material/Divider";

const { useAccounts } = hooks;

function Dashboard(props) {
  const router = useRouter();
  const session = useContext(AppContext);

  const lens_publications =
    props.lens_publications.data.explorePublications.items;
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
    if (!session.state.token.accessToken) router.push("/");

    loadData();
  }, []);

  return (
    <Box display="flex">
      <Box width="33%">
        <b>Twitter</b>{" "}
      </Box>
      <Box width="33%">
        <b>Lens Posts</b>{" "}
        <Box padding="1vw">
          {lens_publications.map((post) => {
            if (post) {
              var date = new Date(post.createdAt);
              return (
                <>
                  <ItemCard
                    appId={post.appId}
                    createdAt={date}
                    description={post.description}
                    content={post.metadata.content}
                    image={post.metadata.image}
                    handle={post.profile.handle}
                    ownedBy={post.profile.ownedBy}
                  />
                  <br />
                </>
              );
            }
          })}
        </Box>
      </Box>
      <Box width="33%">
        <b>News Api</b>{" "}
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export async function getServerSideProps(context) {
  let publications = await exploreLensPublications();
  let news_headlines = await getHeadlinesNewsApi();

  return {
    props: {
      lens_publications: publications,
      news: news_headlines,
    },
  };
}

export default Dashboard;
