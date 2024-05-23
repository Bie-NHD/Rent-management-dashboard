import NiceModal from "@ebay/nice-modal-react";
import { Container, Button } from "@mui/material";
import React from "react";
import { NM_APARTMENT, AppRoutes } from "../constants";
import ExportButton from "./buttons/ExportButton";
import ImportButton from "./buttons/ImportButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IndexToolbarProps } from "../types/props";

const styles = {
  display: "flex",
  justifyContent: "end",
  justifyItems: "start",
  marginRight: 0,
};

const IndexToolBar = (props: IndexToolbarProps) => {
  const location = window.location.pathname;

  return (
    <Container sx={styles}>
      <Button variant="contained" startIcon={<AddCircleIcon />} onClick={props.handleNewItem}>
        New
      </Button>
      {props.enableImport && <ImportButton />}
      <ExportButton exportType={location} />
    </Container>
  );
};

export default IndexToolBar;
