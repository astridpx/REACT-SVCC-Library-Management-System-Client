import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  const role = localStorage.getItem("role");

  return role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
