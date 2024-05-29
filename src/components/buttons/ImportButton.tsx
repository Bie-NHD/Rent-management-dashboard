import { Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 *
 * @param {string} importType
 * @returns
 */
const ImportButton = () => {
  const location = useLocation()
  return (
    <Button
      startIcon={<CloudUploadIcon />}
      variant="outlined"
      component={RouterLink}
      state={{from: location}}
      to={`./import`}
      sx={{
        alignSelf: "flex-end",
        marginInline: ".5rem",
      }}
    >
      Import
    </Button>
  );
};

export default ImportButton;
