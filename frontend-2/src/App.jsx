import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import ImportScreen from "./pages/ImportPage";
import SideBar from "./shared/SideBar";
import { Container } from "@mui/material";
import ApartmentPage from "./pages/ApartmentPage";
// import Layout from "./shared/Layout";
import ContractPage from "./pages/ContractPage";
// import ApartmentPage from "./pages/ApartmentPage";

function App() {

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <SideBar />
      {/* <ImportScreen /> */}
      <ApartmentPage />
      {/* <ContractPage/> */}
    </Container>
    // <Layout/>
  );
}

export default App;
