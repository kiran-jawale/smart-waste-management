import React from "react";
import { useSelector } from "react-redux";

const ReportTable = ({
  reports,
  onDeleteReport,
  onRowClick,
  onStatusChange,
  theme,
}) => {
  const userRole = useSelector((state) => state.auth.user?.role);
  const isAdmin = userRole === "admin";

  const canChangeStatus =
    (userRole === "admin" || userRole === "collector") && onStatusChange;

  const inputStyles = `block w-full px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"}`;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Area Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Created At
            </th>
            {isAdmin && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {reports.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin ? 5 : 4}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report._id}
                onClick={() => onRowClick(report)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                  {report.category}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                   {canChangeStatus ? (
                    <select
                      value={report.status}
                      onChange={(e) =>
                        onStatusChange(report._id, e.target.value)
                      }
                      className={`${inputStyles} py-1 text-sm`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="collected">Collected</option>
                      <option value="departed">Departed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : report.status === "collected"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {report.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {report.areacode}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {formatDate(report.createdAt)}
                </td>
                {isAdmin && (
                  <td
                    className="px-4 py-3 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onDeleteReport(report._id)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
