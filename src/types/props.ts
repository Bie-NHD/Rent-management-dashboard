// Dialogs
type WarningDialogProps = {
  title: string;
  content?: string | React.ReactNode | React.ReactNode[] | undefined;
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
