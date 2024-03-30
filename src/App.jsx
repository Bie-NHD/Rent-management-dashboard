// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { ThemeProvider } from "@emotion/react";
import appTheme from "./utils/themes.js";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
