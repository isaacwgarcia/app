## Problem:

One of the most common problems in Web3 is usability. Newcomers can perceive that the enviroment is only about pumps and dumps crypto scams. But the reality is that Web3 is more than the price of a coin, its infraestructure allow us to be connected in a different way. Tokens, NFTS and DAOs are buzzwords during these days let's dive into definitions.

New concepts that we are going to need here are: Public Address, Private Keys. Layer 1's and Layer 2's, Liquidity Pools.
(If you already know this you can skip this part.)

Public Address is like our phone number, you can share it with your friends. That's where you are going to receive or send your funds from.
Private Keys, you need these to sign transactions as money transfers or to verify that is you who is sending the transaction and don't forget if you lose them or share them, you will lose all your funds and data related to the address, there is no central entity that can help you to recover them.
Layer 1 refers to the core arquitecture of blockchain in this case ETHEREUM.
Layer 2 refers to a layer on top of Layer 1, to solve different issues for example: speed and gas fees. eg. Polygon is a EVM Chain Ethereum Virtual Machine.
Liquidity Pools are one of the most important concepts of decentralized finance. It's a place where buyers and sellers can meet to trade assets (coins). The same when you are going to buy a stock, there are buyers and sellers, but you have to wait for the seller to agree with the price. When buyer and seller agree to a price the transactions happens. This doesn't occur in liquidity pools where the price is defined by an algorith inside a smart contract.
There are 3 versions of them. And here we are going to use Uniswap.
v1 was created with the main objective of exchanging coins let's say I have USDC and I want to receive ETH, so I would go to a liquidity pool, to make the exchange. The caveat was that you always needed ETH as a collateral either to buy or sell.
V2s allows us to trade coins without the need of ETH, I can go from USDC to DAI (instead of USDC-ETH > ETH-DAI) or from USDT to WBTC (This is a wrapped token, but we can explain this concept later.)
Now at this point, I can either use the Liquidity to swap my coins or I can provide liquidity to receive a % from all the transactions made there.
V3s was created to be able to set a range for the capital that we provide to the pool. There is a very good explanation here: (https://medium.com/coinmonks/uniswap-v3-explained-57e0cdf86719).

Let's dive into the solution I built...

## Solution

A platform where we can combine Web2 and Web3 data. Stepzen on top of all these techologies made easy and fast the development.

I decided to use Lens Protocol as an entry point to the app to give a Login experience to the user, for this you will need a Coinbase Wallet Extension installed in your browser, and a Lens Profile, you can create it using any of these apps.
(https://lens.xyz/#apps) Hopefully this app can be here soon too!

## Technologies

Web 3.0
Lens Protocol
UniSwap
The Graph
Moralis

Web 2.0
Twitter
NewsApi
Coinbase

## Getting Started

The structure for the project uses NextJs framework and is as follows:

- root
  - components
  - pages
    - api  
      auth API Route to handle Authentication
      price API Route to retrieve prices
      transactions API Route to query transactions
      user API Route to query users
      balance
      nfts
  - stepzen
    config.yaml Define your apiKeys and secret as configurations for your querys
    index.graphql Define your graphql files here
    newsapi.graphql
    rest.graphql
    thegraph.graphql
    twitter.graphql
    .env.local Stepzen Private Key and Endpoint

In the repository you will find a example.env.local and example.config.yaml to use your own keys.

## Getting Started

What can you do with the app?

- Browse Twitter, Lens Protocol and news timeline at the same time.
- Check Owner and App that published information.
- For news you can click on headline.
- Check Liquidity pools
  - Latest Transactions with details (Tx Hash - Amount - Address Sender - Address Receiver - Date and Time) and you can copy them.
  - Browse by minimum amount per transaction. (other filters are not implemented yet.)
- Browse by wallet address
  - Get Wallet Balance
  - Get NFTS (Uniswap Positions, IPFS Hosted, ENS among others)
- Browse by asset
  - Get Timeline about a specific asset from Twitter and from Lens.
