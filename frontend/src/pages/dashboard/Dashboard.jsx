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
      <div className="flex justify-center items-center h-64">
        <div className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Loading user data...</div>
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
      return <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Invalid user role.</div>;
  }
};

export default Dashboard;