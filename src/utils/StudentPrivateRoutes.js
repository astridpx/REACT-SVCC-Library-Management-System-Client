import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const StudentPrivateRoutes = () => {
  const auth = localStorage.getItem("role");

  return auth === "student" ? <Outlet /> : <Navigate to="/" />;
};

export default StudentPrivateRoutes;
