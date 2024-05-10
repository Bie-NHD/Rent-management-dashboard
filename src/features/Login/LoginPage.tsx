//
// https://stackoverflow.com/a/49819545
// https://react-hook-form.com/get-started
//

import {
  useForm,
  SubmitHandler,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ObjectSchema } from "yup";
import { Api } from "../../api";

const LoginSchema: ObjectSchema<ApiLoginParams> = object({
  username: string().label("Username").required().default(""),
  password: string().label("Password").default(""),
});

const LoginInput = ({
  name,
  control,
  ...otherProps
}: UseControllerProps<ApiLoginParams> & TextFieldProps<"outlined">) => {
  const {
    field, // { name, value, onChange, onBlur }
    fieldState,
  } = useController({ name, control });

  return (
    <TextField
      {...field}
      {...otherProps}
      fullWidth
      helperText={fieldState.error && fieldState.error.message}
      error={!!fieldState.error}
      id={`txt-${field.name}`}
    />
  );
};

const LoginPage = () => {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ApiLoginParams> = (data) => {
    console.log(data);
    Api.login(data);
  };

  return (
    <Container>
      <center>
        <Typography variant="h2">Login</Typography>
        <Paper>
          <Stack
            spacing={2}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <LoginInput
              control={control}
              name="username"
              label="Username"
              variant={"outlined"}
            />
            <LoginInput
              control={control}
              name="password"
              type="password"
              label="Password"
              variant={"outlined"}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </Paper>
      </center>
    </Container>
  );
};

export default LoginPage;
