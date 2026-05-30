import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext.jsx";
import reportService from "../../../services/wasteReport.service.js";
import complaintService from "../../../services/complaint.service.js";
import ReportForm from "../parts/ReportForm.jsx";
import ComplaintManagement from "../parts/ComplaintManagement.jsx";
import ReportManagement from "../parts/ReportManagement.jsx";

const CollectorDashboard = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const [allReports, setAllReports] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("create-report");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setView(hash);
    } else {
      setView("create-report");
    }
  }, [location.hash]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const reportsRes = await reportService.getAllReports();
      const complaintsRes = await complaintService.getAllComplaints();
      setAllReports(reportsRes.data.data);
      setAllComplaints(complaintsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch collector data", error);
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
        className={`rounded-3xl border px-6 py-10 text-center text-lg font-medium shadow-sm ${
          theme === "dark"
            ? "border-slate-700 bg-slate-800 text-white"
            : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        Loading dashboard...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1
          className={`text-3xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Collector Dashboard
        </h1>

        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Manage reports and monitor complaint resolution activities.
        </p>
      </div>

      {view === "create-report" && (
        <ReportForm user={user} onSuccess={fetchData} />
      )}

      {view === "complaints" && (
        <ComplaintManagement
          complaints={allComplaints}
          theme={theme}
          onFetchData={fetchData}
          userRole={user.role}
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
    </div>
  );
};

export default CollectorDashboard;
