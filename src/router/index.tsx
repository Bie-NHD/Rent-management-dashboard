import { RouteObject, createBrowserRouter } from "react-router-dom";
import { StatisticPage } from "../features/Statistic/StatisticPage";
// import { loader as importLoader } from "./pages/ImportPage";

import ErrorPage from "../features/error-page/ErrorPage";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AppRoutes } from "../constants";
import { RequireSignedIn } from "./RequireSignedIn";
import RegisterPage from "../features/Login/RegisterPage";
import RequireAdmin from "./RequireAdmin";
import UserIndexPage from "../features/user/UserIndexPage";

// ---------------------------------------------------------
const ApartmentIndex = lazy(
  () => import("../features/Apartment/ApartmentIndex")
);
const ContractIndex = lazy(() => import("../features/Contract/ContractIndex"));
const CustomerIndex = lazy(() => import("../features/Customer/CustomerIndex"));
const ImportPage = lazy(() => import("../features/Import/ImportPage"));
const LoginPage = lazy(() => import("../features/Login/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("../features/Login/ForgotPasswordPage")
);

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
    element: <RequireSignedIn />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StatisticPage />,
      },
      ...indexRoutes,
      ...importRoutes,
      ...requireAdminRoutes,
    ],
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: AppRoutes.Login,
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: AppRoutes.ForgotPassword,
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  { path: AppRoutes.Register, element: <RegisterPage /> },
];

// ---------------------------------------------------------

const router = createBrowserRouter([...requireSignedInRoutes, ...publicRoutes]);

export default router;
