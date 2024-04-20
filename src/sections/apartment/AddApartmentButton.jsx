import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

const AddApartmentButton = () => {
  return (
    <Button
      variant="contained"
      startIcon={<AddCircleIcon />}
      //   onClick={}
    >
      New
    </Button>
  );
};

export default AddApartmentButton;
