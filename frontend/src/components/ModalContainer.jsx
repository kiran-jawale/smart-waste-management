import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ModalContainer = ({ isOpen, onClose, children }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 md:p-8 transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 h-10 w-10 rounded-full flex items-center justify-center text-2xl transition-colors ${
            theme === "dark"
              ? "text-slate-400 hover:bg-slate-700 hover:text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
