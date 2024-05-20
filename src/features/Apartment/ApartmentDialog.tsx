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
import { useForm, SubmitHandler } from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { ObjectSchema, object, string, number } from "yup";

type ApartmentInputs = Omit<Apartment, "id">;

const schema: ObjectSchema<ApartmentInputs> = object({
  address: string().label("Address").required("Address is required").default(""),
  numberOfRoom: number().label("Number of Rooms").required().min(1).default(1),
  retailPrice: number().label("Retail Price").required().min(100000).default(100000),
});

const ApartmentDialog = NiceModal.create(({ apartment }: { apartment: Apartment }) => {
  // Hook provided by Nice-modal-react
  const modal = useModal();

  const defaultValues = useMemo<ApartmentInputs>(() => {
    if (apartment) {
      const { id, ...others } = apartment;
      return others;
    } else return schema.getDefault();
  }, []);

  const { handleSubmit, control } = useForm<ApartmentInputs>({
    defaultValues: defaultValues,
    resolver: yupResolver<ApartmentInputs>(schema),
  });

  const onSubmitNew: SubmitHandler<ApartmentInputs> = (
    data, //TFieldValues
    event
  ) => {
    event?.preventDefault();
    modal.resolve(apartment ? { id: apartment.id, data: data } : data);
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
      <DialogTitle>New Apartment</DialogTitle>
      <DialogContent>
        <RHFOutlinedTextField
          variant="outlined"
          name="address"
          label="Address"
          control={control}
          margin="dense"
        />
        <RHFOutlinedTextField
          variant="outlined"
          name="retailPrice"
          label="Retail Price"
          type="number"
          control={control}
          inputProps={{ step: 1000, format: "###.###.###" }}
          margin="dense"
        />
        <RHFOutlinedTextField
          variant="outlined"
          name="numberOfRoom"
          label="Number of rooms"
          type="number"
          control={control}
          inputProps={{ min: 1 }}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button type="submit">{apartment ? "Save" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ApartmentDialog;
