import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, LinearProgress, Link, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { AppRoutes } from "../../constants";
import AuthApi from "../../api/auth";

import LoginLayout from "../../components/LoginLayout";

const schema = object({
  email: string().email().required().default(""),
});

const ForgotPasswordPage = () => {
  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState<ApiQueryStatus>();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setIsLoading(true);
    const _result = await AuthApi.forgotPassword(data);
    setResult(_result);
    setIsLoading(false);
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
              id={`txt-${field.name}`}
              label="Your Recovery Email"
              variant={"outlined"}
              fullWidth
              helperText={
                (fieldState.error && fieldState.error.message) || formState.errors.email?.message
              }
              error={!!fieldState.error}
            />
          )}
        />
        <>
          <Button type="submit" variant="contained">
            Sent
          </Button>
          {isLoading ? (
            <LinearProgress variant="indeterminate" sx={{ color: "primary.light" }} />
          ) : null}
        </>
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
