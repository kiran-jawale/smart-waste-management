import React from "react";

const WhatWhySection = ({ title, what, why, theme }) => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-200"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
            What is it?
          </h3>
          <p className="text-lg leading-relaxed">{what}</p>
        </div>
        <div
          className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-200"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
            Why does it matter?
          </h3>
          <p className="text-lg leading-relaxed">{why}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhySection;