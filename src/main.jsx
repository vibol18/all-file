import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { LogIn } from "lucide-react";
import Login from "./pages/Login";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AppRoutes/>
  </BrowserRouter>
);
