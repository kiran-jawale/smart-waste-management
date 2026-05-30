import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import userService from "../services/user.service";
import { ThemeContext } from "../contexts/ThemeContext";

const LogButton = () => {
  const { theme } = useContext(ThemeContext);

  const authStatus = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const baseButtonStyles = `
    px-5 py-2.5 rounded-xl font-medium text-sm
    transition-all duration-200
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2
    ${
      theme === "dark"
        ? "focus:ring-offset-slate-900"
        : "focus:ring-offset-white"
    }
  `;

  return authStatus ? (
    <button
      onClick={handleLogout}
      className={`${baseButtonStyles} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={handleLogin}
      className={`${baseButtonStyles} bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500`}
    >
      Login
    </button>
  );
};

export default LogButton;
