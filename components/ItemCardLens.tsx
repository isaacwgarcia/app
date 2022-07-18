import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function ItemCardLens({
  appId,
  createdAt,
  description,
  content,
  image,
  handle,
  ownedBy,
}) {
  const router = useRouter();
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image ? image : "https://picsum.photos/200"}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {appId} - {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {handle}&nbsp;
          <a
            onClick={() => {
              copyTextToClipboard(ownedBy);
              router.push("/address/" + ownedBy);
            }}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {ownedBy ? ownedBy?.slice(0, 4) : ""}...
            {ownedBy ? ownedBy?.slice(30, ownedBy.length) : ""}
          </a>
          <br />
          {createdAt.toString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
