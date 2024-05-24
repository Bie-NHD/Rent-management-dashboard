import PageHeader from "../../components/PageHeader";

import ContractList from "./ContractList";
import IndexToolBar from "../../components/IndexToolBar";
import { NM_CONTRACT } from "../../constants";
import NiceModal from "@ebay/nice-modal-react";
import { useNavigate } from "react-router-dom";

const ContractIndex = () => {
  const navigate = useNavigate();

  const handleNewItem = () => navigate("./add", { state: { from: window.location.pathname } });

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} enableImport={false} />
      <ContractList />
    </>
  );
};

export default ContractIndex;
