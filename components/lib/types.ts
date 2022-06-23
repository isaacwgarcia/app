export interface Swap {
  amount0: String;
  amount1: String;
  amountUSD: String;
  id: String;
  sqrtPriceX96: String;
  tick: String;
}

export interface Transaction {
  transaction_hash: String;
  txLink: Link;
}

export interface Link {
  swaps: Swap[];
}
