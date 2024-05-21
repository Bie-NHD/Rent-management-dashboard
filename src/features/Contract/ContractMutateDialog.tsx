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
import dayjs from "dayjs";
import RHFDatePicker from "../../components/inputs/RHFDatePicker";
import { MutateDialogProps } from "../../types/props";

type Inputs = Omit<ContractDTO, "endDate" | "startDate"> & {
  endDate: Date;
  startDate: Date;
};

const schema: ObjectSchema<Inputs> = object({
  apartmentId: string().required().default(""),
  customerId: string().required().default(""),
  endDate: date().required().default(new Date()),
  startDate: date().required().default(new Date()),
});

const ContractMutateDialog = NiceModal.create(
  ({ data, onCreate, onUpdate }: MutateDialogProps<Contract>) => {
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

      // TODO: Handle submit contract

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
        <DialogTitle>New contract</DialogTitle>
        <DialogContent>
          <RHFOutlinedTextField control={control} name="apartmentId" />
          <RHFOutlinedTextField control={control} name="customerId" />
          <RHFDatePicker control={control} name="startDate" label="Start date" />

          <RHFDatePicker control={control} name="endDate" label="End date" />
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.remove}>Cancel</Button>
          <Button type="submit">{data ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ContractMutateDialog;
