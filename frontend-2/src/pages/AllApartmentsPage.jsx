import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { fetchTestApartment } from "../api";

import { API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/ImportButton";
import ExportButton from "../components/ExportButton";
// import { DataGrid } from '@mui/x-data-grid';
import { formatId } from "../utils/stringHelper";
import { fetchApartmentsAPI } from "../api";
import { Box, FormControl } from "@mui/material";

const rowHeaders = ["ID", "Address", "Retail Price", "Number of rooms"];

const pageSizes = [5, 10, 15];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setToTalPages] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[1]);

  React.useEffect(() => {
    console.log(`USEEFFECT: CURRPAGE ${currPage} | TOTALPAGE ${totalPages}`);
    fetchApartmentsAPI(currPage, pageSize).then((data) => {
      setApartments(data.apartments);
      console.log(data.apartments);
      setToTalPages(data.page.totalPages);
    });

    // setApartments(fetchTestApartment);
  }, [currPage, pageSize]);

  return (
    <>
      <PageHeader>Apartments</PageHeader>
      <Container
        sx={{
          display: "flex",
          justifyContent: "end",
          justifyItems: "flex-end",
        }}
      >
        <ImportButton importType={API_ROUTE_APARMENT} />
        <ExportButton exportType={API_ROUTE_APARMENT} />
      </Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {rowHeaders.map((item) => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{formatId(item.id)}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.retailPrice}</TableCell>
                <TableCell>{item.numberOfRoom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            defaultValue={pageSizes[1]}
            onChange={(e) => setPageSize(e.target.value)}
          >
            {pageSizes.map((item) => (
              <MenuItem key={`menu-item-${item}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Pagination
          onChange={(e, p) => setCurrPage((cp) => p - 1)}
          count={totalPages}
          variant="outlined"
          shape="rounded"
        />
      </Container>
    </>
  );
};

export default AllApartmentsPage;
