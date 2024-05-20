import PageHeader from "../../components/PageHeader";
import IndexToolBar from "../../components/IndexToolBar";
import NiceModal from "@ebay/nice-modal-react";
import { NM_CUSTOMER } from "../../constants";
import { useCreateCustomer } from "../../hooks";
import toast from "react-hot-toast";
import CustomerList from "./CustomerList";

const CustomerIndex = () => {
  const { mutate } = useCreateCustomer({
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  const handleNewItem = () => {
    const params: MutateDialogProps = {
      onCreate: mutate,
    };

    NiceModal.show(NM_CUSTOMER, params);
  };

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} />
      <CustomerList />
    </>
  );
};
export default CustomerIndex;
