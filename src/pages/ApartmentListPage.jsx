import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { API_ROUTE_APARMENT } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import ImportButton from "../components/buttons/ImportButton";
import ExportButton from "../components/buttons/ExportButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import ApartmentTable from "../sections/apartment/ApartmentTable";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateApartment } from "../hooks";
import { QK_APARTMENTS, NM_APARTMENT } from "../constants";

// ---------------------------------------------------------------------

const ApartmentListPage = () => {
  const client = useQueryClient();

  const { mutate } = useCreateApartment({
    onSuccess(data, variables, context) {
      toast.success(data.message);
      client.invalidateQueries([QK_APARTMENTS]);
    },
  });

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
        <ImportButton importType={API_ROUTE_APARMENT} />
        <ExportButton exportType={API_ROUTE_APARMENT} />
      </Container>
      <ApartmentTable />
    </>
  );
};

export default ApartmentListPage;
