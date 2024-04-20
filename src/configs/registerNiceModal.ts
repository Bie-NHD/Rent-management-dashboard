import NiceModal from "@ebay/nice-modal-react";
import { NM_APARTMENT } from "../constants/niceModalId";
import ApartmentDialog from "../sections/apartment-page/ApartmentDialog";

export default function registerNiceModals() {
  NiceModal.register(NM_APARTMENT, ApartmentDialog);
}
