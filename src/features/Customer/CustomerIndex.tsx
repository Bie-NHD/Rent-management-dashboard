import PageHeader from "../../components/PageHeader";
import IndexToolBar from "../../components/IndexToolBar";
import NiceModal from "@ebay/nice-modal-react";
import { CustomerRoutes, NM_CUSTOMER } from "../../constants";
import { useCreateCustomer } from "../../hooks";
import toast from "react-hot-toast";
import CustomerList from "./CustomerList";
import { MutateDialogProps } from "../../types/props";
import { useNavigate } from "react-router-dom";

const CustomerIndex = () => {
  const navigate = useNavigate();

  const handleNewItem = () => {
    navigate(CustomerRoutes.Add, { state: { from: window.location.pathname } });
  };

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} enableImport/>
      <CustomerList />
    </>
  );
};
export default CustomerIndex;
