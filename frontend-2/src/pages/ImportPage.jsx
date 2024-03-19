import {
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";

const ImportPage = () => {
  const importType = useLoaderData();

  console.log(importType);

  return (
    <Container
      sx={{
        display: "flex",
      }}
    >
      <TableContainer
        sx={{
          alignSelf: "center",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ImportPage;
export const loader = async ({ params }) => params.importType;
