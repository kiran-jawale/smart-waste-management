import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { API_BASE_URL } from "../constants/api";
import ModalContainer from "./ModalContainer";

const ComplaintDetailModal = ({ complaint, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!complaint) return null;

  const images = [complaint.image1, complaint.image2, complaint.image3]
    .filter(Boolean)
    .map(
      (imgPath) =>
        `${API_BASE_URL}/${imgPath.replace(/\\/g, "/").replace("public/", "")}`
    );

  return (
    <ModalContainer isOpen={!!complaint} onClose={onClose}>
      <h2
        className={`text-xl font-semibold mb-5 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Complaint Details
      </h2>

      {images.length > 0 && (
        <div className="mb-4 flex space-x-4 overflow-x-auto p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Complaint ${index + 1}`}
              className="rounded-lg h-64 w-auto object-contain"
            />
          ))}
        </div>
      )}

      <div className="space-y-3">
        <InfoRow label="Subject" value={complaint.subject} />
        <InfoRow label="Status" value={complaint.status} />
        <InfoRow label="Address" value={complaint.address} />
        <InfoRow label="Description" value={complaint.description} />
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

export default ComplaintDetailModal;
