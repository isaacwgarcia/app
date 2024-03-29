import React from "react";
import { Box } from "@mui/material";
import { getTimeline } from "../components/lib/api";
import ItemCardLens from "../components/ItemCardLens";
import ItemCardNews from "../components/ItemCardNews";
import ItemCardTweet from "../components/ItemCardTweet";
import useSWR, { SWRConfig } from "swr";
import LinearProgress from "@mui/material/LinearProgress";

function Dashboard({ fallback }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const revalidationOptions = {
    refreshInterval: 20000, //refresh every 20 seconds
  };

  const { data } = useSWR("api/timeline", fetcher, revalidationOptions);

  return (
    <SWRConfig value={{ fallback }}>
      {data ? (
        <Box display="flex">
          <Box width="30%">
            <b>Twitter</b>{" "}
            <Box padding="1vw">
              {data.get_tweets ? (
                data.get_tweets?.data?.map((tweet, i) => {
                  if (tweet) {
                    var date = new Date(tweet.tweetLink?.data.created_at);
                    return (
                      <div key={i}>
                        <ItemCardTweet
                          key={i}
                          source={tweet.tweetLink?.data.source}
                          created_at={date}
                          text={tweet.text}
                          profile_image_url={
                            tweet.tweetLink?.data.authorLink.data
                              .profile_image_url
                          }
                          username={
                            tweet.tweetLink?.data.authorLink.data.username
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
        <Box sx={{ width: "100%" }} mt="25%">
          <LinearProgress />
        </Box>
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
