import PageHeader from "../../components/PageHeader";
import NiceModal from "@ebay/nice-modal-react";
import ApartmentList from "./ApartmentList";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateApartment } from "../../hooks";
import { ApartmentRoutes, NM_APARTMENT } from "../../constants";
import IndexToolBar from "../../components/IndexToolBar";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------

const ApartmentIndex = () => {
  const client = useQueryClient();

  const navigate = useNavigate();

  const handleNewItem = () => {
    navigate(ApartmentRoutes.Add, { state: { from: window.location.pathname } });
  };

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} enableImport />
      <ApartmentList />
    </>
  );
};

export default ApartmentIndex;
