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
import { formatCurrency } from "../../utils/stringFormats";
import { WarningDialogProps } from "../../types/props";
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
    Cell: ({ cell }) => <>{formatCurrency(cell.getValue<number>())}</>,
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

  const { mutate } = useUpdateApartment({
    onSuccess(data, variables, context) {
      if (data?.statusCode == 200) {
        toast.success(data?.message);
        refetch();
      } else {
        console.log(data.statusCode, data.message);
        toast.error(data.message);
      }
    },
  });

  const handleDeleteItem = (index: number) => {
    const { id, ...others } = data[index];
    const wn_cntn: WarningDialogProps = {
      title: "Confirm Delete Apartment?",
      content: `Confirm delete apartment:\nId:${id}\nAddress: ${others.address}`,
    };
    NiceModal.show(NM_WARNING, {
      props: wn_cntn,
    }).then(() => {
      // TODO: This is not type-safe
      mutate({
        data: { id: id, data: others },
        action: AppRoutes.Delete,
      });
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
      showColumnFilters: false,
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
