import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ObjectSchema, object, ref, string } from "yup";
import { ChangePasswordProps } from "../../types/props";
import LoginLayout from "../../components/LoginLayout";
import { Box, Button, Container, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import ToggleablePasswordTextField from "../../components/inputs/ToggleablePasswordTextField";
import { Label } from "@mui/icons-material";
import { Api } from "../../api";
import toast from "react-hot-toast";

const schema: ObjectSchema<ChangePasswordProps> = object().shape({
  currentPassword: string().required().default("").label("Current password"),
  newPassword: string()
    .label("New password")
    .ensure()
    .when("currentPassword", {
      is: (value: string) => value != "",
      then: (schema) =>
        schema
          .required()
          .test(
            "newPassword_check",
            "New password must be different from current password",
            function (value: string, context) {
              return context.parent["currentPassword"] != value;
            }
          ),
    }),
  repeatNewPassword: string()
    .label("Repeat password")
    .ensure()
    .when("newPassword", {
      is: (value: string) => value != "",
      then: (schema) =>
        schema.required().oneOf([ref("newPassword")], ({ label }) => `${label} doesn't match.`),
    }),
});
const ChangePassword = () => {
  const { user } = useUser();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
  const [_errors, setErrors] = useState("");
  const { handleSubmit, control } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    const resp = await Api.instance
      .post<ApiResponse>(`/users/changePassword/${user?.id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      .then((res) => res.data);

    if (resp.statusCode == 200) {
      toast.success(resp.message);
      navigate(from);
    } else {
      console.log(resp.statusCode, resp.message);
      setErrors(resp.message);
    }
  };

  return (
    <LoginLayout title={"Change password"}>
      <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {!!_errors && (
          <Box marginBlock={2} padding={2} sx={{ border: "solid red 1px", color: "red" }}>
            {_errors}
          </Box>
        )}
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
                helperText={
                  (!!fieldState.error && fieldState.error.message) || "Your new password here"
                }
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
