import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Box,
} from "@mui/material";
import Container from "@mui/material/Container";
import { CloudUploadOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";

import {
  API_ROUTE_APARMENT,
  API_ROUTE_CONTRACT,
  API_ROUTE_USER,
} from "../utils/constants";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { importApartmentsAPI } from "../api";

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

  console.log(importType);

  function updateFiles(fileList) {
    let newFiles = [...files];
    for (const file of fileList)
      newFiles = [
        ...newFiles,
        {
          value: file,
          filename: file.name,
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
      fd.append("file", file.value);
      console.log("APPEND ");
      console.log(fd);
    });

    switch (importType) {
      case API_ROUTE_APARMENT:
        importApartmentsAPI(fd);
        break;
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "2rem",
      }}
    >
      <FormControl>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadOutlined />}
          sx={{ marginRight: ".5rem" }}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={(e) => updateFiles(e.target.files)}
          />
        </Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </FormControl>
      <Box sx={{ display: "block", margin: ".5rem" }}></Box>
      <TableContainer
        sx={{
          alignSelf: "center",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files
              ? files.map((item) => (
                  <TableRow key={item.filename}>
                    <TableCell key={item.filename}>{item.filename}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ImportPage;
