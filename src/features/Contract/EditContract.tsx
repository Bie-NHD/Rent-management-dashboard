import { Box, FormLabel, Button, FormHelperText, useTheme } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PageHeader from "../../components/PageHeader";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateContract } from "../../hooks";
import toast from "react-hot-toast";
import useUser from "../../hooks/useUser";
import { createContractSchema } from "../../constants/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiRoutes, QK_APARTMENTS, QK_CUSTOMERs } from "../../constants";
import { Api } from "../../api";
import ReactSelectMaterialUi from "react-select-material-ui";

const EditContract = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
  const { user } = useUser();
  const originalContract = useLoaderData() as ContractResponseDTO;
  const [_errors, setErrors] = useState("");
  const theme = useTheme();

  console.log("originalContract: ", originalContract);

  const __defaultValue: ContractInputs = useMemo(
    () => ({
      customerId: originalContract.customerId,
      endDate: dayjs(originalContract.endDate).toDate(),
      startDate: dayjs(originalContract.startDate).toDate(),
      apartmentId: originalContract.apartmentId,
    }),
    []
  );

  const { mutate } = useUpdateContract({
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

  const {
    data: customers,
    isLoading: isCustomersLoading,
    fetchNextPage: fetchNextCustomerPage,
    hasNextPage: hasNextCustomersPage,
  } = useInfiniteQuery({
    queryKey: [QK_CUSTOMERs],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      Api.fetch<CustomerApiResponse>(ApiRoutes.customer.GetAll, { page: pageParam }).then(
        (value) => ({
          data: value.customers,
          currentPage: value.page.pageNumber,
          nextPage: value.page.last ? null : value.page.pageNumber + 1,
        })
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) =>
      data?.pages.flatMap((page) =>
        page.data.flatMap((item) => ({
          value: item.id,
          label: `${item.fullName} - ${item.phoneNumber}`,
        }))
      ) || [],
  });

  const {
    data: apartments,
    isLoading: isApartmentsLoading,
    fetchNextPage: fetchNextApartmentsPage,
    hasNextPage: hasNextApartmentsPage,
  } = useInfiniteQuery({
    queryKey: [QK_APARTMENTS],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      Api.fetch<ApartmentApiResponse>(ApiRoutes.apartment.GetAll, { page: pageParam }).then(
        (value) => ({
          data: value.apartments,
          currentPage: value.page.pageNumber,
          nextPage: value.page.last ? null : value.page.pageNumber + 1,
        })
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) =>
      data?.pages.flatMap((page) =>
        page.data.flatMap((item) => ({
          value: item.id,
          label: `${item.address} - ${item.numberOfRoom} rooms`,
        }))
      ) || [],
  });

  const { handleSubmit, control } = useForm<ContractInputs>({
    defaultValues: __defaultValue || createContractSchema.getDefault() || {},
    resolver: yupResolver<ContractInputs>(createContractSchema),
  });

  const onSubmitNew: SubmitHandler<ContractInputs> = (
    _data, //TFieldValues
    event
  ) => {
    event?.preventDefault();
    const dto: ContractDTO = {
      customerId: _data.customerId,
      apartmentId: _data.apartmentId,
      startDate: dayjs(_data.startDate).format(`YYYY-MM-DD`).toString(),
      endDate: dayjs(_data.endDate).format(`YYYY-MM-DD`).toString(),
      userId: user!.id,
    };
    mutate({ data: dto, id: originalContract.id });
  };

  return (
    <>
      <PageHeader>Edit Contract</PageHeader>
      {!!_errors && <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>}
      <form onSubmit={handleSubmit(onSubmitNew)}>
        <Controller
          control={control}
          name="customerId"
          render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor={name}>Customer</FormLabel>

              <ReactSelectMaterialUi
                name={name}
                options={customers || []}
                onChange={(e, v) => onChange(v)}
                onScroll={(e) => {
                  const listboxNode = e.currentTarget;
                  if (
                    hasNextCustomersPage &&
                    listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight
                  ) {
                    fetchNextCustomerPage();
                  }
                }}
                fullWidth
                defaultValue={__defaultValue.customerId}
                InputLabelProps={{ style: theme.components?.MuiInputLabel?.defaultProps }}
              />
              <FormHelperText>
                {"Choose the customer" || (!!error && error?.message)}
              </FormHelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="apartmentId"
          defaultValue={__defaultValue.apartmentId}
          render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor={name}>Apartment</FormLabel>
              <ReactSelectMaterialUi
                name={name}
                options={apartments || []}
                onChange={(e, v) => onChange(v)}
                onScroll={(e) => {
                  const listboxNode = e.currentTarget;
                  if (
                    hasNextApartmentsPage &&
                    listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight
                  ) {
                    fetchNextApartmentsPage();
                  }
                }}
                fullWidth
                defaultValue={__defaultValue.apartmentId}
                InputLabelProps={{ style: theme.components?.MuiInputLabel?.defaultProps }}
              />
              <FormHelperText>
                {"Choose the apartment" || (!!error && error?.message)}
              </FormHelperText>
            </>
          )}
        />
        {/* FIXME: at DatePicker: TextField cannot receive input */}
        <Box marginBlock={2}>
          <FormLabel htmlFor="dob">Start date</FormLabel>
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
          <FormLabel htmlFor="dob">End date</FormLabel>
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

export default EditContract;
