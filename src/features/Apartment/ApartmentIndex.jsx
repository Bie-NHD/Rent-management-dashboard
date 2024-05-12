import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import ImportButton from "../../components/buttons/ImportButton";
import ExportButton from "../../components/buttons/ExportButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NiceModal from "@ebay/nice-modal-react";
import ApartmentList from "./ApartmentList";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateApartment } from "../../hooks";
import { NM_APARTMENT, AppRoutes } from "../../constants";
import IndexToolBar from "../../components/IndexToolBar";

// ---------------------------------------------------------------------

const ApartmentIndex = () => {
  const client = useQueryClient();

  const { mutate } = useCreateApartment(client)();

  const handleNewApartment = () =>
    NiceModal.show(NM_APARTMENT).then((data) => mutate(data));

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewApartment} />
      <ApartmentList />
    </>
  );
};

export default ApartmentIndex;
