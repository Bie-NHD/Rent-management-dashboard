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
import {
  Alert,
  Card,
  CircularProgress,
  List,
  ListItem,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

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
import { useNavigate } from "react-router-dom";

// ------------------------------------

const columnDefs: MRT_ColumnDef<Contract>[] = [
  { accessorKey: "customer.fullName", header: "Customer Fullname" },
  { accessorKey: "apartment.address", header: "Apartment Address" },
  {
    accessorKey: "retailPrice",
    header: "retailPrice",
    Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
  },
  {
    id: "duration",
    Cell: ({ row }) => (
      <span>
        {row.original.startDate}~{row.original.endDate}
      </span>
    ),
    header: "Duration",
  },
];

const DetailPanel = ({
  row,
  table,
}: {
  row: MRT_Row<Contract>;
  table: MRT_TableInstance<Contract>;
}) => {
  const { isAdmin } = useUser();

  const user = row.original.user;
  const apartment = row.original.apartment;
  const customer = row.original.customer;

  return (
    <Stack gap="0.5rem" minHeight="00px">
      <div>
        Contract Info:
        <List>
          <ListItem>
            <b>Duration:</b> {row.original.startDate}~{row.original.endDate}
          </ListItem>
        </List>
      </div>
      <div>
        Customer Info:
        <List>
          <ListItem>
            <b>Id:</b> {customer.id}
          </ListItem>
          <ListItem>
            <b>Fullname:</b> {customer.fullName}
          </ListItem>
          <ListItem>
            <b>Phone:</b> {customer.phoneNumber}
          </ListItem>
        </List>
      </div>
      <div>
        Apartment Info:
        <p>
          <b>Address:</b> {apartment.address}
        </p>
        <p>
          <b>Retail price:</b> {formatCurrency(apartment.retailPrice)}
        </p>
      </div>
      {isAdmin && (
        <div>
          User Info:
          <List>
            <ListItem>
              <b>Fullname:</b>
              {user.fullName}
            </ListItem>
            <ListItem>
              <b>UserName:</b>
              {user.username} {user.email}
            </ListItem>
            <ListItem></ListItem>
            <ListItem>
              <b>Role:</b>
              {user.role}
            </ListItem>
          </List>
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
  const navigate = useNavigate();

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

    renderDetailPanel: ({ row, table }) => <DetailPanel row={row} table={table} />,
    renderRowActions: ({ row }) => (
      <MRTTableRowActions onEditItem={() => navigate(`./${contracts[row.index].id}/edit`)} />
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

export default ContractList;
