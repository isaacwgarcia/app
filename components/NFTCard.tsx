import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function NFTCard({ name, url, address, metadata }) {
  let result = { name: "", description: "", metadata: "", image: "" };
  const metadata_json = JSON.parse(metadata);
  const image: string = metadata_json?.image;

  result.name = name;
  result.description = address; //Token Address
  result.metadata = url;
  result.image = metadata_json?.image;

  if (image?.indexOf("ipfs://") == 0) {
    //IPFS CID
    const val = image.replace("ipfs://", "https://ipfs.infura.io/ipfs/");
    result.image = val;
  }
  if (image?.indexOf("ipfs://ipfs/") == 0) {
    //IPFS CID RARIBLE
    const val = image.replace("ipfs://ipfs/", "https://ipfs.infura.io/ipfs/");
    result.image = val;
  }

  if (metadata_json?.image_url) {
    //ENS DOMAIN SERVICE
    result.image = metadata_json.image_url;
  }

  return (
    <Card sx={{ maxWidth: 200, marginBottom: "5%" }}>
      {/* {result .description} */}
      {/*  {result.image} */}
      {/*  {result.metadata} */}
      <CardMedia
        onError={(e) => {
          e.target.src = "/images/error_loading_image.png";
        }}
        component="img"
        image={result.image ? result.image : "https://picsum.photos/200"}
      />{" "}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {result.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
