import PageHeader from "../../components/PageHeader";

import ContractList from "./ContractList";
import IndexToolBar from "../../components/IndexToolBar";
import { NM_CONTRACT } from "../../constants";
import NiceModal from "@ebay/nice-modal-react";

const ContractIndex = () => {
  const handleNewItem = () => NiceModal.show(NM_CONTRACT);

  return (
    <>
      <PageHeader />
      <IndexToolBar handleNewItem={handleNewItem} />
      <ContractList />
    </>
  );
};

export default ContractIndex;
