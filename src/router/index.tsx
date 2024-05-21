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

import { customerLoader, userLoader } from "../utils/routerLoader";

// ---------------------------------------------------------
const ApartmentIndex = lazy(() => import("../features/Apartment/ApartmentIndex"));
const ContractIndex = lazy(() => import("../features/Contract/ContractIndex"));
const CustomerIndex = lazy(() => import("../features/Customer/CustomerIndex"));
const ImportPage = lazy(() => import("../features/Import/ImportPage"));

const ForgotPasswordPage = lazy(() => import("../features/Login/ForgotPasswordPage"));
const RequireSignedIn = lazy(() => import("./RequireSignedIn"));

const CreateContract = lazy(() => import("../features/Contract/CreateContract"));

const CreateCustomer = lazy(() => import("../features/Customer/CreateCustomer"));
const EditCustomer = lazy(() => import("../features/Customer/EditCustomer"));

const CreateUser = lazy(() => import("../features/user/CreateUser"));
const EditUser = lazy(() => import("../features/user/EditUser"));

const EditAccount = lazy(() => import("../features/Login/EditAccount"));
const ChangePassword = lazy(() => import("../features/Login/ChangePassword"));
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
    element: <RequireAdmin />,

    children: [
      {
        path: "/users",
        index: true,
        element: <UserIndexPage />,
      },
      {
        path: "add",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateUser />
          </Suspense>
        ),
      },
      {
        path: ":id/edit",
        loader: userLoader,
        element: (
          <Suspense fallback={<Loading />}>
            <EditUser />
          </Suspense>
        ),
      },
    ],
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
      {
        path: "/",
        index: true,
        element: <StatisticPage />,
      },
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
      {
        path: ApiRoutes.contract.Add,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateContract />
          </Suspense>
        ),
      },
      {
        path: `${ApiRoutes.customer.GetAll}/:id/edit`,
        element: <EditCustomer />,
        loader: customerLoader,
      },
      {
        path: "account/edit",
        element: (
          <Suspense fallback={<Loading />}>
            <EditAccount />
          </Suspense>
        ),
      },
      {
        path: "account/edit/changePassword",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangePassword />
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
