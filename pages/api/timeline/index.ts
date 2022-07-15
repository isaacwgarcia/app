import { NextApiRequest, NextApiResponse } from "next";
import { getTimeline } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const timeline = await getTimeline();
  return res.json(timeline);
});
