import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomerRoutes } from "../../constants";
import dayjs from "dayjs";
import PageHeader from "../../components/PageHeader";
import { Box, Button, FormLabel } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { useCreateCustomer } from "../../hooks/customer";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { redirect } from "react-micro-router";
import { customerInputsSchema } from "../../constants/schema";

type Inputs = Omit<CustomerUpdateDTO, "dob"> & {
  dob: Date;
};

const CreateCustomer = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const [_errors, setErrors] = useState("");

  const { mutate } = useCreateCustomer({
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
    defaultValues: customerInputsSchema.getDefault() || {},
    resolver: yupResolver<Inputs>(customerInputsSchema),
  });

  const onSubmitNew: SubmitHandler<Inputs> = (__data, event) => {
    event?.preventDefault();

    const customerDto: CustomerUpdateDTO = {
      ...__data,
      dob: dayjs(__data.dob).format(`YYYY-MM-DD`).toString(),
    };

    console.log(customerDto);

    mutate(customerDto);
  };

  return (
    <>
      <PageHeader>New Customer</PageHeader>
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
          type="tel"
          label="Phone number"
          margin="dense"
          variant="outlined"
        />
        {/* FIXME: at DatePicker: TextField cannot receive input */}
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

export default CreateCustomer;
