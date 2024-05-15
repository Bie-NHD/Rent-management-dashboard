import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";

const WarningDialog = NiceModal.create(({ title, content }: WarningDialogProps) => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content!}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            modal.resolve();
            modal.remove();
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            modal.reject();
            modal.remove();
          }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default WarningDialog;
