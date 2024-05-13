import createTheme from "@mui/material/styles/createTheme";
import shadows from "@mui/material/styles/shadows";

// Create MUI theme
const muiThemeConfigs = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#391386",
      contrastText: "#fff",
    },
    secondary: {
      main: "#df208f",
    },
    background: {
      default: "#F1F1F1",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {},
    },
    MuiPaper: {
      defaultProps: {},
      styleOverrides: {},
    },
  },
});

export default muiThemeConfigs;
