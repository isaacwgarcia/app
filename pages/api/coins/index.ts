import { NextApiRequest, NextApiResponse } from "next";
import { getTopCoins } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const coins = await getTopCoins();
  return res.json(coins.data.get_stats_coins.data.bestCoins);
});
