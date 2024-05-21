import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";
import { ChangePasswordProps } from "../../types/props";
import LoginLayout from "../../components/LoginLayout";
import { Box, Button, Container, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import ToggleablePasswordTextField from "../../components/inputs/ToggleablePasswordTextField";

// TODO: Add validation
const schema: ObjectSchema<ChangePasswordProps> = object({
  currentPassword: string().required().default(""),
  newPassword: string().required(),
  repeatNewPassword: string().required(),
});
const ChangePassword = () => {
  const { user } = useUser();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
  });

  // TODO: Handle submit
  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {};

  return (
    <LoginLayout title={"Change password"}>
      <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name={"currentPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <ToggleablePasswordTextField
                {...field}
                label="Old Password"
                error={!!fieldState.error}
                helperText={!!fieldState.error && fieldState.error.message}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                margin="dense"
              />
            )}
          />
          <Controller
            name={"newPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <ToggleablePasswordTextField
                {...field}
                label="New Password"
                error={!!fieldState.error}
                helperText={!!fieldState.error && fieldState.error.message}
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                margin="dense"
              />
            )}
          />
          <Controller
            name={"repeatNewPassword"}
            control={control}
            render={({ field, fieldState }) => (
              <ToggleablePasswordTextField
                {...field}
                label="Repeat new Password"
                error={!!fieldState.error}
                helperText={
                  (!!fieldState.error && fieldState.error.message) ||
                  "This should match the new password"
                }
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
                margin="dense"
              />
            )}
          />
        </Stack>
        <Box marginBlock={2}>
          <Button onClick={() => navigate(from)}>Go back</Button>
          <Button type="submit" variant="contained" disableElevation>
            Confirm changes
          </Button>
        </Box>
      </Container>
    </LoginLayout>
  );
};

export default ChangePassword;
