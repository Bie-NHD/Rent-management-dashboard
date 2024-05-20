// https://stackoverflow.com/a/73094676/20423795
// https://react-hook-form.com/get-started
//
// https://stackoverflow.com/questions/65459720/how-to-customize-yup-validation-messages

import React from "react";
import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFOutlinedTextField from "../../components/RHFTextField";
import { ObjectSchema, object, string, number, date } from "yup";
import { Box, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/vi";
import dayjs from "dayjs";

type Inputs = Omit<CustomerUpdateDTO, "dob"> & {
  dob: Date;
};

const schema: ObjectSchema<Inputs> = object({
  address: string().required().default(""),
  fullName: string().required().default(""),
  citizenId: string().required().default(""),
  // dob: string().datetime().required().default(""),
  dob: date().required().default(new Date()),
  phoneNumber: string().required().default(""),
});

const CustomerMutateDialog = NiceModal.create(
  ({ data, onCreate, onUpdate }: MutateDialogProps<Customer>) => {
    // Hook provided by Nice-modal-react
    const modal = useModal();

    const { handleSubmit, control } = useForm<Inputs>({
      defaultValues: data || schema.__default,
      resolver: yupResolver<Inputs>(schema),
    });

    const onSubmitNew: SubmitHandler<Inputs> = (
      _data, //TFieldValues
      event
    ) => {
      event?.preventDefault();

      // TODO: Handle submit customer

      /**
       * https://stackoverflow.com/a/67535605/20423795
       */
      // data ? onUpdate?.(data) : onCreate?.(data);
      console.log("PRESSED");

      console.log(_data);

      modal.remove();
    };

    return (
      <Dialog
        open={modal.visible}
        onClose={() => modal.remove}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmitNew),
        }}>
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
          <RHFOutlinedTextField
            control={control}
            name="fullName"
            label="Full name"
            margin="dense"
            variant="outlined"
          />
          <RHFOutlinedTextField
            control={control}
            name="address"
            label="Address"
            margin="dense"
            variant="outlined"
          />
          <RHFOutlinedTextField
            control={control}
            name="citizenId"
            label="Citizen Id"
            margin="dense"
            variant="outlined"
          />
          <RHFOutlinedTextField
            control={control}
            name="phoneNumber"
            label="Phone number"
            margin="dense"
            variant="outlined"
          />
          <Box>
            <Controller
              name="dob"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                  <DatePicker
                    {...field}
                    label="Date of birth"
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
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.remove}>Cancel</Button>
          <Button type="submit">{data ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CustomerMutateDialog;