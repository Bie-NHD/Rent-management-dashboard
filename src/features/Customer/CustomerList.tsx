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
import { NM_CUSTOMER, QK_CUSTOMERs } from "../../constants";
import toast from "react-hot-toast";

const columnDefs: MRT_ColumnDef<Customer>[] = [
  {
    accessorKey: "fullname",
    header: "Role",
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
  // TODO: Add search in ```CustomerList```
  const [globalFilter, setGlobalFilter] = useState(""); // search filter
  const client = useQueryClient();

  const { refetch: refechUser, isAdmin, user: _user } = useUser();
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
    },
  });

  const { mutate } = useUpdateCustomer({
    onSuccess(data, variables, context) {
      client.invalidateQueries({ queryKey: [QK_CUSTOMERs] });

      data.statusCode == 200 ? toast.success(data.message) : toast.error(data.message);
    },
  });

  // when resolved, refetch current account & data

  const handleEditItem = (user: Customer) => {
    const params: MutateDialogProps<Customer> = {
      data: user,
      onUpdate: mutate,
    };

    NiceModal.show(NM_CUSTOMER, params);
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
