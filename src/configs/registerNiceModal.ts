import NiceModal from "@ebay/nice-modal-react";
import { NM_APARTMENT, NM_USER_EDIT, NM_USER_EDIT_ADMIN, NM_WARNING } from "../constants";
import ApartmentDialog from "../features/Apartment/ApartmentDialog";
import WarningDialog from "../components/WarningDialog";
import UserUpdateDialog from "../features/user/UserUpdateDialog";
import UserUpdateDialogForAdmin from "../features/user/UserUpdateDialogForAdmin";

NiceModal.register(NM_APARTMENT, ApartmentDialog);
NiceModal.register(NM_WARNING, WarningDialog);
NiceModal.register(NM_USER_EDIT, UserUpdateDialog);
NiceModal.register(NM_USER_EDIT_ADMIN, UserUpdateDialogForAdmin);
