import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 *
 * @param {string} importType
 * @returns
 */
const ImportButton = () => {
  return (
    <Button
      startIcon={<CloudUploadIcon />}
      variant="outlined"
      component={Link}
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
