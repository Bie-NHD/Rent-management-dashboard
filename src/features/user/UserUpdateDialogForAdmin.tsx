import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import RHFOutlinedTextField from "../../components/RHFTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";
import UserApi from "../../api/user";
import { Api } from "../../api";
import { ApiRoutes, NM_WARNING } from "../../constants";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../../hooks/useUser";
import { findRightPinnedHeadersBeforeCol } from "@mui/x-data-grid/utils/domUtils";
import { UserRoles } from "../../constants/UserRoles";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import { CheckBox } from "@mui/icons-material";

type InputsForAdmin = UserUpdateDTO;

const schema: ObjectSchema<InputsForAdmin> = object({
  email: string().email().label("Email").required().default(""),
  fullName: string().label("Username").required().default(""),
  active: boolean().label("Active").required().default(true),
  role: string().label("Role").required().default(UserRoles.STAFF),
});

const selectOptions = [...Object.values(UserRoles)].map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

const UserUpdateDialogForAdmin = NiceModal.create(({ user }: { user: UserVM }) => {
  const modal = useModal();
  const { handleSubmit, control } = useForm<InputsForAdmin>({
    resolver: yupResolver(schema),
    defaultValues: user || schema.getDefault(),
  });

  modal.keepMounted = true

  const onSubmit: SubmitHandler<InputsForAdmin> = async (data) => {
    if (data.role != user.role) {
      const wn_cntn: WarningDialogProps = {
        title: `Confirm change "role"`,
        content: `Confirm change from "${user.role}" to "${data.role}"? `,
      };

      

      NiceModal.show(NM_WARNING, wn_cntn).then(null, () => {
        modal.show()
        return;
      });
      
    }

    const res = await Api.update<UserUpdateDTO>(ApiRoutes.user.update, {
      id: user.id,
      data: data,
    });

    if (res.statusCode === 200) {
      toast.success(res.message);
      modal.remove();
    }

    toast.error(res.message);
  };

  return (
    <Dialog
      open={modal.visible}
      onClose={() => modal.remove}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
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
          name="active"
          control={control}
          render={({ field }) => (
            <FormControlLabel  label={"Active"} control={<CheckBox {...field}  />} />
          )}
        />
        <br/>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select {...field} defaultValue={control._defaultValues[field.name]} label="Role">
              {selectOptions}
            </Select>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{modal.reject();modal.remove()}}>Cancel</Button>
        <Button type="submit"> Save </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserUpdateDialogForAdmin;
