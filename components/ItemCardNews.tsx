import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ItemCardNews({
  source,
  publishedAt,
  description,
  content,
  image,
  url,
}) {
  return (
    <a href={url}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={image ? image : "https://picsum.photos/200"}
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {source} - {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {publishedAt.toString()}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
