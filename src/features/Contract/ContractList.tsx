import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState } from "react";
import { Alert, Card, CircularProgress, MenuItem, Stack, Typography } from "@mui/material";

import ErrorPlaceHolder from "../../components/placeholder/ErrorPlaceHolder";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

// Hooks ------------------------------
import { useGetApartmentById, useGetApartments, useGetCustomerById } from "../../hooks";

import TableLoading from "../../components/placeholder/TableLoading";
import { useGetContracts } from "../../hooks";

import getDefaultMRTOptions from "../../utils/defaultMRTOptions";
import { formatCurrency } from "../../utils/stringFormats";
import MRTTableRowActions from "../../components/MRTRowAction";
import { Api } from "../../api";
import { ApiRoutes } from "../../constants";
import useUser from "../../hooks/useUser";

// ------------------------------------

const columnDefs: MRT_ColumnDef<Contract>[] = [
  { accessorKey: "customer.fullName", header: "Customer Fullname" },
  { accessorKey: "apartment.address", header: "Apartment Address" },
  {
    accessorKey: "retailPrice",
    header: "retailPrice",
    Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  { accessorKey: "createDate", header: "createDate" },
];

const DetailPanel = ({
  row,
  table,
}: {
  row: MRT_Row<Contract>;
  table: MRT_TableInstance<Contract>;
}) => {
  const { isAdmin } = useUser();

  return (
    <Stack gap="0.5rem" minHeight="00px">
      <div>
        Customer Info:
        <p>
          <b>Id:</b> {row.original.customer.id}
        </p>
        <p>
          <b>Fullname:</b> {row.original.customer.fullName}
        </p>
      </div>
      <div>
        Apartment Info:
        <p>
          <b>Address:</b> {row.original.apartment.address}
        </p>
        <p>
          <b>Retail price:</b> {row.original.apartment.retailPrice}
        </p>
      </div>
      {isAdmin && (
        <div>
          User Info:
          <p>
            <b>UserName or Email:</b>
            {row.original.user.username} {" | " && row.original.user.email}
          </p>
          <p>
            <b>Role:</b>
            {row.original.user.role}
          </p>
        </div>
      )}
    </Stack>
  );
};

// ------------------------------------

const ContractList = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  // TODO: Add search in ```ContractList```
  const [globalFilter, setGlobalFilter] = useState(""); // search filter
  const client = useQueryClient();

  /**
   *  Data fetching
   */
  const {
    isLoading,
    isError,
    isRefetching,
    data: { contracts = [], meta } = {},
    error,
    refetch,
  } = useGetContracts({
    variables: {
      page: pagination.pageIndex, //refetch when pagination.pageIndex changes
      pageSize: pagination.pageSize, //refetch when pagination.pageSize changes
      sortBy: sorting?.map((value) => value.id).toString(), //refetch when sorting changes
    },
  });

  // Define columns ---------------------------------------
  // const columns = useMemo<MRT_ColumnDef<Apartment>[]>(() => columnDefs, []);

  // Define table -----------------------------------------

  const table = useMaterialReactTable<Contract>({
    ...getDefaultMRTOptions<Contract>({
      setGlobalFilter,
      setPagination,
      setSorting,
      refetch,
    }),
    columns: columnDefs,
    data: contracts,
    rowCount: meta?.totalRowCount ?? 0,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isLoading || isRefetching,
      sorting,
    },
    enableExpanding: true,
    enableExpandAll: false,
    // renderRowActions: ({ row }) => (
    //   // <MRTTableRowActions

    //   //   onEditItem={() => handleEditITem(row.index)}
    //   // />,

    // ),
    renderDetailPanel: ({ row, table }) => <DetailPanel row={row} table={table} />,
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

export default ContractList;
