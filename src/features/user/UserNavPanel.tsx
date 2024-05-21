import { Button, Container, Link, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import NiceModal from "@ebay/nice-modal-react";
import UserUpdateDialog from "./UserUpdateDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { NM_WARNING } from "../../constants";
import UserUpdateDialogForAdmin from "./UserUpdateDialogForAdmin";
import { WarningDialogProps } from "../../types/props";

const UserNavPanel = () => {
  const { logout } = useAuth();
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const wn_ctnt: WarningDialogProps = {
      title: "Confirm logout?",
    };

    NiceModal.show(NM_WARNING, { props: wn_ctnt }).then(async () => {
      await logout().finally(() => {
        navigate("/login", { replace: true });
      });
    });
  };

  const handleOnClickEdit = () => {
    // NiceModal.show(isAdmin ? UserUpdateDialogForAdmin : UserUpdateDialog, {
    //   user: user,
    // });
    navigate("account/edit", { state: { from: location } });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
      }}>
      <Typography align="center">{user?.fullName}</Typography>
      <Typography align="center">{`@${user?.username}`}</Typography>
      <Typography align="center">{user?.role}</Typography>
      <Button startIcon={<EditIcon />} onClick={handleOnClickEdit}>
        Edit
      </Button>
      <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserNavPanel;
