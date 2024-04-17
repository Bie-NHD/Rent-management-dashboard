import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { API_ROUTE_APARMENT, STATUS_OK } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/buttons/ImportButton";
import ExportButton from "../components/buttons/ExportButton";
import { APARTMENT_API as api } from "../api/apartment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import CustomReusableDialog from "../components/CustomReusableDialog";
import toast from "react-hot-toast";
import { useModal } from "@ebay/nice-modal-react";
import NewApartmentDialog from "../sections/apartment-page/NewApartmentDialog";
import ApartmentTable from "../sections/apartment-page/ApartmentTable";

// ---------------------------------------------------------------------

const Actions = {
  CREATE_ITEM: "create_item",
  UPDATE_ITEM: "update_item",
};

//
// fetch data
//

const successToast = () => toast.success("Successfully updated!");
const errorToast = (message) => toast.error(message);
//

/*
 * COMPONENT AllApartmentsPage
 */
const ApartmentListPage = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  //
  const newApartmentModal = useModal(NewApartmentDialog);

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

  function _handleDeleteItem() {
    //
    // if itemToDelete != null
    //
    api.delete(itemToDelete.id).then((res) => {
      if (STATUS_OK.indexOf(res.status) != -1) {
        _loadApartments();
        setItemToDelete(null);
        successToast();
      }
    });
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
          onClick={() => newApartmentModal.show()}
        >
          New
        </Button>
        <ImportButton importType={API_ROUTE_APARMENT} />
        <ExportButton exportType={API_ROUTE_APARMENT} />
      </Container>
      <ApartmentTable />
    </>
  );
};

// EXPORT
export default ApartmentListPage;
