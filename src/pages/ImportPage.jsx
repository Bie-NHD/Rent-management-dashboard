import React, { useEffect, useState } from "react";
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
import { API_ROUTE_APARMENT } from "../utils/constants";
import { importApartmentsAPI } from "../api/apartment";
import DeleteButton from "../components/buttons/DeleteButton";
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

const ImportPage = () => {
  let importType = new URL(window.location.href).searchParams.get("type");
  const [files, setFiles] = useState([]);
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const [appMessage, setAppMessage] = useState(null);

  console.log(importType);

  function updateFiles(fileList) {
    let newFiles = [...files];
    for (const file of fileList)
      newFiles = [
        ...newFiles,
        {
          value: file,
          filename: file.name,
          message: "",
        },
      ];
    setFiles(newFiles);
    console.log(files);
  }
  // FORM SUBMIT
  function handleSubmit() {
    console.log("SUBMIT: ");
    console.log(files);

    const fd = new FormData();

    files.forEach((file) => {
      console.log("APPEND ");
      fd.append("file", file.value);
      console.log(file.value);
      console.log(fd);
    });

    switch (importType) {
      case API_ROUTE_APARMENT:
        importApartmentsAPI(fd).then((res) => {
          console.log(res);
          console.log("NO");
          // setAppMessage(res.data.message);
          console.log(res.data);
          setMessage(res.data);
        });
        break;
    }
  }

  function setMessage(data) {
    switch (data.statusCode) {
      case 200: {
        let _data = [];
        _data = data.data.map((item) => (
          <>
            <p>{item.File}</p>
            <p>The rows failed: {item["The rows failed"]}</p>
            <p>
              Number of successful rows: {item["Number of successful rows"]}{" "}
            </p>
          </>
        ));
        setAppMessage(_data);
        break;
      }
      case 400: {
        console.log("data", data);
        setAppMessage(data.message);
      }
    }
  }

  //
  // HANDLE DELETE
  //
  const handleDelete = (item) => {
    const newFiles = files.filter((file) => file != item);
    setFiles(newFiles);
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
      {
        //
        //  apartments != null && apartments.length > 0
        //
        files && files.length ? (
          <Paper sx={{ padding: "2rem" }}>
            <Container>File name</Container>
            {appMessage}
            {showProgressBar ? (
              <LinearProgress variant="indetermediate" />
            ) : null}
            <List>
              {files.map((item) => (
                <ListItem
                  key={item.filename}
                  components={Container}
                  sx={styles.fileItem}
                >
                  <Typography>{item.filename}</Typography>
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
