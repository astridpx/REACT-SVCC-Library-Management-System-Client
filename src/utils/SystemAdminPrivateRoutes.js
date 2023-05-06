import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const SystemAdminPrivateRoutes = () => {
  const auth = localStorage.getItem("role");

  return auth === "systemAdmin" ? <Outlet /> : <Navigate to="/" />;
};

export default SystemAdminPrivateRoutes;
