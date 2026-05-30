import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Container = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0f172a] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
