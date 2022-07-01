import { Box, TextField, Button } from "@mui/material";

function Asset() {
  return (
    <Box width="100%" height="85%" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" width="25%">
        <TextField id="standard-basic" label="Asset" variant="standard" />
        <Button>Search </Button>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box width="50%">Twitter News</Box>
        <Box width="50%">UniSwap Pools</Box>
      </Box>
    </Box>
  );
}
Asset.layout = true;

export default Asset;
