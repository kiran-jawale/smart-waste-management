import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";
import userService from "../../services/user.service";
import { ThemeContext } from "../../contexts/ThemeContext";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await userService.getMyProfile();
        if (response.data && response.data.success) {
          dispatch(login(response.data.data));
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-2xl dark:text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex">
        {authStatus && <Sidebar />}

        <div
          className={`flex-grow ${
            authStatus ? "ml-64" : "ml-0"
          } transition-all duration-300`}
        >
          <Header />
          <main
            className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} p-8`}
          >
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
