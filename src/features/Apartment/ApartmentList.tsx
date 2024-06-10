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
import { AppRoutes, QK_APARTMENTS, NM_APARTMENT, NM_WARNING, ApiRoutes } from "../../constants";
import TableLoading from "../../components/placeholder/TableLoading"; // Hooks ------------------------------
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteApartment, useGetApartments, useUpdateApartment } from "../../hooks";
import { useMemo, useState } from "react";
import MRTTableRowActions from "../../components/MRTRowAction";
import MRTRefreshButton from "../../components/MRTRefreshButton";
import getDefaultMRTOptions from "../../utils/defaultMRTOptions";
import { formatCurrency } from "../../utils/stringFormats";
import { WarningDialogProps } from "../../types/props";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Api } from "../../api";
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
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

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

  const { mutate: deleteApartment, status } = useDeleteApartment();

  const handleDeleteItem = (index: number) => {
    const { id, ...others } = data[index];
    const wn_cntn: WarningDialogProps = {
      title: "Confirm Delete Apartment?",
      content: `Confirm delete apartment:\nId:${id}\nAddress: ${others.address}`,
    };
    NiceModal.show(NM_WARNING, {
      props: wn_cntn,
    }).then(async () => {
      const toastMsg = toast.loading("Deleting apartment...");
      const resp = await Api.delete(ApiRoutes.apartment.Delete, { id: data[index].id });

      toast.remove(toastMsg);
      if (resp?.statusCode == 200) {
        toast.success(resp?.message);
        refetch();
      } else {
        console.log(resp.statusCode, resp.message);
        toast.error(resp.message);
      }
    });
  };

  const handleEditITem = (index: number) => {
    navigate(ApiRoutes.apartment.GetAll + "/" + data[index].id + "/edit", {
      state: { from: window.location.pathname },
    });
  };

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
