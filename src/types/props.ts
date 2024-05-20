// Dialogs
type WarningDialogProps = {
  title: string;
  content?: string | React.ReactNode | React.ReactNode[] | undefined;
  positiveText?: string;
  negativeText?: string;
};

// type NMDialogResult<Type = `success` | `reject` > = {
// value?: Type typeof `success` ? boolean : undefined
// }

interface ChangePasswordProps {
  prevPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
type IndexToolbarProps = {
  handleNewItem?: (...args: any[]) => any;
};

type MutateDialogProps<TData = Apartment | Customer | Contract> = {
  data?: TData;
  onCreate?: (...args: any[]) => any | Promise<any>;
  onUpdate?: (...args: any[]) => any | Promise<any>;
};
