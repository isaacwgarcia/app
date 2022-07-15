import { getPools } from "../components/lib/api";
import { Pool } from "../components/lib/types";
import dynamic from "next/dynamic";

const TablePool = dynamic(() => import("../components/Table/pools"), {
  ssr: false,
});

function Pools(data) {
  let dataTable: any[] = [];
  const pools = data.data as Pool[];
  async function fillData() {
    pools?.map((pool) => {
      let poolinfo = {
        poolid: pool.id,
        volumeUSD: pool.volumeUSD,
        token0: pool.token0.name,
        token1: pool.token1.name,
      };

      dataTable.push(poolinfo);
    });
  }

  fillData();

  return (
    <>
      <TablePool tableData={dataTable} />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=30"
  );
  const response = await getPools();

  return {
    props: {
      data: response,
    },
  };
}
Pools.layout = true;

export default Pools;
