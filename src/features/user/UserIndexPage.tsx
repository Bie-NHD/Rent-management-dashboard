import React from "react";
import UserList from "./UserList";
import IndexToolBar from "../../components/IndexToolBar";
import PageHeader from "../../components/PageHeader";
import NiceModal from "@ebay/nice-modal-react";
import { NM_CONTRACT, NM_USER_CREATE } from "../../constants";
import { useCreateUser } from "../../hooks/user";
import toast from "react-hot-toast";

const UserIndexPage = () => {
  const { mutateAsync } = useCreateUser({
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
  });

  const createDialogProps: MutateDialogProps = {
    onCreate: mutateAsync,
  };

  const handleNewItem = () => NiceModal.show(NM_USER_CREATE, createDialogProps);

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} />
      <UserList />
    </>
  );
};

export default UserIndexPage;
