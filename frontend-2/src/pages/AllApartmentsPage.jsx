import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchApartmentsAPI, fetchTestApartment } from "../api";
import { Box, Container, Typography } from "@mui/material";
import ImportButton from "../shared/ImportButton";
import { API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../shared/PageHeader";
import ExportButton from "../shared/ExportButton";
import { formatId } from "../utils/stringHelper";

const rowHeaders = ["ID", "Address", "Retail Price", "Number of rooms"];

const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);

  React.useEffect(() => {
    // fetchApartmentsAPI().then((data) => setApartments(data.apartments));
    //  fetchTestApartment().then((data)=> setApartments(data.apartments))
    setApartments(fetchTestApartment);
  }, []);

  return (
    <>
      <PageHeader>Apartments</PageHeader>
      <Container sx={{
        display: "flex",
        justifyContent: "end",
        justifyItems: "flex-end"
        
      }}>

      <ExportButton exportType={API_ROUTE_APARMENT}/>
      <ImportButton importType={API_ROUTE_APARMENT} />
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
