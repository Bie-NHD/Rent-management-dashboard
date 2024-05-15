import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, LinearProgress, Link, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { AppRoutes } from "../../constants";
import AuthApi from "../../api/auth";

import LoginLayout from "../../components/LoginLayout";
import { useNavigate } from "react-router-dom";

const schema = object({
  email: string().email().required().default(""),
});

const initialState = { message: "", error: false };

const ForgotPasswordPage = () => {
  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState(initialState);

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setIsLoading(true);
    const _result = await AuthApi.forgotPassword(data);
    setResult(() => ({ error: _result.statusCode !== 200, message: _result.message }));
    setIsLoading(false);
    if (_result.statusCode === 200) {
      setResult((prev) => ({ ...prev, message: _result.message }));
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
    }
  };

  return (
    <LoginLayout title={"Account Recovery"}>
      <Stack spacing={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {!!result && <Box sx={{ color: result.error ? "red" : "green" }}>{result.message}</Box>}
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
              onFocus={() => setResult(() => initialState)}
            />
          )}
        />
        <>
          <Button type="submit" variant="contained">
            Send
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
