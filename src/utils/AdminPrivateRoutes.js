import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoutes = () => {
  const auth = localStorage.getItem("role");

  return auth === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminPrivateRoutes;
