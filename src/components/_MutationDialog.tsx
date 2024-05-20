import NiceModal from "@ebay/nice-modal-react";
import React, { ReactNode } from "react";
import { ObjectSchema } from "yup";

type MutationDialogProps = {
  data?: unknown;
  schema: ObjectSchema<any>;
  children: ReactNode[] | ReactNode;
};

const MutationDialog = NiceModal.create(({ props }: { props: MutationDialogProps }) => {
  return <div>MutationDialog</div>;
});

export default MutationDialog;
