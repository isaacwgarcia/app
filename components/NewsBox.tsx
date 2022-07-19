import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Item(props) {
  return props.item.language == "en" ? (
    <Paper>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={props?.item?.link}
        style={{ color: "blue", cursor: "pointer" }}
      >
        <Card sx={{ maxWidth: 345, height: 400 }} elevation={20}>
          <CardMedia
            onError={(e) => {
              e.target.src = "/images/error_loading_image.png";
            }}
            component="img"
            height="120"
            image={
              props?.item?.media
                ? props?.item?.media
                : "/images/error_loading_image.png"
            }
            alt={props?.item?.handle}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props?.item?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props?.item?.excerpt}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Paper>
  ) : (
    <></>
  );
}

export default function NewsBox() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setData(data as unknown as []);
      })
      .catch((e) => {
        console.log("error ", e);
      });
  }, []);

  return (
    <div>
      Latest News
      <br /> <br />
      {data ? (
        <Carousel
          height="60vh"
          autoPlay={true}
          animation="fade"
          duration={3000}
          IndicatorIcon=""
        >
          {data?.map((ma, i) => (
            <Item key={i} item={ma} />
          ))}
        </Carousel>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
