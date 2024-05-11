// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "../router";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTheme } from "@mui/material";
import queryClient from "../configs/queryClient";
import registerNiceModals from "../configs/registerNiceModal";
import { AuthProvider } from "../context/AuthProvider";
// -----------------------------------------------------

registerNiceModals();

// -----------------------------------------------------

// Create MUI theme
const theme = createTheme({
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
});

// Create theme for Toaster / react-hot-toast

const ToastOptions = {
  success: {
    style: {
      background: "green",
      color: "white",
    },
  },
  error: {
    style: {
      background: "red",
      color: "white",
    },
  },
};

// -----------------------------------------------------

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <NiceModal.Provider>
            <RouterProvider router={router} />
            <Toaster toastOptions={ToastOptions} />
          </NiceModal.Provider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
