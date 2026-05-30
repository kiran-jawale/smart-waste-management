import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import userService from "../../../services/user.service";

const ChangePasswordForm = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await userService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setSuccess("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
    theme === "dark"
      ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
      : "border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400"
  }`;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-8 border-b border-gray-200 pb-5 dark:border-slate-700">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Change Password
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
          Keep your account secure by updating your password regularly.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className={`mb-2 block text-sm font-medium transition-colors duration-300 ${
            theme === "dark" ? "text-slate-200" : "text-gray-700"
          }`}>
            Current Password
          </label>

          <input
            name="oldPassword"
            type="password"
            onChange={handleChange}
            value={formData.oldPassword}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className={`mb-2 block text-sm font-medium transition-colors duration-300 ${
            theme === "dark" ? "text-slate-200" : "text-gray-700"
          }`}>
            New Password
          </label>

          <input
            name="newPassword"
            type="password"
            onChange={handleChange}
            value={formData.newPassword}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className={`mb-2 block text-sm font-medium transition-colors duration-300 ${
            theme === "dark" ? "text-slate-200" : "text-gray-700"
          }`}>
            Confirm New Password
          </label>

          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
            className={inputStyles}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          inline-flex items-center justify-center
          rounded-2xl bg-emerald-600 px-6 py-3
          text-sm font-semibold text-white
          shadow-sm transition-all duration-200
          hover:bg-emerald-700
          disabled:cursor-not-allowed disabled:opacity-60
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        "
        >
          {loading ? "Saving..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
