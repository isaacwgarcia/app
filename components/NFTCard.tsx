import React from "react";
import { Box } from "@mui/material";

interface Result {
  name: string;
  description: string;
  image: string;
}
export default function NFTCard({ key, name, url, address }) {
  const url_string = url as string;
  let json = "";
  let result = "";
  let image_json = "";

  if (url_string.length > 1000) {
    json = Buffer.from(url_string.substring(29), "base64").toString();
    result = JSON.parse(json);

    image_json = Buffer.from(
      (result as unknown as Result).image.substring(25),
      "base64"
    ).toString();
  }

  return (
    <Box width="100%" key={key}>
      <>{(result as unknown as Result).name}</>&nbsp;&nbsp;&nbsp;&nbsp;
      {/*   <Image src={image_json} height={30} width={30} /> */}
      &nbsp;&nbsp;&nbsp;&nbsp;
    </Box>
  );
}
