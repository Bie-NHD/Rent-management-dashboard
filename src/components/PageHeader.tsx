import { Typography } from "@mui/material";
import { ReactNode } from "react";

const PageHeader = ({ children }: { children?: string | ReactNode | ReactNode[] }) => {
  const pageHeader: string = (() => {
    const location = window.location.pathname.slice(1);

    return location.at(0)?.toUpperCase() + location.substring(1).toLowerCase();
  })();
  return (
    <Typography variant="h2" gutterBottom>
      {children || pageHeader}
    </Typography>
  );
};

export default PageHeader;
