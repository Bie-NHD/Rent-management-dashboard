import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {string} importType
 */

const ImportButton = ( {importType} ) => {
  return <Box 
  component={Link} 
  to={`/import${importType}`}
  sx={{

  }}>
    Import
  </Box>
};

export default ImportButton;
