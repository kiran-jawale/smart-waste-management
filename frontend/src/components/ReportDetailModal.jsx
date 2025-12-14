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
      <h2
        className={`text-xl font-semibold mb-5 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Report Details
      </h2>

      {imageUrl && (
        <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <img
            src={imageUrl}
            alt="Report"
            className="rounded-lg w-full h-96 object-contain"
          />
        </div>
      )}

      <div className="space-y-3">
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
    </ModalContainer>
  );
};

 const InfoRow = ({ label, value }) => (
  <div className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-2">
    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
      {label}
    </span>
    <span className="text-base font-medium text-gray-900 dark:text-white">
      {value}
    </span>
  </div>
);

export default ReportDetailModal;