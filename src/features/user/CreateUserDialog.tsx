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
import { UserRoles, ApiRoutes, NM_WARNING } from "../../constants";

type Inputs = UserUpdateDTO & Pick<User, "username">;

const schema: ObjectSchema<Inputs> = object({
  username: string().label("Username").required().default(""),
  email: string().email().label("Email").required().default(""),
  fullName: string().label("Username").required().default(""),
  active: boolean().label("Active").required().default(true),
  role: string().label("Role").required().default(UserRoles.STAFF),
});

const activeValues = Object.freeze({
  Enabled: true,
  Disabled: false,
} as const);

const roleOptions = [...Object.values(UserRoles)].map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

const CreateUserDialog = NiceModal.create(() => {
  const modal = useModal();
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  // modal.keepMounted = true;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    // TODO: Handle new user

    // async function _handleSubmit() {
    //   const res = await Api.update<UserUpdateDTO>(ApiRoutes.user.update, {
    //     id: user.id,
    //     data: data,
    //   });

    //   if (res.statusCode === 200) {
    //     toast.success(res.message);
    //     modal.remove();
    //   }

    //   toast.error(res.message);
    // }
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
          <FormControlLabel
            label={"Active"}
            control={
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    // onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
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
        <Button
          onClick={() => {
            modal.reject();
            modal.remove();
          }}>
          Cancel
        </Button>
        <Button type="submit"> Save </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CreateUserDialog;
