import PageHeader from "../../components/PageHeader";
import IndexToolBar from "../../components/IndexToolBar";
import NiceModal from "@ebay/nice-modal-react";
import { NM_CUSTOMER } from "../../constants";
import { useCreateCustomer } from "../../hooks";
import toast from "react-hot-toast";
import CustomerList from "./CustomerList";
import { MutateDialogProps } from "../../types/props";

const CustomerIndex = () => {
  const { mutate } = useCreateCustomer({
    onSuccess(data) {
      if (data.statusCode == 200) {
        toast.success(data.message);
      } else {
        console.log(data.statusCode, data.message);
        toast.error(data.message);
      }
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
