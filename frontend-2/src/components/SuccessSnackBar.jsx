import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SuccessSnackBar = ({ message, open, setClose }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      open={open}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
