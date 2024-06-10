import NiceModal from "@ebay/nice-modal-react";
import { Container, Button, Box } from "@mui/material";
import React from "react";
import { NM_APARTMENT, AppRoutes } from "../constants";
import ExportButton from "./buttons/ExportButton";
import ImportButton from "./buttons/ImportButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IndexToolbarProps } from "../types/props";

const IndexToolBar = (props: IndexToolbarProps) => {
  const location = window.location.pathname;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "end",
        justifyItems: "start",
        marginRight: 0,
        padding: 0,
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={props.handleNewItem}
          sx={{
            marginInline: ".5rem",
            flexGrow: 1,
          }}>
          New
        </Button>
        {props.enableImport && <ImportButton />}
        <ExportButton exportType={location} />
      </Box>
    </Container>
  );
};

export default IndexToolBar;
