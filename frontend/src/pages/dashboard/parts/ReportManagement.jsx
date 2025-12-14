import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { areaOptions } from "../../../constants/forms";
import ReportTable from "../../../components/ReportTable";
import ReportDetailModal from "../../../components/ReportDetailModal";
import reportService from "../../../services/wasteReport.service";

const ReportManagement = ({ reports, theme, onFetchData, userRole }) => {
  const [reportStatusFilter, setReportStatusFilter] = useState("all");
  const [reportAreaFilter, setReportAreaFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
    theme === "dark"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-gray-50 text-gray-900"
  }`;
  
  const handleDeleteReport = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await reportService.deleteReport(id);
        onFetchData();
      } catch (error) {
        console.error("Failed to delete report:", error);
      }
    }
  };
  
  const handleUpdateReportStatus = async (id, status) => {
    try {
      await reportService.updateReport(id, { status });
      onFetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  
  const filteredReports = reports.filter((r) => {
    const statusMatch = reportStatusFilter === "all" || r.status === reportStatusFilter;
    const areaMatch = reportAreaFilter === "all" || r.areacode === reportAreaFilter;
    return statusMatch && areaMatch;
  });

  return (
    <>
      <div className={`p-6 md:p-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl`}>
        <h2 className={`text-2xl font-semibold mb-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Waste Records
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select onChange={(e) => setReportStatusFilter(e.target.value)} className={inputStyles}>
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="collected">Collected</option>
            <option value="departed">Departed</option>
          </select>
          <select onChange={(e) => setReportAreaFilter(e.target.value)} className={inputStyles}>
            <option value="all">All Areas</option>
            {areaOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>{opt.code}</option>
            ))}
          </select>
        </div>
        <ReportTable
          reports={filteredReports}
          theme={theme}
          onDeleteReport={userRole === 'admin' ? handleDeleteReport : undefined} // Only pass delete if admin
          onRowClick={(report) => setSelectedReport(report)}
          onStatusChange={handleUpdateReportStatus}
        />
      </div>
      
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

export default ReportManagement;