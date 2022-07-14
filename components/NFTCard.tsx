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
  let result: Result = { name: "", description: "", image: "" };
  let image_json = "";

  if (url_string.length > 1000) {
    json = Buffer.from(url_string.substring(29), "base64").toString();
    result = JSON.parse(json);

    image_json = Buffer.from(
      (result as unknown as Result).image.substring(25),
      "base64"
    ).toString();
  } else {
    result.name = name;
    result.description = address;
    result.image = url;
  }

  return (
    <Box width="100%">
      <>
        {(result as unknown as Result).name}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {(result as unknown as Result).description}
        <br />
      </>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {/*   <Image src={image_json} height={30} width={30} /> */}
      &nbsp;&nbsp;&nbsp;&nbsp;
    </Box>
  );
}
