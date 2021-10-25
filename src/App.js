import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Header from './header/Header';
import Balance from './balance/Balance';
import Strategies from './features/strategies/Strategies';
const theme = createTheme({
  palette: {
    primary: {
      light: '#e2f1f8',
      main: '#B0BEC5',
      dark: '#808e95',
      contrastText: '#000',
    },
    secondary: {
      light: '#88ffff',
      main: '#4DD0E1',
      dark: '#009faf',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />

        <Box
          sx={{
            width: '100%',
            height: '100%',
            '& > .MuiBox-root > .MuiBox-root': {
              p: 2,
              borderRadius: 0,
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 0,
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header header header header header header header header"
        "balance balance strategies strategies strategies strategies strategies strategies"`,
            }}
          >
            <Box sx={{ gridArea: 'header', height: '15vh', bgcolor: 'primary.light' }}>
              <Header />
            </Box>
            <Box sx={{ gridArea: 'balance', height: '100vh', gridAutoFlow: 'row', bgcolor: 'secondary.light' }}>
              <Balance />
            </Box>
            <Box sx={{ gridArea: 'strategies', height: '100vh', bgcolor: 'info.light' }}>
              <Strategies />
            </Box>
          </Box>
        </Box>


      </div>
    </ThemeProvider>
  );
}

export default App;
