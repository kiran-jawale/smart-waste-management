import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import userService from "../../../services/user.service";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Login = ({ onToggleView }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await userService.login({ loginIdentifier, password });
      if (response.data && response.data.success) {
        dispatch(login(response.data.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const inputStyles = `mt-2 block w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
    theme === "dark"
      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
      : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
  }`;

  return (
    <div
      className={`space-y-6 rounded-3xl border p-8 shadow-xl transition-all duration-300 ${
        theme === "dark"
          ? "border-slate-700 bg-slate-900"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="text-center">
        <h2
          className={`text-3xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Sign in
        </h2>

        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Access your SmartPeepal account
        </p>
      </div>

      {error && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            theme === "dark"
              ? "border-red-800 bg-red-950/40 text-red-300"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="loginIdentifier"
            className={`block text-sm font-medium ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Email or Name
          </label>

          <input
            id="loginIdentifier"
            type="text"
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className={`block text-sm font-medium ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyles}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p
        className={`text-center text-sm ${
          theme === "dark" ? "text-slate-400" : "text-gray-600"
        }`}
      >
        Don't have an account?{" "}
        <button
          onClick={onToggleView}
          className={`rounded px-1 font-semibold transition-colors hover:underline focus:outline-none ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
