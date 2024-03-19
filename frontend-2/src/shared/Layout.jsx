import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <Container
    sx={{
      display: "flex",
      minHeight: "100vh",
      minWidth: "100vw",
    }}
    >
      <SideBar />
      <Container>
        <Outlet/>
      </Container>
    </Container>
  );
};

export default Layout;
