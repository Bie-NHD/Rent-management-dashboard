import React from "react";
import LoginLayout from "../../components/LoginLayout";
import { Stack } from "@mui/material";
import { ObjectSchema, object, string } from "yup";

const schema = object({
  username: string().label("Username").required("Username is required"),
  password: string().label("Password").required("Password is required"),
});

const RegisterPage = () => {
  return (
    <LoginLayout title={"Register"}>
      <Stack>RegisterPage</Stack>
    </LoginLayout>
  );
};

export default RegisterPage;
