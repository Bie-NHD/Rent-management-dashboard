import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { customerInputsSchema } from "../../constants/schema";
import { ObjectSchema, boolean, object, string } from "yup";
import {
  ApiRoutes,
  CustomerRoutes,
  NM_WARNING,
  REGEX_VALID_USERNAME,
  UserRoles,
  UserRoutes,
} from "../../constants";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { Api } from "../../api";
import { useToggleBlockUser, useUpdateUser } from "../../hooks/user";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import NiceModal from "@ebay/nice-modal-react";
import { WarningDialogProps } from "../../types/props";

// TODO: Disable blocking for role:MANAGERs

const roleOptions = [...Object.values(UserRoles)].map((item) => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

const VisuallyHiddenCheckbox = styled(Checkbox)({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditUser = () => {
  const user = useLoaderData() as User;
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const [_errors, setErrors] = useState("");

  const schema: ObjectSchema<UserUpdateDTO> = object({
    active: boolean().required().default(true),
    email: string().email().label("Email").required().default(""),
    fullName: string().label("Username").required().default(""),
    role: string().label("Role").required().default(UserRoles.STAFF),
  });

  const __defaultValues = useMemo(
    () => ({
      active: user?.active,
      email: user?.email,
      fullName: user?.fullName,
      role: user?.role,
    }),
    []
  );

  const { mutate } = useUpdateUser({
    onSuccess(data) {
      if (data.statusCode == 200 || data.statusCode == 201) {
        toast.success(data.message);
        navigate(from || UserRoutes.index);
      } else {
        console.log(data.statusCode, data.message);
        setErrors(data.message);
      }
    },
  });

  const { mutate: toggle } = useToggleBlockUser({
    onSuccess(data) {
      if (data.statusCode == 200 || data.statusCode == 201) {
        toast.success(data.message);
        //  window.location.reload()
        navigate(from || UserRoutes.index);
      } else {
        console.log(data.statusCode, data.message);
        setErrors(data.message);
      }
    },
  });

  const { handleSubmit, control, setValue, getValues, formState } = useForm<UserUpdateDTO>({
    resolver: yupResolver(schema),
    defaultValues: __defaultValues || schema.getDefault() || {},
  });

  const onSubmit: SubmitHandler<UserUpdateDTO> = async (data, event) => {
    event?.preventDefault();

    mutate({ id: user.id, data: data });
  };

  const handleDisableAccount = () => {
    const __active: boolean = getValues()["active"];
    const wn_cntn: WarningDialogProps = {
      title: `Confirm ${__active ? "disabling" : "enabling"} account?`,
    };
    NiceModal.show(NM_WARNING, { props: wn_cntn })
      .then(() => {
        setValue("active", !__active);

        toggle({ active: __active, id: user.id });
      })
      .catch(null);
  };

  return (
    <>
      <PageHeader>Edit User</PageHeader>
      {!!_errors && <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginBlock={3}>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <>
                <FormLabel htmlFor={field.name}>Account status:</FormLabel>
                {field.value ? "Active" : "Inactive"}
                <VisuallyHiddenCheckbox
                  {...field}
                  checked={!!field.value}
                  // onChange={(e) => field.onChange(e.target.checked)}
                />
                <Button onClick={handleDisableAccount} variant="outlined">
                  {`${field.value ? "Disable" : "Enable"} account`}
                </Button>
              </>
            )}
          />
        </Box>
        <RHFOutlinedTextField
          fullWidth
          variant="outlined"
          name="fullName"
          label="Full name"
          control={control}
          margin="dense"
        />
        <RHFOutlinedTextField
          fullWidth
          variant="outlined"
          name="email"
          label="Email"
          control={control}
          margin="dense"
        />
        <Box marginBlock={2}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <>
                <FormLabel htmlFor={field.name}>Role</FormLabel>
                <Select {...field} fullWidth label="Role">
                  {roleOptions}
                </Select>
              </>
            )}
          />
        </Box>
        <Box>
          <Button onClick={() => navigate(from)}>Go back</Button>
          <Button type="submit" variant="contained" disableElevation>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditUser;
