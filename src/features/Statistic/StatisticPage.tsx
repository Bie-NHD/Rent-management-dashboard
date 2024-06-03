import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { lazy } from "react";
// import { useGetApartmentCount, useGetCustomerCount, useGetUserCount } from "../../hooks/statistics";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";
import useUser from "../../hooks/useUser";

// TODO: Add statistics

// const ApartmentStats = () => {
//   const { data: count, isLoading } = useGetApartmentCount();
//   const navigate = useNavigate();

//   return (
//     <Card sx={{ flexGrow: 1, margin: 3, padding: 3, maxWidth: "25em" }}>
//       <CardContent>
//         <Typography color="text.secondary" gutterBottom>
//           Total number of
//         </Typography>
//         <Typography variant="h3" sx={{ fontSize: 24 }}>
//           Apartments
//         </Typography>
//         {isLoading ? (
//           <CircularProgress variant="indeterminate" />
//         ) : (
//           <Typography sx={{ fontSize: 48 }}>{count}</Typography>
//         )}
//       </CardContent>
//       <CardActions>
//         <Button onClick={() => navigate(AppRoutes.Apartment)}>View full list</Button>
//       </CardActions>
//     </Card>
//   );
// };

// const CustomerStats = () => {
//   const { data: count, isLoading } = useGetCustomerCount();
//   const navigate = useNavigate();

//   return (
//     <Card sx={{ flexGrow: 1, margin: 3, padding: 3, maxWidth: "25em" }}>
//       <CardContent>
//         <Typography color="text.secondary" gutterBottom>
//           Total number of
//         </Typography>
//         <Typography variant="h3" sx={{ fontSize: 24 }}>
//           Customers
//         </Typography>
//         {isLoading ? (
//           <CircularProgress variant="indeterminate" />
//         ) : (
//           <Typography sx={{ fontSize: 48 }}>{count}</Typography>
//         )}
//       </CardContent>
//       <CardActions>
//         <Button onClick={() => navigate(AppRoutes.Customer)}>View full list</Button>
//       </CardActions>
//     </Card>
//   );
// };

// const UserStats = () => {
//   const { data: count, isLoading } = useGetUserCount();
//   const navigate = useNavigate();

//   return (
//     <Card sx={{ flexGrow: 1, margin: 3, padding: 3, maxWidth: "25em" }}>
//       <CardContent>
//         <Typography color="text.secondary" gutterBottom>
//           Total number of
//         </Typography>
//         <Typography variant="h3" sx={{ fontSize: 24 }}>
//           Users
//         </Typography>
//         {isLoading ? (
//           <CircularProgress variant="indeterminate" />
//         ) : (
//           <Typography sx={{ fontSize: 48 }}>{count}</Typography>
//         )}
//       </CardContent>
//       <CardActions>
//         <Button onClick={() => navigate(AppRoutes.User)}>View full list</Button>
//       </CardActions>
//     </Card>
//   );
// };

const StatisticPage = () => {
  const { isAdmin } = useUser();

  return (
    <>
      <PageHeader>Statistics</PageHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}>
        {/* <ApartmentStats />
        <CustomerStats />
        {isAdmin ? <UserStats /> : null} */}
      </Box>
    </>
  );
};

export default StatisticPage;
