import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

const WarningDialog = NiceModal.create(({ title }) => {
  const modal = useModal();

  return (
    <Dialog open={modal.visible}>
      <DialogTitle>{title}</DialogTitle>

      <DialogActions>
        <Button onClick={modal.remove}>Cancel</Button>
        <Button
          onClick={() => {
            modal.resolve(true);
            modal.remove();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default WarningDialog;
