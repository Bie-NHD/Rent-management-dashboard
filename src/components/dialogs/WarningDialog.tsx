import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { WarningDialogProps } from "../../types/props";

const WarningDialog = NiceModal.create(
  ({ props: { title, content, positiveText, negativeText } }: { props: WarningDialogProps }) => {
    const modal = useModal();

    return (
      <Dialog open={modal.visible}>
        <DialogTitle>{title || ""}</DialogTitle>
        <DialogContent>{content || ""}</DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              modal.reject();
              modal.remove();
            }}>
            {negativeText || "Cancel"}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              modal.resolve();
              modal.remove();
            }}>
            {positiveText || "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default WarningDialog;
