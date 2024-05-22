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
import { Alert, CircularProgress, MenuItem, Stack } from "@mui/material";

import ErrorPlaceHolder from "../../components/placeholder/ErrorPlaceHolder";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

// Hooks ------------------------------
import { useGetApartments } from "../../hooks";

import TableLoading from "../../components/placeholder/TableLoading";
import { useGetContracts } from "../../hooks";

import getDefaultMRTOptions from "../../utils/defaultMRTOptions";
import { formatCurrency } from "../../utils/stringFormats";
import MRTTableRowActions from "../../components/MRTRowAction";
import { Api } from "../../api";
import { ApiRoutes } from "../../constants";

// ------------------------------------

const columnDefs: MRT_ColumnDef<ContractResponseDTO>[] = [
  { accessorKey: "apartmentId",
    header: "apartmentId",
  },
    { accessorKey: "customerId",
    header: "customerId",
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "retailPrice",

    header: "retailPrice",
    Cell: ({cell})=> formatCurrency (cell.getValue<number>())
  },
  {
    accessorKey: "createDate",
   
    header: "createDate",
  },
];

const DetailPanel = ({ row,table }: { row: MRT_Row<ContractResponseDTO>,table: MRT_TableInstance<ContractResponseDTO> }) => {
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery(
    {
      queryFn: async () => await Api.instance.get<ApiResponse<Customer> >(ApiRoutes.customer.GetAll+`/${row.original.customerId}`).then(res=>res.data?.data)
    }
  );
  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Error Loading User Info</Alert>;

  const { favoriteMusic, favoriteSong, quote } = userInfo ?? {};

  return (
    <Stack gap="0.5rem" minHeight="00px">
      <div>
        <b>Favorite Music:</b> {favoriteMusic}
      </div>
      <div>
        <b>Favorite Song:</b> {favoriteSong}
      </div>
      <div>
        <b>Quote:</b> {quote}
      </div>
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

  const table = useMaterialReactTable<ContractResponseDTO>({
    ...getDefaultMRTOptions<ContractResponseDTO>({ setGlobalFilter, setPagination, setSorting, refetch }),
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
    // renderRowActions: ({ row }) => (
    //   // <MRTTableRowActions
      
    //   //   onEditItem={() => handleEditITem(row.index)}
    //   // />,
      
    // ),
renderDetailPanel(props) {
    
},
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
