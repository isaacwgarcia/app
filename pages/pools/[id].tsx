import { getPoolInfo, queryTXs } from "../../components/lib/api";
import styles from "../../styles/Home.module.css";
import { Transaction } from "../../components/lib/types";
import dynamic from "next/dynamic";
import { Input, Button } from "@mui/material";

const Table = dynamic(() => import("../../components/Table/table"), {
  ssr: false,
});
const headersTable = ["Transaction ID", "amount USD", "From", "To", "At"];

function Pool(props) {
  let dataTable: any[] = [];

  let pool_id;
  let pool_token0;
  let pool_token1;

  const txs = props.txs as Transaction[];
  if (props.pool_info) {
    pool_id = props.pool_info.id;
    pool_token0 = props.pool_info.token0.name;
    pool_token1 = props.pool_info.token1.name;
  }
  async function fillData(txs) {
    txs?.map((tx) => {
      let txData = {
        transaction_hash: tx.transaction.id,
        amount: tx.amountUSD,
        from: tx.transaction.txLink.from_address,
        to: tx.transaction.txLink.to_address,
        block_timestamp: tx.transaction.txLink.block_timestamp,
      };

      if (tx.amountUSD > 0) dataTable.push(txData);
    });
  }

  fillData(txs);

  return (
    <div className={styles.container}>
      <b> {pool_id}</b>
      <br />
      <br /> {pool_token0}/{pool_token1}
      <br />
      <br />
      Latest Transactions:
      <br />
      <Table tableHead={headersTable} tableData={dataTable} /> <br />
      <br />
      Minimum amount
      <br />
      <Input /> <Button>Search</Button>
      {/*  <Table tableHead={headersTable} tableData={dataTable} /> */}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "0x5777d92f208679db4b9778590fa3cab3ac9e2168" } }],
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  const txs = await queryTXs(context.params.id);
  const pool_info = await getPoolInfo(context.params.id);

  return {
    props: {
      txs: txs,
      pool_info: pool_info,
    },
    revalidate: 10, // In seconds
  };
};

Pool.layout = true;
export default Pool;
