import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../components/state/context";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

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
        <br />
        Data platform for DeFi investors / analysts
        <Box display="flex">
          <Image
            src="https://stepzen.com/images/logo.svg"
            width="200%"
            height="100%"
            priority={true}
            alt="Stepzen Logo"
          />
        </Box>
        <Box display="flex">
          <Box>
            <Image
              src="/images/moralis_logo.png"
              width="75%"
              height="75%"
              priority={true}
              alt="Moralis Logo"
            />
          </Box>
          <Box>
            <Image
              src="/images/graph_logo.jpeg"
              width="75%"
              height="75%"
              priority={true}
              alt="TheGraph Logo"
            />
          </Box>
          <Box border={1} borderRadius={2} borderBottom={0} borderTop={0}>
            <Image
              src="/images/lens_logo.png"
              width="50%"
              height="50%"
              priority={true}
              alt="Lens Protocol Logo"
            />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        bgcolor="black"
      >
        <Box
          style={{
            color: "white",
            fontWeight: "bold",
            textShadow: "2px 2px 4px black",
            lineHeight: "1.5",
            textTransform: "uppercase",
            letterSpacing: "0.2rem",
          }}
        >
          &nbsp;
          <a href={"https://www.github.com/isaacwgarcia"}>
            <GithubIcon style={{ fontSize: "2.5vw" }} />
          </a>
          &nbsp;
          <a href={"https://twitter.com/isaacwgarcia"}>
            <TwitterIcon style={{ fontSize: "2.5vw" }} />
          </a>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
