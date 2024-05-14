import React from "react";
import useAuth from "../../hooks/useAuth";

const UserDetailsPage = () => {
  const { user } = useAuth();

  return <div>UserDetailsPage</div>;
};

export default UserDetailsPage;
