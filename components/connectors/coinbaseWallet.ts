import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";
import { URLS } from "../chains";

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    // @ts-ignore: TS2345
    new CoinbaseWallet(actions, {
      url: URLS[1][0],
      appName: "StepZenData",
    })
);
