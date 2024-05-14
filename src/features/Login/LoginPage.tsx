//
// https://stackoverflow.com/a/49819545
// https://react-hook-form.com/get-started
//
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Divider, Link, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from "yup";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppRoutes } from "../../constants";
import LoginLayout from "../../components/LoginLayout";
import ToggleablePasswordTextField from "../../components/ToggleablePasswordTextField";

const LoginSchema: ObjectSchema<ApiLoginParams> = object({
  username: string().label("Username").required("Username is required"),
  password: string().label("Password").required("Password is required"),
});

const LoginPage = () => {
  // const location = useLocation();
  // const from = location?.state?.from || "/";

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {},
  });

  const { login, setToken, token } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  console.log(`token ${token}`);

  // If logged in => dashboard
  if (token) return <Navigate to={"/"} replace />;

  // Func

  const onSubmit: SubmitHandler<ApiLoginParams> = async (data) => {
    setIsLoading(true);
    console.log(data);
    const result: boolean = await login(data);
    // if login fails
    if (!result) {
      reset();
    } else navigate("/", { replace: true });
  };

  return (
    <LoginLayout title={"Login"}>
      <Stack spacing={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={`txt-${field.name}`}
              label="Username"
              variant={"outlined"}
              fullWidth
              helperText={fieldState.error && fieldState.error.message}
              error={!!fieldState.error}
            />
          )}
        />
        <Controller
          name={"password"}
          control={control}
          render={({ field, fieldState }) => (
            <ToggleablePasswordTextField
              {...field}
              label="Password"
              error={!!fieldState.error}
              helperText={!!fieldState.error && fieldState.error.message}
            />
          )}
        />
        <Link href={AppRoutes.ForgotPassword}>Forgot password?</Link>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Divider />
        or
        <Button LinkComponent={Link} href={AppRoutes.Register} variant="outlined">
          Create new account
        </Button>
      </Stack>
      {/* <LinearProgress
              variant="indeterminate"
              sx={{ color: "primary.light" }}
            /> */}
    </LoginLayout>
  );
};

export default LoginPage;
