import {
  CircularProgress,
  AutocompleteProps,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { forwardRef } from "react";
import { Api } from "../../api";
import { ApiRoutes, QK_APARTMENTS } from "../../constants";

const __loadingText = (
  <>
    <CircularProgress variant="indeterminate" />
    Loading...
  </>
);

type ApartmentPageReturns = {
  data: Apartment[];
  currentPage: number;
  nextPage: number | null;
};

const fetchApartments = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ApartmentPageReturns> =>
  Promise.resolve(
    Api.fetch<ApartmentApiResponse>(ApiRoutes.apartment.GetAll, { page: pageParam }).then(
      (value) => ({
        data: value.apartments,
        currentPage: value.page.pageNumber,
        nextPage: value.page.last ? null : value.page.pageNumber + 1,
      })
    )
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
      select: (data) =>
        data?.pages.flatMap((page) =>
          page.data.flatMap((item) => ({
            value: item.id,
            label: `${item.address} - ${item.numberOfRoom} rooms`,
          }))
        ) || [],
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
export default SelectApartment;
