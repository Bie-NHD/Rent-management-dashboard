import { RouteObject, createBrowserRouter } from "react-router-dom";
import { StatisticPage } from "../features/Statistic/StatisticPage";
// import { loader as importLoader } from "./pages/ImportPage";
import Layout from "../App/Layout";
import ErrorPage from "../features/error-page/ErrorPage";
import CustomerIndex from "../features/Customer/CustomerIndex";
import ContractIndex from "../features/Contract/ContractIndex";
import { lazy } from "react";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AppRoutes } from "../constants";
import ApartmentIndex from "../features/Apartment/ApartmentIndex";
import { ProtectedRoute } from "./ProtectedRoute";

// ---------------------------------------------------------

const ImportPage = lazy(() => import("../features/Import/ImportPage"));
const LoginPage = lazy(() => import("../features/Login/LoginPage"));

// ---------------------------------------------------------

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ alignSelf: "center" }} />
    </Box>
  );
};
// ---------------------------------------------------------

const importRoutes: RouteObject[] = [
  AppRoutes.Apartment,
  AppRoutes.Contract,
  AppRoutes.Customer,
].map(
  (value) =>
    ({
      path: value + AppRoutes.Import,
      element: (
        <Suspense fallback={<Loading />}>
          <ImportPage />
        </Suspense>
      ),
    } as const)
);

// ---------------------------------------------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StatisticPage />,
      },
      {
        path: AppRoutes.Apartment,
        element: <ApartmentIndex />,
      },
      {
        path: AppRoutes.Customer,
        element: <CustomerIndex />,
      },
      {
        path: AppRoutes.Contract,
        element: <ContractIndex />,
      },
      {
        path: AppRoutes.Import,
        element: (
          <Suspense fallback={<Loading />}>
            <ImportPage />
          </Suspense>
        ),
        // loader: importLoader,
      },
      ...importRoutes,
    ],
  },
  {
    path: AppRoutes.Login,
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default router;
