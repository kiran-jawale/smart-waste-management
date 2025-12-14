import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * This layout component handles all authentication-based routing.
 *
 * @param {object} props
 * @param {boolean} props.authenticationRequired -
 * - If `true`, this route is protected and requires a logged-in user.
 * If the user is NOT logged in, they are redirected to "/auth".
 * - If `false`, this route is for unauthenticated users (e.g., the auth page).
 * If the user IS logged in, they are redirected to "/dashboard".
 */
const AuthLayout = ({ authenticationRequired }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  if (authenticationRequired) {
    // --- This is a PROTECTED route (e.g., /dashboard) ---
    if (authStatus) {
      // User is logged in, allow access
      return <Outlet />;
    } else {
      // User is NOT logged in, redirect to auth page
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  } else {
    // --- This is an UNAUTHENTICATED-ONLY route (e.g., /auth) ---
    if (authStatus) {
      // User is logged in, redirect them away from the auth page
      return <Navigate to="/dashboard" replace />;
    } else {
      // User is NOT logged in, allow access
      return <Outlet />;
    }
  }
};

export default AuthLayout;