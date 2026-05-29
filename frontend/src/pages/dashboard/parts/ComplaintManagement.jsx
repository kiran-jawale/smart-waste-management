import React, { useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import ComplaintDetailModal from "../../../components/ComplaintDetailModal";
import complaintService from "../../../services/complaint.service";

const ComplaintManagement = ({ complaints, theme, onFetchData, userRole }) => {
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("all");
  const [complaintAreaFilter, setComplaintAreaFilter] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
    theme === "dark"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-gray-50 text-gray-900"
  }`;

  const handleUpdateComplaintStatus = async (id, status) => {
    try {
      await complaintService.updateComplaintStatus(id, status);
      onFetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDeleteComplaint = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to PERMANENTLY delete this complaint?"
      )
    ) {
      try {
        await complaintService.deleteComplaint(id);
        onFetchData();
      } catch (error) {
        console.error("Failed to delete complaint:", error);
      }
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    const statusMatch =
      complaintStatusFilter === "all" || c.status === complaintStatusFilter;
    const areaMatch =
      complaintAreaFilter === "" ||
      c.address.toLowerCase().includes(complaintAreaFilter.toLowerCase());
    return statusMatch && areaMatch;
  });

  return (
    <>
      <div
        className={`p-6 md:p-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl`}
      >
        <h2
          className={`text-2xl font-semibold mb-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          All Complaints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            onChange={(e) => setComplaintStatusFilter(e.target.value)}
            className={inputStyles}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <input
            type="text"
            placeholder="Filter by address..."
            onChange={(e) => setComplaintAreaFilter(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((c) => (
              <div
                key={c._id}
                className={`p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg flex flex-col sm:flex-row justify-between sm:items-center`}
              >
                <button
                  onClick={() => setSelectedComplaint(c)}
                  className="text-left w-full sm:w-auto"
                >
                  <span
                    className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {c.subject}
                  </span>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {c.address}
                  </p>
                </button>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <select
                    value={c.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleUpdateComplaintStatus(c._id, e.target.value)
                    }
                    className={`${inputStyles} py-2 text-sm`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                   {userRole === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComplaint(c._id);
                      }}
                      className={`text-sm font-medium ${theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"}`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              No complaints found.
            </p>
          )}
        </div>
      </div>

      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </>
  );
};

export default ComplaintManagement;
