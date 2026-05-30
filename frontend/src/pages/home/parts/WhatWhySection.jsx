import React,{useContext} from "react";

const WhatWhySection = ({ title, what, why, theme }) => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div
          className={`rounded-3xl border p-8 shadow-sm ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            What is it?
          </h3>

          <p
            className={`mt-5 text-base leading-relaxed ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {what}
          </p>
        </div>

        <div
          className={`rounded-3xl border p-8 shadow-sm ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            Why does it matter?
          </h3>

          <p
            className={`mt-5 text-base leading-relaxed ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {why}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWhySection;
