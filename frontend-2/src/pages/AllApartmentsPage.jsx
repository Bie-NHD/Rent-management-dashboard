import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchApartmentsAPI, fetchTestApartment } from "../api";
import { Container, Typography } from "@mui/material";
import ImportButton from "../shared/ImportButton";
import { API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../shared/PageHeader";

const rowHeaders = ["ID", "Address", "Retail Price", "Number of rooms"];

const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);

  React.useEffect(() => {
    // fetchApartmentsAPI().then((data) => setApartments(data.apartments));
    //  fetchTestApartment().then((data)=> setApartments(data.apartments))
    setApartments(fetchTestApartment);
  }, []);

  return (
    <Container>
      <PageHeader>Apartments</PageHeader>
      <ImportButton importType={API_ROUTE_APARMENT} />
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
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.retailPrice}</TableCell>
                <TableCell>{item.numberOfRoom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllApartmentsPage;
