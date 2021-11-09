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
          justifyContent: "center",
          overflow: "hidden",
          pb: 10,
          px: 5,
          width: "100%",
        }}
      >
        <Box sx={{ gridArea: "header", maxWidth: 1380 }}>
          <Header />
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            display: "flex",
            gridArea: "page",
            height: "100%",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {walletAPI.isSignedIn() ? (
            <AuthorizedContent />
          ) : (
            <NotAuthorizedContent />
          )}
        </Box>
      </Box>
    </div>
  </ThemeProvider>
);

const AuthorizedContent: React.FunctionComponent = () => (
  <>
    <Box
      sx={{
        backgroundColor: "#0097A7",
        borderBottomLeftRadius: "10px",
        borderTopLeftRadius: "10px",
        height: "auto",
        maxHeight: "100%",
        maxWidth: 420,
        minWidth: 360,
        overflow: "hidden",
        px: 5,
        py: 8,
      }}
    >
      <Balance />
    </Box>
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        borderBottomRightRadius: "10px",
        borderTopRightRadius: "10px",
        height: "auto",
        maxHeight: "100%",
        maxWidth: 960,
        minWidth: 520,
        overflowY: "auto",
        px: 5,
        py: 4,
      }}
    >
      <StrategiesList />
    </Box>
  </>
);

const NotAuthorizedContent: React.FunctionComponent = () => (
  <Box
    sx={{
      backgroundColor: "#F8F8F8",
      borderRadius: "10px",
      gridArea: "page",
      height: "auto",
      maxHeight: "100%",
      maxWidth: 960,
      minWidth: 520,
      overflowY: "auto",
      px: 5,
      py: 4,
    }}
  >
    <StrategiesList />
  </Box>
);

export default App;
