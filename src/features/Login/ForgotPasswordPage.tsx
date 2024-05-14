import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { AppRoutes } from "../../constants";
import AuthApi from "../../api/auth";

import LoginLayout from "../../components/LoginLayout";

const schema = object({
  email: string().email().required(),
});

const ForgotPasswordPage = () => {
  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState<{
    statusCode: number;
    message: string;
  }>();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    const _result = await AuthApi.forgotPassword(data);
    setResult(_result);
  };

  return (
    <LoginLayout title={"Account Recovery"}>
      <Stack spacing={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {!!result && <Box>{result.message}</Box>}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState, formState }) => (
            <TextField
              {...field}
              type="email"
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
        <Button type="submit" variant="contained" color="info">
          Sent
        </Button>
        <Divider />
        or
        <Button LinkComponent={Link} href={AppRoutes.Login} variant="outlined">
          Login
        </Button>
      </Stack>
    </LoginLayout>
  );
};

export default ForgotPasswordPage;
