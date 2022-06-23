import { Box } from "@mui/material";
import React, { useState } from "react";
import { getPrice } from "../components/lib/api";

export default function Pricing() {
  //const fetcher = (url) => fetch(url).then((r) => r.json());
  //const { data, error } = useSWR("/api/user/123", fetcher);

  const [loaded, setLoaded] = useState(false);
  const [eth, setEth] = useState(0);
  const [btc, setBtc] = useState(0);
  const [ltc, setLtc] = useState(0);

  async function prices() {
    setEth(
      await getPrice("ETH-USD").then((res) => {
        return res.get_price.data.amount;
      })
    );
    setBtc(
      await getPrice("BTC-USD").then((res) => {
        return res.get_price.data.amount;
      })
    );
    setLtc(
      await getPrice("LTC-USD").then((res) => {
        return res.get_price.data.amount;
      })
    );
    setLoaded(true);
  }
  React.useEffect(() => {
    prices();
  }, [loaded]);

  return (
    <Box display="flex">
      <Box>ETH Price: {eth} </Box>&nbsp;&nbsp;
      <Box>BTC Price: {btc} </Box>&nbsp;&nbsp;
      <Box>LTC Price: {ltc} </Box>
      &nbsp;&nbsp;
    </Box>
  );
}
