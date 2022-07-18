import { getBalance, getNfts } from "../../components/lib/api";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import NFTCard from "../../components/NFTCard";
import { formatEther } from "ethers/lib/utils";
import { useState, useEffect } from "react";

function Address(props) {
  return (
    <>
      {props ? (
        <Box display="flex" flexDirection="column" height="100vh">
          <Box display="flex" flexDirection="column" width="100%">
            <Box>
              <b>Balance</b> <br />
              <br />
              {formatEther(props?.balance?.get_balance?.balance).toString()} Ξ
            </Box>
            {
              <Box height="100vh">
                <br /> <br />
                <b>NFTs</b>
                <br /> <br />
                <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  justifyContent="space-around"
                  flexWrap="wrap"
                >
                  {props.list_nfts.list_nft?.result?.map((nft, index) => {
                    return (
                      <NFTCard
                        key={index}
                        name={nft.name}
                        url={nft.token_uri ? nft.token_uri : ""}
                        address={nft.token_address}
                        metadata={nft.metadata}
                      />
                    );
                  })}
                </Box>
              </Box>
            }
          </Box>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const list_nfts = await getNfts(context.params.id, "eth");
  const balance = await getBalance(context.params.id, "eth");

  return {
    props: {
      list_nfts,
      balance,
    },
  };
};

Address.layout = true;
export default Address;
