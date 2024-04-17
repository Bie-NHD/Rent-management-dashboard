import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Stack, Skeleton } from "@mui/material";
import { useApartments } from "../../hooks";
import Apartment from "../../models/Apartment";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorPlaceHolder from "../../components/placeholder/ErrorPlaceHolder";

// ------------------------------------

const Loading = () => (
  <Stack spacing={2} sx={{ minHeight: "100", height: "40%", marginY: "2rem" }}>
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"20%"}
      sx={{ minHeight: 30 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
  </Stack>
);

// ------------------------------------

const ApartmentTable = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  /**
   *  Data fetching
   */
  const {
    isLoading,
    isError,
    isRefetching,
    data: { data = [], meta } = {},
    error,
    refetch,
  } = useApartments({
    variables: {
      page: pagination.pageIndex, //refetch when pagination.pageIndex changes
      pageSize: pagination.pageSize, //refetch when pagination.pageSize changes
      sortBy: sorting?.map((value) => value.id).toString(), //refetch when sorting changes
    },
  });

  // Define columns ---------------------------------------
  const columns = useMemo<MRT_ColumnDef<Apartment>[]>(
    () => [
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "numberOfRoom",
        header: "Number Of Room",
      },
      {
        accessorKey: "retailPrice",
        header: "Retail Price",
      },
    ],
    []
  );

  // Define table -----------------------------------------

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    rowCount: meta?.totalRowCount ?? 0,
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isLoading || isRefetching,
      sorting,
    },
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
  });

  // -------------------------------------------------------

  // Show loading
  if (isLoading) return <Loading />;
  // Show, throw Error
  if (isError) {
    console.log(error || new Error("Error with ApartmentTable"));
    return <ErrorPlaceHolder onClick={undefined} />;
  }

  // -------------------------------------------------------

  return <MaterialReactTable table={table} />;
};

export default ApartmentTable;
