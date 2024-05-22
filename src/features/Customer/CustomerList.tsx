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
import { MutateDialogProps, WarningDialogProps } from "../../types/props";
import { ApiRoutes, NM_CUSTOMER, NM_WARNING, QK_CUSTOMERs } from "../../constants";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Api } from "../../api";

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

  const handleEditItem = (customer: Customer) => {
    navigate(`${ApiRoutes.customer.GetAll}/${customer.id}/edit`, { state: { from: location } });
  };

  const handleDeleteItem = (customer: Customer) => {
    const wn_cntn: WarningDialogProps = {
      title: `Confirm Delete account?`,
      content: `Confirm delete apartment:\nId:${customer.id}\nAddress: ${customer.address}`,
    };

    NiceModal.show(NM_WARNING, { props: wn_cntn })
      .then(async () => {
        const resp = await Api.delete(ApiRoutes.customer.Delete, { id: customer.id });

        if (resp?.statusCode == 200) {
          toast.success(resp?.message);
          refetch();
        } else {
          console.log(resp.statusCode, resp.message);
          toast.error(resp.message);
        }
      })
      .catch(null);
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
      <MRTTableRowActions
        onEditItem={() => handleEditItem(customers[row.index])}
        onDeleteItem={() => handleDeleteItem(customers[row.index])}
      />
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
