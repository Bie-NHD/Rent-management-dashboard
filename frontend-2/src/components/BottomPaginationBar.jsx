import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

const BottomPaginationBar = ({
  totalPages,
  onPaginationChange,
  pageSizeOptions,
  onPageSizeChange,
}) => {
  return (
    <Container
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Box
        component={FormControl}
        sx={{ marginInline: 1, minWidth: 120 }}
        size="small"
      >
        <InputLabel id="page-size-label">Page Size</InputLabel>
        <Select
          labelId="page-size-label"
          label="Page Size"
          defaultValue={pageSizeOptions[1]}
          onChange={(e) => onPageSizeChange(e)}
        >
          {pageSizeOptions.map((item) => (
            <MenuItem key={`menu-item-${item}`} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Pagination
        onChange={(e, p) => onPaginationChange(e, p)}
        count={totalPages}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
};
export default BottomPaginationBar;
