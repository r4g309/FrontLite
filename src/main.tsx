import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Root } from "./routes";
import { Company } from "./routes/company";
import { Inventory } from "./routes/inventory";
import { Products } from "./routes/products";
import { RegisterCompany } from "./routes/registerCompany ";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/company" element={<Company />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/registerCompany" element={<RegisterCompany />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
