import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function PricesBar() {
  const [eth, setEth] = useState(0);
  const [btc, setBtc] = useState(0);
  const [matic, setMatic] = useState(0);

  async function prices() {
    const options = {
      method: `GET`,
    };
    fetch(`/api/price/ETH-USD`, options)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setEth(data.get_price.data.amount);
          });
        }
        throw new Error("Api Price is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    fetch(`/api/price/MATIC-USD`, options)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setMatic(data.get_price.data.amount);
          });
        }
        throw new Error("Api Price is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    fetch(`/api/price/BTC-USD`, options)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setBtc(data.get_price.data.amount);
          });
        }
        throw new Error("Api Price is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  useEffect(() => {
    const interval = setInterval(() => prices(), 1000); //Update in 1 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box display="flex">
      <Box padding="0.5rem">ETH ${eth} </Box>
      <Box padding="0.5rem">MATIC ${matic} </Box>
      <Box padding="0.5rem">BTC ${btc} </Box>
    </Box>
  );
}
