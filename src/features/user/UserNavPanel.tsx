import { Button, Container, Link, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";

const UserNavPanel = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  return user ? (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
      }}
    >
      <Typography align="center">{user.fullName}</Typography>
      <Typography align="center">{`@${user.username}`}</Typography>
      <Typography align="center">{user?.role}</Typography>
      <Button LinkComponent={Link} startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={() => logout()}>
        Logout
      </Button>
    </Container>
  ) : (
    <></>
  );
};

export default UserNavPanel;
