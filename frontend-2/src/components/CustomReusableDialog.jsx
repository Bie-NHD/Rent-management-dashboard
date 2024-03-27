import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const FORM = "form";
const WARNING = "warning";

const CustomReusableDialog = ({
  open,
  handleClose,
  handleOK,
  dialogContent,
  onSubmit,
  title,
  subtitle = null,
  dialogType,
  okText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={
        dialogType == FORM
          ? {
              component: "form",
              onSubmit: (event) => onSubmit(event),
            }
          : {}
      }
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelText}</Button>
        <Button
          onClick={handleOK}
          type={dialogType == FORM ? "submit" : "button"}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomReusableDialog;
