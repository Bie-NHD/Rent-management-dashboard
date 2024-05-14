import { Tooltip, IconButton } from "@mui/material";
import React, { MouseEventHandler } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const MRTRefreshButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <Tooltip arrow title="Refresh Data">
      <IconButton onClick={onClick}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MRTRefreshButton;
