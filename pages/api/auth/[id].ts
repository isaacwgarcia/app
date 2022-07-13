import { NextApiRequest, NextApiResponse } from "next";
import { generateChallenge, authenticate } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const challenge = await generateChallenge(req.query.id.toString());
    return res.json(challenge);
  })
  .post(async (req, res) => {
    const response = await authenticate(
      req.query.id.toString(),
      req.query.signedMessage.toString()
    );
    return res.json(response);
  });
