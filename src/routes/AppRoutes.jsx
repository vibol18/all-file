import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Pos from "../pages/Pos";

export default function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/pos" element={<Pos/>}/>
      </Route>
    </Routes>
  );
}
