import { Box, TextField, Button } from "@mui/material";

import { FormData } from "../components/lib/types";
import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";

function FindAddress() {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  const [nfts, setNfts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getListNfts() {
    // const list_nfts = await getNfts(formState.ethaddress);

    const list_nfts = await fetch(
      `/api/user/nfts/${formState.ethaddress}?chain=eth`,
      {
        method: `GET`,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            return data;
          });
        }
        throw new Error("Api is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    setNfts(list_nfts.list_nft.result);
    setLoaded(true);
  }

  useEffect(() => {}, [loaded]);

  return (
    <Box width="100%" height="85%" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" width="25%">
        <TextField
          id="standard-basic"
          label="ETH Address"
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["ethaddress"]: ev.target.value,
            })
          }
        />
        <Button
          onClick={() => {
            getListNfts();
          }}
        >
          Search{" "}
        </Button>
      </Box>
      <br />
      <br />
      {loaded ? (
        <Box display="flex" flexDirection="column" width="100%">
          <Box width="25%">Account Balance: Call Balance API</Box>
          <Box width="75%">
            NFTs List:
            {nfts.map((nft, index) => {
              return (
                <NFTCard
                  key={index}
                  name={nft.name}
                  url={nft.token_uri ? nft.token_uri : "empty"}
                  address={nft.token_address}
                />
              );
            })}
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

FindAddress.layout = true;

export default FindAddress;
