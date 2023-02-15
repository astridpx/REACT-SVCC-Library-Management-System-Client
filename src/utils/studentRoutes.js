import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const StudentRoutes = () => {
  const role = localStorage.getItem("role");

  return role === "student" ? <Outlet /> : <Navigate to="/Student-records" />;
};

export default StudentRoutes;
