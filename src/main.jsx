import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ProductProvider } from "./context/ProductContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      <AppRoutes />
    </ProductProvider>
  </BrowserRouter>
);
