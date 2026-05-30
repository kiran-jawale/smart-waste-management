import React, { useState, useContext } from "react";
import Login from "./parts/Login";
import Register from "./parts/Register";
import { ThemeContext } from "../../contexts/ThemeContext";

const Auth = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView((prev) => !prev);

  return (
    <div
      className={`flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12 transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#0f172a]"
          : "bg-gradient-to-br from-gray-50 via-white to-emerald-50"
      }`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-200 bg-white shadow-lg dark:border-emerald-500/20 dark:bg-slate-800">
            <span className="text-5xl" role="img" aria-label="recycle">
              ♻️
            </span>
          </div>
        </div>

        {isLoginView ? (
          <Login onToggleView={toggleView} />
        ) : (
          <Register onToggleView={toggleView} />
        )}
      </div>
    </div>
  );
};

export default Auth;
