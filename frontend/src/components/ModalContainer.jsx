import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ModalContainer = ({ isOpen, onClose, children }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className={`p-6 md:p-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-xl w-full max-w-4xl relative max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-3xl font-bold ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-800"
          } transition-colors`}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
