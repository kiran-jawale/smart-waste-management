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
      <div className={`${theme === "dark" ? "dark" : ""}`}>
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

            <div className="text-lg font-medium text-gray-700 dark:text-slate-200">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex bg-gray-50 dark:bg-[#0f172a]">
        {authStatus && <Sidebar />}

        <div
          className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
            authStatus ? "ml-72" : "ml-0"
          }`}
        >
          <Header />

          <main
            className={`flex-1 px-4 py-6 md:px-8 ${
              theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50"
            }`}
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
