import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import userService from "../../../services/user.service";
import { areaOptions } from "../../../constants/forms";

const BasicSettingsForm = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    contact: user.contact || "",
    address: user.address || "",
    areacode: user.areacode || areaOptions[0].code,
    status: user.status || "",
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

    try {
      const response = await userService.updateMyProfile(formData);
      if (response.data && response.data.success) {
        dispatch(login(response.data.data));
        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-8 border-b border-gray-200 pb-5 dark:border-slate-700">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Basic Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
          Manage your personal information and service preferences.
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

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Full Name
          </label>

          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Email
          </label>

          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Contact Number
          </label>

          <input
            name="contact"
            type="tel"
            onChange={handleChange}
            value={formData.contact}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Full Address
          </label>

          <input
            name="address"
            type="text"
            onChange={handleChange}
            value={formData.address}
            required
            className={inputStyles}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
            Area Code
          </label>

          <select
            name="areacode"
            value={formData.areacode}
            onChange={handleChange}
            className={inputStyles}
          >
            {areaOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.code} - {opt.address}
              </option>
            ))}
          </select>
        </div>

        {user.role === "organisation" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
              Organisation Type (e.g., Hospital, School)
            </label>

            <input
              name="status"
              type="text"
              placeholder="Hospital, School, etc."
              onChange={handleChange}
              value={formData.status}
              className={inputStyles}
            />
          </div>
        )}

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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default BasicSettingsForm;
