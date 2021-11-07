import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
import walletAPI from "./api/WalletAPI";
import React from "react";
import Header from "./components/Header/Header";
import Balance from "./components/Balance/Balance";
import StrategiesList from "./features/strategies/StrategiesList";

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#000",
      dark: "#808e95",
      light: "#e2f1f8",
      main: "#B0BEC5",
    },
    secondary: {
      contrastText: "#000",
      dark: "#009faf",
      light: "#88ffff",
      main: "#4DD0E1",
    },
  },
});

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <div
        style={{
          padding: "0px 7.5vw 7.5vh 7.5vw",
        }}
      >
        <div style={{ height: "15vh" }}>
          <Header />
        </div>
        <Stack
          direction="row"
          style={{
            borderRadius: "10px",
            height: "77.5vh",
            overflow: "hidden",
            width: "85vw",
          }}
        >
          {walletAPI.isSignedIn() && (
            <div
              style={{
                backgroundColor: "#0097A7",
                height: "100%",
                maxWidth: 420,
                padding: "65px 38px 65px 38px",
                width: "30%",
              }}
            >
              <Balance />
            </div>
          )}
          <div
            style={{
              backgroundColor: "#F8F8F8",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              boxShadow: "0px 4px 20px rgba(103, 103, 103, 0.25)",
              height: "100%",
              width: walletAPI.isSignedIn() ? "70%" : "100%",
            }}
          >
            <StrategiesList />
          </div>
        </Stack>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
