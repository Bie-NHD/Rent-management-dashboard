import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";

const schema = object({
  email: string().email().required(),
});

const ForgotPasswordPage = () => {
  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {};

  return (
    <Container
      sx={{
        height: "100vh",
        paddingX: "3rem",
        paddingY: "3rem",
        bgcolor: "primary",
      }}
    >
      <Box component={"center"}>
        <Typography variant="h3">Account Recovery</Typography>
        <Paper
          sx={{ padding: "3rem" }}
          elevation={0}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2} maxWidth={"20rem"}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState, formState }) => (
                <TextField
                  {...field}
                  id={`txt-${field.name}`}
                  label="Your Recovery Email"
                  variant={"outlined"}
                  fullWidth
                  helperText={
                    (fieldState.error && fieldState.error.message) ||
                    formState.errors.email?.message
                  }
                  error={!!fieldState.error}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
