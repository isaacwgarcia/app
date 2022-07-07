import { APIConnection } from "../../stepzen/stepzenTypes";
import { LensToken } from "../lib/types";
import Web3Modal from "web3modal";
import { BigNumber, ethers, utils } from "ethers";
import { coinbaseWallet } from "../connectors/coinbaseWallet";

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

export async function getNfts(address) {
  try {
    const auth = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        {
          list_nft(
            address: "${address}", apikey: "${process.env.STEPZEN_MORALIS_API_KEY}"
          ) {
            cursor
            page
            page_size
            status
            total
            result {
              name
              owner_of
              symbol
              token_address
              token_id
              token_uri
            }
          }
        }
        
        
     
      `,
      }),
    });

    const nfts_response = await auth.json();
    return nfts_response?.data;
  } catch (e) {
    return e.message;
  }
}

export async function getProfile(address) {
  try {
    const profile = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `

        {
          profiles(request: {ownedBy: "${address}"}) {
            items {
              id
              name
              handle
              attributes {
                displayType
                key
                traitType
                value
              }
              coverPicture {
                ... on NftImage {
                  __typename
                  chainId
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                  }
                }
              }
            }
          }
        }
        
    `,
      }),
    });

    const profile_response = await profile.json();
    return profile_response?.data;
  } catch (e) {}
}
