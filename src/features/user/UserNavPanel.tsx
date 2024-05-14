import { Button, Container, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

const UserNavPanel = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  console.log(`user in UserPanel ${JSON.stringify(user)}`);

  return user ? (
    <Container>
      <Typography>{user?.role}</Typography>
      <Button variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </Container>
  ) : (
    <></>
  );
};

export default UserNavPanel;
