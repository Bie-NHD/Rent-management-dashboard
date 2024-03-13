import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { Route, Router } from "react-router-dom";
import Layout from "./components/shared/Layout";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ImportScreen/>}/>
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
