import "./Header.css";
import { Box } from "@mui/material";
import walletAPI from "../../api/WalletAPI";
import ProfileItem from "../../login/ProfileItem";
import React from "react";
import ConnectWallet from "../ConnectWallet/ConnectWallet";

const Header: React.FunctionComponent = () => (
  <Box
    style={{
      alignItems: "center",
      display: "flex",
      height: 100,
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        color: "#FFFFFF",
        fontSize: "36px",
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: "26px",
        opacity: 0.3,
      }}
    >
      Depositium
    </div>
    <Box>{walletAPI.isSignedIn() ? <ProfileItem /> : <ConnectWallet />}</Box>
  </Box>
);

export default React.memo(Header);
