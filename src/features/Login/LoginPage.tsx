//
// https://stackoverflow.com/a/49819545
// https://react-hook-form.com/get-started
//
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Link,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from "yup";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { AppRoutes } from "../../constants";
import LoginLayout from "../../components/LoginLayout";
import ToggleablePasswordTextField from "../../components/ToggleablePasswordTextField";

const styles = {
  Notif: {
    borderColor: "red",
    borderWidth: "1px",
    borderStyle: "solid",
    color: "red",
    padding: "1rem",
  },
};

const schema: ObjectSchema<ApiLoginParams> = object({
  username: string().label("Username").required("Username is required").default(""),
  password: string().label("Password").required("Password is required").default(""),
});

const LoginPage = () => {
  // const location = useLocation();
  // const from = location?.state?.from || "/";

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const { login, setToken, token } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [notif, setNotif] = useState<React.ReactNode[] | React.ReactNode>(null);

  // If logged in => dashboard
  if (token) return <Navigate to={"/"} replace />;

  // Func

  const onSubmit: SubmitHandler<ApiLoginParams> = async (data) => {
    setNotif(null);
    setIsLoading(true);
    console.log(data);
    const { message, statusCode } = await login(data);
    setIsLoading(false);

    // if login fails
    if (statusCode !== 200) {
      setNotif(message);
    } else navigate("/", { replace: true });
  };

  const Notif = () => <>{!!notif && <Box sx={styles.Notif}>{notif}</Box>}</>;

  return (
    <LoginLayout title={"Login"}>
      <Stack spacing={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Notif />
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
        <>
          <Button type="submit" variant="contained">
            Login
          </Button>
          {isLoading ? (
            <LinearProgress variant="indeterminate" sx={{ color: "primary.light" }} />
          ) : null}
        </>
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
