import { NextApiRequest, NextApiResponse } from "next";
import { getBalance } from "../../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const balance = await getBalance(
    req.query.id.toString(),
    req.query.chain.toString()
  );
  return res.json(balance);
});
