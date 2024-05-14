import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const LoginLayout = ({ children, title }: { children?: React.ReactNode; title: string | null }) => {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        paddingX: "3rem",
        paddingY: "1rem",
        bgcolor: "primary",
        justifyContent: "center",
      }}
    >
      <Box component={"center"} bgcolor={"primary"} marginY={"2rem"} alignSelf={"center"}>
        <Typography variant="h2">{title}</Typography>
        <Paper sx={{ padding: "3rem", maxWidth: "30rem" }} elevation={0}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginLayout;
