import {
  AutocompleteProps,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { forwardRef } from "react";
import { ApiRoutes, QK_CUSTOMERs } from "../../constants";
import { Api } from "../../api";

type CustomerPageReturns = {
  data: Customer[];
  currentPage: number;
  nextPage: number | null;
};

const __loadingText = (
  <>
    <CircularProgress variant="indeterminate" />
    Loading...
  </>
);

const fetchCustomer = ({ pageParam = 0 }: { pageParam?: number }): Promise<CustomerPageReturns> =>
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
export default SelectCustomer;
