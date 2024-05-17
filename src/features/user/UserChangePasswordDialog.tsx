import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Api } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import RHFOutlinedTextField from '../../components/RHFTextField';
import { ApiRoutes } from '../../constants';
import { ObjectSchema, object, string } from 'yup';

const schema: ObjectSchema<ChangePasswordProps> = object({
  prevPassword: string().required(),
  newPassword: string().required(),
  repeatNewPassword: string().required(),
  });

const UserChangePasswordDialog =  NiceModal.create(({ user }: { user: UserVM }) => {
    const modal = useModal();
    const { handleSubmit, control } = useForm<ChangePasswordProps>({
      resolver: yupResolver(schema),
      
    });
  
    const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
      
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
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={modal.remove}>Cancel</Button>
          <Button type="submit"> Save </Button>
        </DialogActions>
      </Dialog>
    );
  });

export default UserChangePasswordDialog