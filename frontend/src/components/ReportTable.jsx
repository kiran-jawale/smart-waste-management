import React, { useContext } from "react";
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

  const inputStyles = `
    block w-full px-3 py-2 rounded-xl border text-sm
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    ${
      theme === "dark"
        ? "border-slate-700 bg-slate-800 text-white"
        : "border-gray-200 bg-white text-gray-800"
    }
  `;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className={`overflow-hidden rounded-3xl border shadow-sm ${
        theme === "dark"
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            className={`${theme === "dark" ? "bg-slate-800" : "bg-gray-100"}`}
          >
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                Area Code
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                Created At
              </th>

              {isAdmin && (
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-6 py-12 text-center text-sm text-gray-500 dark:text-slate-400"
                >
                  No waste records found.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  onClick={() => onRowClick(report)}
                  className={`cursor-pointer border-t transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
                    {report.category}
                  </td>

                  <td
                    className="px-6 py-4 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {canChangeStatus ? (
                      <select
                        value={report.status}
                        onChange={(e) =>
                          onStatusChange(report._id, e.target.value)
                        }
                        className={inputStyles}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="collected">Collected</option>
                        <option value="departed">Departed</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === "scheduled"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                            : report.status === "collected"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}
                      >
                        {report.status}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 whitespace-nowrap">
                    {report.areacode}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 whitespace-nowrap">
                    {formatDate(report.createdAt)}
                  </td>

                  {isAdmin && (
                    <td
                      className="px-6 py-4 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onDeleteReport(report._id)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-red-600 hover:bg-red-50"
                        }`}
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
    </div>
  );
};

export default ReportTable;
