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

  // State for view
  const [view, setView] = useState('my-reports'); // Default view
  
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setView(hash);
    } else {
      setView('my-reports'); // Default
    }
  }, [location.hash]);

  // Form states
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
      setSuccess("Complaint submitted successfully! You can view it in 'My Complaints'.");
      fetchUserData(); // Refresh data
      setComplaintData({ subject: "", description: "", address: user.address, image1: null });
      e.target.reset(); // Reset file input
    } catch (error) {
      setError("Complaint submission failed.");
    }
  };
  
  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-50 text-gray-900'}`;
  const buttonStyles = `w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`;

  if (loading) return <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-center p-10`}>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Welcome, {user.name}!
      </h1>
      
      {/* Notifications */}
      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

      {/* 1. Submit Complaint Form (Conditional) */}
      {view === 'file-complaint' && (
        <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
          <h2 className={`text-2xl font-semibold mb-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            File a Complaint
          </h2>
          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <input type="text" placeholder="Subject" value={complaintData.subject} onChange={(e) => setComplaintData({ ...complaintData, subject: e.target.value })} className={inputStyles} required />
            <textarea placeholder="Description" value={complaintData.description} onChange={(e) => setComplaintData({ ...complaintData, description: e.target.value })} className={inputStyles} rows="4" required />
            <input type="text" placeholder="Address" value={complaintData.address} onChange={(e) => setComplaintData({ ...complaintData, address: e.target.value })} className={inputStyles} required />
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Upload Image 1 (Required)
              <input type="file" onChange={(e) => setComplaintData({ ...complaintData, image1: e.target.files[0] })} className="file-input-field" required />
            </label>
            <button type="submit" className={buttonStyles}>Submit Complaint</button>
          </form>
        </div>
      )}

      {/* 2. My Reports List (Conditional) */}
      {view === 'my-reports' && (
        <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
          <h2 className={`text-2xl font-semibold mb-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            My Waste Records
          </h2>
          <ReportTable reports={myReports} theme={theme} />
        </div>
      )}

      {/* 3. My Complaints List (Conditional) */}
      {view === 'my-complaints' && (
        <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
          <h2 className={`text-2xl font-semibold mb-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            My Complaints
          </h2>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {myComplaints.length > 0 ? (
              myComplaints.map((c) => (
                <div key={c._id} className={`p-4 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} rounded-lg flex justify-between items-center`}>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{c.subject}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : c.status === "in-progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))
            ) : (
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No complaints filed.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;