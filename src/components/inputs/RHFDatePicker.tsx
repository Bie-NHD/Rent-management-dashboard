import Box from "@mui/material/Box";
import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Control, useController } from "react-hook-form";

type RHFDatePickerProps<TDate extends dayjs.Dayjs = dayjs.Dayjs> = DatePickerProps<TDate, false> &
  React.RefAttributes<HTMLDivElement> & {
    name: string;
    control: Control<any>;
    adapterLocale?: string;
  };

const RHFDatePicker = ({ name, control, ...props }: RHFDatePickerProps) => {
  const {
    field, // { name, value, onChange, onBlur }
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={props.adapterLocale || "vi"}>
        <DatePicker
          {...field}
          {...props}
          format="DD-MM-YYYY"
          // name={field.name}
          value={dayjs(field.value)}
          inputRef={field.ref}
          onChange={(value) => field.onChange(value?.toDate())}
          disableFuture
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!error,
              helperText: error?.message,
              margin: "dense",
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default RHFDatePicker;
