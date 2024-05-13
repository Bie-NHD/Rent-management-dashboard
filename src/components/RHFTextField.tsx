import { Input, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import {
  Controller,
  useFormContext,
  UseControllerProps,
  useController,
  Control,
} from "react-hook-form";

type RHFOutlinedTextFieldProps = TextFieldProps<"outlined"> & {
  control: Control;
  name: string;
};

function RHFOutlinedTextField({
  name,
  control,
  ...otherProps
}: RHFOutlinedTextFieldProps) {
  // const { control } = useFormContext();
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
}

export default RHFOutlinedTextField;
