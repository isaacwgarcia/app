import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ tableData }) {
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TX Hash</TableCell>
            <TableCell align="left">Amount USD</TableCell>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">To</TableCell>
            <TableCell align="left">At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((tx, i) => (
            <TableRow key={i}>
              <TableCell>
                <a
                  onClick={() => {
                    copyTextToClipboard(tx.transaction_hash);
                  }}
                  style={{ color: "blue" }}
                >
                  {tx.transaction_hash ? tx.transaction_hash?.slice(0, 4) : ""}
                  ...
                  {tx.transaction_hash
                    ? tx.transaction_hash?.slice(60, tx.transaction_hash.length)
                    : ""}
                </a>
              </TableCell>
              <TableCell>{Number(tx.amount).toFixed(2)}</TableCell>
              <TableCell>
                <a
                  onClick={() => {
                    copyTextToClipboard(tx.from);
                  }}
                  style={{ color: "blue" }}
                >
                  {tx ? tx.from?.slice(0, 6) : ""}...{" "}
                  {tx ? tx.from?.slice(35, tx.from.length) : ""}
                </a>
              </TableCell>
              <TableCell>
                <a
                  onClick={() => {
                    copyTextToClipboard(tx.to);
                  }}
                  style={{ color: "blue" }}
                >
                  {tx ? tx.to?.slice(0, 6) : ""}...
                  {tx ? tx.to?.slice(35, tx.from.length) : ""}
                </a>
              </TableCell>
              <TableCell>{tx.block_timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
