import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchTestApartment } from "../api";
import { Container } from "@mui/material";
import ImportButton from "../shared/ImportButton";
import { API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../shared/PageHeader";
import ExportButton from "../shared/ExportButton";
// import { DataGrid } from '@mui/x-data-grid';
import { formatId } from "../utils/stringHelper";
import { fetchApartmentsAPI } from "../api";

const rowHeaders = ["ID", "Address", "Retail Price", "Number of rooms"];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setToTalPages] = useState(1);

  React.useEffect(() => {
    fetchApartmentsAPI().then((data) => {
      setApartments(data.apartments);
      //   const page = data.page;

      //   if (totalPages != page.totalPages) {
      //     setToTalPages(page.totalPages);
      //   }

      //   setCurrPage(page.pageNumber);
    });

    // setApartments(fetchTestApartment);
  }, [currPage]);

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
    </>
  );
};

export default AllApartmentsPage;
