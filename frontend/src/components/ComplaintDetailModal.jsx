import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import ModalContainer from "./ModalContainer";

const ComplaintDetailModal = ({ complaint, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!complaint) return null;

  // FIX: Cloudinary URLs are already absolute paths.
  // We simply filter out the undefined/null ones.
  const images = [complaint.image1, complaint.image2, complaint.image3].filter(Boolean);

  return (
    <ModalContainer isOpen={!!complaint} onClose={onClose}>
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
          <h2
            className={`text-2xl font-semibold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Complaint Details
          </h2>

          <p
            className={`mt-1 text-sm ${
              theme === "dark" ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Citizen complaint information and attachments.
          </p>
        </div>

        {images.length > 0 && (
          <div
            className={`flex gap-4 overflow-x-auto rounded-2xl p-4 border ${
              theme === "dark"
                ? "bg-slate-900 border-slate-700"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Complaint Evidence ${index + 1}`}
                className="h-64 rounded-xl object-cover border border-gray-200 dark:border-slate-700"
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoRow label="Subject" value={complaint.subject} />
          <InfoRow label="Status" value={complaint.status} />
          <InfoRow label="Address" value={complaint.address} />
          <InfoRow label="Description" value={complaint.description} />
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

export default ComplaintDetailModal;