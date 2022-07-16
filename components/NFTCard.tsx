import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function NFTCard({ name, url, address, metadata }) {
  let result = { name: "", description: "", metadata: "", image: "" };
  const metadata_json = JSON.parse(metadata);
  const image: string = metadata_json?.image;

  result.name = name;
  result.description = address;
  result.metadata = url;
  result.image = metadata_json?.image;

  if (image?.indexOf("ipfs://") == 0) {
    //IPFS CID
    const val = image.replace("ipfs://", "https://ipfs.infura.io/ipfs/");
    result.image = val;
  }

  if (metadata_json?.image_url) {
    //ENS DOMAIN SERVICE
    result.image = metadata_json.image_url;
  }

  return (
    <Box width="100%" flexDirection="row">
      {result.name}
      {/* {result .description} */}
      {/*  {result.metadata} */}
      {/*  {result.image} */}
      <Card sx={{ maxWidth: 150 }}>
        <CardMedia
          component="img"
          height="90%"
          image={result.image ? result.image : "https://picsum.photos/200"}
        />
      </Card>
      <br />
    </Box>
  );
}
