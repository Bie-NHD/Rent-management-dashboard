import NiceModal from "@ebay/nice-modal-react";
import { NM_APARTMENT, NM_WARNING } from "../constants/niceModalIds";
import ApartmentDialog from "../features/Apartment/ApartmentDialog";
import WarningDialog from "../components/WarningDialog";

export default function registerNiceModals() {
  NiceModal.register(NM_APARTMENT, ApartmentDialog);
  NiceModal.register(NM_WARNING, WarningDialog);
}
