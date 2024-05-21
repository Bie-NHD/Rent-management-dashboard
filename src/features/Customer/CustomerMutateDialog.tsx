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
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { ObjectSchema, object, string, number, date } from "yup";
import { Box, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/vi";
import dayjs, { Dayjs } from "dayjs";
import { REGEX_VALID_CITIZENID, REGEX_VALID_PHONE_NUMBER } from "../../constants";
import { MutateDialogProps } from "../../types/props";

type Inputs = Omit<CustomerUpdateDTO, "dob"> & {
  dob: Date;
};

/**
 * TODO: Validate inputs
 */

const schema: ObjectSchema<Inputs> = object({
  address: string().required().default(""),
  fullName: string().required().default(""),
  citizenId: string()
    .matches(REGEX_VALID_CITIZENID, ({ label }) => `${label} must only contains number`)
    .length(12)
    .required()
    .default("")
    .label("Citizen Id"),
  // dob: string().datetime().required().default(""),
  dob: date().required().default(new Date()),
  phoneNumber: string()
    .required()
    .default("")
    .label("Phone number")
    .length(10)
    .matches(REGEX_VALID_PHONE_NUMBER, ({ label }) => `${label} not valid`),
});

const CustomerMutateDialog = NiceModal.create(
  ({ data, onCreate, onUpdate }: MutateDialogProps<Customer>) => {
    // Hook provided by Nice-modal-react
    const modal = useModal();

    const _defaultValue = useMemo(
      () => (!!data ? { ...data, dob: dayjs(data?.dob).toDate() } : schema.__default),
      [data]
    );

    const { handleSubmit, control } = useForm<Inputs>({
      defaultValues: _defaultValue,
      resolver: yupResolver<Inputs>(schema),
    });

    const onSubmitNew: SubmitHandler<Inputs> = (__data, event) => {
      event?.preventDefault();

      const customerDto: CustomerUpdateDTO = {
        ...__data,
        dob: dayjs(__data.dob).format(`YYYY-MM-DD`).toString(),
      };

      console.log(customerDto);

      new Promise((resolve, reject) => {
        // update type: {id,data:dto}; create type: dto
        if (!!data) {
          const customerUpdateDto: ApiUpdateParams<CustomerUpdateDTO> = {
            id: data!.id,
            data: customerDto,
          };
          /**
           * https://stackoverflow.com/a/67535605/20423795
           */
          return resolve(onUpdate?.(customerUpdateDto));
        } else return resolve(onCreate?.(customerDto));
      }).finally(() => {
        modal.remove();
      });
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
          <Box marginBlock={1}>
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
                    maxDate={new Dayjs().subtract(1, "day")}
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
