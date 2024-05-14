import { Box, Tooltip, IconButton } from "@mui/material";
import { MRT_Cell, MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { MouseEventHandler } from "react";
import useUser from "../hooks/useUser";

type MRTRowActionProps<TData extends MRT_RowData> = {
  cell: MRT_Cell<TData>;
  row: MRT_Row<TData>;
  staticRowIndex?: number;
  table: MRT_TableInstance<TData>;
} & {
  onEditItem: MouseEventHandler<HTMLButtonElement> | undefined;
  onDeleteItem: MouseEventHandler<HTMLButtonElement> | undefined;
};

// const MRTRowAction = <TData extends MRT_RowData>({ row , onDeleteItem, onEditItem}: MRTRowActionProps<TData>) => {
//   const { isAdmin } = useUser();

//   return (
//     <Box>
//       <Tooltip arrow title="Edit item">
//         <IconButton onClick={() => handleEditITem(row.index)}>
//           <EditIcon />
//         </IconButton>
//       </Tooltip>
//       {/* only Admin can delete item */}
//       {isAdmin ? (
//         <Tooltip arrow title="Delete item">
//           <IconButton onClick={() => handleDeleteItem(row.index)}>
//             <DeleteIcon color="warning" />
//           </IconButton>
//         </Tooltip>
//       ) : null}
//     </Box>
//   );
// };

const MRTTableRowActions = ({
  onDeleteItem,
  onEditItem,
}: {
  onEditItem: MouseEventHandler<HTMLButtonElement> | undefined;
  onDeleteItem?: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { isAdmin } = useUser();

  return (
    <Box>
      <Tooltip arrow title="Edit item">
        <IconButton onClick={onEditItem}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* only Admin can delete item */}
      {isAdmin && !!onDeleteItem ? (
        <Tooltip arrow title="Delete item">
          <IconButton onClick={onDeleteItem}>
            <DeleteIcon color="warning" />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default MRTTableRowActions;
