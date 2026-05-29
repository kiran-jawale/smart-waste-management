import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Container = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      {children}
    </div>
  );
};

export default Container;
