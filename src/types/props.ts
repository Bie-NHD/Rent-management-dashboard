import { MRT_PaginationState, MRT_SortingState } from "material-react-table";

// Dialogs
export type WarningDialogProps = {
  title: string;
  content?: string | React.ReactNode | React.ReactNode[] | undefined;
  positiveText?: string;
  negativeText?: string;
};

// type NMDialogResult<Type = `success` | `reject` > = {
// value?: Type typeof `success` ? boolean : undefined
// }

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
export type IndexToolbarProps = {
  handleNewItem?: (...args: any[]) => any;
};

export type MutateDialogProps<TData = Apartment | Customer | Contract> = {
  data?: TData;
  onCreate?: (...args: any[]) => any | Promise<any>;
  onUpdate?: (...args: any[]) => any | Promise<any>;
};

export type AppDefaultMRTOptionsProps = {
  setPagination: React.Dispatch<React.SetStateAction<MRT_PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<MRT_SortingState>>;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string | any>>;
  refetch: (...args: any[]) => Promise<any>;
};
