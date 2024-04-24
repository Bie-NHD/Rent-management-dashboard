import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const TableLoading = () => (
  <Stack spacing={2} sx={{ minHeight: "100", height: "40%", marginY: "2rem" }}>
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"20%"}
      sx={{ minHeight: 30 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={"70%"}
      sx={{ minHeight: 150 }}
    />
  </Stack>
);

export default TableLoading;
