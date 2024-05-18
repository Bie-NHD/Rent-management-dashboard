import React from "react";
import UserList from "./UserList";
import IndexToolBar from "../../components/IndexToolBar";
import PageHeader from "../../components/PageHeader";

const UserIndexPage = () => {
  return (
    <>
      <PageHeader />
      <IndexToolBar />
      <UserList />
    </>
  );
};

export default UserIndexPage;
