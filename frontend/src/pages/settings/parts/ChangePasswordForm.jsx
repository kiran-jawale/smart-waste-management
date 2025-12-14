import React, { useState } from "react";
import userService from "../../../services/user.service";

const ChangePasswordForm = () => {
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

    // 1. Check if new passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    // 2. (Optional) Check password strength
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // 3. Call the new service method
      await userService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setSuccess("Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Clear form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all";

  return (
    <div className="p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Change Password
      </h1>

      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input name="oldPassword" type="password" onChange={handleChange} value={formData.oldPassword} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input name="newPassword" type="password" onChange={handleChange} value={formData.newPassword} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input name="confirmPassword" type="password" onChange={handleChange} value={formData.confirmPassword} required className={inputStyles} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {loading ? "Saving..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;