import PageHeader from "../../components/PageHeader";
import NiceModal from "@ebay/nice-modal-react";
import ApartmentList from "./ApartmentList";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateApartment } from "../../hooks";
import { NM_APARTMENT } from "../../constants";
import IndexToolBar from "../../components/IndexToolBar";

// ---------------------------------------------------------------------

const ApartmentIndex = () => {
  const client = useQueryClient();

  const { mutate } = useCreateApartment(client)();

  const handleNewApartment = () => NiceModal.show(NM_APARTMENT).then((data) => mutate(data));

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewApartment} enableImport />
      <ApartmentList />
    </>
  );
};

export default ApartmentIndex;
