import "./Header.css";
import { Box } from "@mui/material";
import walletAPI from "../../api/WalletAPI";
import ProfileItem from "../../login/ProfileItem";
import React from "react";
import ConnectWallet from "../ConnectWallet/ConnectWallet";

const Header: React.FunctionComponent = () => (
  <div className="Header">
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
  </div>
);

export default React.memo(Header);
