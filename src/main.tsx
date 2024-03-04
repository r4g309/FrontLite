import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Root } from "./routes";
import { Company } from "./routes/company";
import { Inventory } from "./routes/inventory";
import { Products } from "./routes/products";
import { RegisterCompany } from "./routes/registerCompany ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  },
  {
    path: "/registerCompany",
    element: <RegisterCompany />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
