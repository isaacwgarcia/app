import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ tableHead, tableData }) {
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
          {tableData.map((tx, i) => (
            <TableRow key={i}>
              <TableCell>{tx.transaction_hash.slice(0, 10)}...</TableCell>
              <TableCell>{Number(tx.amount).toFixed(2)}</TableCell>
              <TableCell>{tx.from.slice(0, 10)}...</TableCell>
              <TableCell>{tx.to.slice(0, 10)}...</TableCell>
              <TableCell>{tx.block_timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
