import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_ShowHideColumnsButton,
  MRT_SortingState,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ErrorPlaceHolder from "../../components/placeholder/ErrorPlaceHolder";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import { AppRoutes, QK_APARTMENTS, NM_APARTMENT, NM_WARNING } from "../../constants";
import TableLoading from "../../components/placeholder/TableLoading"; // Hooks ------------------------------
import { useQueryClient } from "@tanstack/react-query";
import { useGetApartments, useUpdateApartment } from "../../hooks";
import { useMemo, useState } from "react";
import MRTTableRowActions from "../../components/MRTRowAction";
import MRTRefreshButton from "../../components/MRTRefreshButton";
import getDefaultMRTOptions from "../../utils/defaultMRTOptions";
// ------------------------------------

const columnDefs: MRT_ColumnDef<Apartment>[] = [
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
];

// ------------------------------------

const ApartmentList = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState<string>(""); // search filter
  const client = useQueryClient();

  const { mutate } = useUpdateApartment({
    onSuccess(data, variables, context) {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: [QK_APARTMENTS] });
    },
  });

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
  } = useGetApartments({
    variables: {
      page: pagination.pageIndex, //refetch when pagination.pageIndex changes
      pageSize: pagination.pageSize, //refetch when pagination.pageSize changes
      sortBy: sorting?.map((value) => value.id).toString(), //refetch when sorting changes
      q: globalFilter,
    },
  });

  const handleDeleteItem = (index: number) => {
    NiceModal.show(NM_WARNING, {
      props: { title: "Confirm Delete Apartment" },
    }).then((res) => {
      if (res === true) {
        const { id, ...others } = data[index];
        // TODO: This is not type-safe
        mutate({
          data: { id: id, data: others },
          action: AppRoutes.Delete,
        });
      }
    });
  };

  const handleEditITem = (index: number) =>
    NiceModal.show(NM_APARTMENT, { apartment: data[index] }).then((data) => {
      mutate(
        // TODO: This is not type-safe
        {
          data: data as ApiUpdateParams<Omit<Apartment, "id">>,
          action: AppRoutes.Update,
        }
      );
    });

  // Define columns ---------------------------------------

  // Define table -----------------------------------------

  const table = useMaterialReactTable({
    ...getDefaultMRTOptions<Apartment>({ setGlobalFilter, setPagination, setSorting, refetch }),
    columns: columnDefs,
    data: data,
    rowCount: meta?.totalRowCount ?? 0,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isLoading || isRefetching,
      sorting,
    },
    renderRowActions: ({ row }) => (
      <MRTTableRowActions
        onDeleteItem={() => handleDeleteItem(row.index)}
        onEditItem={() => handleEditITem(row.index)}
      />
    ),
  });

  // -------------------------------------------------------

  // Show loading
  if (isLoading) return <TableLoading />;
  // Show, throw Error
  if (isError) {
    console.log(error || new Error("Error with ApartmentTable"));
    return <ErrorPlaceHolder onClick={() => refetch()} />;
  }

  // -------------------------------------------------------

  return <MaterialReactTable table={table} />;
};

export default ApartmentList;
