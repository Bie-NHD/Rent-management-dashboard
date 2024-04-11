// https://stackoverflow.com/a/73094676/20423795
// https://react-hook-form.com/get-started
//
// https://stackoverflow.com/questions/65459720/how-to-customize-yup-validation-messages

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  Modal,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { APARTMENT_API as api } from "../../api";
import {
  useForm,
  useController,
  UseControllerProps,
  SubmitHandler,
  Path,
  UseFormRegister,
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import IApartment from "../../models/IApartment";
import ApartmentSchema from "../../models/ApartmentSchema";

// const defaultValue: IApartmentInputs = {
//   address: "",
//   numberOfRoom: 1,
//   retailPrice: 500000,
// };
//
// define validations for Apartment form
//

interface ApartmentInputProps extends OutlinedTextFieldProps {
  name: string;
  // register: UseFormRegister<IApartmentInputs>;
  /**
   * to define ```Control``` element created by ```React-Hook-Form```'s ```useForm``` Hook
   */
  control: Control;
  /**
   * to define ```step``` HTMLAttribute for ```input["number"]```
   */
  step?: number;
  type: React.InputHTMLAttributes<unknown>["type"];
  // defaultValue?: string;
}

const Input: React.FC<ApartmentInputProps> = ({
  name,
  control,
  step,
  type,
  ...otherProps
}: // defaultValue
ApartmentInputProps) => {
  // Hook rpovided by React-Hook-Form
  const { field, fieldState } = useController({
    name,
    control,
    // defaultValue: defaultValue || "",
  });
  return (
    <TextField
      {...field}
      {...otherProps}
      required
      fullWidth
      helperText={fieldState.error ? fieldState.error.message : null}
      id={`txt-${field.name}`}
      inputProps={{ step: step ?? undefined }}
      margin="dense"
      // variant="outlined"
      type={type}
    />
  );
};

const onSubmit = (data: any) => {
  console.log(data);
};

//   function handleSubmit(event: Event | FormDataEvent) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget as HTMLFormElement);
//     const formJson = Object.fromEntries(formData.entries());

//     api.add(formJson).then((data) => {
//       console.log(data);
//       if (STATUS_OK.indexOf(data.statusCode) !== -1) {
//         // notify success
//         toast.success("Successfully updated!");
//         // update apartment
//         // _loadApartments();
//       } else {
//         // Notify error from server
//         toast.error(data.message);
//       }
//     });
//     // Close dialog
//   }

export default NiceModal.create(() => {
  /**
   * Hook provided by Nice-modal-react
   */
  const modal = useModal();
  //
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: ApartmentSchema.getDefault(),
    resolver: yupResolver(ApartmentSchema),
  });
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
