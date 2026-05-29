import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const PrivacyContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-8 md:p-10 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl`}
    >
      <h1
        className={`text-4xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Privacy Policy
      </h1>
    </div>
  );
};

export default PrivacyContent;
