import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { AppContext } from "../components/state/context";
import { useRouter } from "next/router";

function Home() {
  const context = useContext(AppContext);
  const router = useRouter();

  if (context.state.token.accessToken) router.push("/dashboard");
  return (
    <Box bgcolor="black" color="white" sx={{ height: "100vh" }}>
      <Head>
        <title>MoneyTracker</title>
        <meta name="description" content="App created with Stepzen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <Navbar />
      <Box
        height="85vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        fontSize="5vw"
      >
        <br /> <br /> <br />
        Data platform for DeFi investors / analysts
        <br /> <br /> <br />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        color="white"
      >
        Powered by
      </Box>
    </Box>
  );
}

export default Home;
