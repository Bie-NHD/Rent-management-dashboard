import { createBrowserRouter } from "react-router-dom";
import { OverviewPage } from "./pages/OverviewPage";
import {loader as importLoader}  from "./pages/ImportPage";

import Layout from "./shared/Layout";
import ErrorPage from "./pages/ErrorPage";
import CustomerPage from "./pages/CustomerPage";
import ApartmentPage from "./pages/ApartmentPage";
import ContractPage from "./pages/ContractPage";
import ImportPage from "./pages/ImportPage";

const routes = {
  apartments: "/apartments",
  customers: "/customers",
  contracts: "/contracts",
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "apartment",
        element: <ApartmentPage/>
      },
      {
        path: "customer",
        element: <CustomerPage />,
      },
      {
        path: "contract",
        element: <ContractPage />,
      },
      {
        path: "import/:importType",
        element: <ImportPage/>,
        loader : importLoader
      }
    ],
  },
]);

export default routes;
