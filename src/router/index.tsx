import { RouteObject, createBrowserRouter } from "react-router-dom";
import StatisticPage from "../features/Statistic/StatisticPage";
// import { loader as importLoader } from "./pages/ImportPage";

import ErrorPage from "../features/error-page/ErrorPage";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ApiRoutes, AppRoutes } from "../constants";

import RegisterPage from "../features/Login/RegisterPage";
import RequireAdmin from "./RequireAdmin";
import UserIndexPage from "../features/user/UserIndexPage";
import LoginPage from "../features/Login/LoginPage";

// ---------------------------------------------------------
const ApartmentIndex = lazy(() => import("../features/Apartment/ApartmentIndex"));
const ContractIndex = lazy(() => import("../features/Contract/ContractIndex"));
const CustomerIndex = lazy(() => import("../features/Customer/CustomerIndex"));
const ImportPage = lazy(() => import("../features/Import/ImportPage"));

const ForgotPasswordPage = lazy(() => import("../features/Login/ForgotPasswordPage"));
const RequireSignedIn = lazy(() => import("./RequireSignedIn"));

const CreateContract = lazy(() => import("../features/Contract/CreateContract"));
const CreateCustomer = lazy(() => import("../features/Customer/CreateCustomer"));

// ---------------------------------------------------------

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <CircularProgress sx={{ alignSelf: "center" }} />
    </Box>
  );
};
// ---------------------------------------------------------

const importRoutes: RouteObject[] = [
  ...[AppRoutes.Apartment, AppRoutes.Contract, AppRoutes.Customer].map(
    (value) =>
      ({
        path: value + AppRoutes.Import,
        element: (
          <Suspense fallback={<Loading />}>
            <ImportPage />
          </Suspense>
        ),
      } as const)
  ),
  {
    path: AppRoutes.Import,
    element: (
      <Suspense fallback={<Loading />}>
        <ImportPage />
      </Suspense>
    ),
    // loader: importLoader,
  },
];

const indexRoutes: RouteObject[] = [
  {
    path: AppRoutes.Apartment,
    element: (
      <Suspense fallback={<Loading />}>
        <ApartmentIndex />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Customer,
    element: (
      <Suspense fallback={<Loading />}>
        <CustomerIndex />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.Contract,
    element: (
      <Suspense fallback={<Loading />}>
        <ContractIndex />
      </Suspense>
    ),
  },
];

const requireAdminRoutes: RouteObject[] = [
  {
    path: "/users",
    element: (
      <RequireAdmin>
        <UserIndexPage />
      </RequireAdmin>
    ),
  },
];

const requireSignedInRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RequireSignedIn />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      ...indexRoutes,
      ...importRoutes,
      ...requireAdminRoutes,
      {
        path: ApiRoutes.customer.Add,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateCustomer />
          </Suspense>
        ),
      },
    ],
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: AppRoutes.Login,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.ForgotPassword,
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  // { path: AppRoutes.Register, element: <RegisterPage /> },
];

// ---------------------------------------------------------

const router = createBrowserRouter([...requireSignedInRoutes, ...publicRoutes]);

export default router;
