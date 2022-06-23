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

export interface Pool {
  volumeUSD: number;
  id: String;
  token0: Token;
  token1: Token;
}

export interface Token {
  name: String;
}
