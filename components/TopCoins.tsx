import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function TopCoins() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/coins")
      .then((res) => res.json())
      .then((data) => {
        setData(data as unknown as []);
      });
  }, []);
  return (
    <div>
      TOP COINS
      <br /> <br />
      {data ? (
        data.map((coin, i) => (
          <Box key={i}>
            <b>
              {coin?.detail_coin?.data?.coins[0]?.symbol}&nbsp;{coin.name}
            </b>
            &nbsp; $
            {Number(coin?.detail_coin?.data?.coins[0]?.price).toFixed(2)}
            &nbsp;
            {coin?.detail_coin?.data?.coins[0]?.change}%
          </Box>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
