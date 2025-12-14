import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import adminService from "../../../services/admin.service.js";
import reportService from "../../../services/wasteReport.service.js";
import complaintService from "../../../services/complaint.service.js";
import ReportForm from "../parts/ReportForm.jsx";
import ComplaintManagement from "../parts/ComplaintManagement.jsx";
import UserManagement from "../parts/UserManagement.jsx";
import ReportManagement from "../parts/ReportManagement.jsx";


const AdminDashboard = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [view, setView] = useState('complaints');

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setView(hash);
    } else {
      setView("complaints"); 
    }
  }, [location.hash]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersRes = await adminService.getAllUsers();
      const reportsRes = await reportService.getAllReports();
      const complaintsRes = await complaintService.getAllComplaints();
      setAllUsers(usersRes.data.data);
      setAllReports(reportsRes.data.data);
      setAllComplaints(complaintsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        className={`${
          theme === "dark" ? "text-white" : "text-gray-900"
        } text-center p-10`}
      >
        Loading dashboard...
      </div>
    );

  return (
    <div className="space-y-8">
      <h1
        className={`text-4xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Admin Dashboard
      </h1>

      {view === "complaints" && (
        <ComplaintManagement 
          complaints={allComplaints}
          theme={theme}
          onFetchData={fetchData}
          userRole={user.role}
        />
      )}

      {view === "users" && (
        <UserManagement 
          users={allUsers}
          theme={theme}
          onFetchData={fetchData}
        />
      )}

      {view === "reports" && (
        <ReportManagement 
          reports={allReports}
          theme={theme}
          onFetchData={fetchData}
          userRole={user.role}
        />
      )}
      
      {view === 'create-report' && (
        <ReportForm user={user} onSuccess={fetchData} />
      )}
    </div>
  );
};

export default AdminDashboard;