import {
  Box,
  FormLabel,
  Button,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  Paper,
  List,
  MenuItem,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import PageHeader from "../../components/PageHeader";
import RHFOutlinedTextField from "../../components/inputs/RHFTextField";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema, object, string, date } from "yup";
import { AutocompleteProps } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Api } from "../../api";
import { ApiRoutes, QK_APARTMENTS, QK_CUSTOMERs } from "../../constants";
import { useInView } from "react-intersection-observer";
import { useCreateContract } from "../../hooks";
import toast from "react-hot-toast";

type ContractInputs = Omit<ContractDTO, "endDate" | "startDate"> & {
  endDate: Date;
  startDate: Date;
};

const __loadingText = (
  <>
    <CircularProgress variant="indeterminate" />
    Loading...
  </>
);

const schema: ObjectSchema<ContractInputs> = object({
  apartmentId: string().required().default(""),
  customerId: string().required().default(""),
  endDate: date().required().default(new Date()),
  startDate: date().required().default(new Date()),
  // customer
});

type FetchReturns<TData = unknown> = {
  data: TData[];
  currentPage: number;
  nextPage: number | null;
};

const fetchCustomer = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<FetchReturns<Customer>> =>
  Promise.resolve(
    Api.fetch<CustomerApiResponse>(ApiRoutes.customer.GetAll, { page: pageParam }).then(
      (value) => ({
        data: value.customers,
        currentPage: value.page.pageNumber,
        nextPage: value.page.last ? null : value.page.pageNumber + 1,
      })
    )
  );

const fetchApartments = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<FetchReturns<Apartment>> =>
  Promise.resolve(
    Api.fetch<ApartmentApiResponse>(ApiRoutes.apartment.GetAll, { page: pageParam }).then(
      (value) => ({
        data: value.apartments,
        currentPage: value.page.pageNumber,
        nextPage: value.page.last ? null : value.page.pageNumber + 1,
      })
    )
  );

const SelectCustomer = forwardRef(
  (
    props: Omit<
      AutocompleteProps<{ value: string; label: string }, false, false, false>,
      "options" | "renderInput"
    >,
    ref
  ) => {
    // https://youtu.be/aMfBeXD_rnE?si=mXPfGOHLn2pMzPb_

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: [QK_CUSTOMERs],
      initialPageParam: 0,
      queryFn: fetchCustomer,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      select: (data) =>
        data?.pages.flatMap((page) =>
          page.data.flatMap((item) => ({
            value: item.id,
            label: `${item.fullName} - ${item.phoneNumber}`,
          }))
        ) || [],
    });

    // https://github.com/mui/material-ui/issues/18450#issuecomment-776922391
    return (
      <Autocomplete
        ref={ref}
        {...props}
        renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              // type: 'search',
            }}
          />
        )}
        options={data || []}
        getOptionKey={(option) => option.value}
        loading={isLoading}
        loadingText={__loadingText}
        onScroll={(e) => {
          const listboxNode = e.currentTarget;
          if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
            if (hasNextPage) fetchNextPage();
          }
        }}
      />
    );
  }
);
const SelectApartment = forwardRef(
  (
    props: Omit<
      AutocompleteProps<{ value: string; label: string }, false, false, false>,
      "options" | "renderInput"
    >,
    ref
  ) => {
    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: [QK_APARTMENTS],
      initialPageParam: 0,
      queryFn: fetchApartments,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      select: (data) => {
        console.log(data?.pages);

        return (
          data?.pages.flatMap((page) =>
            page.data.flatMap((item) => ({
              value: item.id,
              label: `${item.address} - ${item.numberOfRoom} rooms`,
            }))
          ) || []
        );
      },
    });

    return (
      <Autocomplete
        ref={ref}
        {...props}
        renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              // type: 'search',
            }}
          />
        )}
        options={data || []}
        getOptionKey={(option) => option.value}
        loading={isLoading}
        loadingText={__loadingText}
        onScroll={(e) => {
          const listboxNode = e.currentTarget;
          if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
            if (hasNextPage) fetchNextPage();
          }
        }}
      />
    );
  }
);

const CreateContract = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

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
    defaultValues: schema.__default,
    resolver: yupResolver<ContractInputs>(schema),
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
              <SelectCustomer
                ref={ref}
                onChange={(e, v) => {
                  onChange(v?.value);
                  console.log(`from RHF:`, value);
                }}
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
          render={({ field: { onChange, name, ref, value }, fieldState: { error } }) => (
            <>
              <FormLabel htmlFor={name}>Apartment</FormLabel>
              <SelectApartment
                ref={ref}
                onChange={(e, v) => {
                  onChange(v?.value);
                  console.log(`from RHF:`, value);
                }}
              />
              <FormHelperText>
                {"Choose the apartment" || (!!error && error?.message)}
              </FormHelperText>
            </>
          )}
        />
        {/* FIXME: at DatePicker: TextField cannot receive input */}
        <Box marginBlock={2}>
          <FormLabel htmlFor="dob"> Date of birth</FormLabel>
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
          <FormLabel htmlFor="dob"> Date of birth</FormLabel>
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
