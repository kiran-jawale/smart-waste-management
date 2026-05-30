import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { API_BASE_URL } from "../constants/api";
import ModalContainer from "./ModalContainer";

const ReportDetailModal = ({ report, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!report) return null;

  const imageUrl = report.imagePath
    ? `${API_BASE_URL}/${report.imagePath.replace(/\\/g, "/").replace("public/", "")}`
    : null;

  return (
    <ModalContainer isOpen={!!report} onClose={onClose}>
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
          <h2
            className={`text-2xl font-semibold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Waste Collection Report
          </h2>

          <p
            className={`mt-1 text-sm ${
              theme === "dark" ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Waste management record and operational details.
          </p>
        </div>

        {imageUrl && (
          <div
            className={`rounded-2xl overflow-hidden border ${
              theme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <img
              src={imageUrl}
              alt="Report"
              className="w-full h-96 object-contain"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoRow label="Category" value={report.category} />
          <InfoRow label="Status" value={report.status} />
          <InfoRow label="Area Code" value={report.areacode} />
          <InfoRow
            label="Source Code"
            value={report.sourceCode || "N/A (Area-wide)"}
          />
          <InfoRow label="Reason" value={report.reason || "N/A"} />
          <InfoRow
            label="Collection Time"
            value={
              report.collectionTime
                ? new Date(report.collectionTime).toLocaleString()
                : "N/A"
            }
          />
          <InfoRow
            label="Departure Time"
            value={
              report.departureTime
                ? new Date(report.departureTime).toLocaleString()
                : "N/A"
            }
          />
        </div>
      </div>
    </ModalContainer>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
      {label}
    </span>

    <p className="mt-2 text-sm leading-relaxed text-gray-800 dark:text-gray-100 break-words">
      {value}
    </p>
  </div>
);

export default ReportDetailModal;
