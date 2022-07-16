export async function queryTXs(id) {
  try {
    const thegraph_query = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: JSON.stringify({
        query: `
        query MyQuery {
          swaps(
            where: {pool_contains: "${id}"}
            orderBy: "timestamp"
            orderDirection: "desc"
            first:10
          ) {
            amountUSD
            transaction {
              id
              txLink {
                from_address
                to_address
                block_timestamp
              }
            }
          }
        }
        
        
      `,
      }),
    });

    const txs = await thegraph_query.json();
    return txs?.data;
  } catch (e) {
    return e.message;
  }
}

export async function queryTransactionswithParameters(
  pool,
  min,
  max,
  from,
  to
) {
  try {
    const pool_info = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: JSON.stringify({
        query: `
        query MyQuery {
          swaps(
            first: 3
            where: { amountUSD_gt: "${min}", pool_contains:"${pool}" }
            orderBy:"timestamp" orderDirection: "desc"
          ) {
            amountUSD
            transaction {
              id
              txLink {
                from_address
                to_address
                block_timestamp
              }
            }
          }
        }

      `,
      }),
    });

    const info = await pool_info.json();

    return info?.data.swaps;
  } catch (e) {
    return e.message;
  }
}

export async function getTimeline() {
  try {
    const timeline = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: JSON.stringify({
        query: `
        query MyQuery {
          explorePublications(request: {sortCriteria: LATEST}) {
            items {
              ... on Post {
                appId
                createdAt
                metadata {
                  description
                  content
                  image
                }
                profile {
                  handle
                  ownedBy
                }
              }
            }
          }
          get_technology_headlines_news {
            articles {
              content
              description
              publishedAt
              source {
                name
              }
              urlToImage
              url
            }
          }
          get_tweets(query: "ETHEREUM") {
            data {
              id
              tweetLink {
                data {
                  author_id
                  authorLink {
                    data {
                      profile_image_url
                      username
                    }
                  }
                  created_at
                  source
                }
              }
              text
            }
          }
        }
      `,
      }),
    });

    const info = await timeline.json();

    return info?.data;
  } catch (e) {
    return e.message;
  }
}

export async function searchAsset(query) {
  try {
    const asset_results = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: JSON.stringify({
        query: `
        query MyQuery {
          search(request: {query: "${query}", type: PUBLICATION}) {
            ... on PublicationSearchResult {
              __typename
              items {
                ... on Post {
                  id
                  appId
                  createdAt
                  metadata {
                    content
                    image
                  }
                  profile {
                    handle
                    ownedBy
                  }
                }
                ... on Comment {
                  id
                  metadata {
                    content
                    image
                  }
                }
              }
            }
          }
          get_tweets(query: "${query}") {
            data {
              id
              tweetLink {
                data {
                  author_id
                  authorLink {
                    data {
                      profile_image_url
                      username
                    }
                  }
                  created_at
                  source
                }
              }
              text
            }
          }
        }
      `,
      }),
    });

    const assetresults = await asset_results.json();

    return assetresults?.data;
  } catch (e) {
    return e.message;
  }
}

export async function getPoolInfo(id) {
  try {
    const pool_info = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: JSON.stringify({
        query: `
        query MyQuery {
          pool(
            id: "${id}"
            
          ) {
            id
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
          }
        }

      `,
      }),
    });

    const info = await pool_info.json();

    return info?.data.pool;
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
          query {
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

export async function getNfts(address, chain) {
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
            address: "${address}", apikey: "${process.env.STEPZEN_MORALIS_API_KEY}", chain: "${chain}"
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
              metadata
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

export async function exploreLensPublications() {
  const lens_explore_publications = await fetch(
    `${process.env.STEPZEN_API_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          explorePublications(request: {sortCriteria: LATEST}) {
            items {
              ... on Post {
                appId
                createdAt
                metadata {
                  description
                  content
                  image
                }
                profile {
                  handle
                  ownedBy
                }
              }
            }
          }
        }
            
    `,
      }),
    }
  );
  return lens_explore_publications.json();
}

export async function getHeadlinesNewsApi() {
  const headlines_newsapi = await fetch(`${process.env.STEPZEN_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
          get_technology_headlines_news {
            articles {
              content
              description
              publishedAt
              source {
                name
              }
              urlToImage
              url
            }
          }
        }

         

        
        
      
      
    `,
    }),
  });
  return headlines_newsapi.json();
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
              bio
              attributes {
                key
                traitType
                value
              }
              picture {
                ... on MediaSet {
                  original {
                    url
                  }
                }
              }
              coverPicture {
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

export async function getBalance(address, chain) {
  try {
    const balance = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          get_balance(
            address: "${address}", apikey: "${process.env.STEPZEN_MORALIS_API_KEY}", chain: "${chain}"
          ) {
            balance
          }
        }
      `,
      }),
    });

    const price = await balance.json();

    return price?.data;
  } catch (e) {
    return e.message;
  }
}

export async function getTwitterTimeline() {
  try {
    const balance = await fetch(`${process.env.STEPZEN_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          get_tweets(query: "ETHEREUM") {
            data {
              id
              tweetLink {
                data {
                  author_id
                  authorLink {
                    data {
                      profile_image_url
                      username
                    }
                  }
                  created_at
                  source
                }
              }
              text
            }
          }
        }
        
        
      `,
      }),
    });

    const price = await balance.json();

    return price?.data;
  } catch (e) {
    return e.message;
  }
}
