//
// https://stackoverflow.com/a/49819545
// https://react-hook-form.com/get-started
//

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from "yup";
import { Api } from "../../api";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link as RouterLink } from "react-micro-router";
import { AppRoutes } from "../../constants";

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
  });

  const { login, setToken, token } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOnClickAdornment = () =>
    setShowPassword((showPassword) => !showPassword);

  return (
    <>
      {/* <AppBar position="static"></AppBar> */}
      <Container
        sx={{
          height: "100vh",
          paddingX: "3rem",
          paddingY: "1rem",
          bgcolor: "primary",
        }}
      >
        <Box component={"center"} bgcolor={"primary"}>
          <Typography variant="h2">Login</Typography>
          <Paper
            sx={{ padding: "3rem" }}
            elevation={0}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2} maxWidth={"20rem"}>
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
              <FormControl variant="outlined">
                <InputLabel htmlFor={`txt-password`}>Password</InputLabel>
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <OutlinedInput
                        {...field}
                        id={`txt-${field.name}`}
                        name={field.name}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        error={!!fieldState.error}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleOnClickAdornment}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {fieldState.error ? fieldState.error.message : null}
                      </FormHelperText>
                    </>
                  )}
                />
              </FormControl>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
            <Link
              component={RouterLink}
              to={AppRoutes.ForgotPassword}
              replace
              alignSelf={"start"}
            >
              Forgot password?
            </Link>
            {/* <LinearProgress
              variant="indeterminate"
              sx={{ color: "primary.light" }}
            /> */}
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
