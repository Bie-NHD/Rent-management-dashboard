import React, { useEffect, useState } from "react";
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
import { setItem } from "localforage";
/*
 * COMPONENT AllApartmentsPage
 */
const AllApartmentsPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alertDialog, setAlertDialog] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [paginationState, setPaginationState] = useState({
    currPage: 0,
    totalPages: 1,
    pageSize: PAGE_SIZE_OPTIONS[1],
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [dialogState, setDialogState] = useState({
    open: false,
    dialogId: null,
  });

  React.useEffect(() => {
    setIsLoading(true);
    _loadApartments();
  }, [paginationState.currPage, paginationState.pageSize]);

  function _loadApartments() {
    setError(null);
    fetchApartmentsAPI(paginationState.currPage, paginationState.pageSize)
      .then((data) => {
        const pageInfo = data.page;
        const apartmentsInfo = data.apartments;

        setApartments(apartmentsInfo);
        console.log("APARTMENTS LOADED");

        const newCurrPage =
          pageInfo.totalPages <= paginationState.currPage
            ? 0
            : paginationState.currPage;

        const newTotalPages =
          pageInfo.totalPages != paginationState.totalPages
            ? pageInfo.totalPages
            : paginationState.totalPages;

        setPaginationState((prevState) => {
          return {
            ...prevState,
            totalPages: newTotalPages,
            currPage: newCurrPage,
          };
        });

        setIsLoading(false);

        console.log(
          `USEEFFECT: CURRPAGE ${paginationState.currPage} | TOTALPAGE ${paginationState.totalPages} | PageInfoTotal ${pageInfo.totalPages}\n
          PAGESIZE: ${paginationState.pageSize}`
        );
      })
      .catch((error) => {
        setError(error);
      });
  }

  function _onPaginationChange(event, page) {
    //
    // page index at 1, while currPage index at 0
    //

    setPaginationState((prevState) => {
      return {
        ...prevState,
        currPage: page - 1,
      };
    });
  }

  function _onPageSizeChange(event) {
    setPaginationState((prevState) => {
      return {
        ...prevState,
        pageSize: event.target.value,
      };
    });
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
        _loadApartments();
      }
    });

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
        // pop up snackbar
        _handleOpenSnackBar();
        // reload data
        _loadApartments();
        // then reset to no item to delete
        setItemToDelete(null);
        //
        closeDialog();
      }
    });
  }

  function _onClickButtonDelete(item) {
    console.log("DEL BTN CLICKED");
    // _handleOpenDeleteWarningDialog(item);
    setItemToDelete(item);
    openDialog("2"); // Open Warning Dialog
  }

  // function _handleOpenDeleteWarningDialog(item) {
  //   console.log("HANDLING WN DLG");
  //   setOpenAlertDialog(true);
  //   setAlertDialog(<DeleteWarningDialog item={item} />);
  // }

  function _handleOKDeleteWarningDialog() {
    _handleDeleteItem(itemToDelete);
    // _handleCloseDeleteWarningDialog();
  }

  function _handleCloseDeleteWarningDialog() {
    setOpenAlertDialog(false);
    setAlertDialog(null);
  }
  //
  // DIALOG HERE
  //
  const closeDialog = () => {
    setDialogState((prevState) => {
      return { ...prevState, open: false };
    });
  };
  const openDialog = (dialogId) => {
    setDialogState((prevState) => {
      return { ...prevState, open: true, dialogId: dialogId };
    });
    console.log(`DIALOG STATE ${JSON.stringify(dialogState)}`);
  };
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
    console.log(item);
    const dialogContent = Object.keys(item).map((key) => (
      <p key={key}>
        <b>{key}:</b>
        {`${item[key]}`}
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

  const dialogs = [
    // Form Dialog
    {
      id: "1",
      dialogType: "form",
      handleClose: closeDialog,
      onSubmit: _handleSubmitForm,
      title: "New Apartment",
      okText: "Submit",
      dialogContent: <NewApartmentFormContent />,
      handleOK: undefined,
    },
    // Delete Warnign Dialog
    {
      id: "2",
      dialogType: undefined,
      handleClose: closeDialog,
      title: "Confirm Delete?",
      okText: undefined,
      dialogContent: null,
      handleOK: _handleOKDeleteWarningDialog,
    },
  ];
  const PageDialog = () => {
    const [index, setIndex] = useState(-1);

    useEffect(() => {
      setIndex((curr) =>
        dialogs.indexOf((item) => item.id === dialogState.dialogId)
      );
    }, [dialogState]);
    // if index not found <==> dialogId=null
    // return null (or void ?)
    return index === -1 ? null : (
      <CustomReusableDialog
        open={dialogState.open}
        dialogType={dialogs[index].dialogType}
        title={dialogs[index].title}
        dialogContent={dialogs[index].dialogContent}
        handleClose={dialogs[index].handleClose}
        handleOK={dialogs[index].handleOK}
      />
    );
  };
  return (
    <>
      <PageDialog />
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
            // onClick={() => setOpenFormDialog(true)}
            onClick={() => openDialog("1")} // Open  Form Dialog
          >
            New
          </Button>
          <ImportButton importType={API_ROUTE_APARMENT} />
          <ExportButton exportType={API_ROUTE_APARMENT} />
        </Container>
      )}

      {apartments && apartments.length >= 0 && !isLoading ? (
        <MainTable
          apartments={apartments}
          handleDelete={_onClickButtonDelete}
        />
      ) : error ? (
        <ErrorPlaceHolder onClick={_loadApartments} />
      ) : (
        <PlaceHolder />
      )}

      <BottomPaginationBar
        // page={currPage + 1}
        page={paginationState.currPage + 1}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        totalPages={paginationState.totalPages}
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
                <DeleteButton handleDelete={() => handleDelete(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);
