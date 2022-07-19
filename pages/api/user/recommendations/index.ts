import { NextApiRequest, NextApiResponse } from "next";
import { getRecommendedProfiles } from "../../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const profiles = await getRecommendedProfiles();
  return res.json(profiles.data.recommendedProfiles);
});
