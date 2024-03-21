import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MenuAppBar from "./MenuAppBar";

const Layout = () => {
  return (
    <>
        <MenuAppBar/>
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        margin: 0,
        padding: 0,
      }}
      >
      <SideBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        >
        <Outlet />
      </Container>
    </Box>
        </>
  );
};

export default Layout;
