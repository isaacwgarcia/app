import { createNoSubstitutionTemplateLiteral } from "typescript";
import { APIConnection } from "../../stepzen/stepzenTypes";

async function fetchAPI(query: any, { variables }: APIConnection = {}) {
  const headers = {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${process.env.STEPZEN_API_URL}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function queryTXs(id) {
  try {
    const moralis_query = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          list_of_transactions_pool(address: "${id}", apikey: "${process.env.STEPZEN_MORALIS_API_KEY}") {
            cursor
            page
            result {
              transaction_hash
              txLink {
                swaps {
                  amount0
                  amount1
                  amountUSD
                }
              }
            }
          }
        }
      `,
      }),
    });

    const values = await moralis_query.json();

    return values?.data.list_of_transactions_pool;
  } catch (e) {
    return e.message;
  }
}

export async function getPools() {
  try {
    const pools_query = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          pools(first: 10, orderBy: "volumeUSD", orderDirection: "desc") {
            volumeUSD
            id
            token0 {
              name
            }
            token1 {
              name
            }
          }
        }
        
        
        
      `,
      }),
    });

    const values = await pools_query.json();
    return values?.data.pools;
  } catch (e) {
    return e.message;
  }
}
