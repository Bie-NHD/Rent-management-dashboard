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
import { OutlinedTextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  useForm,
  useController,
  SubmitHandler,
  Control,
} from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import ApartmentSchema from "../../types/ApartmentSchema";

interface ApartmentInputProps extends OutlinedTextFieldProps {
  /**
   * should match the name of keys of type ```Apartment```
   */
  name: "address" | "numberOfRoom" | "retailPrice";
  /**
   * to define ```Control``` element created by ```React-Hook-Form```'s ```useForm``` Hook
   */
  control: Control<Omit<Apartment, "id">, any>;
  /**
   * to define ```step``` HTMLAttribute for ```input["number"]```
   */
}

const Input: React.FC<ApartmentInputProps> = ({
  name,
  control,
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
      helperText={fieldState?.error?.message || ""}
      error={!!fieldState.error} // !! is a double boolean operator, convert to Boolean type
      id={`txt-${field.name}`}
      margin="dense"
      // ref={field.ref}
    />
  );
};

const ApartmentDialog = NiceModal.create(
  ({ apartment }: { apartment: Apartment }) => {
    /**
     * Hook provided by Nice-modal-react
     */
    const modal = useModal();

    const defaultValues = useMemo<Omit<Apartment, "id">>(() => {
      if (apartment) {
        const { id, ...others } = apartment;
        return others;
      } else return ApartmentSchema.getDefault();
    }, []);

    const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm<Omit<Apartment, "id">, any>({
      defaultValues: defaultValues,
      resolver: yupResolver<Omit<Apartment, "id">>(ApartmentSchema),
    });

    const onSubmitNew: SubmitHandler<Omit<Apartment, "id">> = (
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
            inputProps={{ step: 1000, format: "###.###.###" }}
          />
          <Input
            variant="outlined"
            name="numberOfRoom"
            label="Number of rooms"
            type="number"
            control={control}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.remove}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ApartmentDialog;
