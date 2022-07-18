import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PricesBar from "./PricesBar";
import { LensToken, User } from "./lib/types";
import { loadToken } from "./state/reducer";
import { useContext } from "react";
import { AppContext } from "../components/state/context";
import { coinbaseWallet, hooks } from "../components/connectors/coinbaseWallet";
import { loadUser } from "../components/state/reducer";

const { useAccounts, useProvider } = hooks;

export default function Navbar() {
  const accounts = useAccounts();
  const provider = useProvider();
  const { dispatch } = useContext(AppContext);
  const context = useContext(AppContext);
  const router = useRouter();

  async function login() {
    coinbaseWallet.activate();

    if (provider) {
      const signer = provider.getSigner();

      const options = {
        method: `GET`,
      };
      const challenge = await fetch(`/api/auth/${accounts}`, options)
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
      const signedMessage = await signer.signMessage(challenge.challenge.text);

      const authenticate = await fetch(
        `/api/auth/${accounts}?signedMessage=${signedMessage}`,
        {
          method: `POST`,
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              return data;
            });
          }
          throw new Error("Api is not available");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });

      const lens_token = authenticate.authenticate as LensToken;
      if (lens_token) {
        await loadData();
        dispatch(loadToken(lens_token));
      }
    } else {
      console.log("Please wait for Coinbase to connect...");
    }
  }

  let user: User = {
    id: "",
    handle: "",
    bio: "",
    name: "",
    picture: "",
    cover_picture: "",
  };

  async function loadData() {
    fetch(`/api/user/${accounts}`, {
      method: `GET`,
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            let handle = data?.profiles?.items[0]?.handle.split(".");
            user.bio = data.profiles.items[0].bio;
            user.id = data.profiles.items[0].id;
            user.handle = handle[0];
            user.name = data.profiles.items[0].name;
            user.cover_picture =
              data.profiles.items[0].coverPicture.original.url;
            user.picture = data.profiles.items[0].picture.original.url;
            dispatch(loadUser(user));
          });
        }
        throw new Error("Api is not available");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  return (
    <>
      <Box
        height="10vh"
        sx={{
          display: "flex",
          position: "block",
          width: "100%",
          top: 0,
          left: 0,
          color: "white",
          background: "black",
          zIndex: "10",
          justifyContent: "flex-end",
        }}
      >
        <Box padding="1rem">
          <PricesBar />
        </Box>

        {context?.state?.token.accessToken ? (
          <></>
        ) : (
          <Box sx={{ padding: "1rem" }}>
            <button
              onClick={() => {
                login();
              }}
            >
              Connect Wallet
            </button>
            <button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Explore mode
            </button>
          </Box>
        )}
      </Box>
    </>
  );
}
