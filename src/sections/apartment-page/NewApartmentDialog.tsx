// https://stackoverflow.com/a/73094676/20423795
// https://react-hook-form.com/get-started

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
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { STATUS_OK } from "../../utils/constants";
import toast from "react-hot-toast";
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
import NiceModal, { useModal, antdModal } from "@ebay/nice-modal-react";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IApartmentInputs {
  address: string;
  numberOfRoom: number;
  retailPrice: number;
}

// const defaultValue: IApartmentInputs = {
//   address: "",
//   numberOfRoom: 1,
//   retailPrice: 500000,
// };
//
// define validations for Apartment form
//
let ApartmentSchema = object<IApartmentInputs>({
  address: string().required(),
  numberOfRoom: number().min(1).required().default(1),
  retailPrice: number().min(100000).required().default(100000),
});

type DialogProps = {
  open: boolean;
};

interface ApartmentInputProps extends OutlinedTextFieldProps {
  name: string;
  // register: UseFormRegister<IApartmentInputs>;
  control: Control;
  // fullWidth: true;
  /**
   * @default true
   */
  // required: true;
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

// const NewApartmentDialog = (props: DialogProps) => {
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

//   return (
//     <Dialog
//       open={props.open}
//       onClose={()}
//       PaperProps={{
//         component: "form",
//         onSubmit: (event) => onSubmit(event),
//       }}
//     >
//       <DialogTitle>New Apartment</DialogTitle>
//       <DialogContent></DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button type="submit">Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default NewApartmentDialog;

export default NiceModal.create(() => {
  //
  const modal = useModal();
  //
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    // defaultValues: ApartmentSchema.default,
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
      <DialogContent>
        <Input
          variant="outlined"
          name="address"
          label="Address"
          type="text"
          control={control}
          // {...register("apartment")}
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
