import { Box, TextField, Button } from "@mui/material";
import { FormData } from "../components/lib/types";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import ItemCardLens from "../components/ItemCardLens";
import ItemCardTweet from "../components/ItemCardTweet";
function Asset() {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [lensitems, setLensitems] = useState([]);

  async function getResults() {
    setLoading(true);
    const results = await fetch(`/api/timeline/${formState.asset}`, {
      method: `GET`,
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setLoading(false);
            return data;
          });
        }
        throw new Error("Api is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    setTweets(results.get_tweets.data);
    setLensitems(results.search.items);
    setLoaded(true);
  }

  useEffect(() => {}, [loaded]);
  return (
    <Box width="100%" height="85%" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" width="25%">
        <TextField
          id="standard-basic"
          label="Asset"
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["asset"]: ev.target.value,
            })
          }
        />
        <Button
          onClick={() => {
            getResults();
          }}
        >
          Search{" "}
        </Button>
      </Box>
      <Box display="flex" flexDirection="row">
        {loaded ? (
          <>
            <Box width="50%">
              <b>Twitter</b>
              <Box padding="1vw">
                {tweets ? (
                  tweets.map((tweet, i) => {
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
            <Box width="50%">
              <b>Lens</b>
              <Box padding="1vw">
                {lensitems ? (
                  lensitems.map((post, i) => {
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
                            handle={
                              post.profile?.handle ? post.profile.handle : ""
                            }
                            ownedBy={
                              post.profile?.ownedBy ? post.profile?.ownedBy : ""
                            }
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
          </>
        ) : loading ? (
          <LinearProgress />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
Asset.layout = true;

export default Asset;
