import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { areaOptions, reasonOptions, categoryOptions } from "../../../constants/forms";
import adminService from "../../../services/admin.service.js"; // To get user list
import reportService from "../../../services/wasteReport.service.js";

const ReportForm = ({ user, onSuccess }) => {
  const { theme } = useContext(ThemeContext);
   
  const [reportType, setReportType] = useState("area"); 
  const [citizens, setCitizens] = useState([]);
   
  const [category, setCategory] = useState(categoryOptions[0]);
  const [reason, setReason] = useState(reasonOptions[0]);
  const [areacode, setAreacode] = useState(user.areacode || areaOptions[0].code);
  const [sourceCode, setSourceCode] = useState("");
  const [image, setImage] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminService.getAllUsers();
        const citizenOrgs = res.data.data.filter(
          (u) => u.role === "citizen" || u.role === "organisation"
        );
        setCitizens(citizenOrgs);
        if (citizenOrgs.length > 0) {
          setSourceCode(citizenOrgs[0].code);  
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-gray-50 text-gray-900'}`;
  const buttonStyles = "w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      
      const formData = new FormData();
      formData.append("category", category);
      formData.append("reason", reason);
      
      if (reportType === "area") {
        formData.append("areacode", areacode);
       } else {
        formData.append("areacode", areacode);  
        formData.append("sourceCode", sourceCode);
        if (image) {
          formData.append("image", image);
        }
      }

      await reportService.createReport(formData);
      setSuccess("Report created successfully!");
      onSuccess();  
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
      <h2 className={`text-2xl font-semibold mb-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Create New Waste Report
      </h2>
      
      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
 
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={() => setReportType("area")} 
            className={`flex-1 py-3 font-medium rounded-lg ${reportType === 'area' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Report for Area
          </button>
          <button 
            type="button" 
            onClick={() => setReportType("user")} 
            className={`flex-1 py-3 font-medium rounded-lg ${reportType === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            Report for User
          </button>
        </div>
        
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputStyles}>
              {categoryOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Reason</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className={inputStyles}>
              {reasonOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
        </div>

   
        <div>
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Area Code</label>
          <select value={areacode} onChange={(e) => setAreacode(e.target.value)} className={inputStyles}>
            {areaOptions.map(opt => (<option key={opt.code} value={opt.code}>{opt.code} - {opt.address}</option>))}
          </select>
        </div>
        
        {reportType === 'user' && (
          <>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Citizen / Organisation</label>
              <select value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} className={inputStyles}>
                {citizens.length > 0 ? (
                  citizens.map(c => (<option key={c.code} value={c.code}>{c.name} ({c.code})</option>))
                ) : (
                  <option disabled>Loading users...</option>
                )}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Image (Optional)</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className={`${inputStyles} py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-gray-600 dark:file:text-green-300 dark:hover:file:bg-gray-500`}
              />
            </div>
          </>
        )}
        
        <button type="submit" disabled={loading} className={buttonStyles}>
          {loading ? "Creating..." : "Create Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;