import { NextApiRequest, NextApiResponse } from "next";
import { getNewsCatcher } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const news_catcher = await getNewsCatcher();
  return res.json(news_catcher?.data?.get_newscatcherapi?.articles);
});
