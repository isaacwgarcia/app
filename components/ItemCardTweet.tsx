import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar } from "@nextui-org/react";

export default function ItemCardTweet({
  source,
  username,
  profile_image_url,
  created_at,
  text,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Avatar rounded src={profile_image_url as string} />{" "}
        <Typography gutterBottom variant="body2" component="div">
          {source} - @{username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {created_at.toString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
