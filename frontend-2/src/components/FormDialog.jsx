import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const FormDialog = ({
  open,
  setClose,
  formContent,
  onSubmit,
  title,
  subtitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={setClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => onSubmit(event),
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        {formContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={setClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
