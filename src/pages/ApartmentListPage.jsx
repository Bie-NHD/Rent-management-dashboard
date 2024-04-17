import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BottomPaginationBar from "../components/BottomPaginationBar";
import {
  API_ROUTE_APARMENT,
  PAGE_SIZE_OPTIONS,
  STATUS_OK,
} from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/buttons/ImportButton";
import ExportButton from "../components/buttons/ExportButton";
import { APARTMENT_API as api } from "../api/apartment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PlaceHolder from "../components/placeholder/PlaceHolder";
import { Paper, Skeleton } from "@mui/material";
import CustomReusableDialog from "../components/CustomReusableDialog";
import ErrorPlaceHolder from "../components/placeholder/ErrorPlaceHolder";
import ApartmentList from "../sections/apartment-page/ApartmentList";
import toast from "react-hot-toast";
import { useModal } from "@ebay/nice-modal-react";
import NewApartmentDialog from "../sections/apartment-page/NewApartmentDialog";

// ---------------------------------------------------------------------

// interface Pagination{
//   page: number,
//   totalPages: number,
//   pageSize: number
// }

//  type Action = {type: "change_page"} || {type: "change_page_size"}

const Actions = {
  CHANGE_PAGE: "change_page",
  CHANGE_PAGE_SIZE: "change_page_size",
  CREATE_ITEM: "create_item",
  UPDATE_ITEM: "update_item",
};

const paginationReducer = (state, action) => {
  switch (action.type) {
    case Actions.CHANGE_PAGE: {
      return {
        ...state,
        currPage: action.nextPage,
      };
    }
    case Actions.CHANGE_PAGE_SIZE: {
      return {
        ...state,
        // change state to new pageSize
        pageSize: action.pageSize,
        currPage: state.currPage >= action.totalPages ? 0 : state.currPage,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};

//
// fetch data
//

async function fetchApartments(currPage, pageSize, setApartments = () => {}) {
  api.fetch(currPage, pageSize).then((data) => {
    // setApartments here
    setApartments(data.apartments);
    // return data so the paginationReducer could use
    return data;
  });
}

const successToast = () => toast.success("Successfully updated!");
const errorToast = (message) => toast.error(message);
//

/*
 * COMPONENT AllApartmentsPage
 */
const ApartmentListPage = () => {
  const [apartments, setApartments] = React.useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertDialog, setAlertDialog] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [paginationState, setPaginationState] = useState({
    currPage: 0,
    totalPages: 1,
    pageSize: PAGE_SIZE_OPTIONS[1],
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  //
  const newApartmentModal = useModal(NewApartmentDialog);

  React.useEffect(() => {
    setIsLoading(true);
    _loadApartments();
  }, [paginationState.currPage, paginationState.pageSize]);

  function _loadApartments() {
    setError(null);
    api
      .fetch(paginationState.currPage, paginationState.pageSize)
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

  function _handleCloseUpdateFormDialog() {
    setOpenUpdateDialog(false);
    console.log("DIALOG CLOSED");
  }

  function _handleSubmitForm(event, type) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    switch (type) {
      case "create": {
        api.add(formJson).then((data) => {
          console.log(data);
          if (STATUS_OK.indexOf(data.statusCode) !== -1) {
            successToast();
            _loadApartments();
          } else {
            errorToast(data.message);
          }
        });
        break;
      }
      case "update": {
        api.update(formJson, itemToUpdate.id).then((data) => {
          if (STATUS_OK.indexOf(data.statusCode) !== -1) {
            successToast();

            _loadApartments();
            setItemToUpdate(null);
            setOpenUpdateDialog(false);
          } else {
            errorToast(data.message);
          }
        });
      }
    }

    setOpenFormDialog(false);
  }

  function _handleCloseSnackBar() {
    // setOpenSuccessSnackBar(false);
  }

  function _handleDeleteItem() {
    //
    // if itemToDelete != null
    //
    api.delete(itemToDelete.id).then((res) => {
      if (STATUS_OK.indexOf(res.status) != -1) {
        // setOpenSuccessSnackBar(true);
        _loadApartments();
        setItemToDelete(null);
        successToast();
      }
    });
  }

  function _onClickButtonDelete(item) {
    console.log("DEL BTN CLICKED");

    // Open Alert Dialog
    console.log("HANDLING WN DLG");
    setOpenAlertDialog(true);
    setItemToDelete(item);
  }

  function _onClickButtonUpdate(item) {
    setItemToUpdate(item);
    setOpenUpdateDialog(true);
  }

  function _handleOKDeleteWarningDialog() {
    _handleDeleteItem();
    _handleCloseDeleteWarningDialog();
  }

  function _handleCloseDeleteWarningDialog() {
    console.log("CLOSE_ITEM");
    setOpenAlertDialog(false);
    setItemToDelete(null);
  }

  const NewApartmentFormDialog = () => (
    <CustomReusableDialog
      open={openFormDialog}
      handleClose={() => setOpenFormDialog(false)}
      onSubmit={(event) => _handleSubmitForm(event, "create")}
      dialogContent={<NewApartmentFormContent />}
      title="New Apartment"
      dialogType="form"
      okText="Submit"
    />
  );

  const UpdateApartmentFormDialog = () => (
    <CustomReusableDialog
      open={openUpdateDialog}
      handleClose={_handleCloseUpdateFormDialog}
      onSubmit={(event) => _handleSubmitForm(event, "update")}
      dialogContent={<UpdateApartmentFormContent />}
      title="Update Apartment"
      dialogType="form"
      okText="Submit"
    />
  );

  const UpdateApartmentFormContent = () => (
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
        defaultValue={itemToUpdate !== null ? itemToUpdate.address : undefined}
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
        defaultValue={
          itemToUpdate !== null ? parseInt(itemToUpdate.retailPrice) : undefined
        }
        inputProps={{
          min: "100000",
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
        defaultValue={
          itemToUpdate !== null ? itemToUpdate.numberOfRoom : undefined
        }
        inputProps={{
          min: "1",
        }}
      />
    </>
  );

  const DeleteWarningDialog = () => {
    const [dialogContent, setDialogContent] = useState(null);

    useEffect(() => {
      if (itemToDelete !== null) {
        const content = Object.keys(itemToDelete).map((key) => (
          <p key={key}>
            <b>{key}:</b>
            {`${itemToDelete[key]}`}
          </p>
        ));
        setDialogContent(content);
      }
    }, [itemToDelete]);

    return (
      <CustomReusableDialog
        dialogType="warning"
        open={openAlertDialog}
        title={"Confirm Delete?"}
        dialogContent={dialogContent}
        handleClose={_handleCloseDeleteWarningDialog}
        handleOK={_handleOKDeleteWarningDialog}
      />
    );
  };

  return (
    <>
      <NewApartmentFormDialog />
      <UpdateApartmentFormDialog />
      <DeleteWarningDialog />
      <PageHeader>Apartments</PageHeader>
      {/* {isLoading ? ( */}
      {/* <Skeleton animation="wave" height={120} />
      ) : ( */}
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
          onClick={
            // () => setOpenFormDialog(true)
            () => newApartmentModal.show()
          }
        >
          New
        </Button>
        <ImportButton importType={API_ROUTE_APARMENT} />
        <ExportButton exportType={API_ROUTE_APARMENT} />
      </Container>
      {/* // )} */}

      {
        //
        //  apartments != null && apartments.length > 0
        //
        apartments && apartments.length && !isLoading ? (
          <ApartmentList
            apartments={apartments}
            handleDelete={_onClickButtonDelete}
            handleUpdate={_onClickButtonUpdate}
          />
        ) : error ? (
          <ErrorPlaceHolder onClick={_loadApartments} />
        ) : (
          <PlaceHolder />
        )
      }

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
export default ApartmentListPage;

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
      defaultValue={"100000"}
      inputProps={{
        min: "100000",
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
      defaultValue={"1"}
      inputProps={{
        min: "1",
      }}
    />
  </>
);
