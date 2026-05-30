import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import reportService from "../../../services/wasteReport.service.js";
import complaintService from "../../../services/complaint.service.js";
import ReportTable from "../../../components/ReportTable";

const UserDashboard = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const [myReports, setMyReports] = useState([]);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("my-reports");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setView(hash);
    } else {
      setView("my-reports");
    }
  }, [location.hash]);

  const [complaintData, setComplaintData] = useState({
    subject: "",
    description: "",
    address: user.address,
    image1: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const reportsRes = await reportService.getMyReports();
      const complaintsRes = await complaintService.getMyComplaints();

      setMyReports(reportsRes.data.data);
      setMyComplaints(complaintsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setError("Failed to fetch your data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append("subject", complaintData.subject);
    formData.append("description", complaintData.description);
    formData.append("address", complaintData.address);
    formData.append("image1", complaintData.image1);

    try {
      await complaintService.createComplaint(formData);
      setSuccess(
        "Complaint submitted successfully! You can view it in 'My Complaints'."
      );
      fetchUserData();
      setComplaintData({
        subject: "",
        description: "",
        address: user.address,
        image1: null,
      });
      e.target.reset();
    } catch (error) {
      setError("Complaint submission failed.");
    }
  };

  const inputStyles = `mt-2 block w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
    theme === "dark"
      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
  }`;

  const buttonStyles =
    "w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500";

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
          Welcome, {user.name}!
        </h1>

        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Manage your complaints and waste collection records.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {success}
        </div>
      )}

      {view === "file-complaint" && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            File a Complaint
          </h2>

          <form onSubmit={handleComplaintSubmit} className="mt-6 space-y-5">
            <input
              type="text"
              placeholder="Subject"
              value={complaintData.subject}
              onChange={(e) =>
                setComplaintData({ ...complaintData, subject: e.target.value })
              }
              className={inputStyles}
              required
            />

            <textarea
              placeholder="Description"
              value={complaintData.description}
              onChange={(e) =>
                setComplaintData({
                  ...complaintData,
                  description: e.target.value,
                })
              }
              className={inputStyles}
              rows="4"
              required
            />

            <input
              type="text"
              placeholder="Address"
              value={complaintData.address}
              onChange={(e) =>
                setComplaintData({ ...complaintData, address: e.target.value })
              }
              className={inputStyles}
              required
            />

            <label
              className={`block text-sm font-medium ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Upload Image 1 (Required)
              <input
                type="file"
                onChange={(e) =>
                  setComplaintData({
                    ...complaintData,
                    image1: e.target.files[0],
                  })
                }
                className="file-input-field"
                required
              />
            </label>

            <button type="submit" className={buttonStyles}>
              Submit Complaint
            </button>
          </form>
        </div>
      )}

      {view === "my-reports" && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My Waste Records
          </h2>

          <div className="mt-6">
            <ReportTable reports={myReports} theme={theme} />
          </div>
        </div>
      )}

      {view === "my-complaints" && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My Complaints
          </h2>

          <div className="mt-6 space-y-4">
            {myComplaints.length > 0 ? (
              myComplaints.map((c) => (
                <div
                  key={c._id}
                  className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
                    theme === "dark"
                      ? "border-slate-700 bg-slate-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {c.subject}
                  </span>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      c.status === "pending"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                        : c.status === "in-progress"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))
            ) : (
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                No complaints filed.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
