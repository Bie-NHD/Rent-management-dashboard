import { useQueryClient } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_ShowHideColumnsButton,
  MRT_SortingState,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useState } from "react";
import { useGetUsers } from "../../hooks/user";
import MRTRefreshButton from "../../components/MRTRefreshButton";
import MRTTableRowActions from "../../components/MRTRowAction";
import ErrorPlaceHolder from "../../components/placeholder/ErrorPlaceHolder";
import TableLoading from "../../components/placeholder/TableLoading";
import NiceModal from "@ebay/nice-modal-react";

import useUser from "../../hooks/useUser";
import { useGetCustomers, useUpdateCustomer } from "../../hooks";
import getDefaultMRTOptions from "../../utils/defaultMRTOptions";
import { MutateDialogProps } from "../../types/props";
import { ApiRoutes, NM_CUSTOMER, QK_CUSTOMERs } from "../../constants";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const columnDefs: MRT_ColumnDef<Customer>[] = [
  {
    accessorKey: "fullName",
    header: "Full name",
  },
  {
    accessorKey: "citizenId",
    header: "Citizen Id",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
];

const CustomerList = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState<string>(""); // search filter
  const client = useQueryClient();

  const navigate = useNavigate();
  const location = useLocation();

  /**
   *  Data fetching
   */
  const {
    isLoading,
    isError,
    isRefetching,
    error,
    refetch,
    data: { data: customers = [], meta } = {},
  } = useGetCustomers({
    variables: {
      page: pagination.pageIndex, //refetch when pagination.pageIndex changes
      pageSize: pagination.pageSize, //refetch when pagination.pageSize changes
      sortBy: sorting?.map((value) => value.id).toString(), //refetch when sorting changes
      q: globalFilter,
    },
  });

  // when resolved, refetch current account & data

  const handleEditItem = (user: Customer) => {
    navigate(`${ApiRoutes.customer.GetAll}/${user.id}/edit`, { state: { from: location } });
  };
  // Define table -----------------------------------------

  const table = useMaterialReactTable({
    ...getDefaultMRTOptions<Customer>({ setGlobalFilter, setPagination, setSorting, refetch }),
    columns: columnDefs,
    data: customers,
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
      <MRTTableRowActions onEditItem={() => handleEditItem(customers[row.index])} />
    ),
  });

  // -------------------------------------------------------

  // Show loading
  if (isLoading) return <TableLoading />;
  // Show, throw Error
  if (isError) {
    console.log(error || new Error("Error with ApartmentTable"));
    return <ErrorPlaceHolder onClick={refetch} />;
  }

  // -------------------------------------------------------

  return <MaterialReactTable table={table} />;
};

export default CustomerList;
