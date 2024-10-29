import { Box, FormLabel, Button, FormHelperText } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PageHeader from "../../components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateContract } from "../../hooks";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";
import { createContractSchema } from "../../constants/schema";
import SelectCustomer from "../../components/inputs/SelectCustomer";
import SelectApartment from "../../components/inputs/SelectApartment";

const CreateContract = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
  const { user } = useUser();

  const [_errors, setErrors] = useState("");

  const { mutate } = useCreateContract({
    onSuccess(data) {
      if (data.statusCode == 200 || data.statusCode == 201) {
        toast.success(data.message);
        navigate(from);
      } else {
        console.log(data.statusCode, data.message);
        setErrors(data.message);
      }
    },
  });

  const { handleSubmit, control } = useForm<ContractInputs>({
    defaultValues: createContractSchema.__default,
    resolver: yupResolver<ContractInputs>(createContractSchema),
  });

  const onSubmitNew: SubmitHandler<ContractInputs> = (
    _data, //TFieldValues
    event
  ) => {
    event?.preventDefault();

    // TODO: Handle submit contract

    /**
     * https://stackoverflow.com/a/67535605/20423795
     */
    // data ? onUpdate?.(data) : onCreate?.(data);
    console.log("PRESSED");

    console.log(_data);

    const dto: ContractDTO = {
      customerId: _data.customerId,
      apartmentId: _data.apartmentId,
      startDate: dayjs(_data.startDate).format(`YYYY-MM-DD`).toString(),
      endDate: dayjs(_data.endDate).format(`YYYY-MM-DD`).toString(),
      userId: user!.id,
    };
    console.log(dto);
    mutate(dto);
  };

  return (
    <>
      <PageHeader>New Contract</PageHeader>
      {!!_errors && <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>}
      <form onSubmit={handleSubmit(onSubmitNew)}>
        <Controller
          control={control}
          name="customerId"
          render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor={name}>Customer</FormLabel>
              <SelectCustomer ref={ref} onChange={(e, v) => onChange(v?.value)} />
              <FormHelperText>
                {"Choose the customer" || (!!error && error?.message)}
              </FormHelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="apartmentId"
          render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor={name}>Apartment</FormLabel>
              <SelectApartment ref={ref} onChange={(e, v) => onChange(v?.value)} />
              <FormHelperText>
                {"Choose the apartment" || (!!error && error?.message)}
              </FormHelperText>
            </>
          )}
        />
        {/* FIXME: at DatePicker: TextField cannot receive input */}
        <Box marginBlock={2}>
          <FormLabel htmlFor="startDate">Date start</FormLabel>
          <Controller
            name="startDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                <DatePicker
                  {...field}
                  format="DD-MM-YYYY"
                  value={dayjs(field.value)}
                  onChange={(value) => field.onChange(value?.toDate())}
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
        {/* FIXME: at DatePicker: TextField cannot receive input */}
        <Box marginBlock={2}>
          <FormLabel htmlFor="endDate">Date end</FormLabel>
          <Controller
            name="endDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                <DatePicker
                  {...field}
                  format="DD-MM-YYYY"
                  value={dayjs(field.value)}
                  onChange={(value) => field.onChange(value?.toDate())}
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
      {/* <SelectCustomer /> */}
    </>
  );
};

export default CreateContract;
