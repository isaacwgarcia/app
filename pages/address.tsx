import { Box, TextField, Button } from "@mui/material";

function FindAddress() {
  return (
    <Box width="100%" height="85%" display="flex" justifyContent="center">
      <Box display="flex" flexDirection="column" width="25%">
        <TextField id="standard-basic" label="ETH Address" variant="standard" />
        <Button>Search </Button>
      </Box>
    </Box>
  );
}

FindAddress.layout = true;

export default FindAddress;
