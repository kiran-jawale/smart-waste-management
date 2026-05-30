import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/ThemeContext";
import UserDashboard from "./roles/UserDashboard";
import CollectorDashboard from "./roles/CollectorDashboard";
import AdminDashboard from "./roles/AdminDashboard";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div
          className={`rounded-2xl border px-6 py-4 text-lg font-medium shadow-sm ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white"
              : "border-gray-200 bg-white text-gray-900"
          }`}
        >
          Loading user data...
        </div>
      </div>
    );
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />;
    case "collector":
      return <CollectorDashboard user={user} />;
    case "citizen":
    case "organisation":
      return <UserDashboard user={user} />;
    default:
      return (
        <div
          className={`rounded-2xl border px-6 py-4 text-lg font-medium ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white"
              : "border-gray-200 bg-white text-gray-900"
          }`}
        >
          Invalid user role.
        </div>
      );
  }
};

export default Dashboard;
