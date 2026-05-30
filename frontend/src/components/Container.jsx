import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-[#0f172a] dark:text-gray-100">
      {children}
    </div>
  );
};

export default Container;
