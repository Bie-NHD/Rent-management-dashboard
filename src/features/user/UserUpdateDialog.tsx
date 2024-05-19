import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import RHFOutlinedTextField from "../../components/RHFTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";
import { Api } from "../../api";
import { ApiRoutes } from "../../constants";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = Pick<UserUpdateDTO, "email" | "fullName">;

const schema: ObjectSchema<Inputs> = object({
  email: string().email().label("Email").required().default(""),
  fullName: string().label("Username").required().default(""),
});

const UserUpdateDialog = NiceModal.create(({ user }: { user: User }) => {
  const modal = useModal();
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: user || schema.getDefault(),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { id, role, active } = user;

    const res = await Api.update<UserUpdateDTO>(ApiRoutes.user.update, {
      id: id,
      data: { ...data, role, active },
    });

    if (res.statusCode === 200) {
      modal.remove();
      toast.success(res.message);

      return;
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
        <RHFOutlinedTextField variant="outlined" name="fullName" label="Full name" control={control} margin="dense" />
        <RHFOutlinedTextField variant="outlined" name="email" label="Email" control={control} margin="dense" />
        <TextField disabled label="Create Date" value={user.createDate} margin="dense" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button type="submit"> Save </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserUpdateDialog;
