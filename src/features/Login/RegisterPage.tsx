import LoginLayout from "../../components/LoginLayout";
import { Button, Stack } from "@mui/material";
import { ObjectSchema, object, string } from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import ToggleablePasswordTextField from "../../components/inputs/ToggleablePasswordTextField";

interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
}

const schema: ObjectSchema<RegisterInputs> = object({
  username: string().label("Username").required("Username is required"),
  email: string().email().required(),
  password: string().label("Password").required("Password is required"),
  password_repeat: string().required(),
});

const RegisterPage = () => {
  const { control, handleSubmit, setError } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    if (data.password_repeat !== data.password) {
      const err_msg = "Repeat password does not match Password";

      setError("password_repeat", { message: err_msg }, { shouldFocus: true });
    } else {
      console.log(data);
    }
  };

  return (
    <LoginLayout title={"Register"}>
      <Stack spacing={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <RHFOutlinedTextField
          control={control}
          name="username"
          label="Username"
          variant={"outlined"}
        />
        <RHFOutlinedTextField control={control} name="email" label="Email" variant={"outlined"} />
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
        <Controller
          name={"password_repeat"}
          control={control}
          render={({ field, fieldState }) => (
            <ToggleablePasswordTextField
              {...field}
              label="Repeat Password"
              error={!!fieldState.error}
              helperText={
                (!!fieldState.error && fieldState.error.message) || "Repeat your password here"
              }
            />
          )}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Stack>
    </LoginLayout>
  );
};

export default RegisterPage;
