// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { ThemeProvider } from "@emotion/react";
import appTheme from "./constants/muiTheme.js";
import { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import toastOptions from "./constants/toastOptions.js";
import muiTheme from "./constants/muiTheme.js";
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <NiceModal.Provider>
          <RouterProvider router={router} />
          <Box component={Toaster} toastOptions={toastOptions} />
        </NiceModal.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
