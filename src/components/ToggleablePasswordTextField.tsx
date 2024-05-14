import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  OutlinedInputProps,
  FormHelperTextProps,
} from "@mui/material";
import React, { useState } from "react";

interface ToggleablePasswordTextFieldProps extends OutlinedInputProps {
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
}

const ToggleablePasswordTextField = (
  props: ToggleablePasswordTextFieldProps
) => {
  const [visibility, setVisibility] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOnClickAdornment = () =>
    setVisibility((showPassword) => !showPassword);
  return (
    <FormControl error={props.error} variant="outlined">
      <InputLabel htmlFor={`txt-${props.name}`}>{props.label}</InputLabel>
      <OutlinedInput
        {...props}
        id={`txt-${props.name}`}
        type={visibility ? "text" : "password"}
        inputRef={props.inputRef}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleOnClickAdornment}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {visibility ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default ToggleablePasswordTextField;
