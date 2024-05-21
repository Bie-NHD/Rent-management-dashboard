import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleGlobalFilterButton,
  type MRT_RowData,
  type MRT_TableOptions,
} from "material-react-table";
import { AppDefaultMRTOptionsProps } from "../types/props";
import MRTRefreshButton from "../components/MRTRefreshButton";

//define re-useable default table options for all tables in your app
const getDefaultMRTOptions = <TData extends MRT_RowData>({
  setSorting,
  setPagination,
  setGlobalFilter,
  refetch,
}: AppDefaultMRTOptionsProps): Partial<MRT_TableOptions<TData>> => ({
  //list all of your default table options here
  enableGlobalFilter: false,
  //   enableRowPinning: true,
  enableRowActions: true,
  initialState: { showColumnFilters: true },
  // manualFiltering: true,
  manualPagination: true, //turn off built-in client-side pagination
  manualSorting: true, //turn off built-in client-side sorting
  onPaginationChange: setPagination,
  onSortingChange: setSorting,
  onGlobalFilterChange: setGlobalFilter,
  // muiTableHeadCellProps: {
  //   sx: { fontSize: "1.1rem" },
  // },
  //   paginationDisplayMode: 'pages',
  //   //etc...
  //   defaultColumn: {
  //     //you can even list default column options here
  //   },
  renderToolbarInternalActions: ({ table }) => (
    <>
      {/* built-in buttons (must pass in table prop for them to work!) */}
      {setGlobalFilter ? <MRT_ToggleGlobalFilterButton table={table} /> : null}
      <MRT_ShowHideColumnsButton table={table} />
      {/* <MRT_ToggleDensePaddingButton table={table} /> */}
    </>
  ),
  renderTopToolbarCustomActions: () => <MRTRefreshButton onClick={refetch} />,
});
export default getDefaultMRTOptions;
