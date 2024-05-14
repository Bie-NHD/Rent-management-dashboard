import { Button, Container, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

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
      <Button variant="outlined" onClick={() => logout()}>
        Logout
      </Button>
    </Container>
  ) : (
    <></>
  );
};

export default UserNavPanel;
