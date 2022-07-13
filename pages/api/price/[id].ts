import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const price_query = await fetch(`${process.env.STEPZEN_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        get_price(pair: "${req.query.id.toString()}") {
          data {
            amount
            base
            currency
          }
        }
      }
    `,
    }),
  });

  const price = await price_query.json();
  return res.json(price?.data);
});
