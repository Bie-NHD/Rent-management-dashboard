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
import { ApiRoutes, QK_CUSTOMERs } from "../../constants";
import { useInView } from "react-intersection-observer";

// TODO: Create Contract Page

type ContractInputs = Omit<ContractDTO, "endDate" | "startDate"> & {
  endDate: Date;
  startDate: Date;
};

type SelectCustomerProps = AutocompleteProps<string, false, false, false> & {
  control: Control<any>;
};

type CustomerOption = { id: string; label: string };

const schema: ObjectSchema<ContractInputs> = object({
  apartmentId: string().required().default(""),
  customerId: string().required().default(""),
  endDate: date().required().default(new Date()),
  startDate: date().required().default(new Date()),
  // customer
});

type FetchCustomerData = { data: Customer[]; currentPage: number; nextPage: number | null };

const fetchCustomer = ({ pageParam = 0 }: { pageParam?: number }): Promise<FetchCustomerData> =>
  Promise.resolve(
    Api.fetch<CustomerApiResponse>(ApiRoutes.customer.GetAll, { page: pageParam }).then(
      (value) => ({
        data: value.customers,
        currentPage: value.page.pageNumber,
        nextPage: value.page.last ? null : value.page.pageNumber + 1,
      })
    )
  );
const SelectCustomer = forwardRef(
  (
    props: Omit<AutocompleteProps<CustomerOption, false, false, false>, "options" | "renderInput">,
    ref
  ) => {
    // https://youtu.be/aMfBeXD_rnE?si=mXPfGOHLn2pMzPb_

    const { data, isLoading, error, fetchNextPage, isFetched, isFetching, hasNextPage } =
      useInfiniteQuery({
        queryKey: [QK_CUSTOMERs],
        initialPageParam: 0,
        queryFn: fetchCustomer,
        getNextPageParam: (lastPage) => lastPage.nextPage,
      });

    const { ref: observerRef, inView } = useInView();

    // const selectOptions

    const renderedData = useMemo(
      () =>
        data?.pages.flatMap((page) =>
          page.data.flatMap((item) => ({ id: item.id, label: `${item.fullName }-${item.citizenId}`}))
        ) || [],
      [data?.pages]
    );

    const renderedMenuItems = useMemo(
      () => (
        <List>
          {!!data &&
            data?.pages.map((page) => (
              <div key={page.currentPage}>
                {page.data.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.fullName}
                  </MenuItem>
                ))}
              </div>
            ))}
        </List>
      ),
      [data?.pages]
    );

    useEffect(() => {
      if (inView && hasNextPage){ setTimeout (()=>fetchNextPage(),3000) ; console.log("hasNExtPage:",hasNextPage);
      }
    }, [inView]);

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
        options={renderedData || []}
        // getOptionLabel={(option) => option.fullName}
        // renderOption={({id,fullName})=><Menu}
        PaperComponent={({ children }) => (
          <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
            {/* {renderedMenuItems} */}
            {children}
            {hasNextPage && (
              <div id="customer-intersection-observer" ref={observerRef}>
                {/* {isLoading && ( */}
                  <>
                    <CircularProgress variant="indeterminate" />
                    Loading...
                  </>
                {/* )} */}
              </div>
            )}
          </Paper>
        )}
        onChange={(e,value)=>console.log(value)
        }
      />
    );

    // return (
    //   <div>
    //     {isLoading ? (
    //       <CircularProgress />
    //     ) : (
    //       <>
    //         {renderedMenuItems}
    //         <div id="customer-intersection-observer" ref={observerRef}>
    //           {isLoading && hasNextPage && (
    //             <>
    //               <CircularProgress variant="indeterminate" />
    //               Loading...
    //             </>
    //           )}
    //         </div>
    //       </>
    //     )}
    //   </div>
    // );
  }
);

const CreateContract = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();

  const [_errors, setErrors] = useState("");

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
  };

  return (
    <>
      <PageHeader>New Contract</PageHeader>
      <Box sx={{ border: "solid red 1px", color: "red" }}>{_errors}</Box>
      <form onSubmit={handleSubmit(onSubmitNew)}>
        {/* <Controller
          control={control}
          name="customerId"
          // FIXME: Incompatible value ref
          render={({ field }) => <SelectCustomer {...field} />}
        /> */}
        <Box>
          <Button onClick={() => navigate(from)}>Go back</Button>
          <Button type="submit" variant="contained" disableElevation>
            Save
          </Button>
        </Box>
      </form>
      <SelectCustomer />
    </>
  );
};

export default CreateContract;
