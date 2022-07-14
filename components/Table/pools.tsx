import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

export default function PoolTable({ tableData }) {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Pool Address</b>
            </TableCell>
            <TableCell align="left">
              <b>Token Pair</b>
            </TableCell>
            <TableCell align="left">
              <b>volumeUSD</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((pool, i) => (
            <TableRow key={i}>
              <TableCell>
                <a
                  onClick={() => {
                    router.push("/pools/" + `${pool.poolid}`);
                  }}
                >
                  {pool.poolid}
                </a>
              </TableCell>
              <TableCell>
                {pool.token0}/{pool.token1}
              </TableCell>
              <TableCell>{Number(pool.volumeUSD).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
