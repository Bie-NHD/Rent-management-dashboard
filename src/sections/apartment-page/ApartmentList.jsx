import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { APARTMENTS_HEADERS } from "../../utils/constants";
import { formatId } from "../../utils/stringFormats";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import DeleteButton from "../../components/buttons/DeleteButton";
import { use } from "react";

const ApartmentList = ({ apartments, handleDelete, handleUpdate }) => (
  <Paper sx={{ overflow: "hidden", marginY: "2rem" }}>
    <TableContainer sx={{ maxHeight: "50%" }}>
      <Table
        stickyHeader
        size="small"
        aria-label="sticky table"
        sx={{ minWidth: 650 }}
      >
        <TableHead>
          <TableRow>
            {APARTMENTS_HEADERS.map((item) => (
              <TableCell key={item}> {item}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apartments.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Typography>{formatId(item.id)}</Typography>
              </TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.retailPrice}</TableCell>
              <TableCell>{item.numberOfRoom}</TableCell>
              <TableCell>
                <Button onClick={(e) => handleUpdate(item)}>Update</Button>
                <DeleteButton handleDelete={(e) => handleDelete(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default ApartmentList;
