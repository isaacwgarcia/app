import { getPoolInfo, queryTXs } from "../../components/lib/api";
import { FormData } from "../../components/lib/types";
import { Transaction } from "../../components/lib/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";

const Table = dynamic(() => import("../../components/Table/table"), {
  ssr: false,
});
const ResultTable = dynamic(
  () => import("../../components/Table/resultTable"),
  {
    ssr: false,
  }
);
const headersTable = ["Transaction ID", "amount USD", "From", "To", "At"];

function Pool(props) {
  const data: FormData = { form_data: {} };
  const [formState, setFormState] = useState(data.form_data);
  const [items, setItems] = useState([]);

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
  async function fillDataResults(txs, table) {
    txs?.map((tx) => {
      let txData = {
        transaction_hash: tx.transaction.id,
        amount: tx.amountUSD,
        from: tx.transaction.txLink?.from_address,
        to: tx.transaction.txLink?.to_address,
        block_timestamp: tx.transaction.txLink?.block_timestamp,
      };

      if (tx.amountUSD > 0) table?.push(txData);
    });
    setItems(table);
    //return table;
  }
  async function fillData(txs, table) {
    txs?.map((tx) => {
      let txData = {
        transaction_hash: tx.transaction.id,
        amount: tx.amountUSD,
        from: tx.transaction.txLink?.from_address,
        to: tx.transaction.txLink?.to_address,
        block_timestamp: tx.transaction.txLink?.block_timestamp,
      };

      if (tx.amountUSD > 0) table?.push(txData);
    });
  }

  fillData(txs, dataTable);

  async function getTransactions(pool, min, max, from, to) {
    let resultsTable: any[] = [];
    const options = {
      method: `GET`,
    };
    const txs = await fetch(
      `/api/transactions?pool=${pool}&min=${min}&max=${max}&from=${from}&to=${to}`,
      options
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            return data;
          });
        }
        throw new Error("Api is not available getTransactions ");
      })
      .catch((error) => {
        console.error("Error fetching data getTransactions: ", error);
      });

    await fillDataResults(txs, resultsTable);
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <b>
        {" "}
        Liquidity Pool {pool_token0}/{pool_token1} {pool_id}
      </b>
      <br /> <br />
      Latest Transactions:
      <Table tableHead={headersTable} tableData={dataTable} /> <br />
      <br />
      <Box display="flex">
        {" "}
        Minimum &nbsp;
        <TextField
          id="min_amount"
          label="eg. $10"
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["min_amount"]: ev.target.value,
            })
          }
        />{" "}
        Max &nbsp;
        <TextField
          id="max_amount"
          label="eg. $100000000"
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["max_amount"]: ev.target.value,
            })
          }
        />{" "}
        From &nbsp;
        <TextField
          id="from_address"
          label="eg. 0x..."
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["from_address"]: ev.target.value,
            })
          }
        />{" "}
        To &nbsp;
        <TextField
          id="to_address"
          label="eg. 0x..."
          variant="standard"
          onChange={(ev) =>
            setFormState({
              ...formState,
              ["to_address"]: ev.target.value,
            })
          }
        />
        <Button
          onClick={() => {
            getTransactions(
              pool_id,
              formState.min_amount,
              formState.max_amount,
              formState.from_address,
              formState.to_address
            );
          }}
        >
          Search
        </Button>
      </Box>
      <br /> <br />
      {items.length > 0 ? (
        <ResultTable tableHead={headersTable} tableData={items} />
      ) : (
        <></>
      )}
      <br /> <br /> <br /> <br />
    </Box>
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
  console.log("txs", txs);
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
