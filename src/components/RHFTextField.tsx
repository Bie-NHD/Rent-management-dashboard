import { Input, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import {
  useController,
  Control,
} from "react-hook-form";

type RHFTextFieldProps = TextFieldProps & {
  control: Control<any>;
  name: string;
};

function RHFOutlinedTextField({
  name,
  control,
  ...otherProps
}: RHFTextFieldProps) {
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
    helperText={ !!fieldState.error && fieldState?.error?.message}
    error={!!fieldState.error} // !! is a double boolean operator, convert to Boolean type
    />
  );
}

export default RHFOutlinedTextField;
