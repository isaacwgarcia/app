import { NextApiRequest, NextApiResponse } from "next";
import { getNfts } from "../../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const list_nfts = await getNfts(
    req.query.id.toString(),
    req.query.chain.toString()
  );
  return res.json(list_nfts);
});
