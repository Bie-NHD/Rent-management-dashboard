import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ErrorPlaceHolder = ({ onClick }) => (
  <Box>
    <h2>Something is wrong</h2>
    <p>Please reload the page</p>
    <Button variant="outlined" onClick={() => onClick()}>
      Reload
    </Button>
  </Box>
);
export default ErrorPlaceHolder;
