import { NextApiRequest, NextApiResponse } from "next";
import { queryTransactionswithParameters } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const txs = await queryTransactionswithParameters(
    req.query.pool.toString(),
    req.query.min.toString(),
    req.query.max.toString(),
    req.query.from.toString(),
    req.query.to.toString()
  );

  return res.json(txs);
});
