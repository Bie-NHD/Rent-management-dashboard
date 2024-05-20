import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "@mui/icons-material";
import {
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControlLabel,
  Checkbox,
  Select,
  DialogActions,
  Button,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { ObjectSchema, object, string, boolean } from "yup";
import user from "../../api/user";
import RHFOutlinedTextField from "../../components/RHFTextField";
import { UserRoles, ApiRoutes, NM_WARNING, REGEX_VALID_USERNAME } from "../../constants";

type Inputs = Omit<UserUpdateDTO, "active"> & Pick<User, "username">;

const schema: ObjectSchema<Inputs> = object({
  username: string().label("Username").required().default("").matches(REGEX_VALID_USERNAME),
  email: string().email().label("Email").required().default(""),
  fullName: string().label("Username").required().default(""),
  role: string().label("Role").required().default(UserRoles.STAFF),
});

const roleOptions = [...Object.values(UserRoles)].map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

const CreateUserDialog = NiceModal.create(({ onCreate }: MutateDialogProps) => {
  const modal = useModal();
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.preventDefault();
    console.log(data);

    await onCreate?.(data);
    modal.remove();
  };

  return (
    <Dialog
      open={modal.visible}
      onClose={() => modal.remove}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <Stack>
          <RHFOutlinedTextField
            variant="outlined"
            name="username"
            label="Username"
            control={control}
            margin="dense"
            InputProps={{ startAdornment: <InputAdornment position="start">@</InputAdornment> }}
          />
          <RHFOutlinedTextField
            variant="outlined"
            name="fullName"
            label="Full name"
            control={control}
            margin="dense"
          />
          <RHFOutlinedTextField
            variant="outlined"
            name="email"
            label="Email"
            control={control}
            margin="dense"
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Role">
                {roleOptions}
              </Select>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button type="submit"> Save </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CreateUserDialog;
