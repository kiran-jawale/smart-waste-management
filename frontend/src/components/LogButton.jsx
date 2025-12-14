import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import userService from "../services/user.service";
import { ThemeContext} from "../contexts/ThemeContext"


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

  const baseButtonStyles = `px-4 py-2 font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'dark:focus:ring-offset-gray-900' : ''}`;

  return authStatus ? (
    <button
      onClick={handleLogout}
      className={`${baseButtonStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={handleLogin}
      className={`${baseButtonStyles} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`}
    >
      Login
    </button>
  );
};

export default LogButton;