import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {string} importType
 */

const ImportButton = ({ importType }) => {
  return (
    <Button
      variant="contained"
      component={Link}
      to={`/import${importType}`}
      sx={{
        boxShadow: "none",
        alignSelf: "flex-end",
      }}
    >
      Import
    </Button>
  );
};

export default ImportButton;
