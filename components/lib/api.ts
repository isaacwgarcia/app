import { APIConnection } from "../../stepzen/stepzenTypes";
import { LensToken } from "../lib/types";
import Web3Modal from "web3modal";
import { BigNumber, ethers, utils } from "ethers";

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

export async function getPrice(id) {
  try {
    const price_query = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          get_price(pair: "${id}") {
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

    return price?.data;
  } catch (e) {
    return e.message;
  }
}

export async function generateChallenge(address) {
  try {
    const challenge = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
          query TestQuery {
            challenge(
                request: {address: "${address}"}
              ) {
            text
              }  
          }
     
      `,
      }),
    });

    const challengeText = await challenge.json();
    return challengeText?.data;
  } catch (e) {
    return e.message;
  }
}

export async function authenticate(address, signature) {
  try {
    const auth = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
         mutation { 
            authenticate(request: {address: "${address}",signature:"${signature}"}) {
              accessToken
              refreshToken
            }
          }
     
      `,
      }),
    });

    const authResponse = await auth.json();
    return authResponse?.data;
  } catch (e) {
    return e.message;
  }
}

export async function auth(): Promise<LensToken | boolean> {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    const address = accounts[0];
    const signer = provider.getSigner();
    const challenge = await generateChallenge(address);
    const signedMessage = await signer.signMessage(challenge.challenge.text);
    const response = await authenticate(address, signedMessage);

    return response.authenticate;
  } catch (e) {
    console.log("e ", e);
    return false;
  }
}
