import { Typography } from "@mui/material";
import React from "react";

const PageHeader = () => {
  const pageHeader: string = (() => {
    const location = window.location.pathname.slice(1);

    return location.at(0)?.toUpperCase() + location.substring(1).toLowerCase();
  })();
  return (
    <Typography variant="h2" gutterBottom>
      {pageHeader}
    </Typography>
  );
};

export default PageHeader;
