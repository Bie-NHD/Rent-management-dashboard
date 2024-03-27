import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BottomPaginationBar from "../components/BottomPaginationBar";
import { addAparmentAPI, fetchTestApartment } from "../api";

import { APARTMENTS_HEADERS, API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/ImportButton";
import ExportButton from "../components/ExportButton";
// import { DataGrid } from '@mui/x-data-grid';
import { formatId } from "../utils/stringHelper";
import { fetchApartmentsAPI } from "../api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PlaceHolder from "../components/PlaceHolder";
import { Box, Skeleton } from "@mui/material";
import SuccessSnackBar from "../components/SuccessSnackBar";

const _pageSizeOptions = [5, 10, 15];

/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setToTalPages] = useState(1);
  const [pageSize, setPageSize] = useState(_pageSizeOptions[1]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  React.useEffect(() => {
    console.log(`USEEFFECT: CURRPAGE ${currPage} | TOTALPAGE ${totalPages}`);
    _loadData();

    // setApartments(fetchTestApartment);
  }, [currPage, pageSize]);

  function _loadData() {
    setError(null);
    fetchApartmentsAPI(currPage, pageSize)
      .then((data) => {
        const p = data.page;
        const a = data.apartments;
        if (p.totalPages < currPage) setCurrPage(0);
        if (totalPages != p.totalPages) setToTalPages(p.totalPages);
        setApartments((curr) => a);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function _onPaginationChange(event, page) {
    setCurrPage((cp) => page - 1);
    setIsLoading((curr) => true);
  }
  function _onPageSizeChange(event) {
    setPageSize(event.target.value);
  }
  function _handleClickOpenDialog() {
    setIsOpenDialog(true);
  }
  function _handleCloseDialog() {
    setIsOpenDialog(false);
  }
  function _handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    addAparmentAPI(formJson).then((value) => {
      if (value == 201) _handleOpenSnackBar();
    });
    setApartments((curr) => []);
    setIsLoading(true);
    console.log(formJson);
    _loadData();
    _handleCloseDialog();
  }
  function _handleOpenSnackBar() {
    setOpenSnackBar(true);
    console.log("SET OPEN SNACKBAR");
  }
  function _handleCloseSnackBar() {
    setOpenSnackBar(false);
    console.log("SET CLOSE SNACKBAR");
  }

  const ErrorPlaceHolder = () => (
    <Box>
      <h2>Something is wrong</h2>
      <p>Please reload the page</p>
      <Button variant="outlined" onClick={() => _loadData()}>
        Reload
      </Button>
    </Box>
  );

  const NewApartmentFormDialog = () => (
    <Dialog
      open={isOpenDialog}
      onClose={_handleCloseDialog}
      PaperProps={{
        component: "form",
        onSubmit: (event) => _handleSubmitForm(event),
      }}
    >
      <DialogTitle>New Apartment</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill in the form below</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="txt-address"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="txt-retailPrice"
          name="retailPrice"
          label="Retail Price"
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{
            step: "10000",
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="txt-numberOfRoom"
          name="numberOfRoom"
          label="Number of rooms"
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{
            min: "1",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleCloseDialog}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <PageHeader>Apartments</PageHeader>
      <NewApartmentFormDialog />
      <SuccessSnackBar
        open={openSnackBar}
        message="Successfully updated!"
        setClose={_handleCloseSnackBar}
      />
      {isLoading ? (
        <Skeleton animation="wave" height={120} />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "end",
            justifyItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={_handleClickOpenDialog}
          >
            New
          </Button>
          <ImportButton importType={API_ROUTE_APARMENT} />
          <ExportButton exportType={API_ROUTE_APARMENT} />
        </Container>
      )}

      {apartments && apartments.length && !isLoading ? (
        <TableContainer
          sx={{ maxHeight: "80%", overflow: "scroll", marginY: "2rem" }}
        >
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
      ) : error ? (
        <ErrorPlaceHolder />
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
