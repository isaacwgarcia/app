import { NextApiRequest, NextApiResponse } from "next";
import { searchAsset } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const asset_results = await searchAsset(req.query.id);
  return res.json(asset_results);
});
