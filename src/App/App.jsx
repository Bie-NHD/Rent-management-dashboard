// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "../router";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../configs/queryClient";
import registerNiceModals from "../configs/registerNiceModal";
import { AuthProvider } from "../context/AuthProvider";
import toastConfigs from "../configs/toastConfigs";
import muiThemeConfigs from "../configs/muiThemeConfigs";
// -----------------------------------------------------

registerNiceModals();

// -----------------------------------------------------

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={muiThemeConfigs}>
          <NiceModal.Provider>
            <RouterProvider router={router} />
            <Toaster toastOptions={toastConfigs} />
          </NiceModal.Provider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
