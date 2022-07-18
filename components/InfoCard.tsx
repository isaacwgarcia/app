import { Box } from "@mui/material";
import React, { useContext } from "react";
import { hooks } from "./connectors/coinbaseWallet";
import { AppContext } from "../components/state/context";
import { Avatar } from "@nextui-org/react";
import FlareIcon from "@mui/icons-material/Flare";
const { useAccounts } = hooks;

export default function InfoCard() {
  const session = useContext(AppContext);
  const accounts = useAccounts();

  return (
    <Box width="90%">
      <Box
        padding={2}
        overflow="true"
        fontSize="0.8rem"
        bgcolor="#140035"
        borderRadius={3}
        color="white"
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {session.state.token.accessToken !== "" ? (
            <>
              <Avatar
                squared
                src={session.state.user.picture as string}
                size="xl"
              />
              <Box width="50%" fontSize="0.8rem">
                {session.state.user.name} <br />@{session.state.user.handle}
                <br />
              </Box>
            </>
          ) : (
            <Box display="flex" justifyContent="center">
              <FlareIcon />
              &nbsp;&nbsp;Please sign In
            </Box>
          )}
          <h6>
            {session.state.token.accessToken !== "" ? (
              <b>{accounts} </b>
            ) : (
              <></>
            )}
          </h6>
        </Box>
      </Box>
    </Box>
  );
}
