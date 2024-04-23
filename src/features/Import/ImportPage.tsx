import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  Button,
  FormControl,
  Box,
  Stack,
  LinearProgress,
  List,
  ListItem,
  Typography,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
// icons
import { CloudUploadOutlined } from "@mui/icons-material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/material/styles";
import { importApartmentsAPI } from "../../api/apartment";
import DeleteButton from "../../components/buttons/DeleteButton";
import { ApartmentURLs, AppRoutes } from "../../constants";
import { Api } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
// -----------------------------------------------------------------

const styles = {
  button: {
    boxShadow: "none",
  },
  fileItem: { justifyContent: "space-between", borderBottom: 1 },
  //
  // Setting animation : https://stackoverflow.com/a/68460725
  //
};
// styled input button
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const icons = {
  idle: null,
  waiting: <HourglassBottomIcon />,
  finish: <CheckCircleIcon color="success" />,
};

type FileState = {
  file: File;
  message: string;
};

// const fileStatesReducer = (
//   prevState: FileState[],
//   action: A
// ): FileState[] => {};

function getImportMessages(response: TApiResponse<TImportResponse>) {
  switch (response.statusCode) {
    case 200: {
      console.log(response.data);

      let _data = [];
      _data = response.data.map((item) => (
        <>
          <p>{item.File}</p>
          <p>The rows failed: {item["The rows failed"]}</p>
          <p>Number of successful rows: {item["Number of successful rows"]} </p>
        </>
      ));
      return _data;
    }
    case 400: {
      console.log("data", response);
      return [<>{response.message}</>];
    }
  }
}

const ImportPage = () => {
  let importType = new URL(window.location.href).searchParams.get("type");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  // const [fileStates,dispatchFileStates] = useReducer(fileStatesReducer,[])
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const [appMessage, setAppMessage] = useState<JSX.Element[] | undefined>();

  // const client = useQueryClient();

  const location = useMemo(
    () => "/" + window.location.href.split("/").at(-2),
    []
  );

  console.log(location);

  function updateFiles(fileList: FileList | null) {
    if (!fileList) return;
    let newFiles = [...fileStates];
    for (const file of fileList)
      newFiles = [
        ...newFiles,
        {
          file: file,
          message: "",
        },
      ];
    setFileStates(newFiles);
    console.log(fileList);
  }
  // FORM SUBMIT
  function handleSubmit() {
    const fd = new FormData();
    fileStates.forEach((file) => {
      fd.append("file", file.file);
    });

    switch (location) {
      case AppRoutes.Apartment:
        Api.import(ApartmentURLs.Import, fd).then((response) => {
          const message = getImportMessages(response);
          setAppMessage(message);
        });
        break;
      case AppRoutes.Contract:
        break;
      case AppRoutes.Customer:
        break;
    }
  }

  //
  // HANDLE DELETE
  //
  const handleDelete = (item: FileState) => {
    const newFileStates = fileStates.filter((file) => file != item);
    setFileStates(newFileStates);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "2rem",
      }}
    >
      <FormControl>
        <Stack spacing={1}>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadOutlined />}
            sx={styles.button}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              multiple
              onChange={(e) => updateFiles(e.target.files)}
            />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            sx={styles.button}
            // type="submit"
            // onSubmit={()=>handleSubmit()}
          >
            Submit
          </Button>
        </Stack>
      </FormControl>
      <Box sx={{ display: "block", margin: ".5rem" }}></Box>
      <Box>{appMessage}</Box>
      {
        //
        //  apartments != null && apartments.length > 0
        //
        fileStates && fileStates.length ? (
          <Paper sx={{ padding: "2rem" }}>
            <Container>File name</Container>
            {showProgressBar ? <LinearProgress /> : null}
            <List>
              {fileStates.map((item) => (
                <ListItem
                  key={item.file.name}
                  // components={Container}
                  sx={styles.fileItem}
                >
                  <Typography>{item.file.name}</Typography>
                  <Box>
                    <span>{item.message}</span>
                    <DeleteButton handleDelete={() => handleDelete(item)} />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : null
      }
    </Container>
  );
};

export default ImportPage;
