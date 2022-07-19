import { getPoolInfo, queryTXs } from "../../components/lib/api";
import { FormData } from "../../components/lib/types";
import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import useSWR, { SWRConfig } from "swr";
import Table from "../../components/Table/table";
import ResultTable from "../../components/Table/resultTable";
import LinearProgress from "@mui/material/LinearProgress";

function Pool({ fallback }) {
  const form: FormData = { form_data: {} };
  const [formState, setFormState] = useState(form.form_data);
  const [items, setItems] = useState([]);

  const revalidationOptions = {
    refreshInterval: 10000,
  };
  const API = "../api/pool/";
  const id = fallback.pool_info?.id;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    id ? API + id : API,
    fetcher,
    revalidationOptions
  );

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
  }

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
    <SWRConfig value={{ fallback }}>
      {data ? (
        <Box display="flex" flexDirection="column" height="100vh">
          <b>
            {" "}
            Liquidity Pool {fallback.pool_info.token0.name}/
            {fallback.pool_info.token1.name} {fallback.pool_info.id}
          </b>
          <br /> <br />
          Latest Transactions:
          <Table tableData={data} />
          <br />
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
                  fallback.pool_info.id,
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
          {items.length > 0 ? <ResultTable tableData={items} /> : <></>}
          <br /> <br /> <br /> <br />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </SWRConfig>
  );
}

export const getServerSideProps = async (context) => {
  const txs = await queryTXs(context.params.id);
  const pool_info = await getPoolInfo(context.params.id);

  return {
    props: {
      fallback: {
        pool_info: pool_info,
        "../api/pool": txs,
      },
    },
  };
};

Pool.layout = true;
export default Pool;
