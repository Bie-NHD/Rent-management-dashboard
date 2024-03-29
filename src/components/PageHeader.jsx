import { Typography } from "@mui/material";
import React from "react";

const PageHeader = ({ children }) => {
  return (
    <Typography variant="h2" gutterBottom marginTop={0.2}>
      {children}
    </Typography>
  );
};

export default PageHeader;
