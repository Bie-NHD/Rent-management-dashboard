import NiceModal from "@ebay/nice-modal-react";
import {
  NM_APARTMENT,
  NM_CONTRACT,
  NM_CUSTOMER,
  NM_USER_CREATE,
  NM_USER_EDIT,
  NM_USER_EDIT_ADMIN,
  NM_WARNING,
} from "../constants";
import ApartmentDialog from "../features/Apartment/ApartmentDialog";
import WarningDialog from "../components/WarningDialog";
import UserUpdateDialog from "../features/user/UserUpdateDialog";
import UserUpdateDialogForAdmin from "../features/user/UserUpdateDialogForAdmin";
import CustomerMutateDialog from "../features/Customer/CustomerMutateDialog";
import ContractMutateDialog from "../features/Contract/ContractMutateDialog";
import CreateUserDialog from "../features/user/CreateUserDialog";

NiceModal.register(NM_APARTMENT, ApartmentDialog);
NiceModal.register(NM_USER_EDIT, UserUpdateDialog);
NiceModal.register(NM_USER_EDIT_ADMIN, UserUpdateDialogForAdmin);
NiceModal.register(NM_CUSTOMER, CustomerMutateDialog);
NiceModal.register(NM_CONTRACT, ContractMutateDialog);
NiceModal.register(NM_USER_CREATE, CreateUserDialog);
NiceModal.register(NM_WARNING, WarningDialog);
