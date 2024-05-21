import React, { useEffect, useMemo, useState } from "react";
import { redirect, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { customerLoader } from "../../utils/routerLoader";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormLabel, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PageHeader from "../../components/PageHeader";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { ApiRoutes, CustomerRoutes } from "../../constants";
import { customerInputsSchema } from "../../constants/schema";
import { useCreateCustomer, useUpdateCustomer } from "../../hooks";
import { Api } from "../../api";

type Inputs = Omit<CustomerUpdateDTO, "dob"> & {
  dob: Date;
};

const EditCustomer = () => {
  const { id } = useParams();
  const customer = useLoaderData() as Customer;

  console.log(customer);

  const __defaultValue = {
    ...customer,
    dob: dayjs(customer.dob).toDate(),
  };

  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const [_errors, setErrors] = useState("");

  const { mutate } = useUpdateCustomer({
    onSuccess(data) {
      if (data.statusCode == 200 || data.statusCode == 201) {
        toast.success(data.message);
        navigate(from || CustomerRoutes.GetAll);
      } else {
        console.log(data.statusCode, data.message);
        setErrors(data.message);
      }
    },
  });

  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: __defaultValue || customerInputsSchema.getDefault() || {},
    resolver: yupResolver<Inputs>(customerInputsSchema),
  });

  const onSubmitNew: SubmitHandler<Inputs> = (__data, event) => {
    event?.preventDefault();

    const customerDto: CustomerUpdateDTO = {
      ...__data,
      dob: dayjs(__data.dob).format(`YYYY-MM-DD`).toString(),
    };

    const __id = id as string;

    console.log(customerDto);

    mutate({ id: __id, data: customerDto });
  };

  return (
    <>
      <PageHeader>Edit Customer</PageHeader>
      {!!_errors && <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>}
      <form onSubmit={handleSubmit(onSubmitNew)}>
        <RHFOutlinedTextField
          control={control}
          name="fullName"
          label="Full name"
          margin="dense"
          variant="outlined"
        />
        <RHFOutlinedTextField
          control={control}
          name="address"
          label="Address"
          margin="dense"
          variant="outlined"
        />
        <RHFOutlinedTextField
          control={control}
          name="citizenId"
          label="Citizen Id"
          margin="dense"
          variant="outlined"
        />
        <RHFOutlinedTextField
          control={control}
          name="phoneNumber"
          label="Phone number"
          margin="dense"
          variant="outlined"
        />
        <Box marginBlock={2}>
          <FormLabel htmlFor="dob"> Date of birth</FormLabel>
          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                <DatePicker
                  {...field}
                  format="DD-MM-YYYY"
                  value={dayjs(field.value)}
                  onChange={(value) => field.onChange(value?.toDate())}
                  disableFuture
                  maxDate={dayjs().subtract(1, "day")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              </LocalizationProvider>
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

export default EditCustomer;
