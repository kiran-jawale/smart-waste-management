import React, { useState, useContext } from "react";
import userService from "../../../services/user.service";
import { areaOptions } from "../../../constants/forms";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Register = ({ onToggleView }) => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    areacode: areaOptions[0].code,
    address: "",
    code: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await userService.register(formData);
      if (response.data && response.data.success) {
        setSuccess("Registration successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          contact: "",
          areacode: areaOptions[0].code,
          address: "",
          code: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
          Create Account
        </h2>

        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Join SmartPeepal waste management services
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

      {success && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            theme === "dark"
              ? "border-emerald-800 bg-emerald-950/40 text-emerald-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {success}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <input
          name="contact"
          type="tel"
          placeholder="Contact Number"
          onChange={handleChange}
          value={formData.contact}
          required
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <input
          name="address"
          type="text"
          placeholder="Full Address"
          onChange={handleChange}
          value={formData.address}
          required
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <div>
          <label
            htmlFor="areacode"
            className={`mb-2 block text-sm font-medium ${
              theme === "dark" ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Area Code
          </label>

          <select
            id="areacode"
            name="areacode"
            value={formData.areacode}
            onChange={handleChange}
            className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              theme === "dark"
                ? "border-slate-700 bg-slate-800 text-white"
                : "border-gray-200 bg-gray-50 text-gray-900"
            }`}
          >
            {areaOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.code} - {opt.address}
              </option>
            ))}
          </select>
        </div>

        <input
          name="code"
          type="text"
          placeholder="Secret Code (if applicable)"
          onChange={handleChange}
          value={formData.code}
          className={`w-full rounded-2xl border px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p
        className={`text-center text-sm ${
          theme === "dark" ? "text-slate-400" : "text-gray-600"
        }`}
      >
        Already have an account?{" "}
        <button
          onClick={onToggleView}
          className={`rounded px-1 font-semibold transition-colors hover:underline focus:outline-none ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Register;
