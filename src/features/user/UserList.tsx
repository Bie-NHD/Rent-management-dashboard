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
import UserUpdateDialog from "./UserUpdateDialog";
import useUser from "../../hooks/useUser";
import UserUpdateDialogForAdmin from "./UserUpdateDialogForAdmin";

const columnDefs: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createDate",
    header: "Date Created",
  },
  { accessorKey: "fullName", header: "Full name" },
];

const UserList = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
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
    data: { data: users = [], meta } = {},
  } = useGetUsers({
    variables: {
      page: pagination.pageIndex, //refetch when pagination.pageIndex changes
      pageSize: pagination.pageSize, //refetch when pagination.pageSize changes
      sortBy: sorting?.map((value) => value.id).toString(), //refetch when sorting changes
    },
    // select(data) {
    //   return {
    //     ...data,
    //     users: data.users.map(
    //       (item): UserVM => ({
    //         id: item.id,
    //         email: item.email,
    //         createDate: item.createDate,
    //         role: item.role,
    //         username: item.username,
    //         active: item.active,
    //       })
    //     ),
    //   };
    // },
  });

  // when resolved, refetch current account & data
  const handleEditItem = (user: User) => {
    NiceModal.show(UserUpdateDialogForAdmin, { user }).then(() => {
      refetch();
      _user!.id == user.id ? refechUser() : null;
    });
  };
  // Define table -----------------------------------------

  const table = useMaterialReactTable({
    columns: columnDefs,
    data: users,
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
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <MRTTableRowActions onEditItem={() => handleEditItem(users[row.index])} />
    ),
    renderTopToolbarCustomActions: () => <MRTRefreshButton onClick={() => refetch()} />,
    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* built-in buttons (must pass in table prop for them to work!) */}
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        {/* <MRT_ToggleDensePaddingButton table={table} /> */}
      </>
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

export default UserList;
