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
import BottomPaginationBar from "../components/BottomPaginationBar";
import { fetchTestApartment } from "../api";

import { APARTMENTS_HEADERS, API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/ImportButton";
import ExportButton from "../components/ExportButton";
// import { DataGrid } from '@mui/x-data-grid';
import { formatId } from "../utils/stringHelper";
import { fetchApartmentsAPI } from "../api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

const _pageSizeOptions = [5, 10, 15];

/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setToTalPages] = useState(1);
  const [pageSize, setPageSize] = useState(_pageSizeOptions[1]);

  React.useEffect(() => {
    console.log(`USEEFFECT: CURRPAGE ${currPage} | TOTALPAGE ${totalPages}`);
    fetchApartmentsAPI(currPage, pageSize).then((data) => {
      const p = data.page;
      const a = data.apartments;
      if (p.totalPages < currPage) setCurrPage(0);
      setApartments(a);
      // console.log(data.apartments);
      setToTalPages(p.totalPages);
    });

    // setApartments(fetchTestApartment);
  }, [currPage, pageSize]);

  function _onPaginationChange(event, page) {
    setCurrPage((cp) => page - 1);
  }
  function _onPageSizeChange(event) {
    setPageSize(event.target.value);
  }

  const PlaceHolder = () => (
    <Stack spacing={2} sx={{ height: "40%", marginY: "2rem" }}>
      <Skeleton variant="rectangular" height={"20%"} />
      <Skeleton variant="rectangular" height={"80%"} />
    </Stack>
  );

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
      {apartments && apartments.length ? (
        <TableContainer sx={{ maxHeight: "80%", overflow: "scroll" }}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {APARTMENTS_HEADERS.map((item) => (
                  <TableCell key={item}>{item}</TableCell>
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
                    <IconButton aria-label="delete" color="warning">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <PlaceHolder />
      )}
      <BottomPaginationBar
        pageSizeOptions={_pageSizeOptions}
        totalPages={totalPages}
        onPaginationChange={_onPaginationChange}
        onPageSizeChange={_onPageSizeChange}
      />
    </>
  );
};

export default AllApartmentsPage;
