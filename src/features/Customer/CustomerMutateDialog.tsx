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
import { ObjectSchema, object, string, number } from "yup";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/vi";
import dayjs from "dayjs";

const schema: ObjectSchema<CustomerUpdateDTO> = object({
  address: string().required().default(""),
  fullName: string().required().default(""),
  citizenId: string().required().default(""),
  dob: string().datetime().required().default(""),
  phoneNumber: string().required().default(""),
});

const CustomerMutateDialog = NiceModal.create(({ data, onCreate, onUpdate }: CustomerMutateDialogProps) => {
  // Hook provided by Nice-modal-react
  const modal = useModal();

  const { handleSubmit, control } = useForm({
    defaultValues: data || schema.__default,
    resolver: yupResolver(schema),
  });

  const onSubmitNew: SubmitHandler<CustomerUpdateDTO> = (
    _data, //TFieldValues
    event
  ) => {
    event?.preventDefault();
    /**
     * https://stackoverflow.com/a/67535605/20423795
     */
    // data ? onUpdate?.(data) : onCreate?.(data);
    console.log("PRESSED");

    console.log(data);

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
        <RHFOutlinedTextField control={control} name="fullName" label="Full name" margin="dense" variant="outlined" />
        <RHFOutlinedTextField control={control} name="address" label="Address" margin="dense" variant="outlined" />
        <RHFOutlinedTextField control={control} name="citizenId" label="Citizen Id" margin="dense" variant="outlined" />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date of birth"
                // name={field.name}
                {...field}
                value={dayjs(field.value)}
                // inputRef={field.ref}
                onChange={(value) => field.onChange(value?.toString())
                }
                disableFuture 
              />
            )}
          />
        </LocalizationProvider> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button type="submit">{data ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default CustomerMutateDialog;
