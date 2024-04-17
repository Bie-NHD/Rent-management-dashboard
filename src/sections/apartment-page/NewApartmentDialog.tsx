// https://stackoverflow.com/a/73094676/20423795
// https://react-hook-form.com/get-started
//
// https://stackoverflow.com/questions/65459720/how-to-customize-yup-validation-messages

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { OutlinedTextFieldProps, TextField } from "@mui/material";
import { APARTMENT_API } from "../../api/apartment";
import {
  useForm,
  useController,
  SubmitHandler,
  Control,
} from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
// import TApartmentInputs from "../../models/TApartmentFormInputs";
import ApartmentSchema from "../../models/ApartmentSchema";
import toast from "react-hot-toast";
import { STATUS_OK } from "../../utils/constants";
import { Apartment } from "../../models";

interface ApartmentInputProps extends OutlinedTextFieldProps {
  /**
   * should match the name of keys of ```IApartmentFormInputs```
   */
  name: "address" | "numberOfRoom" | "retailPrice";
  /**
   * to define ```Control``` element created by ```React-Hook-Form```'s ```useForm``` Hook
   */
  control: Control<Omit<Apartment, "id">, any>;
  /**
   * to define ```step``` HTMLAttribute for ```input["number"]```
   */
  // step?: number;
  type: React.InputHTMLAttributes<unknown>["type"];
}

const Input: React.FC<ApartmentInputProps> = ({
  name,
  control,
  // step,
  type,
  ...otherProps
}: ApartmentInputProps) => {
  // Hook rpovided by React-Hook-Form
  const {
    field, // { name, value, onChange, onBlur }
    fieldState, // {error}
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      {...field}
      {...otherProps}
      fullWidth
      helperText={fieldState.error ? fieldState.error.message : ""}
      error={!!fieldState.error} // !! is a double boolean operator, convert to Boolean type
      id={`txt-${field.name}`}
      // inputProps={{ step: step ?? undefined }}
      margin="dense"
      type={type}
      ref={field.ref}
    />
  );
};

export default NiceModal.create(() => {
  /**
   * Hook provided by Nice-modal-react
   */
  const modal = useModal();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Omit<Apartment, "id">, any>({
    defaultValues: ApartmentSchema.getDefault(),
    resolver: yupResolver<Omit<Apartment, "id">>(ApartmentSchema),
  });

  const onSubmit: SubmitHandler<Omit<Apartment, "id">> = (
    data, //TFieldValues
    event
  ) => {
    event?.preventDefault();

    APARTMENT_API.add(data).then((data: any) => {
      console.log(data);
      if (STATUS_OK.indexOf(data.statusCode) !== -1) {
        // notify success
        toast.success(`${data.message} updated`);
        modal.remove();
      } else {
        // Notify error from server
        toast.error(data.message);
      }
    });
  };

  return (
    <Dialog
      open={modal.visible}
      onClose={() => modal.remove}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>New Apartment</DialogTitle>
      <DialogContent>
        <Input
          variant="outlined"
          name="address"
          label="Address"
          type="text"
          control={control}
        />
        <Input
          variant="outlined"
          name="retailPrice"
          label="Retail Price"
          type="number"
          control={control}
        />
        <Input
          variant="outlined"
          name="numberOfRoom"
          label="Number of rooms"
          type="number"
          control={control}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
});
