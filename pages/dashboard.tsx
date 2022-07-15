import React from "react";
import { Box } from "@mui/material";
import { hooks } from "../components/connectors/coinbaseWallet";
import { User } from "../components/lib/types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/state/context";
import { loadUser } from "../components/state/reducer";
import { getTimeline } from "../components/lib/api";
import { useRouter } from "next/router";
import ItemCardLens from "../components/ItemCardLens";
import ItemCardNews from "../components/ItemCardNews";
import ItemCardTweet from "../components/ItemCardTweet";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const { useAccounts } = hooks;

function Dashboard({ fallback }) {
  const accounts = useAccounts();
  const router = useRouter();
  const session = useContext(AppContext);

  const { data, error } = useSWR("api/timeline", fetcher);

  let user: User = {
    id: "",
    handle: "",
    bio: "",
    name: "",
    picture: "",
    cover_picture: "",
  };

  const { dispatch } = useContext(AppContext);

  async function loadData() {
    fetch(`/api/user/${accounts}`, {
      method: `GET`,
    })
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
    // if (!session.state.token.accessToken) router.push("/");
    loadData();
  }, []);

  if (!session.state.token.accessToken) return <>Please SignIn</>;
  return (
    <SWRConfig value={{ fallback, refreshInterval: 1000 }}>
      {data ? (
        <Box display="flex">
          <Box width="30%">
            <b>Twitter</b>{" "}
            <Box padding="1vw">
              {data.get_tweets ? (
                data.get_tweets?.data?.map((tweet, i) => {
                  if (tweet) {
                    var date = new Date(tweet.tweetLink.data.created_at);
                    return (
                      <div key={i}>
                        <ItemCardTweet
                          key={i}
                          source={tweet.tweetLink.data.source}
                          created_at={date}
                          text={tweet.text}
                          profile_image_url={
                            tweet.tweetLink.data.authorLink.data
                              .profile_image_url
                          }
                          username={
                            tweet.tweetLink.data.authorLink.data.username
                          }
                        />
                        <br />
                      </div>
                    );
                  }
                })
              ) : (
                <>Twitter API Down</>
              )}
            </Box>
          </Box>
          <Box width="40%">
            <b>Lens Posts</b>{" "}
            <Box padding="1vw">
              {data.explorePublications ? (
                data.explorePublications?.items?.map((post, i) => {
                  if (post) {
                    var date = new Date(post.createdAt);
                    return (
                      <div key={i}>
                        <ItemCardLens
                          key={i}
                          appId={post.appId}
                          createdAt={date}
                          description={post.description}
                          content={post.metadata.content}
                          image={post.metadata.image}
                          handle={post.profile.handle}
                          ownedBy={post.profile.ownedBy}
                        />
                        <br />
                      </div>
                    );
                  }
                })
              ) : (
                <>Lens API Down</>
              )}
            </Box>
          </Box>
          <Box width="30%">
            <b>Technology News</b>
            <Box padding="1vw">
              {data.get_technology_headlines_news ? (
                data.get_technology_headlines_news?.articles?.map((news, i) => {
                  if (news) {
                    var date = new Date(news.publishedAt);
                    return (
                      <div key={i}>
                        <ItemCardNews
                          key={i}
                          source={news.source.name}
                          publishedAt={date}
                          description={news.description}
                          content={news.content}
                          image={news.urlToImage}
                          url={news.url}
                        />
                        <br />
                      </div>
                    );
                  }
                })
              ) : (
                <>News API Down</>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <>Loading</>
      )}
    </SWRConfig>
  );
}

Dashboard.layout = true;

export async function getServerSideProps() {
  const timeline = await getTimeline();
  return {
    props: {
      fallback: {
        "api/timeline": timeline,
      },
    },
  };
}

export default Dashboard;
