import { NextApiRequest, NextApiResponse } from "next";
import { getProfile } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const profile = await getProfile(req.query.id.toString());
  return res.json(profile);
});
