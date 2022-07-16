import { NextApiRequest, NextApiResponse } from "next";
import { queryTXs } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const txs = await queryTXs(req.query.id.toString());
  return res.json(txs);
});
