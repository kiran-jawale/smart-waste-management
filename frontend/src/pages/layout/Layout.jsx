import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";
import userService from "../../services/user.service";
import { ThemeContext } from "../../contexts/ThemeContext";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../../components/Sidebar"; // Import the new Sidebar

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  // This state prevents the app from rendering until we've checked auth
  const [authChecked, setAuthChecked] = useState(false);

  // This effect runs ONCE on app load to sync Redux with the cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await userService.getMyProfile();
        if (response.data && response.data.success) {
          // User is logged in, update Redux
          dispatch(login(response.data.data));
        }
      } catch (error) {
        // User is not logged in
        dispatch(logout());
      } finally {
        // Now we've checked, allow the app to render
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Don't render anything until the auth check is complete
  if (!authChecked) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-2xl dark:text-white">Loading...</div>
        </div>
      </div>
    );
  }

  // Auth is checked, render the app
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex">
        {/* The Sidebar is only rendered if the user is logged in */}
        {authStatus && <Sidebar />}

        {/* Main Content Area */}
        <div
          className={`flex-grow ${
            authStatus ? "ml-64" : "ml-0" // Push content over if Sidebar is present
          } transition-all duration-300`}
        >
          <Header />
          <main className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
            <Outlet /> {/* This is where your pages will render */}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;