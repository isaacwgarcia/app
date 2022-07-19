import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
export default function BasicTable({ tableData }) {
  const router = useRouter();
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
                    copyTextToClipboard(tx.transaction.id);
                  }}
                  style={{ color: "blue" }}
                >
                  {tx ? tx.transaction.id?.slice(0, 4) : ""}...
                  {tx
                    ? tx.transaction.id?.slice(60, tx.transaction.id.length)
                    : ""}
                </a>
              </TableCell>
              <TableCell>{Number(tx.amountUSD).toFixed(2)}</TableCell>
              <TableCell>
                <a
                  onClick={() => {
                    copyTextToClipboard(tx.transaction.txLink.from_address);
                    router.push(
                      "/address/" + tx.transaction.txLink.from_address
                    );
                  }}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {tx.transaction.txLink?.from_address
                    ? tx.transaction.txLink?.from_address?.slice(0, 6)
                    : ""}
                  ...{" "}
                  {tx.transaction.txLink?.from_address
                    ? tx.transaction.txLink.from_address?.slice(
                        35,
                        tx.transaction.txLink.from_address.length
                      )
                    : ""}
                </a>
              </TableCell>
              <TableCell>
                <a
                  onClick={() => {
                    copyTextToClipboard(tx.transaction.txLink.to_address);
                    router.push("/address/" + tx.transaction.txLink.to_address);
                  }}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {tx.transaction.txLink?.to_address
                    ? tx.transaction.txLink.to_address?.slice(0, 6)
                    : ""}
                  ...
                  {tx.transaction.txLink?.to_address
                    ? tx.transaction.txLink.to_address?.slice(
                        35,
                        tx.transaction.txLink.to_address.length
                      )
                    : ""}
                </a>
              </TableCell>
              <TableCell>{tx.transaction.txLink?.block_timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
