import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import React from "react";
import Header from "./components/Header/Header";
import Balance from "./components/Balance/Balance";
import StrategiesList from "./features/strategies/StrategiesList";
import walletAPI from "./api/WalletAPI";

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
      <Box
        sx={{
          display: "grid",
          gridTemplateAreas: `"header header"
          "page page"`,
          gridTemplateRows: "1fr 6fr",
          height: "100%",
          pb: 10,
          px: 10,
          width: "100%",
        }}
      >
        <Box sx={{ gridArea: "header" }}>
          <Header />
        </Box>
        {walletAPI.isSignedIn() ? (
          <AuthorizedContent />
        ) : (
          <NotAuthorizedContent />
        )}
      </Box>
    </div>
  </ThemeProvider>
);

const AuthorizedContent: React.FunctionComponent = () => (
  <Box
    sx={{
      borderRadius: "10px",
      display: "grid",
      gridArea: "page",
      gridTemplateAreas: `"balance strategies"`,
      gridTemplateColumns: "3fr 8fr",
      height: "100%",
      overflow: "hidden",
      width: "100%",
    }}
  >
    <Box sx={{ gridArea: "balance" }}>
      <Balance />
    </Box>
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        gridArea: "strategies",
        height: "auto",
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <StrategiesList />
    </Box>
  </Box>
);

const NotAuthorizedContent: React.FunctionComponent = () => (
  <Box
    sx={{
      backgroundColor: "#F8F8F8",
      borderRadius: "10px",
      gridArea: "page",
      height: "100%",
      minHeight: "100%",
      overflow: "hidden",
      overflowY: "auto",
      width: "100%",
    }}
  >
    <StrategiesList />
  </Box>
);

export default App;
