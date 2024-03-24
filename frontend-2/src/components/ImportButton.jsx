import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/**
 *
 * @param {string} importType
 * @returns
 */
const ImportButton = ({ importType }) => {
  return (
    <Button
      variant="outlined"
      component={Link}
      to={`/import?type=${importType}`}
      sx={{
        boxShadow: "none",
        alignSelf: "flex-end",
        marginInline: ".5rem",
      }}
    >
      Import
    </Button>
  );
};

export default ImportButton;
