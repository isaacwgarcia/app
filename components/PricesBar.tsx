import { Box } from "@mui/material";
import React from "react";
import useSWR from "swr";

export default function PricesBar() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const revalidationOptions = {
    refreshInterval: 1000, //refresh every second
  };

  const data_eth = useSWR("/api/price/ETH-USD", fetcher, revalidationOptions);
  const data_btc = useSWR("/api/price/BTC-USD", fetcher, revalidationOptions);
  const data_matic = useSWR(
    "/api/price/MATIC-USD",
    fetcher,
    revalidationOptions
  );

  return (
    <Box display="flex">
      {data_eth ? (
        <Box padding="0.5rem">ETH ${data_eth.data?.get_price.data.amount} </Box>
      ) : (
        <></>
      )}
      {data_matic ? (
        <Box padding="0.5rem">
          MATIC ${data_matic.data?.get_price.data.amount}{" "}
        </Box>
      ) : (
        <></>
      )}
      {data_btc ? (
        <Box padding="0.5rem">BTC ${data_btc.data?.get_price.data.amount} </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
