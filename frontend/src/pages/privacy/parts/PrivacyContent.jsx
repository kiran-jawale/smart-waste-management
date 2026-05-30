import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const PrivacyContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-3xl border p-8 md:p-10 shadow-sm transition-colors duration-300 ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="max-w-4xl">
        <h1
          className={`text-3xl md:text-4xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Privacy Policy
        </h1>

        <p
          className={`mt-4 text-base leading-relaxed ${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Learn how SmartPeepal collects, manages, and protects citizen and
          organisation data.
        </p>
      </div>
    </div>
  );
};

export default PrivacyContent;
