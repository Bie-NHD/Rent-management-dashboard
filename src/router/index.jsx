import { createBrowserRouter } from "react-router-dom";
// import { OverviewPage } from "./pages/OverviewPage";
import { OverviewPage } from "../pages/OverviewPage";
// import { loader as importLoader } from "./pages/ImportPage";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import AllCustomersPage from "../pages/AllCustomersPage";
import AllContractsPage from "../pages/AllContractsPage";
import { ROUTES } from "../utils/constants";
import { lazy } from "react";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// ---------------------------------------------------------

const ApartmentListPage = lazy(() => import("../pages/ApartmentListPage"));
const ImportPage = lazy(() => import("../pages/ImportPage"));

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: ROUTES.APARTMENT,
        element: (
          <Suspense fallback={<Loading />}>
            <ApartmentListPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CUSTOMER,
        element: <AllCustomersPage />,
      },
      {
        path: ROUTES.CONTRACT,
        element: <AllContractsPage />,
      },
      {
        path: ROUTES.IMPORT,
        element: (
          <Suspense fallback={<Loading />}>
            <ImportPage />
          </Suspense>
        ),
        // loader: importLoader,
      },
    ],
  },
]);

export default router;
