import { queryTXs } from "../../components/lib/api";
import styles from "../../styles/Home.module.css";
import { Transaction } from "../../components/lib/types";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("../../components/Table/table"), {
  ssr: false,
});
const headersTable = ["Transaction ID", "amount USD"];

function Pool(data) {
  let dataTable: any[] = [];

  const txs = data.data as Transaction[];

  async function fillData(txs) {
    txs?.map((tx) => {
      let txData = {
        transaction_hash: tx.transaction_hash,
        amount: tx.txLink?.swaps[0]?.amountUSD,
      };

      if (txData.amount > 200000) dataTable.push(txData);
    });
  }

  fillData(txs);

  return (
    <div className={styles.container}>
      Pool Name
      <br />
      <br />
      <Table tableHead={headersTable} tableData={dataTable} />
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
  const response = await queryTXs(context.params.id);
  return {
    props: {
      data: response.result,
    },
    revalidate: 3, // In seconds
  };
};

Pool.layout = true;
export default Pool;
