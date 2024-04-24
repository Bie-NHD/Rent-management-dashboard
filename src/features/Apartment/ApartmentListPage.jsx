import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import ImportButton from "../../components/buttons/ImportButton";
import ExportButton from "../../components/buttons/ExportButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import ApartmentTable from "./ApartmentTable";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateApartment } from "../../hooks";
import { NM_APARTMENT, AppRoutes } from "../../constants";

// ---------------------------------------------------------------------

const ApartmentListPage = () => {
  const client = useQueryClient();

  const { mutate } = useCreateApartment(client)();

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
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() =>
            NiceModal.show(NM_APARTMENT).then((data) => mutate(data))
          }
        >
          New
        </Button>
        <ImportButton importType={AppRoutes.Apartment} />
        <ExportButton exportType={AppRoutes.Apartment} />
      </Container>
      <ApartmentTable />
    </>
  );
};

export default ApartmentListPage;
