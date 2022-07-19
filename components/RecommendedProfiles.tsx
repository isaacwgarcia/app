import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

function Item(props) {
  const router = useRouter();
  return (
    <Paper>
      <a
        onClick={() => {
          router.push("/address/" + props?.item?.ownedBy);
        }}
        style={{ color: "blue", cursor: "pointer" }}
      >
        <Card sx={{ maxWidth: 345 }} elevation={20}>
          <CardMedia
            onError={(e) => {
              e.target.src = "/images/error_loading_image.png";
            }}
            component="img"
            height="250"
            image={
              props?.item?.picture?.original?.url
                ? props?.item?.picture?.original?.url
                : "/images/error_loading_image.png"
            }
            alt={props?.item?.handle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              @{props?.item?.handle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props?.item?.bio}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Paper>
  );
}

export default function RecommendedProfiles() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/user/recommendations")
      .then((res) => res.json())
      .then((data) => {
        setData(data as unknown as []);
      });
  }, []);

  return (
    <div>
      Recommended Profiles
      <br /> <br />
      {data ? (
        <Carousel
          height="35vh"
          autoPlay={true}
          animation="fade"
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
