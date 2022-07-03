import { Box, TextField, Button } from "@mui/material";

import { getNfts } from "../components/lib/api";
import { FormData } from "../components/lib/types";
import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";

function FindAddress() {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  const [nfts, setNfts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getListNfts() {
    const list_nfts = await getNfts(formState.ethaddress);
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
          <Box width="25%">Account Balance: </Box>
          <Box width="75%">
            NFTs List:
            {nfts.map((nft, index) => {
              console.log("NFT >>> ", nft);
              return (
                <NFTCard
                  key={index}
                  name={nft.name}
                  url={nft.token_uri ? nft.token_uri : ""}
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
