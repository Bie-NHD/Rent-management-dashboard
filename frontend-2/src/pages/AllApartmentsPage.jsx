import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BottomPaginationBar from "../components/BottomPaginationBar";
import {
  APARTMENTS_HEADERS,
  API_ROUTE_APARMENT,
  PAGE_SIZE_OPTIONS,
  STATUS_OK,
  STATUS_SUCCESS,
} from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/ImportButton";
import ExportButton from "../components/ExportButton";
// import { DataGrid } from '@mui/x-data-grid';
import { formatId } from "../utils/stringHelper";
import { fetchApartmentsAPI, addAparmentAPI, deleteApartmentAPI } from "../api";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PlaceHolder from "../components/PlaceHolder";
import { Paper, Skeleton } from "@mui/material";
import SuccessSnackBar from "../components/SuccessSnackBar";
import CustomReusableDialog from "../components/CustomReusableDialog";
import ErrorPlaceHolder from "../components/ErrorPlaceHolder";
import DeleteButton from "../components/DeleteButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setToTalPages] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alertDialog, setAlertDialog] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);

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
  function _handleCloseFormDialog() {
    setOpenFormDialog(false);
    console.log("DIALOG CLOSED");
  }
  function _handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    addAparmentAPI(formJson).then((value) => {
      if (value == STATUS_SUCCESS) {
        _handleOpenSnackBar();
        _loadData();
      }
    });
    setIsLoading(true);
    _loadData();
    _handleCloseFormDialog();
  }
  function _handleOpenSnackBar() {
    setOpenSnackBar(true);
    console.log("SET OPEN SNACKBAR");
  }
  function _handleCloseSnackBar() {
    setOpenSnackBar(false);
    console.log("SET CLOSE SNACKBAR");
  }
  function _handleDeleteItem(id) {
    deleteApartmentAPI(id).then((res) => {
      if ([STATUS_OK, STATUS_SUCCESS].indexOf(res.status) != -1) {
        _handleOpenSnackBar();
        setIsLoading(true);
        _loadData();
      }
    });
  }

  function _onClickButtonDelete(item) {
    console.log("DEL BTN CLICKED");
    _handleOpenDeleteWarningDialog(item);
  }

  function _handleOpenDeleteWarningDialog(item) {
    console.log("HANDLING WN DLG");
    setAlertDialog((curr) => <DeleteWarningDialog item={item} />);
    setOpenAlertDialog(true);
  }

  function _handleOKDeleteWarningDialog(id) {
    _handleDeleteItem(id);
    _handleCloseDeleteWarningDialog();
  }
  function _handleCloseDeleteWarningDialog() {
    setOpenAlertDialog(false);
    setAlertDialog(null);
  }

  const NewApartmentFormDialog = () => (
    <CustomReusableDialog
      open={openFormDialog}
      handleClose={_handleCloseFormDialog}
      onSubmit={(event) => _handleSubmitForm(event)}
      dialogContent={<NewApartmentFormContent />}
      title="New Apartment"
      dialogType="form"
      okText="Submit"
    />
  );

  const DeleteWarningDialog = ({ item }) => {
    const dialogContent = Object.entries(item).map((key) => (
      <p key={key}>
        <b>{key}:</b>
        {item[key]}
      </p>
    ));
    return (
      <CustomReusableDialog
        dialogType="warning"
        open={openAlertDialog}
        title={"Confirm Delete?"}
        dialogContent={dialogContent}
        handleClose={_handleCloseDeleteWarningDialog}
        handleOK={() => _handleOKDeleteWarningDialog(item.id)}
      />
    );
  };

  return (
    <>
      <NewApartmentFormDialog />
      {alertDialog}
      <PageHeader>Apartments</PageHeader>

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
            onClick={() => setOpenFormDialog(true)}
          >
            New
          </Button>
          <ImportButton importType={API_ROUTE_APARMENT} />
          <ExportButton exportType={API_ROUTE_APARMENT} />
        </Container>
      )}

      {apartments && apartments.length && !isLoading ? (
        <MainTable
          apartments={apartments}
          handleDelete={_onClickButtonDelete}
        />
      ) : error ? (
        <ErrorPlaceHolder onClick={_loadData} />
      ) : (
        <PlaceHolder />
      )}
      <BottomPaginationBar
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        totalPages={totalPages}
        onPaginationChange={_onPaginationChange}
        onPageSizeChange={_onPageSizeChange}
      />
    </>
  );
};
// EXPORT
export default AllApartmentsPage;

const NewApartmentFormContent = () => (
  <>
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
  </>
);
const MainTable = ({ apartments, handleDelete }) => (
  <Paper>
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
                <DeleteButton handleDelete={() => handleDelete(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);
