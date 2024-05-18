import { Button, Container, Link, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import NiceModal from "@ebay/nice-modal-react";
import UserUpdateDialog from "./UserUpdateDialog";
import { useNavigate } from "react-router-dom";

const UserNavPanel = () => {
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout().finally(() => {
      navigate("/login", { replace: true });
    });
  };

  const handleOnClickEdit = () => {
    NiceModal.show(UserUpdateDialog, {
      user: {
        username: user?.username!,
        email: user?.email!,
        role: user?.role!,
        active: user?.active!,
        id: user?.id!,
        createDate: user?.createDate!,
      },
    });
  };

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
      <Button startIcon={<EditIcon />} onClick={handleOnClickEdit}>
        Edit
      </Button>
      <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  ) : (
    <></>
  );
};

export default UserNavPanel;
