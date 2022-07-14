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
  getTwitterTimeline,
} from "../components/lib/api";
import { useRouter } from "next/router";
import ItemCardLens from "../components/ItemCardLens";
import ItemCardNews from "../components/ItemCardNews";
import ItemCardTweet from "../components/ItemCardTweet";

const { useAccounts } = hooks;

function Dashboard(props) {
  const router = useRouter();
  const session = useContext(AppContext);

  const lens_publications =
    props.lens_publications.data.explorePublications.items;

  const newsapi_articles =
    props.news.data.get_technology_headlines_news.articles;

  const twitter_timeline = props.twitter_timeline.get_tweets.data;

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
      <Box width="30%">
        <b>Twitter</b>{" "}
        <Box padding="1vw">
          {twitter_timeline.map((tweet, i) => {
            if (tweet) {
              var date = new Date(tweet.tweetLink.data.created_at);
              return (
                <>
                  <ItemCardTweet
                    key={i}
                    source={tweet.tweetLink.data.source}
                    created_at={date}
                    text={tweet.text}
                    profile_image_url={
                      tweet.tweetLink.data.authorLink.data.profile_image_url
                    }
                    username={tweet.tweetLink.data.authorLink.data.username}
                  />
                  <br />
                </>
              );
            }
          })}
        </Box>
      </Box>
      <Box width="40%">
        <b>Lens Posts</b>{" "}
        <Box padding="1vw">
          {lens_publications.map((post, i) => {
            if (post) {
              var date = new Date(post.createdAt);
              return (
                <>
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
                </>
              );
            }
          })}
        </Box>
      </Box>
      <Box width="30%">
        <b>Technology News</b>
        <Box padding="1vw">
          {newsapi_articles.map((news, i) => {
            if (news) {
              var date = new Date(news.publishedAt);
              return (
                <>
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
                </>
              );
            }
          })}
        </Box>
      </Box>
    </Box>
  );
}

Dashboard.layout = true;

export async function getStaticProps() {
  let publications = await exploreLensPublications();
  let news_headlines = await getHeadlinesNewsApi();
  let twitter_timeline = await getTwitterTimeline();

  return {
    props: {
      lens_publications: publications,
      news: news_headlines,
      twitter_timeline: twitter_timeline,
    },
    revalidate: 5, // In seconds
  };
}

export default Dashboard;
