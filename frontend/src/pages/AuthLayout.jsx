import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = ({ authenticationRequired }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  if (authenticationRequired) {
    if (authStatus) {
      return <Outlet />;
    } else {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  } else {
    if (authStatus) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Outlet />;
    }
  }
};

export default AuthLayout;
