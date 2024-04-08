import { createBrowserRouter } from "react-router-dom";
import { OverviewPage } from "./pages/OverviewPage";
// import { loader as importLoader } from "./pages/ImportPage";

import Layout from "./layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import AllCustomersPage from "./pages/AllCustomersPage";
import ApartmentListPage from "./pages/ApartmentListPage";
import AllContractsPage from "./pages/AllContractsPage";
import ImportPage from "./pages/ImportPage";
import { ROUTES } from "./utils/constants";

// ---------------------------------------------------------

export const router = createBrowserRouter([
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
        element: <ApartmentListPage />,
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
        element: <ImportPage />,
        // loader: importLoader,
      },
    ],
  },
]);

// export default routes;
