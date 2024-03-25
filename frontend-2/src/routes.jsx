import { createBrowserRouter } from "react-router-dom";
import { OverviewPage } from "./pages/OverviewPage";
// import { loader as importLoader } from "./pages/ImportPage";

import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/ErrorPage";
import AllCustomersPage from "./pages/AllCustomersPage";
import AllApartmentsPage from "./pages/AllApartmentsPage";
import AllContractsPage from "./pages/AllContractsPage";
import ImportPage from "./pages/ImportPage";

const routes = {
  apartments: "/apartments",
  customers: "/customers",
  contracts: "/contracts",
};

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
        path: "apartments",
        element: <AllApartmentsPage />,
      },
      {
        path: "customers",
        element: <AllCustomersPage />,
      },
      {
        path: "contracts",
        element: <AllContractsPage />,
      },
      {
        path: "import",
        element: <ImportPage />,
        // loader: importLoader,
      },
    ],
  },
]);

// export default routes;
