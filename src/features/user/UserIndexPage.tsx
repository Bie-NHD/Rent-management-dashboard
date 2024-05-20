import React from "react";
import UserList from "./UserList";
import IndexToolBar from "../../components/IndexToolBar";
import PageHeader from "../../components/PageHeader";
import NiceModal from "@ebay/nice-modal-react";
import { NM_CONTRACT, NM_USER_CREATE } from "../../constants";

const UserIndexPage = () => {
  const handleNewItem = () => NiceModal.show(NM_USER_CREATE);

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} />
      <UserList />
    </>
  );
};

export default UserIndexPage;
