import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getPrice } from "./lib/api";

export default function PricesBar() {
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
      await getPrice("MATIC-USD").then((res) => {
        return res.get_price.data.amount;
      })
    );
    setLtc(
      await getPrice("BTC-USD").then((res) => {
        return res.get_price.data.amount;
      })
    );
    setLoaded(true);
  }
  useEffect(() => {
    const interval = setInterval(() => prices(), 10000); //Update in 10 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box display="flex">
      <Box padding="0.5rem">ETH ${eth} </Box>
      <Box padding="0.5rem">MATIC ${btc} </Box>
      <Box padding="0.5rem">BTC ${ltc} </Box>
    </Box>
  );
}
